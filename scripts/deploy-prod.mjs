#!/usr/bin/env node
/**
 * Deploy de produção SEMPRE:
 * - branch git `main`
 * - projeto Vercel `tag-mob` (tagmob.com.br)
 */
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const EXPECTED_BRANCH = "main";
const EXPECTED_PROJECT = "tag-mob";
const EXPECTED_PROJECT_ID = "prj_NzgtWDXVfHNJRbCsC3omFQmVauC9";
const projectJsonPath = resolve(ROOT, ".vercel", "project.json");

function run(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: "utf8" }).trim();
}

let branch;
try {
  branch = run("git rev-parse --abbrev-ref HEAD");
} catch {
  console.error("❌ Não foi possível ler a branch git.");
  process.exit(1);
}

if (branch !== EXPECTED_BRANCH) {
  console.error(`❌ Deploy de produção só é permitido na branch "${EXPECTED_BRANCH}".`);
  console.error(`   Branch atual: ${branch}`);
  console.error("   Faça merge em main, checkout main, push, e rode de novo: npm run deploy:prod");
  process.exit(1);
}

try {
  run("git fetch origin main");
  const local = run("git rev-parse HEAD");
  const remote = run("git rev-parse origin/main");
  if (local !== remote) {
    console.error("❌ main local ≠ origin/main. Sincronize antes do deploy:");
    console.error("   git pull origin main   (ou push se você estiver à frente)");
    process.exit(1);
  }
} catch (err) {
  console.error("❌ Falha ao validar sync com origin/main.");
  console.error(err?.message ?? err);
  process.exit(1);
}

if (!existsSync(projectJsonPath)) {
  console.error("❌ Falta .vercel/project.json na raiz. Produção = tag-mob.");
  process.exit(1);
}

const project = JSON.parse(readFileSync(projectJsonPath, "utf8"));
if (project.projectName !== EXPECTED_PROJECT || project.projectId !== EXPECTED_PROJECT_ID) {
  console.error("❌ .vercel/project.json não aponta para tag-mob.");
  console.error(`   Encontrado: ${project.projectName} (${project.projectId})`);
  console.error(`   Esperado:   ${EXPECTED_PROJECT} (${EXPECTED_PROJECT_ID})`);
  process.exit(1);
}

console.log(`🚀 Deploy produção → branch main → ${EXPECTED_PROJECT} (www.tagmob.com.br)`);
execSync("npx vercel --prod --yes", {
  cwd: ROOT,
  stdio: "inherit",
  env: process.env,
});
