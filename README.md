# Edgar Gomes Portfolio

Portfolio estatico com formulario de contacto funcional via backend Node.

## Rodar localmente

1. Preenche `.env` com as credenciais SMTP.
2. Inicia o servidor:

```bash
npm run dev
```

3. Abre `http://127.0.0.1:3000`.

## Deploy na Vercel

A Vercel usa os arquivos estaticos da raiz e a funcao serverless em `api/contact.js`.

No painel da Vercel, adiciona estas Environment Variables em Production e Preview:

```env
CONTACT_TO=edgargomes152006@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=edgargomes152006@gmail.com
SMTP_PASS=app_password_do_gmail
CONTACT_FROM=edgargomes152006@gmail.com
```

Depois faz deploy pelo GitHub ou pela CLI:

```bash
vercel --prod
```

O arquivo `.env` fica apenas na maquina local e nao deve ser commitado.
