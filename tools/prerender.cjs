/** Refresh the default Chinese HTML snapshot without any dependencies. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const elements = new Map();
const element = selector => {
  if (!elements.has(selector)) elements.set(selector, {
    innerHTML: '', textContent: '', content: '', href: '',
    getAttribute: () => 'false', setAttribute: () => {},
    classList: { toggle: () => {}, add: () => {}, remove: () => {} }
  });
  return elements.get(selector);
};
const sandbox = {
  window: { addEventListener: () => {} },
  document: { documentElement: {}, querySelector: element, querySelectorAll: () => [], addEventListener: () => {} },
  location: { search: '?lang=zh', hash: '' },
  localStorage: { getItem: () => null },
  URLSearchParams, URL, Date, setTimeout, clearTimeout
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'assets/site-content.js'), 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'assets/site.js'), 'utf8'), sandbox);
let sections = element('#sections').innerHTML;
sections = sections.replace('<div id="publication-list"></div>', `<div id="publication-list">${element('#publication-list').innerHTML}</div>`);
sections = sections.replace('<span id="publication-count" class="result-count" aria-live="polite"></span>', `<span id="publication-count" class="result-count" aria-live="polite">${element('#publication-count').textContent}</span>`);
const entry = path.join(root, 'index.html');
let html = fs.readFileSync(entry, 'utf8');
if (!html.includes('<!-- CONTENT:START -->') || !html.includes('<!-- CONTENT:END -->')) throw new Error('Missing static content markers');
html = html.replace(/<!-- CONTENT:START -->[\s\S]*?<!-- CONTENT:END -->/, `<!-- CONTENT:START -->\n    <div id="sections">${sections}</div>\n    <!-- CONTENT:END -->`);
html = html.replace(/<div class="hero-copy">[\s\S]*?<figure class="portrait">/, `<div class="hero-copy">${element('.hero-copy').innerHTML}</div>\n      <figure class="portrait">`);
fs.writeFileSync(entry, html, 'utf8');
console.log('Updated the Chinese static snapshot in index.html.');
