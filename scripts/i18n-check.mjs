import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadTypeScript } from "./i18n-shared.mjs";
const { languages, destinationLanguages, isLocale, isRTL } = await loadTypeScript("src/locales/config.ts");
const { translateMessage } = await loadTypeScript("src/locales/translate.ts");

const catalog = JSON.parse(readFileSync("src/locales/generated/en.json", "utf8"));
const keys = Object.keys(catalog);
const ready = JSON.parse(readFileSync("src/locales/generated/ready.json", "utf8"));
assert.deepEqual([...ready].sort(), languages.map(item => item.code).sort(), "Every advertised locale must be complete before a production build.");
const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();
const workforceEnglish = JSON.parse(readFileSync("src/locales/workforce/en.json", "utf8"));
for (const { code } of languages.filter(item => item.code !== "en")) {
  const workforce = JSON.parse(readFileSync(`src/locales/workforce/${code}.json`, "utf8"));
  assert.deepEqual(Object.keys(workforce).sort(), Object.keys(workforceEnglish).sort(), `${code}: workforce UI keys must be complete`);
  const dictionary = { ...JSON.parse(readFileSync(`src/locales/messages/${code}.json`, "utf8")), ...Object.fromEntries(Object.entries(workforceEnglish).map(([key, english]) => [english, workforce[key]])) };
  const missing = keys.filter(key => typeof dictionary[key] !== "string" || !dictionary[key].trim());
  assert.equal(missing.length, 0, `${code}: missing translations: ${missing.slice(0, 8).join(" | ")}`);
  for (const key of keys) {
    assert.deepEqual(placeholders(dictionary[key]), placeholders(key), `${code}: placeholder mismatch: ${key}`);
    assert.ok(!/(.{2,40})\1{5,}/u.test(dictionary[key]), `${code}: repeated output: ${key}`);
  }
  console.log(`${code}: ${keys.length}/${keys.length} entries present; placeholders valid`);
}
assert.equal(new Set(languages.map(item => item.code)).size, languages.length);
assert.ok(Object.values(destinationLanguages).every(isLocale));
assert.equal(isLocale("unknown"), false);
assert.equal(isRTL("ar"), true); assert.equal(isRTL("he"), true); assert.equal(isRTL("en"), false);
assert.equal(translateMessage("de", {}, "English fallback"), "English fallback");
assert.equal(translateMessage("de", { Hello: "  " }, "Hello"), "Hello");
assert.equal(translateMessage("en", { Hello: "Hallo" }, "Hello"), "Hello");
assert.equal(translateMessage("hi", {}, "Hello", "नमस्ते"), "नमस्ते");
assert.equal(translateMessage("de", { "{count} items": "{count} Einträge" }, "{count} items", undefined, { count: 3 }), "3 Einträge");
assert.equal(translateMessage("de", {}, "{count} items", undefined, { count: 0 }), "0 items");
assert.equal(translateMessage("de", {}, "{count} items", undefined, {}), "{count} items");
console.log("Locale validation and fallback checks passed.");
