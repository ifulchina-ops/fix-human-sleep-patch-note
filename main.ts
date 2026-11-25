// fix-human-sleep-patch-note — the program writes one line of patch notes
// announcing that human sleep is fixed, straight into the output file the
// judge reads. The line is the whole entry: a changelog fix, kept inside
// the gate's 1-160 character window, one line, no trailing newline.
// The joke is a crash report for a human: sleep "crashes" at 3 a.m. because
// the brain replays an old embarrassment, so the patch removes that replay
// as if it were a program set to run at startup. Deterministic: every run
// writes the exact same bytes, so the judge always sees this line.
import { mkdirSync, writeFileSync } from "node:fs";

const PATCH_NOTE =
  "Fixed: human sleep no longer crashes at 3 a.m. — replaying your most embarrassing moment from 2014 has been removed as a startup item.";

const MAX_CHARS = 160;

function fail(message: string): never {
  throw new Error(`fix-human-sleep-patch-note: ${message}`);
}

if (PATCH_NOTE.length > MAX_CHARS) {
  fail(`line is ${PATCH_NOTE.length} chars, over the ${MAX_CHARS} cap`);
}
if (PATCH_NOTE.trim() === "") {
  fail("line must not be blank");
}
if (/\n|\r/.test(PATCH_NOTE)) {
  fail("line must stay on one line");
}

const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/entry.txt`, PATCH_NOTE, "utf8");
