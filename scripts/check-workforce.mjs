import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { loadTypeScript } from './i18n-shared.mjs';

const { workforceRoleDetails: roles } = await loadTypeScript('src/data/workforce-role-details.ts');
const { workforce: index } = JSON.parse(readFileSync('src/data/recruitment/workforce.json', 'utf8'));
const { enquiryFields, formatWorkforceEnquiry, workforceMailto } = await loadTypeScript('src/lib/workforce-enquiry.ts');
assert.equal(roles.length, 18);
assert.deepEqual(roles.map(role => role.title), index.map(role => role.title));
assert.equal(new Set(roles.map(role => role.slug)).size, 18);
const industrySlugs = [...readFileSync('src/data/industries.ts', 'utf8').matchAll(/slug: "([^"]+)"/g)].map(match => match[1]);
const slugs = new Set(roles.map(role => role.slug));
const flatten = value => typeof value === 'string' ? [value] : Array.isArray(value) ? value.flatMap(flatten) : Object.values(value).flatMap(flatten);
const paragraphs = new Set();
for (const role of roles) {
  for (const key of ['overview', 'qualificationGuidance', 'experienceGuidance', 'equipmentEnvironment']) assert.ok(role[key].length > 100, `${role.slug}: ${key}`);
  for (const key of ['responsibilities', 'competencyGroups', 'safetyItems', 'hiringConsiderations', 'faqs']) assert.ok(role[key].length >= 3, `${role.slug}: ${key}`);
  assert.ok(role.workforceLevels.length >= 2);
  assert.ok(role.industrySlugs.length && role.industrySlugs.every(slug => industrySlugs.includes(slug)));
  assert.ok(role.relatedSlugs.length && role.relatedSlugs.every(slug => slugs.has(slug) && slug !== role.slug));
  assert.ok(role.sources.length && role.sources.every(source => new URL(source.url).protocol === 'https:'));
  const { sources, relatedSlugs, industrySlugs: ignored, ...content } = role;
  void sources; void relatedSlugs; void ignored;
  const words = flatten(content).join(' ').split(/\s+/).length;
  assert.ok(words >= 450, `${role.slug}: only ${words} words`);
  for (const paragraph of flatten(content).filter(text => text.length > 100)) {
    assert.ok(!paragraphs.has(paragraph), `${role.slug}: repeated long paragraph`);
    paragraphs.add(paragraph);
  }
}
const labels = Object.fromEntries(enquiryFields.map(key => [key, key.toUpperCase()]));
const values = Object.fromEntries(enquiryFields.map(key => [key, '']));
Object.assign(values, { company: '  A&B #1  ', person: 'José शर्मा', email: 'buyer@example.com', role: 'Welder', details: 'Line one\nLine two? &bcc=attacker@example.com' });
const body = formatWorkforceEnquiry(values, labels);
assert.ok(body.includes('COMPANY: A&B #1'));
assert.ok(body.includes('COUNTRY: —'));
assert.ok(body.includes('José शर्मा'));
const href = workforceMailto('team@example.com', 'Hiring\r\nBcc: nobody@example.com', body);
const url = new URL(href);
assert.equal(url.protocol, 'mailto:');
assert.equal(url.pathname, 'team@example.com');
assert.equal(url.searchParams.get('body'), body);
assert.ok(!url.searchParams.get('subject').match(/[\r\n]/));
assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
for (const email of ['', 'not-an-email', 'team@example.com?bcc=bad@example.com', 'a@example.com,b@example.com', 'a@example.com\nBcc:b@example.com']) assert.equal(workforceMailto(email, '', ''), null);
assert.ok(workforceMailto('team@example.com', 'Long brief', '字'.repeat(4000)).length > 1800);
console.log('18 unique role guides, cross-links and email encoding checks passed.');

if (process.argv.includes('--export')) {
  const sitemap = readFileSync('out/sitemap.xml', 'utf8');
  const decode = text => text.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"');
  let checkedLinks = 0, checkedImages = 0;
  const routes = ['/workforce/', '/request-workforce/', ...roles.map(role => `/workforce/${role.slug}/`)];
  for (const route of routes) {
    const html = readFileSync(path.join('out', route, 'index.html'), 'utf8');
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${route}: one h1`);
    assert.ok(html.includes('name="description"'));
    assert.ok(html.includes('rel="canonical"'));
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const href = decode(match[1]);
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const url = new URL(href, 'https://example.com');
      const target = path.join('out', decodeURIComponent(url.pathname));
      assert.ok(existsSync(target) || existsSync(path.join(target, 'index.html')), `${route}: broken link ${href}`);
      checkedLinks++;
    }
    for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
      const src = decode(match[1]);
      if (src.startsWith('/')) { assert.ok(existsSync(path.join('out', src)), `${route}: missing ${src}`); checkedImages++; }
    }
    const role = roles.find(role => route === `/workforce/${role.slug}/`);
    if (role) {
      assert.ok(sitemap.includes(`/workforce/${role.slug}/`));
      assert.ok(html.includes(`?role=${role.slug}`));
      assert.ok(html.includes(role.overview));
      assert.equal((html.match(/<details\b/g) || []).length >= role.faqs.length, true);
      for (const other of roles.filter(other => other.slug !== role.slug)) assert.ok(!html.includes(other.overview), `${route}: another full guide shipped`);
    }
  }
  console.log(`Static export verified: ${routes.length} routes, ${checkedLinks} local links, ${checkedImages} images; all role pages in sitemap.`);
}
