#!/usr/bin/env node
import { spawn } from "node:child_process";
import { existsSync, renameSync } from "node:fs";

const HIDE = "index.html";
const TMP = ".index.html.pages-hidden";

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", env: process.env });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited ${code}`));
    });
  });
}

const hidden = existsSync(HIDE);
if (hidden) renameSync(HIDE, TMP);

try {
  await run("node", ["scripts/with-app-env.mjs", "vite", "build"]);
  await run("npm", ["run", "db:migrate"]);
} finally {
  if (hidden && existsSync(TMP)) renameSync(TMP, HIDE);
}
