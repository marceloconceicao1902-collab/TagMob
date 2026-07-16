#!/usr/bin/env node
/**
 * Deploy de produção SEMPRE no projeto Vercel `tag-mob` (tagmob.com.br).
 * Impede publicar acidentalmente no projeto legado `tagmob-app`.
 */
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const EXPECTED_PROJECT = "tag-mob";
const EXPECTED_PROJECT_ID = "prj_NzgtWDXVfHNJRbCsC3omFQmVauC9";
const projectJsonPath = resolve(ROOT, ".vercel", "project.json");

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

console.log(`🚀 Deploy produção → ${EXPECTED_PROJECT} (www.tagmob.com.br)`);
execSync("npx vercel --prod --yes", {
  cwd: ROOT,
  stdio: "inherit",
  env: process.env,
});
