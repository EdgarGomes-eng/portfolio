/* assets/content.js
 * Dados estruturados do portfolio.
 * Tudo o que é conteúdo dinâmico vive aqui.
 * Conteúdo textual estático (nav, headings, form labels) está em i18n.js.
 */

window.CONTENT = (() => {
  /* ── STATS (info-row) ─────────────────────────── */
  const stats = [
    { value: 10.96, decimals: 2, i18n: 'info.level' },
    { value: 100, decimals: 0, suffix: '%', i18n: 'info.cc' },
    { value: 27, decimals: 0, suffix: '+', i18n: 'info.projects' },
    { value: 1840, decimals: 0, suffix: '+', i18n: 'info.hours' },
  ];

  /* ── SKILL GROUPS ─────────────────────────────── */
  const skillGroups = {
    pt: [
      {
        label: 'skills.group.languages',
        items: ['C', 'C++', 'Python', 'JavaScript', 'Bash', 'SQL'],
      },
      {
        label: 'skills.group.systems',
        items: ['Linux', 'Unix', 'Docker', 'Docker Compose', 'Git', 'Vim', 'TCP/IP', 'DNS'],
      },
      {
        label: 'skills.group.cloud',
        items: ['Google Cloud Platform', 'Cloud Run', 'Cloud Storage', 'Cloud Workstations', 'NGINX', 'SSL/TLS', 'Wordpress', 'MariaDB'],
      },
      {
        label: 'skills.group.web',
        items: ['HTML', 'CSS', 'Node.js', 'REST APIs', 'WebSockets', 'Flask', 'OAuth'],
      },
      {
        label: 'skills.group.ai',
        items: ['Prompt Engineering', 'Gemini Code Assist', 'Claude Code', 'Agentes de IA', 'LLMs'],
      },
    ],
    en: [
      {
        label: 'skills.group.languages',
        items: ['C', 'C++', 'Python', 'JavaScript', 'Bash', 'SQL'],
      },
      {
        label: 'skills.group.systems',
        items: ['Linux', 'Unix', 'Docker', 'Docker Compose', 'Git', 'Vim', 'TCP/IP', 'DNS'],
      },
      {
        label: 'skills.group.cloud',
        items: ['Google Cloud Platform', 'Cloud Run', 'Cloud Storage', 'Cloud Workstations', 'NGINX', 'SSL/TLS', 'WordPress', 'MariaDB'],
      },
      {
        label: 'skills.group.web',
        items: ['HTML', 'CSS', 'Node.js', 'REST APIs', 'WebSockets', 'Flask', 'OAuth'],
      },
      {
        label: 'skills.group.ai',
        items: ['Prompt Engineering', 'Gemini Code Assist', 'Claude Code', 'AI Agents', 'LLMs'],
      },
    ],
  };

  /* ── MARQUEE (palavras que passam) ─────────────── */
  const marquee = {
    pt: ['Linguagem C', 'C++', 'Sistemas Unix', 'Docker', 'Algoritmos', '42 Luanda', 'Cloud GCP', 'IA & LLMs', 'TCP/IP'],
    en: ['C Language', 'C++', 'Unix Systems', 'Docker', 'Algorithms', '42 Luanda', 'GCP Cloud', 'AI & LLMs', 'TCP/IP'],
  };

  /* ── FEATURED PROJECTS (secção Work) ───────────── */
  const projects = [
    {
      num: '001',
      name: 'cub3D',
      summary: { pt: 'Motor de raycasting 3D inspirado no Wolfenstein 3D', en: '3D raycasting engine inspired by Wolfenstein 3D' },
      tags: ['C', 'Gráficos', 'MiniLibX', '280h'],
      year: '2025',
      bonus: false,
    },
    {
      num: '002',
      name: 'ft_irc',
      summary: { pt: 'Servidor IRC completo em C++98 com sockets TCP', en: 'Full IRC server in C++98 with TCP sockets' },
      tags: ['C++', 'Redes', 'IRC', '175h'],
      year: '2026',
      bonus: false,
    },
    {
      num: '003',
      name: 'Inception',
      summary: { pt: 'Infraestrutura Docker: NGINX + SSL, WordPress, MariaDB', en: 'Docker infrastructure: NGINX + SSL, WordPress, MariaDB' },
      tags: ['Docker', 'DevOps', 'NGINX', '150h'],
      year: '2026',
      bonus: false,
    },
    {
      num: '004',
      name: 'ft_transcendence',
      summary: {
        pt: 'Web app fullstack — Pong online em tempo real, OAuth e chat',
        en: 'Full-stack web app — real-time online Pong, OAuth and chat',
      },
      tags: ['JavaScript', 'WebSockets', 'OAuth', '245h'],
      year: '2026',
      bonus: true,
      latest: true,
    },
    {
      num: '005',
      name: 'Philosophers',
      summary: {
        pt: 'Multithreading, mutex e prevenção de deadlocks',
        en: 'Multithreading, mutex and deadlock prevention',
      },
      tags: ['C', 'Threads', 'Mutex', '70h'],
      year: '2025',
      bonus: true,
    },
  ];

  /* ── 42 JOURNEY (percurso) ────────────────────── */
  // Apenas validados (pass / pass+bonus). ft_transcendence REMOVIDO a pedido.
  const journey = [
    { name: 'Libft', desc: { pt: 'A tua própria libc', en: 'Recode your own libc' }, status: 'pass', date: { pt: "Mai '24", en: "May '24" } },
    { name: 'ft_printf', desc: { pt: 'Recriar printf', en: 'Recreate printf' }, status: 'pass', date: { pt: "Mai '24", en: "May '24" } },
    { name: 'Born2beroot', desc: { pt: 'Virtualização Linux', en: 'Linux virtualization' }, status: 'pass', date: { pt: "Jun '24", en: "Jun '24" } },
    { name: 'get_next_line', desc: { pt: 'Ler ficheiros linha a linha', en: 'Read files line by line' }, status: 'pass', date: { pt: "Jun '24", en: "Jun '24" } },
    { name: 'Exam Rank 02', desc: { pt: 'Exame prático de C', en: 'C practical exam' }, status: 'pass', date: { pt: "Ago '24", en: "Aug '24" } },
    { name: 'minitalk', desc: { pt: 'Comunicação via signals Unix', en: 'Communication via Unix signals' }, status: 'pass', date: { pt: "Ago '24", en: "Aug '24" } },
    { name: 'so_long', desc: { pt: 'Jogo 2D com MiniLibX', en: '2D game with MiniLibX' }, status: 'pass', date: { pt: "Set '24", en: "Sep '24" } },
    { name: 'push_swap', desc: { pt: 'Sorting com o mínimo de moves', en: 'Sorting with the minimum number of moves' }, status: 'pass', date: { pt: "Out '24", en: "Oct '24" } },
    { name: 'Exam Rank 03', desc: { pt: 'Exame prático', en: 'Practical exam' }, status: 'pass', date: { pt: "Out '24", en: "Oct '24" } },
    { name: 'Philosophers', desc: { pt: 'Threads, mutex, deadlock', en: 'Threads, mutex, deadlock' }, status: 'pass+bonus', date: { pt: "Fev '25", en: "Feb '25" } },
    { name: 'NetPractice', desc: { pt: 'TCP/IP, subnets, routing', en: 'TCP/IP, subnets, routing' }, status: 'pass', date: { pt: "Abr '25", en: "Apr '25" } },
    { name: 'CPP Modules 00–09', desc: { pt: 'OOP completo em C++', en: 'Full OOP in C++' }, status: 'pass', date: { pt: "'25–'26", en: "'25–'26" } },
    { name: 'cub3D', desc: { pt: 'Motor raycasting 3D', en: '3D raycasting engine' }, status: 'pass', date: { pt: "Jun '25", en: "Jun '25" } },
    { name: 'Inception', desc: { pt: 'Docker infra completa', en: 'Full Docker infra' }, status: 'pass', date: { pt: "Mar '26", en: "Mar '26" } },
    { name: 'Exam Rank 04', desc: { pt: 'Exame prático', en: 'Practical exam' }, status: 'pass', date: { pt: "Mar '26", en: "Mar '26" } },
    { name: 'ft_irc', desc: { pt: 'Servidor IRC C++98', en: 'IRC server in C++98' }, status: 'pass', date: { pt: "Mar '26", en: "Mar '26" } },
    { name: 'Exam Rank 05', desc: { pt: 'Exame prático', en: 'Practical exam' }, status: 'pass', date: { pt: "Mar '26", en: "Mar '26" } },
    { name: 'Exam Rank 06', desc: { pt: 'Exame prático', en: 'Practical exam' }, status: 'pass', date: { pt: "Abr '26", en: "Apr '26" } },
    { name: '42_Collaborative_resume', desc: { pt: 'Trabalho de grupo e auto-conhecimento', en: 'Group work and self-awareness' }, status: 'pass', date: { pt: "Mai '26", en: "May '26" } },
  ];

  /* ── CERTIFICATIONS ───────────────────────────── */
  const certifications = [
    {
      issuer: 'Santander Open Academy',
      title: { pt: 'Domine a IA com o Gemini', en: 'Master AI with Gemini' },
      date: { pt: 'Maio 2026', en: 'May 2026' },
      code: 'OA-2026-0527002672485',
      url: '',
      skills: { pt: ['Gemini Code Assist', 'Agentes de IA', 'Engenharia de prompts'], en: ['Gemini Code Assist', 'AI Agents', 'Prompt engineering'] },
    },
    {
      issuer: 'Google Cloud Skills Boost',
      title: { pt: 'Gemini for Application Developers', en: 'Gemini for Application Developers' },
      date: { pt: 'Maio 2026', en: 'May 2026' },
      code: '24219414',
      url: '',
      skills: {
        pt: ['Engenharia de Prompts', 'APIs com Python e Flask', 'Cloud Workstations', 'Cloud Code', 'Containerização (Docker / Cloud Run)'],
        en: ['Prompt Engineering', 'APIs with Python and Flask', 'Cloud Workstations', 'Cloud Code', 'Containerization (Docker / Cloud Run)'],
      },
    },
    {
      issuer: 'Google Cloud Skills Boost',
      title: { pt: 'The Basics of Google Cloud Compute', en: 'The Basics of Google Cloud Compute' },
      date: { pt: 'Maio 2026', en: 'May 2026' },
      code: '24358492',
      url: '',
      skills: { pt: ['Armazenamento em nuvem'], en: ['Cloud storage'] },
    },
    {
      issuer: 'Santander Open Academy',
      title: { pt: 'Introduction to Programming Using Python', en: 'Introduction to Programming Using Python' },
      date: { pt: 'Maio 2026', en: 'May 2026' },
      code: 'OA-2026-0524002658623',
      url: '',
      skills: { pt: ['Python'], en: ['Python'] },
    },
    {
      issuer: 'IPAS',
      title: { pt: 'Técnico de Informática de Gestão', en: 'IT Management Technician' },
      date: { pt: 'Junho 2025', en: 'June 2025' },
      code: '000006',
      url: '',
      skills: { pt: ['Microsoft Word', 'SQL Server', 'Redes de computadores'], en: ['Microsoft Word', 'SQL Server', 'Computer networks'] },
    },
    {
      issuer: 'freeCodeCamp',
      title: { pt: 'Legacy JavaScript Algorithms and Data Structures', en: 'Legacy JavaScript Algorithms and Data Structures' },
      date: { pt: 'Abril 2026', en: 'April 2026' },
      code: 'edgomes-ljaads',
      url: '',
      skills: { pt: ['JavaScript', 'Algoritmos e estrutura de dados'], en: ['JavaScript', 'Algorithms and data structures'] },
    },
    {
      issuer: 'Anthropic',
      title: { pt: 'Claude code 101', en: 'Claude code 101' },
      date: { pt: 'Abril 2026', en: 'April 2026' },
      code: 'fkachi5ouf3z',
      url: '',
      skills: { pt: ['IA generativa', 'Claude Code'], en: ['Generative AI', 'Claude Code'] },
    },
    {
      issuer: 'Anthropic',
      title: { pt: 'Claude 101', en: 'Claude 101' },
      date: { pt: 'Abril 2026', en: 'April 2026' },
      code: '3qsk9uf9gf8z',
      url: '',
      skills: { pt: ['IA generativa', 'Agentes de IA'], en: ['Generative AI', 'AI Agents'] },
    },
    {
      issuer: 'Canvas Credentials (Badgr)',
      title: { pt: 'English for Career Development MOOC', en: 'English for Career Development MOOC' },
      date: { pt: 'Abril 2026', en: 'April 2026' },
      code: '69e3d3fe76b6cba1e8d923aa',
      url: '',
      skills: { pt: ['Inglês'], en: ['English'] },
    },
  ];

  /* ── CONTACT LINKS ────────────────────────────── */
  const contact = {
    email: 'edgargomes152006@gmail.com',
    github: 'https://github.com/EdgarGomes-eng',
    linkedin: 'https://www.linkedin.com/in/edgar-gomes-0a73243b5',
  };

  return { stats, skillGroups, marquee, projects, journey, certifications, contact };
})();
