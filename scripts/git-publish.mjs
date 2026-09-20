#!/usr/bin/env node
/**
 * Staging → commit → push in one safe command.
 *
 *   npm run publish -- "feat: add mobile menu"
 *
 * Stages everything (`git add -A`), skips the commit if nothing changed,
 * then pushes the current branch to its upstream remote.
 */
import { execFileSync } from "node:child_process"

function git(args, options = {}) {
  return execFileSync("git", args, { stdio: "inherit", ...options })
}

const message = process.argv.slice(2).join(" ").trim() || "chore: publish changes"

try {
  git(["add", "-A"])

  const staged = execFileSync("git", ["diff", "--cached", "--name-only"], {
    encoding: "utf8",
  })
    .trim()

  if (!staged) {
    console.log("Nothing to commit — working tree is clean. Skipping commit & push.")
    process.exit(0)
  }

  console.log(`Committing ${staged.split(/\r?\n/).length} file(s).`)
  git(["commit", "-m", message])
  git(["push"])
  console.log("Done: committed and pushed.")
} catch (error) {
  console.error("Publish failed.", error)
  process.exit(1)
}