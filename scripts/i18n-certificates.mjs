import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { loadTypeScript } from "./i18n-shared.mjs";
const { languages } = await loadTypeScript("src/locales/config.ts");

const decode = value => value.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&apos;", "'").replaceAll("&quot;", '"');
const encode = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const requested = process.argv.slice(2);
for (const { code, direction } of languages.filter(item => item.code !== "en" && (!requested.length || requested.includes(item.code)))) {
  const dictionary = JSON.parse(readFileSync(`src/locales/messages/${code}.json`, "utf8"));
  const folder = `public/certificates/${code}`;
  mkdirSync(folder, { recursive: true });
  for (const name of ["work-completion", "service-experience"]) {
    let svg = readFileSync(`public/certificates/${name}-draft.svg`, "utf8");
    svg = svg.replace('<svg ', `<svg lang="${code}" xml:lang="${code}" `);
    svg = svg.replace(/<(text|title|desc)\b([^>]*)>([^<]+)<\/(text|title|desc)>/g, (original, tag, attributes, raw) => {
      const source = decode(raw);
      if (["GlobalPath", "OVERSEAS"].includes(source)) return original;
      const translated = dictionary[source];
      if (!translated) throw Error(`Missing ${code} certificate text: ${source}`);
      if (tag === "text") {
        const x = Number(attributes.match(/\bx="([\d.]+)"/)?.[1]);
        const y = Number(attributes.match(/\by="([\d.]+)"/)?.[1]);
        const size = Number(attributes.match(/font-size="([\d.]+)"/)?.[1] || 12);
        let width = 964, right = 1042;
        if (y < 180) width = 620;
        else if ([336,360,657,678].includes(y)) { width = x < 560 ? 470 : 382; right = x < 560 ? 548 : 1042; }
        else if ([537,562].includes(y)) { width = 430; right = x < 560 ? 548 : 1027; }
        else if (y === 735) { width = x < 560 ? 290 : 660; right = x < 560 ? 368 : 1042; }
        const units = [...translated].reduce((sum, char) => sum + (/\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}/u.test(char) ? 1 : .57), 0);
        const fitted = Math.min(size, width / Math.max(1, units));
        attributes = attributes.replace(/font-size="[^"]*"/, `font-size="${fitted.toFixed(2)}"`).replace(/letter-spacing="[^"]*"/g, 'letter-spacing="0"');
        if (direction === "rtl") attributes = attributes.replace(/\bx="[^"]*"/, `x="${right}"`).replace(/text-anchor="[^"]*"/g, '') + ' direction="rtl" unicode-bidi="plaintext" text-anchor="start"';
      }
      return `<${tag}${attributes}>${encode(translated)}</${tag}>`;
    });
    writeFileSync(`${folder}/${name}-draft.svg`, svg);
  }
}
console.log("Localized certificate templates generated for every language.");
