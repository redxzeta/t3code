# GitNexus benchmark: issue #28659

## Result

**Limited feasibility run; no fair estimate of GitNexus benefit.** Two fresh native T3 child
contexts independently implemented the same bug. The GitNexus arm implemented and validated
its fix while indexing was still running. Successful graph queries happened after the first
validated fix; indexing overlapped edits. Its index is not certified as an immutable starting-tree
index. Timings cannot establish a tool speedup or slowdown. A valid follow-up must complete
indexing an immutable starting tree before releasing the task. No follow-up is scheduled.

[Upstream issue #28659](https://github.com/pingdotgg/t3code/issues/28659) was read as OPEN
on 2026-11-01. Only redxzeta/t3code receives writes, with main as PR base. No upstream
comments, assignments, pushes or PRs.

## Protocol

- Starting commit for both arms: 07f00e9b1c27f411c80359c8525f7f835d01cbc0.
- SableOracle; separate T3-prepared isolated worktrees; root checkout preserved.
- Native orchestrator_capabilities supplied a nonempty parent binding, verified against
  the active thread's worktree/branch/original request through t3_thread_read.
- Native delegate_task, isolation=worktree, provider=codex, model=gpt-6.1-sol,
  reasoningEffort=high, inherited full-access mode. Both returned matching settings.
  No external bridge fallback, missing-credential bypass, or subdelegation.
- Once-only Python secrets.SystemRandom().shuffle selected baseline, then GitNexus.
  Sequential fresh contexts, no cross-arm diagnosis, patch or report disclosure.
- Identical common prompt and issue payload below, with navigation-specific suffixes.
  One trial per arm; no statistical/generalized claim.
- Node v24.18.1, npm 11.16.0, pnpm 12.14.0, Vite+ 1.4.0. Repository declares Node
  26.12.1; local checks do not prove that exact runtime.
- Per-worktree pnpm install --frozen-lockfile --ignore-scripts reused existing package
  store. No global install, lifecycle scripts, hooks, settings or lockfile changes.
- Acceptance: parent stays Working for running side chat or awaited commands; pending
  user input/approval takes precedence; finished/actionable work releases Working.
  Verify actual shared-client flow and add focused failing-first regression tests.

## Observed metrics

UTC on 2026-11-01; explicit task clocks exclude unmeasured worktree preparation.
T3 run records separately show baseline 16:00:27.763–16:05:43.575 and GitNexus
16:06:02.425–16:13:26.041. These are distinct from child-recorded milestones.

| Measure                                    | Baseline    | GitNexus arm                                    |
| ------------------------------------------ | ----------- | ----------------------------------------------- |
| First explicit task clock                  | 16:00:34    | 16:06:11                                        |
| Recorded diagnosis                         | 16:01:05    | 16:08:55, recorded after initial implementation |
| First validated fix recorded               | 16:02:27    | 16:10:26                                        |
| Start to first validated fix               | 113 s       | 255 s, overlapping indexing                     |
| Report finish recorded                     | 16:05:33    | 16:13:10                                        |
| Start to report finish                     | 299 s       | 419 s, overlapping setup/index                  |
| Final focused tests                        | 198 passed  | 197 passed                                      |
| T3 command_execution records               | 26          | 47                                              |
| T3 web_search records                      | 0           | 1                                               |
| T3 assistant/reasoning records             | 5 / 27      | 7 / 35                                          |
| GitNexus graph lookups                     | 0           | 4: unavailable, found, ambiguous, found         |
| Exact source reads/searches                | UNAVAILABLE | UNAVAILABLE                                     |
| Total internal agent/tool calls and tokens | UNAVAILABLE | UNAVAILABLE                                     |
| Exclusive task-only wall time / RSS        | UNAVAILABLE | UNAVAILABLE                                     |

Activity counts are from complete native activity reads (hasMore=false). A command record
can contain multiple shell operations, so it is not a source-read or complete tool-call count.
Private transcripts are not committed. No unavailable measurement is estimated.
Baseline dependency preparation reported 1.2 s; GitNexus arm 1.4 s, included in task clocks.

## GitNexus preparation and reproduction

Official references: [README](https://github.com/abhigyanpatwari/GitNexus),
[CLI source](https://github.com/abhigyanpatwari/GitNexus/blob/main/gitnexus/src/cli/index.ts),
[index-only discussion](https://github.com/abhigyanpatwari/GitNexus/issues/312),
[pinned published dist](https://registry.npmjs.org/gitnexus/-/gitnexus-1.6.12.tgz).
Main links can drift; executable/isolation verification used gitnexus@1.6.12 published source.
storage/global-dir.js supports GITNEXUS_HOME. Index-only suppresses agent/skill injection;
a worktree's .git file prevents shared git-info-exclude mutation. No setup/integration/MCP
installation was run. Generated .gitnexus files stayed in the arm worktree, uncommitted.

Choose fresh disposable BENCH and isolated ARM_WORKTREE at the commit above.
The actual BENCH was /tmp/t3-gitnexus-28659; private absolute worktree paths are omitted.
Run from ARM_WORKTREE (replace variables with your locations):

```sh
mkdir -p "$BENCH/cache" "$BENCH/home"
npm --cache "$BENCH/cache" view gitnexus version dist.tarball
npm --cache "$BENCH/cache" pack gitnexus@1.6.12 --pack-destination "$BENCH"
tar -xzf "$BENCH/gitnexus-1.6.12.tgz" -C "$BENCH"
/usr/bin/time -v -o "$BENCH/prep.time" npm --cache "$BENCH/cache" install --prefix "$BENCH/tool" --ignore-scripts --no-audit --no-fund gitnexus@1.6.12
export GITNEXUS_HOME="$BENCH/home"
node "$BENCH/tool/node_modules/gitnexus/dist/cli/index.js" analyze --help
/usr/bin/time -v -o "$BENCH/index.time" node "$BENCH/tool/node_modules/gitnexus/dist/cli/index.js" analyze . --index-only --skip-git
node "$BENCH/tool/node_modules/gitnexus/dist/cli/index.js" context isThreadWorking -r "$ARM_WORKTREE"
node "$BENCH/tool/node_modules/gitnexus/dist/cli/index.js" context createEnvironmentThreadShellAtoms -r "$ARM_WORKTREE"
node "$BENCH/tool/node_modules/gitnexus/dist/cli/index.js" context createEnvironmentThreadShellAtoms -r "$ARM_WORKTREE" --file packages/client-runtime/src/state/threadShell.ts
du -sb .gitnexus "$BENCH/tool" "$BENCH/cache"
```

Actual call ordering differs from the clean sequential reproduction: the first isThreadWorking
lookup ran during indexing and failed "No indexed repositories found"; repeated after completion,
it found sidebar/tracker callers. Factory lookup was ambiguous with a mobile test mock and
resolved with --file. Four graph lookups total; context --help was also run once.
Suspicious outgoing UI/auth edges were rejected after source verification.

- Package install: exit 0, 255 packages, 7.98 s wall, 645612 KiB max RSS.
- Index: one attempt, exit 0; launch marker 16:07:07, completion marker 16:10:35 UTC.
  time -v: **207.23 s wall**, 923.15 s user, 48.49 s system,
  **8375028 KiB max RSS**. Analyzer reported 200.7 s.
- Analyzer: 178594 nodes, 720690 edges, 4690 clusters, 1470 flows. It skipped 11
  oversized files and reported parser/candidate/process truncation, including 19611
  dropped entry-point candidates. Graph completeness is not established.
- Worktree/.gitnexus apparent size: 1810985171 bytes. Disposable tool: 1385837338 bytes;
  npm cache: 400872943 bytes. Snapshot sizes, not peak disk usage.
- Successful isThreadWorking lookup: 0.84 s wall, 639452 KiB max RSS.
- Setup/index/navigation/implementation overlapped. They are not additive phases.
  Do not subtract index duration to invent exclusive task time. Full agent RSS unavailable.

## Actual data flow and patch selection

ProjectionStore builds wire shells with activityRunStatus, pendingRuntimeRequest and
pendingBackgroundTasks. shellReducer updates snapshot.threads. Shared threadShell atoms group
side chats. shellRuntime already treats awaited commands as idle activity independent of a
completed latest run. Web Sidebar uses quiet shells and partitionSidebarThreads; desktop wraps
web; mobile threadListV2 uses the same Working predicate/shared presentation.
isListedThreadLineage hides side chats. Their actionable requests already rolled up, but their
activity did not reach the parent shell. This confirms the missing link beyond issue speculation.

Both patches add optional client-only hasWorkingSideChat, deriving it once per environment
from existing side-chat grouping with presentThreadShell/isThreadWorking. Cache keys and
quiet-shell equality honor the flag. Point/project/navigation/aggregate list paths receive it.
Parent runtime/run is not rewritten. Own/rolled-up input and approval, then settled actionable
plans, retain precedence. Existing 2-second completion grace and immediate attention remain.

Both change exactly four files under packages/client-runtime/src/state:
models.ts, threadInbox.ts, threadShell.ts and threadShell.test.ts.
Baseline commit aa581e24ee14bb2ba3d358fc91b15ba3591b75e2 adds 170 lines/removes 9.
GitNexus commit a3e6f108466643ce4289764cf988ae98ace8f347 adds 150/removes 9.
Production logic is otherwise equivalent; GitNexus also guards archived/deleted children.
Baseline has no archive/delete guard and would hold the parent for an archived running child.
Selected regression explicitly covers that case. This smaller, more complete patch was selected;
graph navigation happened too late to attribute this advantage to GitNexus.
Parent cherry-picked only it, then added five assertions/lines to the existing case for child
activity transitions while parent itself runs, verifying quiet-cache invalidation identified
in baseline coverage. Implementations were not blindly combined.

Web hosted/local, desktop shared web, and mobile share this fix. Provider adapters, server,
contracts, transports, MCP mutations and schedules require no changes. Grouping remains
environment-local. No new dependencies, infrastructure, operational responsibility or deployment.

## Tests, retries and limitations

Both arms first added regressions that failed on starting code (baseline two table rows;
GitNexus one lifecycle case), then fixed production. Final focused commands:

```sh
node_modules/.bin/vp test run packages/client-runtime/src/state/threadShell.test.ts packages/client-runtime/src/state/threadInbox.test.ts packages/client-runtime/src/state/entities.test.ts apps/web/src/components/Sidebar.logic.test.ts apps/mobile/src/features/threads/threadListV2.test.ts
node_modules/.bin/vp run --filter @t3tools/client-runtime typecheck
node_modules/.bin/vp lint packages/client-runtime/src/state/models.ts packages/client-runtime/src/state/threadInbox.ts packages/client-runtime/src/state/threadShell.ts packages/client-runtime/src/state/threadShell.test.ts
node_modules/.bin/vp fmt --check packages/client-runtime/src/state/models.ts packages/client-runtime/src/state/threadInbox.ts packages/client-runtime/src/state/threadShell.ts packages/client-runtime/src/state/threadShell.test.ts
git diff --check
```

Baseline: 198 passed, final 6.35 s (earlier 8.45 s); typecheck/lint/format/diff passed.
GitNexus: 197 passed, 9.22 s; typecheck/lint/format/diff passed. Different case counts
do not indicate failures. Coverage: running/waiting commands, parent/child input/approval,
recovery, completion, plan, archive/delete, ordinary forks and shared point/list atoms.

GitNexus corrected a test-only ordinary-fork visibility assertion (50 passed/1 failed)
and initial test typing (heterogeneous atom union, widened awaited boolean). Production
assertions already passed in that failed test run. It corrected a guessed official storage URL
404 by inspecting pinned package source. Both corrected guessed source paths/globs.
Baseline had no rejected production approach. GitNexus's premature and ambiguous graph calls
required no reindex. No host limits or permissions changed.

Parent integrated focused run: 197 passed, 5 files, 10.16 s, including added cache assertions.
Final `PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/vp run check:changed origin/main --concurrency 1` passed: format, lint, both Knip stages, seven-package affected typecheck (cache hits), and 35 adjacent tests. An earlier report formatting failure was corrected with scoped vp fmt before this clean rerun.
`vp run --filter @t3tools/web build` passed in 7.38 s with a chunk-size warning. `git diff --check` passed. Full diff reviewed; no unrelated source or operational changes.
Real web/desktop/mobile interaction and captures: NOT_RUN. No preview requested by task;
shared-state and sidebar/mobile logic tests are current behavior proof. No live provider,
release/deployment or production readiness claim. Live-client behavior remains a limitation.
PR gate/merge receipts belong in PR history; no watcher or schedule is authorized.

## Exact common prompt

Delivered verbatim to both independent contexts, including identical issue JSON:

```text
Implement and validate upstream issue #28659, fork-only redxzeta/t3code on SableOracle, in the isolated worktree supplied by delegation. Verify starting HEAD is 07f00e9b1c27f411c80359c8525f7f835d01cbc0 and origin is redxzeta/t3code. Do not push or create PRs; parent selects a patch. No upstream writes. No subdelegation, Afterimage, scheduling, watchers, global installations/settings/hooks/MCP/user-file changes or deployment. Preserve unrelated state. Read applicable AGENTS.md. Implement smallest fix with focused failing-first regression tests. Acceptance: parent remains Working while child side-chat runs/waits on commands; pending user input/approval takes precedence; parent leaves Working when side chat completes or becomes actionable. Verify actual data flow, not solely issue diagnosis. Check all client surfaces/entry points implicated. Run targeted tests/checks, entire patch self-review, git diff --check. Commit your patch locally if validated. No browser/dev-server launch: parent performs integrated pass. Bound work to this bug. Record UTC start, diagnosis time, first validated correct fix time, finish, exact commands/results, failed approaches, source searches/read counts and tool calls where observable (mark unavailable rather than estimate). Write your measurements to /tmp/t3-gitnexus-28659/ARM-result.md (replace ARM with your arm); no scratch artifacts committed. Do not inspect other arms or parent changes; only your isolated worktree. Do not launch heavy broad suites. vp may not be on PATH; inspect existing tool locations before installing, no global installation. If tests unavailable, document exact blocker. Finish with worktree path, SHA/patch, changed files, test results, metrics and limitations.
Identical issue input:
{
  "body": "## Before submitting\n\n- [x] I searched existing issues and did not find a duplicate.\n- [x] I included enough detail to reproduce or investigate the problem.\n\n## Area\n\napps/web (also visible in the desktop app)\n\n## What happened\n\nA thread appears in the main sidebar list above Working while a side chat inside that thread is still running. Side chats have no separate sidebar row, so the sidebar gives no Working entry for the ongoing work.\n\nIn the reported case, the main thread showed \"Run interrupted \u00b7 Stopped by user\". Its side chat remained open in the right panel and showed \"Waiting on 2 commands\" with a Stop button. The parent thread's sidebar row stayed above the Working section.\n\n## Steps to reproduce\n\nBased on the reported state:\n\n1. Enable the Working shelf in the sidebar.\n2. Open a thread and start a side chat in its right panel.\n3. Send work in the side chat that keeps commands running.\n4. With the main thread stopped or interrupted, observe its sidebar placement while the side chat is still waiting on commands.\n\n## Expected behavior\n\nThe parent thread should remain under Working while a side chat is running or waiting on commands, unless there is an actionable request that needs the user's attention. It should return to the main list when that work finishes or needs input.\n\n## Actual behavior\n\nThe parent thread is outside Working even though its side chat still has commands running. Because the side chat is hidden from thread lists, that running work has no entry under Working.\n\n## Impact\n\nMinor bug or occasional failure. The sidebar makes ongoing work look ready for attention and hides it from the Working list.\n\n## Version or commit\n\nInstalled app version was not provided. Relevant source inspected at `8760d063e903406c8e8f695b0852c0a15fc1e00f`. Side chats were introduced in #26901, merged October 31, 2026.\n\n## Environment\n\nmacOS, T3 Code desktop app. The reported side chat used Opus 5.5 High.\n\n## Investigation notes\n\n- [`isThreadWorking`](https://github.com/pingdotgg/t3code/blob/8760d063e903406c8e8f695b0852c0a15fc1e00f/packages/client-runtime/src/state/threadInbox.ts#L6-L31) takes the thread's own runtime, run and attention state; it does not inspect side chats.\n- [`partitionSidebarThreads`](https://github.com/pingdotgg/t3code/blob/8760d063e903406c8e8f695b0852c0a15fc1e00f/apps/web/src/components/Sidebar.tsx#L626-L650) uses that Working classification to place the parent row.\n- [`isListedThreadLineage`](https://github.com/pingdotgg/t3code/blob/8760d063e903406c8e8f695b0852c0a15fc1e00f/packages/contracts/src/orchestrationV2.ts#L161-L163) excludes side chats from thread lists.\n\nThese are relevant investigation points, not a confirmed end-to-end root cause. The observed state comes from the user's screenshot; no additional live reproduction was performed while filing this issue.\n\n## Workaround\n\nOpen the parent thread and inspect the side chat directly.\n\nFiled on the user's behalf by GPT-6 through Pi in T3 Code.\n",
  "title": "[Bug]: Parent thread leaves Working while its side chat is still running",
  "url": "https://github.com/pingdotgg/t3code/issues/28659"
}
```

The baseline suffix prohibited GitNexus/Afterimage and required ordinary source/tests.
The GitNexus suffix required pinned read-only graph navigation plus source verification,
disposable package cache/registry/index, index-only operation, no setup/integration, measured
overhead, one bounded index attempt and at most one justified correction, and explicit
limitations if unsafe. Both prohibited reading another arm. These are treatment-specific
instructions, not identical navigation access.

## Exact treatment suffixes

Baseline:

```text

ARM=baseline. Use ordinary repository searches/source reads/tests only. Do not use GitNexus or Afterimage. Record task timing from start, exclude worktree preparation separately if observable.
```

GitNexus:

```text

ARM=gitnexus. Use GitNexus read-only graph navigation plus source verification; no Afterimage. Use disposable package cache and per-worktree index; no global npm installation, setup/integration commands, persistent editor/agent setup, or user-file writes. Official source/docs: https://github.com/abhigyanpatwari/GitNexus ; prefer official analyze --index-only path. Inspect version-specific source/help to ensure no persistent writes outside disposable cache/worktree; isolate GitNexus registry/home into disposable storage using a supported env option if needed. If impossible safely, report limitation and do not bypass. Pin and record exact version and commands. Separate package preparation/index timing from navigation/implementation task timing; measure index bytes/location and /usr/bin/time -v runtime/max RSS if possible, never estimate. Bound indexing to a single attempt plus at most one justified correction; do not change host limits. Record setup/index failures and graph calls, empty graph is not evidence of absence. No product dependency or generated index/cache committed. Read issue verbatim above. Record measurement output in /tmp/t3-gitnexus-28659/gitnexus-result.md. Do not inspect baseline-result.md or any other arm.
```
