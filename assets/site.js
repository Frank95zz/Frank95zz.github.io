(() => {
  'use strict';
  const content = window.SITE_CONTENT;
  const query = new URLSearchParams(location.search);
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('yanqi-site-language'); } catch (_) { /* Optional preference. */ }
  let language = ['zh', 'en'].includes(query.get('lang')) ? query.get('lang') : (savedLanguage === 'en' ? 'en' : 'zh');
  let activeFilter = 'all';
  let toastTimer;
  const ext = 'target="_blank" rel="noopener noreferrer"';
  const tags = items => `<div class="tags">${items.map(item => `<span>${item}</span>`).join('')}</div>`;
  const heading = (eyebrow, title, intro = '') => `<div class="section-heading"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div>${intro ? `<p class="section-intro">${intro}</p>` : ''}</div>`;

  function renderPapers() {
    const c = content[language];
    const papers = c.papers.filter(paper => activeFilter === 'all' || paper.category === activeFilter);
    document.querySelector('#publication-list').innerHTML = papers.map(paper => `<article class="publication">
      <a class="paper-visual ${paper.image ? '' : 'paper-visual-search'}" href="${paper.url}" ${ext} aria-label="${paper.title}">
        ${paper.image ? `<img src="${paper.image}" alt="${paper.imageAlt}" width="1000" height="553" loading="lazy">` : `<div class="search-illustration" aria-hidden="true"><svg viewBox="0 0 260 150" fill="none"><path d="M20 20H240M20 50H240M20 80H240M20 110H240M20 140H240M20 20V140M60 20V140M100 20V140M140 20V140M180 20V140M220 20V140" stroke="currentColor" opacity=".10"/><rect x="96" y="50" width="48" height="60" rx="3" fill="currentColor" opacity=".12"/><path d="M40 120L70 120L70 30L168 30L168 76L220 76" stroke="currentColor" stroke-width="2.5" stroke-dasharray="5 5"/><circle cx="40" cy="120" r="6" fill="currentColor"/><circle cx="220" cy="76" r="9" stroke="currentColor" stroke-width="2"/><circle cx="220" cy="76" r="3" fill="currentColor"/></svg><span>SEARCH & PLANNING</span></div>`}
      </a>
      <div class="paper-content"><div class="paper-meta"><span>${paper.venue}</span><span>${paper.year}</span></div><h3><a href="${paper.url}" ${ext}>${paper.title}</a></h3><p class="authors">${paper.authors}</p>${tags(paper.tags)}<div class="paper-actions"><a href="${paper.url}" ${ext}>${paper.label} <span aria-hidden="true">↗</span></a><button type="button" class="text-button" data-bibtex="${paper.id}">${c.ui.bibtex} <span aria-hidden="true">⧉</span></button></div><details class="paper-summary"><summary>${c.ui.summary}</summary><p>${paper.summary}</p></details></div>
    </article>`).join('') || `<p>${c.ui.empty}</p>`;
    document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter)));
    const countLabel = language === 'en' && papers.length === 1 ? 'publication' : c.ui.publicationCount;
    document.querySelector('#publication-count').textContent = `${papers.length} ${countLabel}`;
  }

  function render() {
    const c = content[language];
    const u = c.ui;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = c.title;
    document.querySelector('meta[name="description"]').content = c.description;
    document.querySelector('meta[property="og:title"]').content = c.title;
    document.querySelector('meta[property="og:description"]').content = c.description;
    document.querySelector('meta[property="og:locale"]').content = language === 'zh' ? 'zh_CN' : 'en_US';
    document.querySelector('meta[property="og:url"]').content = `https://frank95zz.github.io/${language === 'en' ? '?lang=en' : ''}`;
    document.querySelector('link[rel="canonical"]').href = `https://frank95zz.github.io/${language === 'en' ? '?lang=en' : ''}`;
    document.querySelectorAll('[data-ui]').forEach(element => { element.textContent = u[element.dataset.ui]; });
    document.querySelector('.navigation').setAttribute('aria-label', u.navigation);
    document.querySelector('.language-switch').setAttribute('aria-label', u.language);
    document.querySelector('.wordmark').setAttribute('aria-label', u.home);
    document.querySelector('.menu-toggle').setAttribute('aria-label', document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true' ? u.menuClose : u.menuOpen);
    document.querySelectorAll('[data-lang]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.lang === language)); });
    document.querySelector('.hero-copy').innerHTML = `<p class="eyebrow">${c.hero.eyebrow}</p><h1>${c.hero.name}<span lang="${language === 'zh' ? 'en' : 'zh-CN'}">${c.hero.otherName}</span></h1><p class="hero-role">${c.hero.role}</p><p class="hero-description">${c.hero.description}</p><p class="hero-note">${c.hero.note}</p><div class="hero-links"><a href="https://scholar.google.com/citations?user=dgjReZ4AAAAJ" ${ext}>Google Scholar <span aria-hidden="true">↗</span></a><a href="https://github.com/Frank95zz" ${ext}>GitHub <span aria-hidden="true">↗</span></a><a href="mailto:fengyanqi@sjtu.edu.cn">${u.email} <span aria-hidden="true">↗</span></a></div><div class="cv-links"><span>${u.cvLabel}</span><a href="cv/cv-zh.pdf" lang="zh-CN" ${ext}>中文 PDF <span aria-hidden="true">↓</span></a><a href="cv/cv-en.pdf" lang="en" ${ext}>English PDF <span aria-hidden="true">↓</span></a></div>`;
    document.querySelector('.portrait img').alt = u.portraitAlt;
    document.querySelector('.portrait figcaption').innerHTML = `<span>YANQI FENG</span><span>${u.location}</span>`;

    document.querySelector('#sections').innerHTML = `
      <section class="interests-strip section-shell" aria-label="${u.researchInterest}"><span class="micro-label">${u.researchInterest}</span><div>${c.hero.interests.map(item => `<span>${item}</span>`).join('<span class="interest-divider" aria-hidden="true">/</span>')}</div><a href="#research" aria-label="${u.navResearch}"><span aria-hidden="true">↓</span></a></section>
      <section class="news-section section-shell" aria-labelledby="news-heading"><div><p class="eyebrow">${u.newsEyebrow}</p><h2 id="news-heading">${u.newsTitle}</h2></div><ol class="news-list">${c.news.map(item => `<li><time datetime="${item[0].replace('.', '-')}">${item[0]}</time><p>${item[1]}</p></li>`).join('')}</ol></section>
      <section id="publications" class="section-shell content-section">${heading(u.publicationsEyebrow, u.publicationsTitle, u.publicationsIntro)}<div class="publication-toolbar"><div class="filters" role="group" aria-label="${u.filterLabel}">${['all', 'underwater', 'planning'].map((filter, index) => `<button type="button" data-filter="${filter}" aria-pressed="${activeFilter === filter}">${u.filters[index]}</button>`).join('')}</div><span id="publication-count" class="result-count" aria-live="polite"></span></div><div id="publication-list"></div><a class="understated-link" href="https://scholar.google.com/citations?user=dgjReZ4AAAAJ" ${ext}>${u.scholarAll} <span aria-hidden="true">↗</span></a></section>
      <section id="research" class="research-wrap"><div class="section-shell content-section">${heading(u.researchEyebrow, u.researchTitle, u.researchIntro)}<div class="research-grid">${c.research.map(item => `<article class="research-card"><div class="research-card-top"><span class="research-number">${item.number}</span><span>${item.period}</span></div><h3>${item.title}</h3><p class="research-subtitle">${item.subtitle}</p><p class="research-description">${item.description}</p><div class="research-card-bottom">${tags(item.tags)}<p>${u.advisor}：${item.advisor}<br>${item.role}</p></div></article>`).join('')}</div></div></section>
      <section id="projects" class="section-shell content-section">${heading(u.projectsEyebrow, u.projectsTitle)}<article class="project-feature"><figure class="project-image"><img src="assets/media/finsrov-model.png" alt="${c.project.imageAlt}" width="1152" height="723" loading="lazy"><figcaption>FinsROV · IWIN-FINS</figcaption></figure><div class="project-copy"><p class="eyebrow">${c.project.kicker}</p><h3>${c.project.title}</h3><p>${c.project.description}</p><div class="contribution"><span class="micro-label">${u.contribution}</span><p>${c.project.contribution}</p></div>${tags(c.project.tags)}<div class="project-links"><a class="button" href="https://github.com/IWIN-FINS/FinsROV-An-Underwater-Camera-Based-Multi-Robot-Platform" ${ext}>${u.viewProject} <span aria-hidden="true">↗</span></a><a href="https://www.bilibili.com/video/BV13vcvzgEv3/" ${ext}>${u.video} <span aria-hidden="true">↗</span></a></div></div></article></section>
      <section id="experience" class="section-shell content-section experience-section">${heading(u.experienceEyebrow, u.experienceTitle)}<div class="experience-layout"><div class="education-column"><h3 class="column-heading">${u.education}</h3><div class="education-timeline">${c.education.map(item => `<article class="education-item"><span class="date">${item.period}</span><h4>${item.title}</h4><p class="education-subtitle">${item.subtitle}</p><p>${item.detail}</p></article>`).join('')}</div></div><div class="competitions-column"><h3 class="column-heading">${u.competitions}</h3>${c.competitions.map(item => `<article class="competition-item"><div class="competition-meta"><span class="date">${item.date}</span><span>${item.role}</span></div><h4>${item.title}</h4><p class="competition-award">${item.label}</p><p>${item.text}</p></article>`).join('')}</div></div></section>
      <section class="section-shell honors-skills"><div class="honors-column"><h2>${u.honorsTitle}</h2><ul class="honors-list">${c.honors.map(item => `<li><span class="date">${item[0]}</span><div><strong>${item[1]}</strong><p>${item[2]}</p></div></li>`).join('')}</ul></div><div class="skills-column"><h2>${u.skillsTitle}</h2><dl>${c.skills.map(item => `<dt>${item[0]}</dt><dd>${item[1]}</dd>`).join('')}</dl><a class="understated-link" href="cv/cv-${language}.pdf" ${ext}>${u.cvLabel} <span aria-hidden="true">↓</span></a></div></section>
      <section id="contact" class="contact-wrap"><div class="section-shell contact-section"><div><p class="eyebrow">CONTACT</p><h2>${u.contactTitle}</h2><p>${u.contactIntro}</p></div><div class="contact-actions"><a class="contact-email" href="mailto:fengyanqi@sjtu.edu.cn">fengyanqi@sjtu.edu.cn <span aria-hidden="true">↗</span></a><span>${u.location}</span><div class="contact-social"><a href="https://scholar.google.com/citations?user=dgjReZ4AAAAJ" ${ext}>Google Scholar ↗</a><a href="https://github.com/Frank95zz" ${ext}>GitHub ↗</a></div></div></div></section>`;
    document.querySelector('.citation-help').textContent = u.manualCopy;
    document.querySelector('.dialog-header button').setAttribute('aria-label', u.close);
    document.querySelector('.citation-done').textContent = u.done;
    document.querySelector('#copyright-year').textContent = String(new Date().getFullYear());
    renderPapers();
  }

  function setMenu(isOpen) {
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', String(isOpen));
    document.querySelector('.menu-toggle').setAttribute('aria-label', content[language].ui[isOpen ? 'menuClose' : 'menuOpen']);
    document.querySelector('.navigation').classList.toggle('is-open', isOpen);
  }

  function announce(message) {
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  async function copyCitation(id) {
    const citation = window.SITE_BIBTEX[id];
    if (!citation) return;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(citation);
      announce(content[language].ui.copied);
      return;
    } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = citation;
      textarea.className = 'clipboard-helper';
      document.body.append(textarea);
      textarea.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (_) { /* Manual dialog below. */ }
      textarea.remove();
      if (copied) { announce(content[language].ui.copied); return; }
      const dialog = document.querySelector('.citation-dialog');
      dialog.querySelector('textarea').value = citation;
      dialog.showModal();
      dialog.querySelector('textarea').focus();
      dialog.querySelector('textarea').select();
    }
  }

  document.addEventListener('click', event => {
    const langButton = event.target.closest('[data-lang]');
    if (langButton) {
      language = langButton.dataset.lang;
      try { localStorage.setItem('yanqi-site-language', language); } catch (_) { /* Storage is optional. */ }
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(null, '', url);
      render();
      setMenu(false);
      return;
    }
    const filterButton = event.target.closest('[data-filter]');
    if (filterButton) { activeFilter = filterButton.dataset.filter; renderPapers(); }
    const citationButton = event.target.closest('[data-bibtex]');
    if (citationButton) copyCitation(citationButton.dataset.bibtex);
    if (event.target.closest('.menu-toggle')) setMenu(document.querySelector('.menu-toggle').getAttribute('aria-expanded') !== 'true');
    if (event.target.closest('.navigation a')) setMenu(false);
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      document.querySelector('.menu-toggle').focus();
    }
  });
  window.addEventListener('popstate', () => {
    const next = new URLSearchParams(location.search).get('lang');
    if (next === 'zh' || next === 'en') { language = next; render(); }
  });
  render();
  // A direct hash link should scroll after the corresponding section is rendered.
  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1));
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }
})();
