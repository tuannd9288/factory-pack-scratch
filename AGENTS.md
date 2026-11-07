# factory-pack-scratch

<!-- factory:gate:begin -->
## Gate

Gate marker: gate-section-v1 (a session that loaded this file can quote this line).
This repository is in the factory (`tuannd9288/factory`). The kit owns this block; the repository owns the rest of the
file. What a program enforces: `.gate/enforced-rules.md`.

- Work enters as one issue labelled `task`; claim it first: `.gate/bin/claim <n> <team>` (a second claim is refused). It
  leaves as one pull request whose body says `Issue: #<n>`, `Claim: <sha>` and `Team: <name>`. Never push to `main`;
  land by a merge commit through auto-merge.
- Run `.gate/bin/setup` once per clone. Before the pull request run `.gate/bin/verify --fast`, the tests of the part you
  changed (`--tests <files>`) and `.gate/bin/red-check --base origin/main`; the full suite runs on CI, as `verify`.
- For a feature new to this repository, search GitHub (`gh search repos`, `gh search code`) and existing products for projects that already do it, and compare their approaches before writing it from scratch. Judge a project by its mechanism, never its stars or age. Adding a library, service or dependency is the Human's choice: propose it with the comparison.
- A source change carries a test that fails at the base. Where none can, the pull request body says
  `No-red: <why, 20 characters or more>`; the reviewer judges it (where Entire reviews, the Human: tier 3).
- `.gate/bin/tier` prints the tier. Tier 2: commit the failing test first, alone, with `Failing-test: <command>`.
  Tier 3 (a path in `.gate/protected`, this block included): the Human approves the head commit, unless the repository's merge switch is at `all`.
- Four checks decide on the exact head commit, from `main`'s copies: `verify`, `review`, `verdict`, `tier` (where Entire
  reviews, `tier` needs its check `Entire Gates` to be success). When one is red, read `.claude/skills/gate-red/SKILL.md` first.
- The Human (2026-10-29), to the reviewer: "Rate each bug from 1 to 10 on how often it would happen and how bad it would be. If the two scores multiplied are below 5, just file it as an issue and leave the code alone." To the writer: "Do not design for rare or future cases nobody asked about."
- `forcePush` on origin/main defaults to `pstack`: only your own PR branch, with `--force-with-lease`, never main; `off` forbids rewrites. After three red rounds the PR is `needs-human`, with your recommended answer.
- Every deploy is the Human's; decide and report anything else that can be undone, and a reversible question never
  blocks the work. Secrets live only in the environment `reviewer`. A rules finding wrong for one line:
  `gate-allow <rule-id>: <why>` (syntax in the file above).
- A hosted agent assigned on GitHub takes tier 1 and 2 issues only, and never receives the shared bot token.
<!-- factory:gate:end -->

## Where pstack yields

A session runs a pstack playbook when it types `/pstack:<skill>`, in `claude -p` at the prompt's start. Where one
differs from the factory, the gate's rule wins (sources: the factory's `packs/pstack/yields.md`):

- `forcePush` in origin/main’s `.gate/driver.json` defaults to `pstack`: only your own PR branch with `--force-with-lease`, never main; `off` means fix forward.
- Stacked pull requests: `stacks` in origin/main's `.gate/driver.json` defaults to `pstack`: `scripts/ship --base <parent-branch>` opens a child on its parent's branch, unarmed until the parent lands; it then moves to `main`, the queue merges `main` into it, and arms it once green; `off` keeps `main` only.
- No merge by hand: `merge` in `.gate/driver.json` on main defaults to `squash`; `merge` selects merge commits, and `scripts/ship` arms the selected method with `--auto`.
- Title: Conventional Commits `type(scope): subject`, no trailing period, at most 72 characters; type is `feat`, `fix`, `docs`, `refactor`, `test`, `chore` or `perf`; scope is the area; subject is short, imperative and names a real symbol when one carries the change; `scripts/ship` defaults to the head commit's subject without its trailing `(#<n>)`; body: the repository's template with `Closes #<issue>` (`scripts/ship` sends them).
- `gh api` freely to read (a GET or a GraphQL query; on a REST read, `-X GET` with `-f`/`-F`); a write through it only
  with the Human's approval; a seat has no `gh` at all.
- `claude -p` has no `AskUserQuestion`: ask in the report.
- A step that asks for another model family than its worker's runs on Codex through `factory codex --role <role>`, never
  on Claude: a panel's other seat and arena's cross-judge (the Lead's rules file names them), show-me-your-work's trail
  review (`trail-reviewer`) and Orchestrate's verifier (`verifier`). Exit 3: it waits for Codex; say so.
- `/repo-refresh` runs only when the Human types it (`skillOverrides`), and changes a repository only by pull request.

A session that `bin/seat` or `factory lead` starts is denied its profile. Where pstack's docs say `~/.claude/`, its
plugin is under `~/.local/share/factory/plugins/`; `recall` and `reflect` read a seat's `run-<tag>.jsonl` in its run
folder, or a Lead's `~/factory-runs/<repo>-<team>/transcripts/`; a Lead's profile gets the factory's
`rules/pstack-models.md` at every start, a seat's none, so a seat's role uses its skill's default model.

## Docs

- A work spec is its tracker issue. No `docs/` tree is required.
- A product description is the Feature Map: `feature-map/` at the repository root, a `README.md` index and one short
  file per feature, from the user's side, in the four sections `/pstack:create-verification-skill` writes.
- A pull request that changes a feature updates that feature's file.
- A flow diagram is drawn only for a complex flow, with `/pstack:statechart`, in that feature's file.
- Linear Documents hold only writing the Human reads.
- Until the map is seeded, an existing feature doc stays where it is and is corrected in place; the pull request that
  seeds the map moves it in and deletes the old file.

## Shipping with pstack

Push, then run `scripts/ship --body-file <body>` until it says `armed` or stops. Each run takes the next step: it opens
the pull request, then arms auto-merge. It refuses a wrong step with the reason, and never a push. Stopped: put the
reason and your recommended answer in the pull request. Then release the branch; do not wait for CI.
