import ts from "typescript";
import { readFileSync } from "node:fs";

// Build tools remain compatible with Node versions supported by Next.js;
// they do not rely on Node's newer native TypeScript stripping.
export async function loadTypeScript(file) {
  const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}
