import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const pages = JSON.parse(readFileSync(new URL('../content/pages.json', import.meta.url)));
const root = new URL('../', import.meta.url);
const origin = 'https://2ndcfo.com';
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels = ['Bookkeeping', 'Financial intelligence', 'Fractional CFO', 'Law firms', 'Specialty contractors', 'HVAC, plumbing & electrical'];
const link = (p, i) => `<a href="/${p.path}/">${escape(labels[i])}</a>`;
import { navigation } from './navigation.mjs';
const homePath = new URL('index.html', root);
let home = readFileSync(homePath, 'utf8');
home = home.replace(/<!-- SHARED NAV -->[\s\S]*?<\/nav>(?:<\/header>)?/, '<!-- SHARED NAV -->\n'+navigation);
if (!home.includes('src="/navigation.js"')) home = home.replace('</body>', '<script src="/navigation.js" defer></script>\n</body>');
if (!home.includes('href="/navigation.css"')) home = home.replace('<link rel="stylesheet" href="calm.css">', '<link rel="stylesheet" href="calm.css">\n<link rel="stylesheet" href="/navigation.css">');
writeFileSync(homePath, home);
for (const page of pages) {
  const canonical = `${origin}/${page.path}/`;
  const structured = {'@context':'https://schema.org','@graph':[
    {'@type':'WebPage','@id':canonical,name:page.title,url:canonical,description:page.description,isPartOf:{'@id':`${origin}/#website`}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'},{'@type':'ListItem',position:2,name:page.group,item:`${origin}/#${page.group.toLowerCase()}`},{'@type':'ListItem',position:3,name:labels[pages.indexOf(page)],item:canonical}]}
  ]};
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><link rel="stylesheet" href="/pages.css"><link rel="stylesheet" href="/navigation.css"><script src="/navigation.js" defer></script><script type="application/ld+json">${JSON.stringify(structured).replace(/</g,'\\u003c')}</script></head>
<body class="route-page"><a class="skip" href="#main">Skip to content</a>${navigation}<main id="main"><section class="hero"><div class="wrap"><div class="breadcrumb"><a href="/">Home</a> / <a href="/#${page.group.toLowerCase()}">${page.group}</a> / ${escape(labels[pages.indexOf(page)])}</div><p class="eyebrow">${page.group} · 2ndCFO</p><h1>${escape(page.heading)}</h1><p class="intro">${escape(page.intro)}</p><a class="button" href="/#contact">Discuss your business</a></div></section><div class="wrap body-grid"><article>${page.sections.map((s,i)=>`<section aria-labelledby="section-${i}"><h2 id="section-${i}">${escape(s.heading)}</h2><p>${escape(s.text)}</p>${s.items?`<ul>${s.items.map(item=>`<li>${escape(item)}</li>`).join('')}</ul>`:''}</section>`).join('')}<aside class="example"><p class="eyebrow">Illustrative example</p><p>${escape(page.example)}</p></aside><section><h2>Common questions</h2>${page.faq.map(([q,a])=>`<details class="faq"><summary>${escape(q)}</summary><p>${escape(a)}</p></details>`).join('')}</section></article><aside class="related"><h2>Explore related support</h2><ul>${page.related.map(path=>{const i=pages.findIndex(p=>p.path===path);return `<li>${link(pages[i],i)}</li>`;}).join('')}</ul><p>Start with the question you need answered. Confirm the available records, product capabilities, and any separate service scope.</p><a href="/#contact">Start a conversation →</a></aside></div><section class="cta"><div class="wrap"><p class="eyebrow">Your books. Your story. Your next move.</p><h2>What do you need your numbers to explain?</h2><p>Serving business owners in Redmond, Bellevue, Kirkland, and Seattle. Discuss your current records and priorities so we can define the right scope.</p><a class="button" href="/#contact">Talk with 2ndCFO</a></div></section></main><footer><div class="wrap footer-grid"><div><a class="brand" href="/">2nd<span>CFO</span></a><p>Reliable records. Business-focused understanding.</p><a href="/#contact">Contact 2ndCFO</a></div><div><h2>Services</h2>${pages.slice(0,3).map((p,i)=>link(p,i)).join('')}</div><div><h2>Industries</h2>${pages.slice(3).map((p,i)=>link(p,i+3)).join('')}</div></div></footer></body></html>`;
  const dir = new URL(page.path+'/',root); mkdirSync(dir,{recursive:true}); writeFileSync(new URL('index.html',dir),html);
}
writeFileSync(new URL('sitemap.xml',root),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['/',...pages.map(p=>`/${p.path}/`)].map(path=>`  <url><loc>${origin}${path}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(new URL('robots.txt',root),'User-agent: *\nAllow: /\n\nSitemap: https://2ndcfo.com/sitemap.xml\n');
console.log(`Built ${pages.length} pages and sitemap.`);
// Publish only site assets, keeping source content, scripts, and tests out of hosting.
const { rmSync, cpSync } = await import('node:fs');
const dist = new URL('dist/', root);
rmSync(dist,{recursive:true,force:true}); mkdirSync(dist);
for(const file of ['index.html','calm.css','pages.css','navigation.css','navigation.js','sitemap.xml','robots.txt','services','industries']) cpSync(new URL(file,root),new URL(file,dist),{recursive:true});
