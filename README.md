# Edgar Gomes Portfolio

Portfolio estático e bilingue com design editorial minimalista, suporte para dark/light mode e formulário de contacto funcional.

## Funcionalidades

- **Bilingue (PT/EN):** Todo o conteúdo do site é traduzível e persiste a escolha do utilizador.
- **Dark/Light Mode:** Suporte para temas claro e escuro com transições suaves (View Transitions API).
- **Design Responsivo:** Otimizado para desktop, tablets e dispositivos móveis.
- **Micro-interacções:** Cursor personalizado, animações de scroll e WebGL (Three.js).
- **Formulário de Contacto:** Integração com backend Node.js (serverless) para envio de emails via SMTP.

## Arquitetura

O projeto foi refatorado para ser mais modular e fácil de manter:

- `index.html`: Skeleton HTML e estilos CSS (variáveis dinâmicas).
- `assets/i18n.js`: Dicionário de strings estáticas para internacionalização.
- `assets/content.js`: Dados estruturados (projetos, percurso, certificações, skills).
- `assets/app.js`: Lógica de renderização, gestão de tema, idioma e animações.
- `api/contact.js`: Endpoint serverless para processamento do formulário.

## Rodar localmente

1. Instala as dependências (para o backend):
```bash
npm install
```

2. Cria um ficheiro `.env` baseado no `.env.example` e preenche com as credenciais SMTP.

3. Inicia o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abre `http://127.0.0.1:3000`.

## Deploy na Vercel

O projeto está configurado para deploy imediato na Vercel.

Configura as seguintes Environment Variables na Vercel:

- `CONTACT_TO`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_FROM`

## Créditos

Desenvolvido por Edgar Gomes.
