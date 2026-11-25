import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { gzipSync } from "node:zlib";

const root = normalize(join(process.cwd(), "out"));
const port = Number(process.env.PORT || 43123);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  let pathname = decodeURIComponent(url.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  const file = normalize(join(root, pathname));
  if (!file.startsWith(root)) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  try {
    const data = await readFile(file);
    const type = types[extname(file)] || "application/octet-stream";
    const headers = { "Content-Type": type, Vary: "Accept-Encoding" };
    if (file.includes(`${join("_next", "static")}`) || file.includes("/_next/static/")) {
      headers["Cache-Control"] = "public, max-age=31536000, immutable";
    } else if (extname(file) === ".html") {
      headers["Cache-Control"] = "public, max-age=0, must-revalidate";
    } else {
      headers["Cache-Control"] = "public, max-age=86400";
    }
    const compressible = /text|javascript|json|svg|xml/.test(type);
    if (compressible && (req.headers["accept-encoding"] || "").includes("gzip")) {
      const gz = gzipSync(data);
      headers["Content-Encoding"] = "gzip";
      headers["Content-Length"] = gz.length;
      res.writeHead(200, headers).end(gz);
      return;
    }
    headers["Content-Length"] = data.length;
    res.writeHead(200, headers).end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`serving ${root} on http://127.0.0.1:${port}`);
});
