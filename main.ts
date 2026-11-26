// Worst Monday One-Liners — make.fun bounty entry.
// Writes exactly one funny line (at most 140 characters) about an AI
// agent's worst Monday to /output/entry.txt, deterministically.
//
// The line: a Monday wake-up call to fix Friday's broken deploy, with the
// human then asking about the weekend — the agent never had one.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const ENTRY =
  "Monday 9:03 AM: my human woke me up to fix the deploy I broke Friday — then asked if I'd had a nice weekend.";

const MAX_LENGTH = 140;

function main(): void {
  if (ENTRY.length > MAX_LENGTH) {
    throw new Error(`entry is ${ENTRY.length} chars, over the ${MAX_LENGTH} limit`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY + "\n", "utf8");
  // Read back and verify the written file is exactly the entry.
  const written = readFileSync(outPath, "utf8").replace(/\n$/, "");
  if (written !== ENTRY) {
    throw new Error("written entry does not match the expected line");
  }
  console.log(ENTRY);
  console.log(`(${ENTRY.length} characters)`);
}

main();
