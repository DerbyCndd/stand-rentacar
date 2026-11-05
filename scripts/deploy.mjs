// Publica o site no GitHub Pages: compila (exportação estática) e envia a pasta `out` para o ramo gh-pages.
// Uso: npm run deploy
import { execSync } from "node:child_process";
import { writeFileSync, existsSync, rmSync } from "node:fs";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const out = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

const remote = out("git remote get-url origin");
const repoName = remote.split("/").pop().replace(/\.git$/, "");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? `/${repoName}`;

console.log(`> A compilar com basePath "${basePath}"`);
run("npx next build", { env: { ...process.env, NODE_ENV: "production", NEXT_PUBLIC_BASE_PATH: basePath } });

writeFileSync("out/.nojekyll", "");
if (existsSync("out/.git")) rmSync("out/.git", { recursive: true, force: true });

run("git init -b gh-pages", { cwd: "out" });
run("git add -A", { cwd: "out" });
run('git commit -q -m "Deploy"', { cwd: "out" });
run(`git push -f ${remote} gh-pages`, { cwd: "out" });
rmSync("out/.git", { recursive: true, force: true });

console.log("\nPublicado. Pode demorar 1 a 2 minutos a atualizar.");
