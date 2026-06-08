/* assets/i18n.js
 * Dicionário de strings estáticas PT/EN.
 * Conteúdo dinâmico (projectos, percurso, certificações) vive em content.js.
 * Usar: t('nav.about') devolve a string no idioma activo.
 */

window.I18N = (() => {
  const dict = {
    pt: {
      // Meta
      'meta.title': 'Edgar Gomes — Software Engineer',
      'meta.description': 'Engenheiro de software da 42 Luanda. C, C++, sistemas Unix, Docker, cloud e IA.',

      // Nav
      'nav.about': 'Sobre',
      'nav.work': 'Trabalho',
      'nav.journey': 'Percurso',
      'nav.skills': 'Skills',
      'nav.certs': 'Certificações',
      'nav.contact': 'Contacto',
      'nav.status': 'Disponível',
      'nav.openMenu': 'Abrir menu',
      'nav.closeMenu': 'Fechar menu',
      'nav.toggleTheme.toDark': 'Mudar para tema escuro',
      'nav.toggleTheme.toLight': 'Mudar para tema claro',
      'nav.toggleLang': 'Mudar para inglês',
      'nav.lang.short': 'EN',

      // Skip
      'skip.content': 'Saltar para o conteúdo',

      // Hero
      'hero.eyebrow': 'Software Engineer — 42 Luanda — Uíge, Angola',
      'hero.line1': 'Edgar',
      'hero.line2': 'Gomes.',
      'hero.desc': 'Construo software a partir dos <strong>fundamentos</strong>.<br><strong>C, C++, sistemas Unix</strong> — código que funciona por dentro.<br>Nível <strong>10.96</strong> na 42 Luanda · 42 Advanced.',
      'hero.scroll': 'Scroll para explorar',
      'hero.cta.work': 'Ver trabalho',

      // Info row
      'info.level': 'Nível actual na 42',
      'info.cc': 'Common Core concluído',
      'info.projects': 'Projectos validados',
      'info.hours': 'Horas de código',

      // About
      'about.label': 'Sobre mim',
      'about.heading.l1': 'Engenheiro de software',
      'about.heading.l2': 'em construção',
      'about.heading.l3': 'constante.',
      'about.photo.alt': 'Retrato de Edgar Gomes',
      'about.p1': 'Nasci no <strong>Uíge, Angola</strong> a 4 de Abril de 2006. Sou estudante de <strong>Engenharia de Software</strong> e um dos alunos da <strong>42 Luanda</strong> — uma das escolas de programação mais exigentes e inovadoras do planeta.',
      'about.p2': 'O que me move é perceber <strong>como as coisas funcionam por dentro</strong>. Não me interessa apenas escrever código que funciona — quero saber porquê funciona, o que acontece na memória, como o sistema operativo gere os processos, como os bits viajam pela rede.',
      'about.p3': 'Em Junho de 2026 concluí o tronco comum da 42 com nível 10.96 — entre um motor 3D de raycasting, um servidor IRC em C++98, uma infra Docker completa, threads e mutex para evitar deadlocks, e um web app fullstack em tempo real. A 42 não tem professores — aprendes ou não aprendes.',
      'about.cta': 'Vamos conversar →',

      // Skills
      'skills.label': 'Competências',
      'skills.heading': 'Stack técnica',
      'skills.intro': 'Tecnologias que utilizo no dia-a-dia, organizadas por camada de trabalho.',
      'skills.group.languages': 'Linguagens',
      'skills.group.systems': 'Sistemas & redes',
      'skills.group.cloud': 'Cloud & DevOps',
      'skills.group.web': 'Web & dados',
      'skills.group.ai': 'IA & tooling',

      // Work
      'work.label': 'Projectos',
      'work.heading': 'Trabalho seleccionado',
      'work.all': 'Ver tudo →',
      'work.empty': 'Sem projectos para mostrar.',

      // Journey
      'journey.label': 'Percurso na 42',
      'journey.heading.l1': 'Common',
      'journey.heading.l2': 'Core',
      'journey.heading.l3': '100%.',
      'journey.meta.l1': 'Seleccionado em Novembro 2023.',
      'journey.meta.l2': 'Início do currículo: 13 de Maio de 2024.',
      'journey.meta.l3': 'Nível actual: <strong>10.96 / 21</strong>.',
      'journey.meta.l4': 'Estado: 42 Advanced part.',
      'journey.level.current': 'Nível actual',
      'journey.bar.cc': 'Common Core',
      'journey.bar.cpp': 'CPP Modules (00–09)',
      'journey.bar.exams': 'Exam Ranks (02–06)',

      // Certificações
      'certs.label': 'Certificações',
      'certs.heading': 'Credenciais',
      'certs.intro': 'Cursos e certificações que complementam o currículo prático da 42.',
      'certs.code': 'Credencial',
      'certs.issued': 'Emitida em',
      'certs.skills': 'Competências',

      // Contact
      'contact.label': 'Contacto',
      'contact.heading.l1': 'Vamos',
      'contact.heading.l2': 'trabalhar',
      'contact.heading.l3': 'juntos?',
      'contact.form.name': 'Nome',
      'contact.form.name.ph': 'O teu nome',
      'contact.form.email': 'Email',
      'contact.form.email.ph': 'teu@email.com',
      'contact.form.message': 'Mensagem',
      'contact.form.message.ph': 'Olá Edgar...',
      'contact.form.submit': 'Enviar mensagem',
      'contact.form.sending': 'A enviar...',
      'contact.form.ok': 'Mensagem enviada. Obrigado pelo contacto.',
      'contact.form.error.generic': 'Não foi possível enviar a mensagem. Tenta novamente.',
      'contact.form.error.config': 'Envio de email ainda não configurado no servidor.',

      // Footer
      'footer.copy': '© 2026 — Luanda, Angola',
      'footer.back': 'Voltar ao topo ↑',
    },

    en: {
      // Meta
      'meta.title': 'Edgar Gomes — Software Engineer',
      'meta.description': 'Software engineer from 42 Luanda. C, C++, Unix systems, Docker, cloud and AI.',

      // Nav
      'nav.about': 'About',
      'nav.work': 'Work',
      'nav.journey': 'Journey',
      'nav.skills': 'Skills',
      'nav.certs': 'Certifications',
      'nav.contact': 'Contact',
      'nav.status': 'Available',
      'nav.openMenu': 'Open menu',
      'nav.closeMenu': 'Close menu',
      'nav.toggleTheme.toDark': 'Switch to dark theme',
      'nav.toggleTheme.toLight': 'Switch to light theme',
      'nav.toggleLang': 'Switch to Portuguese',
      'nav.lang.short': 'PT',

      // Skip
      'skip.content': 'Skip to content',

      // Hero
      'hero.eyebrow': 'Software Engineer — 42 Luanda — Uíge, Angola',
      'hero.line1': 'Edgar',
      'hero.line2': 'Gomes.',
      'hero.desc': 'I build software from the <strong>foundations up</strong>.<br><strong>C, C++, Unix systems</strong> — code that works from the inside.<br>Level <strong>10.96</strong> at 42 Luanda · 42 Advanced.',
      'hero.scroll': 'Scroll to explore',
      'hero.cta.work': 'See work',

      // Info row
      'info.level': 'Current level at 42',
      'info.cc': 'Common Core completed',
      'info.projects': 'Validated projects',
      'info.hours': 'Hours of code',

      // About
      'about.label': 'About me',
      'about.heading.l1': 'Software engineer',
      'about.heading.l2': 'in constant',
      'about.heading.l3': 'construction.',
      'about.photo.alt': 'Portrait of Edgar Gomes',
      'about.p1': 'I was born in <strong>Uíge, Angola</strong> on April 4, 2006. I am a <strong>Software Engineering</strong> student and one of the learners at <strong>42 Luanda</strong> — one of the most demanding and innovative programming schools on the planet.',
      'about.p2': 'What drives me is understanding <strong>how things work from the inside</strong>. I do not just want code that works — I want to know why it works, what happens in memory, how the OS manages processes, how bits travel across a network.',
      'about.p3': 'In June 2026 I completed the 42 common core at level 10.96 — among other things, a 3D raycasting engine, an IRC server in C++98, a full Docker infrastructure, threads and mutexes to avoid deadlocks, and a full real-time web app. 42 has no teachers — you learn or you do not.',
      'about.cta': "Let's talk →",

      // Skills
      'skills.label': 'Skills',
      'skills.heading': 'Tech stack',
      'skills.intro': 'Technologies I use day to day, organised by layer of work.',
      'skills.group.languages': 'Languages',
      'skills.group.systems': 'Systems & networking',
      'skills.group.cloud': 'Cloud & DevOps',
      'skills.group.web': 'Web & data',
      'skills.group.ai': 'AI & tooling',

      // Work
      'work.label': 'Projects',
      'work.heading': 'Selected work',
      'work.all': 'See all →',
      'work.empty': 'No projects to show.',

      // Journey
      'journey.label': '42 journey',
      'journey.heading.l1': 'Common',
      'journey.heading.l2': 'Core',
      'journey.heading.l3': '100%.',
      'journey.meta.l1': 'Selected in November 2023.',
      'journey.meta.l2': 'Curriculum start: May 13, 2024.',
      'journey.meta.l3': 'Current level: <strong>10.96 / 21</strong>.',
      'journey.meta.l4': 'Status: 42 Advanced part.',
      'journey.level.current': 'Current level',
      'journey.bar.cc': 'Common Core',
      'journey.bar.cpp': 'CPP Modules (00–09)',
      'journey.bar.exams': 'Exam Ranks (02–06)',

      // Certificações
      'certs.label': 'Certifications',
      'certs.heading': 'Credentials',
      'certs.intro': 'Courses and certifications that complement the hands-on 42 curriculum.',
      'certs.code': 'Credential',
      'certs.issued': 'Issued',
      'certs.skills': 'Skills',

      // Contact
      'contact.label': 'Contact',
      'contact.heading.l1': "Let's",
      'contact.heading.l2': 'work',
      'contact.heading.l3': 'together?',
      'contact.form.name': 'Name',
      'contact.form.name.ph': 'Your name',
      'contact.form.email': 'Email',
      'contact.form.email.ph': 'you@email.com',
      'contact.form.message': 'Message',
      'contact.form.message.ph': 'Hello Edgar...',
      'contact.form.submit': 'Send message',
      'contact.form.sending': 'Sending...',
      'contact.form.ok': 'Message sent. Thanks for getting in touch.',
      'contact.form.error.generic': 'Could not send the message. Please try again.',
      'contact.form.error.config': 'Email sending is not configured on the server yet.',

      // Footer
      'footer.copy': '© 2026 — Luanda, Angola',
      'footer.back': 'Back to top ↑',
    },
  };

  let active = 'pt';

  function setLang(lang) {
    if (dict[lang]) active = lang;
  }

  function getLang() {
    return active;
  }

  function t(key) {
    return (dict[active] && dict[active][key]) || (dict.en[key]) || key;
  }

  return { setLang, getLang, t, dict };
})();
