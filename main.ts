// Entry for the make.fun "Post the Meme, Win the Feed" bounty (Node 22, standard library only).
// It copies POST.json from this repository to /output/POST.json, where the gate reads it.
// That is all the program has to do: the entry is the X post itself, and the house reads
// the post's counts from X. Nothing this program writes about the post is scored.
//
// The repository root is resolved from this file's own location (import.meta.url), never
// from the working directory, so the program runs correctly from any CWD.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_DIR = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(REPO_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
  console.log(`POST.json copied to ${join(OUTPUT_DIR, 'POST.json')}`);
} catch (err) {
  console.error(`POST.json could not be copied from ${REPO_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
