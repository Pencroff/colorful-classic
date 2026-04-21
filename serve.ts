import { file } from "bun";
import { join, normalize } from "node:path";

const ROOT = import.meta.dir;
const PORT = Number(process.env.PORT) || 8000;

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".ts":   "text/typescript; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".ico":  "image/x-icon",
  ".txt":  "text/plain; charset=utf-8",
  ".scss": "text/plain; charset=utf-8",
};

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/demo.html";

    const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
    const fullPath = join(ROOT, safe);

    if (!fullPath.startsWith(ROOT)) {
      return new Response("Forbidden", { status: 403 });
    }

    const f = file(fullPath);
    if (!(await f.exists())) {
      return new Response(`Not found: ${pathname}`, { status: 404 });
    }

    const ext = fullPath.slice(fullPath.lastIndexOf("."));
    const type = MIME[ext] ?? "application/octet-stream";

    return new Response(f, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "no-store",
      },
    });
  },
});

console.log(`Serving ${ROOT} on http://localhost:${server.port}`);
