# Controlled Afterimage versus GitNexus: T3 Code #28602 V3

## Scope and status

**Outcome: completed structural query stability gate; both original implementations INELIGIBLE. Selection: NONE. This is a report-only draft with no application patch and no tool-productivity winner.**

This is a new graph-only trial on fork `redxzeta/t3code`, frozen at `abf1b8f2e14d2edeeb1e4393984657906dfff7ed`, tree `de3f0bc5eab2ae411eb87c31921ed20d3c92d356`. It is not a continuation of earlier candidate work. Upstream issue [#28602](https://github.com/pingdotgg/t3code/issues/28602) was OPEN at live preflight and the pinned resolver still ignored the active LAN route. No upstream writes, real editor/SSH/Tailscale contact, merge, auto-merge, or deployment are authorized.

Full-text search is excluded. At pinned Afterimage source `e59380d3c7cff5f6e7a28c85b0164ec6451a5c62`, CLI `cmd_search` regards its BM25 cache as fresh only when both embedding and cache mtimes exist. Missing AST-only embeddings cause a rebuild and save on every call. Prewarming cannot fix that condition. Supported structural commands avoid this path. This trial therefore evaluates a narrower structural graph navigation subset, not unrestricted product use.

## Before-data protocol

The coordinator reviewed the plan through four expert personas before indexes or coding: static graph engineering (BM25 mutation, unknown edges, snapshot provenance); experiment design (prompt/order/resource confounds and single-issue limits); T3 workflow (top-level existing-worktree binding and exact runtime acknowledgment); and reliability/security (cache writes, stale graphs, privacy, and draft-only delivery). Concrete corrections and weights are frozen in the JSON appendix. These are coordinator persona reviews, not four independent human reviewers.

Primary weights: correctness 35, regression coverage 20, security 20, compatibility 15, scope/integration 10. A safety/correctness failure disqualifies a patch. Speed and tool counts are secondary tie-breakers only; a tie is allowed. An invalid trial receives no productivity ranking. One issue and one run per arm cannot establish general superiority.

Python `secrets.SystemRandom.sample` randomized coding order before indexing: Afterimage then GitNexus, sequentially. Both receive the same template, captured issue, instructions, 1,800-second coding budget, Sol/high/full-access/default settings and validation requirements; only assigned tool/worktree/allowlist differ. Prior candidates/reports and cross-arm inspection are prohibited. Graphs intentionally remain at the frozen source after edits; source verification is mandatory.

## Preparation and indexing

Both fresh task-owned worktrees started clean at the same HEAD/tree and tracked-file manifest SHA256 `f5270d81e15f9d7456a2d426344a54f63bf7791493ebe74626d6d54ab42c757a`. Neither inherited `.infigraph` or `.gitnexus`. Existing worktrees, root state, and indexes were preserved. Tool HOME, registry, caches and binaries/packages are task-local; no global MCP/hooks/services or AGENTS changes were installed.

Afterimage 3.2.16 binary SHA256: `b33e018c334d58905b98a1dd4293c3fe38c36cb323e18cac459e0576400c8d0a`, pinned source above. GitNexus published package: `1.6.12`, exact npm integrity in the appendix. These were existing supported product interfaces, without product source modifications.

Indexes ran sequentially with a 720-second deadline and sampled process-group RSS ceiling of 12 GiB. Afterimage: `infigraph --root $AFTERIMAGE_WORKTREE index --ast-only`, exit 0, 258.179 seconds, 413.27 user / 1.61 system CPU seconds, 1,669,516 KiB maximum RSS. It parsed 6,671 files and reported 99,666 resolved and 452,431 unresolved calls. GitNexus: `gitnexus analyze $GITNEXUS_WORKTREE --index-only --skip-fts --workers 2 --name v3-28602-gitnexus`, exit 0, 272.732 seconds; full CPU/RSS receipts are in the appendix. No embeddings, watchers, automatic enrichment, future refresh, or AI-context file injection were requested. No setup repair was needed. npm emitted skipped install-script warnings; actual indexing and structural query usability, rather than installation exit alone, qualified the tool.

Coverage differs: GitNexus skipped 11 oversized files under its default 512 KiB cutoff and reported flow truncation (19,612 entry-point candidates excluded, 26,309 callees dropped). Afterimage reports SCIP NOT_REQUESTED/partial coverage. Absent edges/flows are not absence proofs. No coverage limits were raised after observing these outputs.

## Immutable-query gate

Both agents remained unlaunched while fresh CLI processes tested exact-symbol lookup, direct incoming/outgoing calls and bounded impact on multiple symbols from the frozen source. The first pass was followed by read-only index sealing and a complete second pass. SHA256, byte sizes and nanosecond mtimes matched before/after every query; syscall traces detected no writes/renames under either index root. The sealed second pass also audited isolated HOME/registry/cache manifests. Only unrelated Afterimage update-check metadata was excluded, never graph/search cache data. GitNexus warned FTS was unavailable under its load-only policy and continued structural navigation without installing it.

All 28 category query invocations across both passes exited 0 and were stable. Exact source paths disambiguated duplicate symbol names. The final clean-code/index barrier was `2026-11-01T19:54:46.524626+00:00`; the first coding run started later at `2026-11-01T19:55:48.664Z`.

## Reproducibility and limits

The sanitized appendix records commands, source and package identities, frozen protocol hashes, per-query outputs/errors, manifests summarized by hashes, resource receipts and timestamps. Full local manifests and syscall traces are retained outside the code worktrees. Generated graph/index files, packages and binaries must not enter this PR. Token/currency costs are UNKNOWN unless provider receipts supply them; local elapsed time is not billing data. Shared ambient resources and different extractors remain limitations, and no cold-cache claim is made.

Two earlier trials are context only: one could not bind preindexed worktrees through child delegation; another detected BM25 rebuilding during coding. Their candidates, results and reports are not reused or scored here.

Rollback: an unmerged draft changes no installed application. Close the draft and remove only explicitly task-owned branches/worktrees/artifacts after retaining the audit; do not touch historical worktrees. No new operational responsibility, service, credential, schedule, permission model or deployment step is introduced.

## Independent implementations and preserved refs

Both new top-level arms were created through the connected Bridge Tunnel `t3_thread_launch(existing_worktree)` after the barrier. Acknowledgments and live reads confirmed the exact prepared path, `codex/gpt-6.1-sol`, high effort, full-access and default interaction mode. No child-delegation substitution, permission downgrade, host change or global preference update occurred. Both arms verified runtime/source/index before editing, used their assigned graph before edits, added failing-first fixtures, self-reviewed, committed only locally, and did not push or create PRs.

| Receipt                                      | Afterimage arm                             | GitNexus arm                               |
| -------------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| Candidate commit retained locally            | `45dc1e63db5ee3ad7eab74e69e9338f187a5b0c8` | `47cd3167a89f5ad784b6706ed17f249025543a4d` |
| Run start UTC                                | 19:55:48.664                               | 20:04:02.096                               |
| Run finish UTC                               | 20:03:13.833                               | 20:10:10.237                               |
| Runtime run seconds                          | 445.169                                    | 368.141                                    |
| Task clock to diagnosis seconds              | 114.586538                                 | 67.799889                                  |
| Task clock to first verified fix seconds     | 216.489472                                 | 178.417319                                 |
| Task clock to self-review completion seconds | 394.072959                                 | 339.864741                                 |
| Assigned structural queries                  | 11                                         | 7                                          |
| Runtime command-execution records            | 43                                         | 40                                         |
| Runtime dynamic-tool records                 | 1                                          | 1                                          |
| Arm final scoped tests                       | 56 passed / 3 files                        | 43 passed / 2 files                        |
| Arm final `check:changed`                    | PASS                                       | PASS                                       |
| Code files changed                           | 4                                          | 3                                          |
| Final sealed index and HOME/registry         | unchanged                                  | unchanged                                  |

These timings are observations, not a speed ranking: both outputs fail correctness gates. Runtime command records are not necessarily provider tool invocations; exact provider tool-call counts, token/context usage, coding CPU/RSS and monetary costs are UNKNOWN. Index CPU/RSS are measured separately. GitNexus index CPU was 547.43 user / 33.38 system seconds, with 4,972,088 KiB maximum RSS. Index wall times total 530.911446 seconds; runtime coding intervals total 813.310 seconds. Preflight, package installation, worktree creation, stability testing, adjudication and publication are additional coordinator time, not included in either coding interval. The task-local npm install reported 14 seconds; aggregate setup CPU/currency were not measured.

Local candidate refs are `bench/v3-28602-20261101T194206Z-afterimage` and `bench/v3-28602-20261101T194206Z-gitnexus`. Their code is not included or pushed by this report-only PR, so those candidate objects are not promised publicly fetchable. Their commits, trees, patch hashes, validation logs and task-local artifacts are retained for the owner. Re-running stochastic agents is not guaranteed to reproduce identical patches.

One connected Bridge long completion wait returned `Upstream sableoracle unavailable: Request timed out`. A bounded recovery read confirmed the correctly bound running arm. Subsequent task-internal completion waits used the native current-host T3 transport, without changing coding launch or graph interfaces. No polling of CI, unattended watch or scheduled follow-up was created.

## Independent tests, skeptical review and selection

A separate read-only reviewer received anonymized A/B source packets without arm names or run results initially. The coordinator knew the arm identities; the review was blinded, not the whole adjudication. The reviewer evaluated static/source correctness, experiment/scoring design, client integration and reliability/security/compatibility. Source findings were then checked by identical actual-module Vitest fixtures against both original commits and the frozen base. Neither original candidate was repaired or rerun as a new arm.

The initial common 23-case suite produced Afterimage 22 passed / 1 failed and GitNexus 18 passed / 5 failed. One shared failing assertion was wrong: `host@evil` is valid existing `user@host` SSH syntax, not an unsafe alias. Both correctly split it into username and host. That row is neutral for both; original fixture/hash and raw logs remain preserved, not rewritten into passing-suite claims. On the 22 valid rows, Afterimage passed 22 and GitNexus passed 18. GitNexus failed valid Windows domain/space usernames and mapped-loopback/unscoped-link-local fallback cases. No rubric weights or original implementation were changed.

The independent reviewer identified two further shared P2 regressions:

1. Both reject the concrete SSH config alias `dev+gpu`, although frozen SSH discovery accepts non-pattern aliases and the former builder escaped it. The reviewer verified a synthetic local config with `ssh -G -F /dev/stdin` (config expansion only, no connection), and the coordinator ran the actual resolver test on all three source revisions. The frozen base passes; both candidates return `remote-unavailable`.
2. Both classify `host.localhost` and `host.localhost.` as LAN and substitute them for the known advertised remote host. The shared private-host classifier includes the localhost namespace, while the exact-loopback helper does not. Two actual-module bearer-route fixtures pass on the frozen base and fail on both candidates.

The base therefore passed all three shared regression counterexamples; each original candidate failed all three. This establishes introduced behavior, independently of the arm-authored tests passing. Supplemental reviewer counterexamples are explicitly review validation, not a retroactive change to the primary rubric. The complete raw logs and fixture text/hashes are in the appendix/local evidence.

The blinded review also confirmed GitNexus's stricter username guard rejects `DOMAIN\dev` and `dev user`, and its address guard promotes mapped loopback and unscoped IPv6 link-local destinations. Afterimage handles these cases. The reviewer found no justification to penalize GitNexus merely for validating at a caller rather than changing the shared URL builder. Afterimage's connected-phase guard is preferable, but a separate stale-state failure was not established.

| Diagnostic review category | Afterimage | GitNexus |
| -------------------------- | ---------- | -------- |
| Correctness /35            | 28         | 21       |
| Regression coverage /20    | 15         | 12       |
| Security /20               | 16         | 12       |
| Compatibility /15          | 11         | 7        |
| Scope/integration /10      | 9          | 9        |
| Diagnostic total /100      | 79         | 61       |
| Eligible under frozen gate | NO         | NO       |

Diagnostic totals do not override the disqualification rule. **Select neither; no acceptable implementation and no tool-productivity winner.** A coordinator repair would no longer be the original independent output, so this finite run stops without opportunistic tuning or combining patches. Both tools demonstrated stable useful structural navigation under the narrowed interface; this does not establish that either is worth keeping generally.

Graph quality was mixed. Afterimage omitted source-visible resolver/atom/imported-helper edges and made one failed `file_path` property query before correcting it to `file`. GitNexus found relevant callers but emitted false `buildRemoteOpenUrl` edges to unrelated native-tabs/secret-store methods; the agent rejected them against source. Its impact chains were not treated as causal evidence. These receipts are retained rather than hidden by final success summaries.

The independent reviewer ran extracted actual resolver/builder functions against the frozen classifier and synthetic SSH config expansion; those checks are separate from the coordinator's actual-module Vitest runs. The reviewer did not claim full repository suites, typechecks, UI tests or network/editor execution.

## Final delivery and unrun gates

The integration/report branch starts at the frozen fork commit and includes only this report and its sanitized JSON appendix. No candidate application patch, dependency, index, generated binary, workflow, configuration, permission or deployment change is included. Both candidate worktrees are clean after removing only the coordinator's temporary test fixtures; original commits and read-only indexes are preserved. Existing root and historical worktrees were not reset, cleaned or deleted.

Integrated client verification and UI captures are SKIPPED because no user-visible application change is selected or published. No dev server or paid verification turn was launched. Full suites, full build, release/install/runtime activation, real SSH/editor/Tailscale contact and deployment are NOT_RUN. Node 24.18.1 was used while the repository declares 26.12.1; passing scoped checks do not establish the declared-version result. Draft PR CI/review observations are reported separately at handback and are not inferred from local checks.

The next implementation action would require a new request to fix the documented regressions with a separately identified patch. There is no automatic continuation, merge, deployment or background monitor. The report itself can be reviewed while remaining DRAFT, OPEN and UNMERGED.
