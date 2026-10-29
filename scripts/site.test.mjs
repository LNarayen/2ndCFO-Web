import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path,root),'utf8');
const pages = JSON.parse(read('content/pages.json'));
const home = read('index.html');
const sitemap = read('sitemap.xml');
const titles = new Set(), descriptions = new Set();
for(const p of pages) test(p.path,()=>{
  const html = read(p.path+'/index.html');
  assert.equal((html.match(/<h1>/g)||[]).length,1);
  assert.ok(html.includes(`href="https://2ndcfo.com/${p.path}/"`));
  assert.ok(html.includes(`property="og:url" content="https://2ndcfo.com/${p.path}/"`));
  assert.ok(sitemap.includes(`<loc>https://2ndcfo.com/${p.path}/</loc>`));
  assert.ok(home.includes(`href="/${p.path}/"`),'homepage must link to route');
  assert.ok(!titles.has(p.title)); titles.add(p.title);
  assert.ok(!descriptions.has(p.description)); descriptions.add(p.description);
  assert.ok(html.replace(/<[^>]+>/g,' ').split(/\s+/).length>450,'substantive page content');
  assert.ok(html.includes('href="/#contact"'));
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema['@graph'][1].itemListElement[2].item,`https://2ndcfo.com/${p.path}/`);
  for(const [,href] of html.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)) {
    if(!href.startsWith('/')) continue;
    const path=href.split('#')[0];
    assert.ok(existsSync(new URL(path==='/'?'index.html':path.slice(1)+(path.endsWith('/')?'index.html':''),root)),`broken link ${href}`);
  }
});
test('crawl and contact configuration',()=>{
  assert.equal((sitemap.match(/<loc>/g)||[]).length,7);
  assert.ok(read('robots.txt').includes('Sitemap: https://2ndcfo.com/sitemap.xml'));
  assert.ok(home.includes('https://formspree.io/f/xqeyqgwb'));
  assert.ok(!home.includes('href="#construction"'));
});
