import ts from "typescript";
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const messages = new Map(), hints = new Map(), dynamic = [], raw = [], metadata = {};
const site = { name: "GlobalPath", legalName: "GlobalPath Overseas", tagline: "Indian Talent. Global Opportunities.", taglineHi: "भारतीय प्रतिभा। दुनिया भर में अवसर।", descriptor: "OVERSEAS" };
function value(node) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return value(node.expression);
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(value);
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.filter(ts.isPropertyAssignment).map(p => [p.name.getText().replace(/^["']|["']$/g, ""), value(p.initializer)]));
  if (ts.isCallExpression(node) && node.expression.getText() === "l") return { en: value(node.arguments[0]), hi: value(node.arguments[1]) };
  if (ts.isPropertyAccessExpression(node) && node.expression.getText() === "site") return site[node.name.text];
  if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "toUpperCase") return value(node.expression.expression)?.toUpperCase();
  if (ts.isTemplateExpression(node)) {
    let text = node.head.text;
    for (const span of node.templateSpans) { const part = value(span.expression); if (part === undefined) return undefined; text += part + span.literal.text; }
    return text;
  }
  return undefined;
}
function add(en, hi) {
  if (Array.isArray(en)) { en.forEach((item, index) => add(item, hi?.[index])); return; }
  if (typeof en !== "string" || !/[A-Za-z]/.test(en) || /^(https?:|\/|#|@\/)/.test(en)) return;
  messages.set(en, en);
  if (typeof hi === "string" && hi) hints.set(en, hi);
}
const excluded = /(?:locales\/(?:messages|generated)|responsive-images|image-sources)/;
for (const file of walk(path.join(root, "src")).filter(file => /\.(tsx?|json)$/.test(file) && !excluded.test(file))) {
  if (file.endsWith(".json")) continue;
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  function visit(node) {
    if (!file.endsWith("/job-category-guides.ts") && ts.isArrayLiteralExpression(node) && node.elements.length === 2) {
      const [english, hindi] = node.elements.map(value);
      if (typeof hindi === "string" && /[\u0900-\u097f]/.test(hindi)) add(english, hindi);
    }
    if (ts.isCallExpression(node) && ["t", "l", "describe"].includes(node.expression.getText(source))) {
      const [first, second] = node.arguments;
      if (first && ts.isConditionalExpression(first)) {
        add(value(first.whenTrue), second && ts.isConditionalExpression(second) ? value(second.whenTrue) : undefined, file);
        add(value(first.whenFalse), second && ts.isConditionalExpression(second) ? value(second.whenFalse) : undefined, file);
      } else if (value(first) !== undefined) add(value(first), value(second), file);
      else if (first && ts.isTemplateExpression(first)) dynamic.push({ file: path.relative(root, file), line: source.getLineAndCharacterOfPosition(node.pos).line + 1, text: node.getText(source) });
    }
    if (ts.isObjectLiteralExpression(node)) {
      const en = node.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(source).replace(/^["']|["']$/g, "") === "en");
      const hi = node.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(source).replace(/^["']|["']$/g, "") === "hi");
      if (en) add(value(en.initializer), hi && value(hi.initializer), file);
    }
    if (file.endsWith("/locales/en.ts") && (ts.isStringLiteral(node) || ts.isTemplateExpression(node) || ts.isCallExpression(node))) add(value(node), undefined, file);
    if (ts.isCallExpression(node) && node.expression.getText(source) === "pageMetadata") {
      const [title, description, route] = node.arguments.map(value);
      add(title); add(description);
      if (typeof route === "string" && typeof title === "string" && typeof description === "string") metadata[route] = { title, description };
    }
    if (file.endsWith("/official-sources.ts") && ts.isPropertyAssignment(node) && node.name.getText(source) === "label") add(value(node.initializer));
    if (ts.isJsxAttribute(node) && ["alt", "imageAlt", "aria-label", "placeholder", "title"].includes(node.name.getText(source)) && node.initializer && ts.isStringLiteral(node.initializer)) add(node.initializer.text);
    if (ts.isJsxText(node) && /[A-Za-z]{2}/.test(node.text)) raw.push({ file: path.relative(root, file), line: source.getLineAndCharacterOfPosition(node.pos).line + 1, text: node.text.trim() });
    ts.forEachChild(node, visit);
  }
  visit(source);
}
function declared(file, name) {
  const source = ts.createSourceFile(file, readFileSync(path.join(root, file), "utf8"), ts.ScriptTarget.Latest, true);
  let result;
  function visit(node) { if (ts.isVariableDeclaration(node) && node.name.getText(source) === name) result = value(node.initializer); ts.forEachChild(node, visit); }
  visit(source); return result;
}
const english = declared("src/locales/en.ts", "en"), hindi = declared("src/locales/hi.ts", "hi");
for (const [key, text] of Object.entries(english)) add(text, hindi[key]);
const jobCategories = JSON.parse(readFileSync(path.join(root, "src/data/recruitment/jobCategories.json"), "utf8")).jobCategories;
const jobGuides = declared("src/data/job-category-guides.ts", "guides");
for (const category of jobCategories) add(category.name, jobGuides[category.id][1]);
for (const [data, name, aliases] of [["countries", "name", "countryAliases"], ["industries", "title", "industryAliases"]]) {
  const items = declared(`src/data/${data}.ts`, data);
  for (const item of items) metadata[`/${data}/${item.slug}`] = { title: item[name].en, description: item.description.en };
  for (const [alias, slug] of Object.entries(declared("src/data/recruitment.ts", aliases))) metadata[`/${data}/${alias}`] = metadata[`/${data}/${slug}`];
}
const decodeXML = text => text.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&apos;", "'").replaceAll("&quot;", '"');
for (const file of ["work-completion", "service-experience"]) {
  const svg = readFileSync(path.join(root, `public/certificates/${file}-draft.svg`), "utf8");
  for (const match of svg.matchAll(/<(?:text|title|desc)\b[^>]*>([^<]+)<\//g)) if (!["GlobalPath", "OVERSEAS"].includes(match[1])) add(decodeXML(match[1]));
}
const contentFiles = ["blog", "cases", "glossary", "jobCategories", "workforce", "workforceCategories"];
const ignoreKeys = new Set(["id", "slug", "image", "photo", "date", "reviewedDate", "linkedin", "email", "phone", "icon", "categoryId", "experience", "years"]);
function collect(value, key = "") {
  if (ignoreKeys.has(key)) return;
  if (typeof value === "string") add(value);
  else if (Array.isArray(value)) value.forEach(item => collect(item, key));
  else if (value) Object.entries(value).forEach(([key, item]) => collect(item, key));
}
for (const text of Object.values(JSON.parse(readFileSync(path.join(root, "src/locales/workforce/en.json"), "utf8")))) add(text);
for (const name of contentFiles) collect(JSON.parse(readFileSync(path.join(root, `src/data/recruitment/${name}.json`), "utf8")));
for (const member of JSON.parse(readFileSync(path.join(root, "src/data/recruitment/team.json"), "utf8")).team) { add(member.role); add(member.specialty); }
for (const post of JSON.parse(readFileSync(path.join(root, "src/data/recruitment/blog.json"), "utf8")).posts) metadata[`/blog/${post.slug}`] = { title: post.title, description: post.excerpt };
mkdirSync(path.join(root, "src/locales/generated"), { recursive: true });
writeFileSync(path.join(root, "src/locales/generated/en.json"), JSON.stringify(Object.fromEntries([...messages].sort(([a],[b]) => a.localeCompare(b))), null, 2) + "\n");
writeFileSync(path.join(root, "src/locales/generated/metadata.json"), JSON.stringify(metadata, null, 2) + "\n");
mkdirSync(path.join(root, ".review"), { recursive: true });
writeFileSync(path.join(root, ".review/i18n-source-audit.json"), JSON.stringify({ hints: Object.fromEntries(hints), dynamic, raw }, null, 2));
console.log(JSON.stringify({ messages: messages.size, words: [...messages.keys()].join(" ").split(/\s+/).length, hindiHints: hints.size, dynamic, raw }, null, 2));
