import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { Liquid } from 'liquidjs';
import { parse as parseYaml } from 'yaml';

// Render the original academic-homepage Liquid layouts and includes.
const profile = JSON.parse(readFileSync(new URL('profile.json', import.meta.url), 'utf8'));
const sources = JSON.parse(readFileSync(new URL('template-sources.json', import.meta.url), 'utf8'));
const renderRoot = mkdtempSync(path.join(tmpdir(), 'haopeng-homepage-'));
for (const [name, source] of Object.entries(sources)) {
  const target = path.join(renderRoot, name);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, source);
}
const liquid = new Liquid({ root: path.join(renderRoot, '_includes'), jekyllInclude: true, strictFilters: true });
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
liquid.registerFilter('relative_url', value => {
  if (!value) return '';
  if (/^https?:/.test(value)) return value;
  if (value.startsWith('/assets/')) return '/' + value.split('/').pop().replace('global.css', 'styles.css');
  if (['publications','blog','showcase','index_layout2'].includes(value.replace(/^\//,''))) return '/' + value.replace(/^\//,'') + '.html';
  return value.startsWith('/') ? value : '/' + value;
});
liquid.registerFilter('encode_email', value => [...(value || '')].map(char => '&#' + char.codePointAt(0) + ';').join(''));
liquid.registerFilter('group_by_exp', (items, variable, expression) => {
  const groups = new Map();
  for (const item of items || []) {
    const key = liquid.evalValueSync(expression, { [variable]: item });
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return [...groups].map(([name, items]) => ({ name, items }));
});
const site = {
  baseurl: '',
  data: {
    profile: {
      primary_name: profile.name, secondary_name: profile.chineseName, navbar_name: profile.name,
      positions: [{name: profile.affiliation}], email: profile.email || '', github: profile.github,
      gscholar: profile.scholar || null, portrait_url: profile.portrait, portrait_caption: profile.name,
      short_bio_text_justify: false,
      short_bio: `<p>${escapeHtml(profile.bio)}</p><p>Research interests: ${profile.interests.map(escapeHtml).join('; ')}.</p>`
    },
    authors: { [profile.name]: { bold: true } },
    navigation: { pages: [
      {name:'Home',url:'/'}, {name:'Home (Layout 2)',url:'/index_layout2.html'},
      {name:'Publications',url:'/publications.html'}, {name:'Blog',url:'/blog.html'}, {name:'Showcase',url:'/showcase.html'}
    ]},
    display: {
      homepage: { show_experience: false, show_news: false, show_selected_publications: true },
      footer_text: '<a href="https://github.com/luost26/academic-homepage" target="_blank"><i class="fas fa-pencil-ruler"></i> academic-homepage</a>'
    }
  },
  publications: profile.publications.map(p => ({
    ...p, id: p.method, date: `${p.year}-01-01`, selected: true, pub: p.venue, pub_date: String(p.year), abstract: p.summary,
    links: { Paper: p.paper, Code: p.code, ...(p.doi ? { DOI: 'https://doi.org/' + p.doi } : {}) }
  })),
  posts: [], news: [], showcase: []
};
for (const name of ['index.html','index_layout2.html','publications.html','blog.html','showcase.html']) {
  const [, frontmatter, body] = sources[name].match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const page = parseYaml(frontmatter);
  let content = liquid.parseAndRenderSync(body, { site, page });
  if (name === 'blog.html') content += '<div class="card border-0 shadow-sm bg-white"><div class="card-body p-4 text-muted">No blog posts yet.</div></div>';
  if (name === 'showcase.html') content += '<div class="card border-0 shadow-sm bg-white"><div class="card-body p-4 text-muted">No showcase entries yet.</div></div>';
  let html = liquid.parseAndRenderSync(sources['_layouts/default.html'], { site, page, content });
  html = html.replace('<title>', '<meta name="description" content="' + escapeHtml(profile.bio) + '">\n    <title>');
  writeFileSync(new URL(name, import.meta.url), html);
}
writeFileSync(new URL('projects.html', import.meta.url), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=publications.html"><title>Research code — Hao Peng</title></head><body><a href="publications.html">Publications and research code</a></body></html>');
console.log('Rendered five original template pages with personal content and figures.');
