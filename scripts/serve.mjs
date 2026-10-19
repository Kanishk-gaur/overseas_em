import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, join, extname, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".ico": "image/x-icon" };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
    const info = await stat(file);
    if (info.isDirectory()) file = join(file, "index.html");
    const content = await readFile(file);
    response.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream", "Cache-Control": pathname.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache" });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    try { response.end(await readFile(join(root, "404.html"))); } catch { response.end("Run npm run build before starting the preview."); }
  }
});
server.listen(port, "127.0.0.1", () => console.log(`GlobalPath production preview: http://localhost:${port}`));
