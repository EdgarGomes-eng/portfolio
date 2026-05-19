const tls = require('tls');
const net = require('net');

const MAX_BODY_BYTES = 32 * 1024;
const CONTACT_TO = process.env.CONTACT_TO || 'edgargomes152006@gmail.com';
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = String(process.env.SMTP_SECURE || 'true').toLowerCase() !== 'false';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_FROM = process.env.CONTACT_FROM || SMTP_USER;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, error: 'Metodo nao permitido.' });
  }

  try {
    if (!isSmtpConfigured()) {
      return sendJson(res, 500, { ok: false, error: 'Envio de email ainda nao configurado no servidor.' });
    }

    const body = await readBody(req);
    const contact = validateContact(body);
    if (!contact.ok) {
      return sendJson(res, 400, { ok: false, error: contact.error });
    }

    await sendContactEmail(contact.value);
    return sendJson(res, 200, { ok: true, message: 'Mensagem enviada com sucesso.' });
  } catch (err) {
    console.error(err);
    return sendJson(res, 500, { ok: false, error: 'Erro ao enviar mensagem. Tenta novamente.' });
  }
};

function validateContact(body) {
  const name = cleanText(body.name, 80);
  const email = cleanText(body.email, 120);
  const message = cleanText(body.message, 5000);

  if (!name) return { ok: false, error: 'Escreve o teu nome.' };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Escreve um email valido.' };
  }
  if (!message || message.length < 10) {
    return { ok: false, error: 'A mensagem precisa ter pelo menos 10 caracteres.' };
  }

  return { ok: true, value: { name, email, message } };
}

function cleanText(value, maxLength) {
  return String(value || '')
    .replace(/\r/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  if (typeof req.body === 'string') {
    try {
      return Promise.resolve(JSON.parse(req.body || '{}'));
    } catch {
      return Promise.reject(new Error('JSON invalido.'));
    }
  }

  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (Buffer.byteLength(raw) > MAX_BODY_BYTES) {
        reject(new Error('Body muito grande.'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch {
        reject(new Error('JSON invalido.'));
      }
    });
    req.on('error', reject);
  });
}

function isSmtpConfigured() {
  return Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && CONTACT_FROM && CONTACT_TO);
}

async function sendContactEmail({ name, email, message }) {
  const subject = `Nova mensagem do portfolio - ${name}`;
  const text = [
    'Nova mensagem recebida pelo portfolio.',
    '',
    `Nome: ${name}`,
    `Email: ${email}`,
    '',
    'Mensagem:',
    message
  ].join('\n');

  const headers = [
    `From: ${formatAddress('Portfolio Edgar Gomes', CONTACT_FROM)}`,
    `To: ${formatAddress('Edgar Gomes', CONTACT_TO)}`,
    `Reply-To: ${formatAddress(name, email)}`,
    `Subject: ${encodeHeader(subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit'
  ];

  await sendSmtpMail({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    data: `${headers.join('\r\n')}\r\n\r\n${text}\r\n`
  });
}

function formatAddress(name, email) {
  const safeName = String(name).replace(/["\\\r\n]/g, '');
  const safeEmail = String(email).replace(/[\r\n<>]/g, '');
  return `"${safeName}" <${safeEmail}>`;
}

function encodeHeader(value) {
  return `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`;
}

function sendSmtpMail({ from, to, data }) {
  return new Promise((resolve, reject) => {
    const socket = SMTP_SECURE
      ? tls.connect(SMTP_PORT, SMTP_HOST, { servername: SMTP_HOST })
      : net.connect(SMTP_PORT, SMTP_HOST);

    let buffer = '';
    let closed = false;
    let started = false;

    socket.setTimeout(20000);
    socket.on('timeout', () => fail(new Error('Timeout ao contactar o servidor SMTP.')));
    socket.on('error', fail);
    socket.on('data', (chunk) => {
      buffer += chunk.toString('utf8');
      if (!started && buffer.includes('\n')) {
        started = true;
        run().catch(fail);
      }
    });

    async function run() {
      await expect([220]);
      await command(`EHLO ${process.env.SMTP_EHLO_HOST || 'localhost'}`, [250]);
      await command('AUTH LOGIN', [334]);
      await command(Buffer.from(SMTP_USER).toString('base64'), [334]);
      await command(Buffer.from(SMTP_PASS).toString('base64'), [235]);
      await command(`MAIL FROM:<${from}>`, [250]);
      await command(`RCPT TO:<${to}>`, [250, 251]);
      await command('DATA', [354]);
      await command(`${escapeSmtpData(data)}\r\n.`, [250]);
      await command('QUIT', [221]);
      closed = true;
      socket.end();
      resolve();
    }

    function command(line, expectedCodes) {
      socket.write(`${line}\r\n`);
      return expect(expectedCodes);
    }

    function expect(expectedCodes) {
      return new Promise((resolveExpect, rejectExpect) => {
        const check = () => {
          const response = takeResponse();
          if (!response) {
            setTimeout(check, 10);
            return;
          }
          if (!expectedCodes.includes(response.code)) {
            rejectExpect(new Error(`SMTP respondeu ${response.code}: ${response.message}`));
            return;
          }
          resolveExpect(response);
        };
        check();
      });
    }

    function takeResponse() {
      const lines = buffer.split(/\r?\n/);
      const completeIndex = lines.findIndex((line) => /^\d{3} /.test(line));
      if (completeIndex === -1) return null;
      const responseLines = lines.slice(0, completeIndex + 1);
      buffer = lines.slice(completeIndex + 1).join('\n');
      const last = responseLines[responseLines.length - 1];
      return {
        code: Number(last.slice(0, 3)),
        message: responseLines.join('\n')
      };
    }

    function fail(err) {
      if (closed) return;
      closed = true;
      socket.destroy();
      reject(err);
    }
  });
}

function escapeSmtpData(data) {
  return data.replace(/\r?\n/g, '\r\n').replace(/^\./gm, '..');
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}
