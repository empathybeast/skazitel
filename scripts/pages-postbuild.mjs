#!/usr/bin/env node
import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const candidates = [
  join(process.cwd(), "dist", "client"),
  join(process.cwd(), ".output", "public"),
  join(process.cwd(), "dist"),
];

const outDir = candidates.find(
  (dir) => existsSync(join(dir, "index.html")) || existsSync(join(dir, "_shell.html")),
);
if (!outDir) {
  console.error("[pages-postbuild] no index.html or _shell.html in dist/client, .output/public, or dist");
  process.exit(1);
}

const shellPath = existsSync(join(outDir, "_shell.html"))
  ? join(outDir, "_shell.html")
  : join(outDir, "index.html");

const assetsDir = join(outDir, "assets");
const cssFile = existsSync(assetsDir)
  ? readdirSync(assetsDir).find((name) => name.endsWith(".css"))
  : undefined;

let html = readFileSync(shellPath);
html = Buffer.from(html.filter((byte) => byte !== 0));
let text = html.toString("utf8");
if (cssFile) {
  text = text.replace(/assets\/styles-[A-Za-z0-9_-]+\.css/g, `assets/${cssFile}`);
}

writeFileSync(join(outDir, "index.html"), text);
writeFileSync(join(outDir, "404.html"), text);
writeFileSync(join(outDir, ".nojekyll"), "");
console.log(`[pages-postbuild] prepared ${outDir}${cssFile ? ` (css ${cssFile})` : ""}`);
