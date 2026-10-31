# Afterimage native MCP evaluation — 2026-10-31

## Executive verdict

**OPTIONAL.** Latest staged native Afterimage repaired callable discovery, but did not improve this pilot’s scored agent answers. Both arms scored 14/14; B took 126.436 seconds versus A’s 90.699 seconds and used 15 substantive calls versus 10. This is a report on a staged PR #27 binary in an isolated worktree of the same T3Code project. It is not a root-install rollout receipt. Root promotion is BLOCKED: attached native clients remain, and low CPU is not evidence that their sessions are quiescent. No running executable or root graph was replaced.

## Scope and provenance

Repository: redxzeta/t3code. Source/main at inspection: 15fe2832727893cbdd2214383f9f971474849695, clean root and evaluation worktree. Registered project identity and canonical repository matched. Afterimage candidate: e59380d3c7cff5f6e7a28c85b0164ec6451a5c62, verified current afterimage-main tip through GitHub. Source was exported with git archive to a temporary build area; no Afterimage checkout changes, commit or PR. Version string 3.2.16 does not distinguish revisions: use source SHA and binary SHA-256.

The installed root binary remains source 17360376eb385ecb1f0716f799c7eca415615205. Its graph has 6,667 files, 166,491 symbols, 32,583 CALLS and 202 INHERITS. The historical unresolved count is 460,487; it is not an accuracy denominator. Native get_stats reports freshness unknown and all SCIP stages NOT_REQUESTED. The evaluation worktree initially returned PROJECT_NOT_INDEXED; root graph selection was explicit for old-install diagnostics only.

## Safety and rollout

Initial capacity was about 58 GiB available RAM and 1 TiB available disk; no GPU inference was started. A native supervisor/worker was observed before staging. The root configuration, binaries and graph were fingerprinted. Versioned candidate executables and a separate HOME were used for new evaluation clients; the worktree received a dedicated full AST-only graph. The parent retained its original native client. A temporary ignored worktree configuration selected the candidate only for fresh child sessions, then was restored and verified. This does not establish fresh root rollout or automatic graph inheritance for arbitrary worktrees.

Protocol smoke validation listed exactly ten tools: diagnose, search_symbols, get_symbols_in_file, get_stats, trace_callers, trace_callees, transitive_impact, get_code_snippet, symbol_context, get_file_deps. An attempted index tool returned READ_ONLY_TOOL_DENIED. This explicit subprocess smoke check is supporting protocol evidence, not counted as native agent usage. B’s actual native queries are separately evidenced by its T3 tool timeline in the appendix.

No global configuration, service, listener, watcher, schedule, permission, app source, dependency, deployment mechanism or other project was added or changed. Read-only describes graph/tool behavior; local startup/build/index logs and the explicitly requested index are writes. Root rollout remains a separate operation requiring sessions to finish and a fresh quiescence check.

## Frozen design

Source commit: `15fe2832727893cbdd2214383f9f971474849695`. Three tasks, two fresh agents, Sol high, same worktree source snapshot. A order: T1/T2/T3; B order: T3/T2/T1. Each arm: at most 24 tool invocations and eight minutes; source reads only, no edits/tests/provider turns. B must actually invoke named native MCP tools and verify source. A is instructed not to query graph, but MCP remains advertised: not strict no-access isolation. No answers or gold were supplied to agents. One thread per arm means task carryover within an arm; no independent per-task latency estimate. Sequential execution means cache/load effects are uncontrolled.

Frozen design SHA-256: `933c8437afcc6118a1acee38836ae06f2b0f6b37b1dd2e37dc46d2758ebd1893`. One point per correct source-backed assertion, five maximum per task; definitive false relationship subtracts one (floor zero). Invalid: wrong commit, source edits, budget exceeded, leaked answers, B without successful native query or wrong graph/version; incomplete tasks invalid separately.

**Rubric defect discovered from A:** T1 assertion 1 expects `thread.turn.start`, but this checkout dispatches `message.dispatch`. Exclude that assertion from both arms, retaining the original frozen wording below. T1 denominator is four, not five; this is a disclosed post-freeze adjudication, not a corrected pre-registered rubric. Overall denominator is 14.

### T1

Trace an actual app turn from client startThreadTurn through server command persistence to provider execution. Name the concrete command/event/outbox boundaries and cite source lines. Explain why graph edges alone cannot prove dispatch ordering. Do not run a provider turn.

Frozen gold assertions:

- startThreadTurn builds thread.turn.start and dispatches via environment API
- Orchestrator decides events and provider-turn.start outbox effect
- event sink commits before effect execution
- EffectWorker executor routes provider-turn.start through providerTurnStart.start to provider execution
- source citations and explicit limits of static edges

### T2

Inspect Effect.fn readTask and Effect.fnUntraced runOnce ownership in the MCP service and effect worker. Identify real direct callers, what runOnce does with no claimed effect, and a runtime member call that must not be presented as a proven cross-file edge. Cite exact source; distinguish absent graph edges from absent calls.

Frozen gold assertions:

- readTask owned by OrchestratorMcpService.ts named Effect.fn
- awaitTask calls readTask on timeout; taskStatus exposes readTask
- runOnce owned by EffectWorker.ts fnUntraced, drain invokes it
- no claimed effect returns false; runRecoveryOnce invokes true
- outbox.claimNext or Effect.exit is not a proven lexical cross-file target

### T3

Assess blast radius of changing effect-worker settlement after executor success: trace claim, cancellation and success/lease-loss paths, identify relevant existing tests, and explain whether retrying a process-bound effect after settlement failure is safe. Cite source and uncertainties; propose no edits.

Frozen gold assertions:

- runOnce claims and arms cancellation before durable recheck
- execution races cancellation and clears cancellation
- outbox.succeed false checks cancellation then lease error
- recoverPostSuccessSettlement distinguishes process-bound terminalize vs requeue
- focused EffectWorker tests cited; static graph not exhaustive

## Matched agent results

Both arms completed at the pinned commit, clean before and after, within the eight-minute and 24-invocation budgets. No source changes or cross-arm answer sharing were observed. Parent-bound native T3 capabilities identified the actual parent thread before delegation; no credentials were fabricated. Each child received only its arm prompt, with the same inherited `gpt-6.1-sol` / `reasoningEffort=high` selection. These were fresh sessions in the same isolated T3Code worktree, not Afterimage-project agents. The worktree initially inherited the installed local configuration; B loaded its temporary candidate override in a fresh session. Arbitrary new worktrees still inherit the old root installation and have no automatic local graph.

| Task | Source-only A | Native-assisted B | Evidence / adjudication |
| --- | ---: | ---: | --- |
| T1: actual app turn | 4/4 | 4/4 | Both traced `message.dispatch`, event/outbox transaction, worker and runtime session; defective first gold assertion excluded |
| T2: wrapper ownership | 5/5 | 5/5 | Both found real callers, empty-claim behavior and dynamic receiver limits; B explicitly caught missing graph edges |
| T3: settlement impact | 5/5 | 5/5 | Both traced cancellation, lease checks and replay-safe recovery, citing existing tests without claiming they ran |
| Total | 14/14 | 14/14 | Three accuracy ties; zero accuracy wins/losses for B |

| Arm-level measurement | A | B |
| --- | ---: | ---: |
| T3 run start (UTC) | 21:53:06.025 | 21:59:29.000 |
| T3 run completion (UTC) | 21:54:36.724 | 22:01:35.436 |
| Full run wall time, seconds | 90.699 | 126.436 |
| Audited shell command executions | 10 | 8 |
| Audited native Afterimage queries | 0 | 7 |
| Substantive tool calls | 10 | 15 |
| Invocations including `functions.exec` wrappers | 20 | 23 |

B took **35.737 seconds longer (+39.4%)** and **five more substantive calls (+50%)**. The wrapper-inclusive difference is three, because A used ten orchestration wrappers and B eight. Counts are not individual shell statements: one shell batch may contain several commands. The complete activity pages contain ten command-execution items for A and eight command-execution plus seven dynamic-tool items for B. No activity pages were omitted. Captured activity text was truncated for nine A items and seven B items; all seven native call records are complete. Counts and timing are auditable, but this is not a complete untruncated shell transcript.

The agents' own 46-second and 53-second start/end intervals ended before final-answer synthesis. They are **not** full run latency. The table uses T3 orchestration `startedAt` through `completedAt`, which includes synthesis and completion overhead. Per-task latency, model tokens, dollar cost, and causal query overhead are UNKNOWN. These are one arm-level latency loss and one tool-overhead loss for B, not three independent latency observations.

The staged native path is valid: B's timeline contains real `afterimage.*` dynamic-tool inputs and returned text, not shell-protocol calls. Candidate supervisor/worker executable hashes matched the staged binary. Source was externally fingerprinted across 29,041 tracked files, and checked unchanged after the runs. Both graph receipts share indexed-file fingerprint `7cfbd5613c9e13aa07aa358afa014d3ba92c0b781de4cb47e2fe2a16341181ef`. Native freshness nevertheless reports UNKNOWN: the external manifest establishes this experiment's source snapshot, not a general freshness guarantee.

## Exact native calls and useful evidence

`path` below is the explicit evaluation checkout, sanitized as `$EVAL_CHECKOUT`. The [evidence appendix](afterimage-native-mcp-2026-10-31.evidence.json) contains all seven complete sanitized native input/output records, full arm answers, source links, frozen design, hashes, timing and validation receipts.

| Order | Actual native tool | Other arguments | Returned evidence |
| --- | --- | --- | --- |
| 1 | `mcp__afterimage__get_stats` | `path` | 166,491 symbols; 41,217 CALLS; 6,667 files |
| 2 | `mcp__afterimage__search_symbols` | `query: runOnce, limit: 8` | Exact worker-owned callable ID |
| 3 | `mcp__afterimage__symbol_context` | `symbol_id: apps/server/src/orchestration-v2/EffectWorker.ts::runOnce` | `layerWithOptions` caller and nine local/imported helper callees |
| 4 | `mcp__afterimage__search_symbols` | `query: readTask, limit: 5` | Service callable distinguished from peer `readTask` |
| 5 | `mcp__afterimage__trace_callers` | `symbol_id: apps/server/src/mcp/OrchestratorMcpService.ts::readTask` | `awaitTask` and `waitForTask` |
| 6 | `mcp__afterimage__search_symbols` | `query: startThreadTurn, limit: 3` | Truncated search; UI variables ranked before shared runtime operation |
| 7 | `mcp__afterimage__symbol_context` | `symbol_id: apps/web/src/components/chat/useComposerSend.ts::startThreadTurn` | `onSend` caller; no callee connection through command wrapper |

The graph was useful for symbol location and recovering helper ownership hidden by Effect wrappers. B used eight shell batches versus A’s ten, plus seven native queries; the pilot does not isolate the cause of the difference. It did not improve the scored answers or reduce end-to-end time. The UI search/context detour did not solve the end-to-end dispatch question; source reading remained necessary. B also guessed a nonexistent test filename and encountered truncated shell output. A's shell evidence likewise required bounded reads. This supports optional, question-driven discovery rather than mandatory graph use.

## Reliability, correctness and source evidence

The staged CLI independently classified both target symbols as `Function`; the old installed native search classified service `readTask` as `Variable` and its native caller query returned no callers. These observations bind different binaries/graphs and are kept separate from the A/B comparison, which compares source-only against the latest staged native candidate, not old-agent against new-agent performance.

The fresh full graph has 6,667 files, 166,491 symbols, 41,217 CALLS and 202 INHERITS. Indexing reports 551,028 cross-file calls, 99,613 resolved and 452,183 unresolved, retaining the implementation's labels. These counters need not form a unique-call partition; they are not precision/recall. The old retained graph has 32,583 CALLS and historical unresolved count 460,487. The full new unresolved decrease is 8,304; it must not be confused with the earlier four-source subset's 947→906 result.

Supplemental exact Cypher queries found no worker-source edges to symbols named `max`, `min`, `exit`, `claimNext` or `execute`. Thus the previously problematic `Math.max/min` and `Effect.exit` cross-file relationships stay absent in this targeted regression query. This is an absence claim only within that graph/query scope, not proof that every graph relationship is correct. No false edge was demonstrated among the inspected native results; **overall precision and recall remain UNKNOWN**.

Important misses remain. Native callers for `readTask` list two named wrappers, while source also invokes it from `delegateTask`, `taskStatus`, `cancelTask`, `readThread` and stream callbacks. Worker context omits service-object calls including `outbox.claimNext`, `executor.execute` and `outbox.succeed`. Its one indexed caller does not enumerate all `drain`/object-initializer call sites. These gaps are expected boundaries of this AST analysis, not grounds to claim no callers or no impact.

Source anchors at the evaluated commit:

- [Actual client dispatch](https://github.com/redxzeta/t3code/blob/15fe2832727893cbdd2214383f9f971474849695/packages/client-runtime/src/operations/commands.ts#L733) and [server plan commit](https://github.com/redxzeta/t3code/blob/15fe2832727893cbdd2214383f9f971474849695/apps/server/src/orchestration-v2/Orchestrator.ts#L13408).
- [Transactional event/outbox commit and post-commit notification](https://github.com/redxzeta/t3code/blob/15fe2832727893cbdd2214383f9f971474849695/apps/server/src/orchestration-v2/EventSink.ts#L635).
- [readTask definition](https://github.com/redxzeta/t3code/blob/15fe2832727893cbdd2214383f9f971474849695/apps/server/src/mcp/OrchestratorMcpService.ts#L1437), [named timeout caller](https://github.com/redxzeta/t3code/blob/15fe2832727893cbdd2214383f9f971474849695/apps/server/src/mcp/OrchestratorMcpService.ts#L1670), and [additional source callers](https://github.com/redxzeta/t3code/blob/15fe2832727893cbdd2214383f9f971474849695/apps/server/src/mcp/OrchestratorMcpService.ts#L2417).
- [runOnce claim/cancellation/execution/settlement](https://github.com/redxzeta/t3code/blob/15fe2832727893cbdd2214383f9f971474849695/apps/server/src/orchestration-v2/EffectWorker.ts#L740), [recovery distinction](https://github.com/redxzeta/t3code/blob/15fe2832727893cbdd2214383f9f971474849695/apps/server/src/orchestration-v2/EffectWorker.ts#L729), and [local invocations](https://github.com/redxzeta/t3code/blob/15fe2832727893cbdd2214383f9f971474849695/apps/server/src/orchestration-v2/EffectWorker.ts#L853).
- [Process-bound settlement regression test, inspected not run](https://github.com/redxzeta/t3code/blob/15fe2832727893cbdd2214383f9f971474849695/apps/server/src/orchestration-v2/EffectWorker.test.ts#L460).

## Build, index and validation cost

| Operation | Result | Wall seconds | Sampled process-group peak RSS, KiB |
| --- | --- | ---: | ---: |
| Offline locked candidate CLI/MCP build, two jobs | PASS, exit 0 | 176.73 | 1,920,972 |
| Focused callable/import/caller/member tests | PASS, 23 passed / 0 failed | 85.88 | 1,913,700 |
| Full T3Code AST-only index, two pinned CPU cores | PASS, 6,667 files | 268.59 | 1,707,028 |
| Candidate tools/list + denied index smoke | PASS, exit 0; ten tools | Not timed | Not sampled |
| Exact classification/caller/body/forbidden-edge queries | PASS, four queries, exit 0 | Not timed | Not sampled |
| Worktree override rollback + root artifact hashes | PASS, all four assertions | Not timed | Not sampled |
| `vp run check:changed` | UNAVAILABLE, exit 127: `vp: command not found` | Not applicable | Not applicable |

Builds used an existing offline toolchain/dependency cache and shared build cache, not a cold install. Source was exported into an isolated temporary area. No dependency download or Afterimage source modification was performed. Tests and indexing overlapped, so their durations must not be summed as total setup wall time. The cap was 1,200 seconds / 6 GiB sampled process-group RSS per command; no cap fired. Sampling can miss short memory spikes. Candidate binaries occupy about 460 MiB together and the isolated graph about 99 MiB. A single observed native worker RSS sample was about 356 MiB, not its peak or a cross-arm measurement. No GPU inference was used.

All five compiler stages report `NOT_REQUESTED`; no SCIP enrichment was attempted. No T3Code behavior tests, app build, UI verification, real provider execution or full Afterimage suite were run. The deliverable changes documentation/evidence only. The task did not dispatch Actions directly and used `[skip ci]` to suppress ordinary CI. However, opening/updating the PR automatically starts the existing `pull_request_target` PR Size and PR Vouch metadata workflows, which ignore that marker. The requested zero-Actions condition was therefore not achieved. Cancellation was requested for the task-owned runs; some setup jobs had already succeeded. No app test/build success is inferred. Workflow settings and permissions were preserved. Document JSON/schema consistency, source citation bounds, sanitized path/secret-pattern scans and `git diff --check` are checked locally before publication. Local document validation passed: frozen design hash, both timing/score/call receipts, seven exact native query paths, all rollback assertions, privacy-pattern scan, 55 source citation bounds, Markdown fences/local appendix link, and staged `git diff --check`. Markdown formatter/check-changed tooling is unavailable in this checkout.

## Agent discovery policy

Start with rg or the language server for a known file, exact call site, dynamic receiver, current worktree edit, or an ordering/safety question. Query Afterimage when the file is unknown, a symbol has a wide static caller/dependency surface, or a callable wrapper obscures ownership. First verify exact checkout, source revision and graph receipt; search symbols, copy the exact symbol_id, then request one bounded callers/context/impact view. Stop expanding when graph information repeats the source or fails to bind a receiver. Verify every material relationship in current source. Missing edges and empty impact are not evidence that a change is isolated.

PR #27 recognizes import-bound Effect.fn with a literal name and inline generator, and Effect.fnUntraced with an inline generator. The implementation deliberately abstains for ambiguous declaration names and local Effect receiver bindings, even harmless sibling shadows. It does not resolve arbitrary service-object methods, runtime adapter selection, transaction order or cancellation behavior. Avoid requiring graph calls for every task.

## Limitations

Three related tasks, two agents and one run per arm are a pilot, not a population estimate. The known wrapper regression is deliberately represented, so selection favors the candidate. There is no independent task timing, distribution of latencies, token/cost telemetry, strict tool isolation, natural optional-use trial, cold-cache control, or application behavior execution. Both arms may use shell/rg; only B is required to use graph. Counterbalanced task order does not eliminate within-arm learning or sequential cache effects. The evaluator knew the fix and graded answers; no blinded independent scoring was performed. The defective T1 gold assertion weakens pre-registration. AST-only coverage, unresolved calls, unknown freshness and truncated responses prevent any full-graph precision/recall claim.

The earlier post-#25 pilot is user-provided historical context: source-only/graph-assisted ties at 9/10 and 10/10, with graph arms slower by 26.655 and 50.878 seconds and +5/+51 audited actions. It used a shell bridge, not native MCP, and preceded #27. It is not a control group for this evaluation and has not been independently re-audited here.

## Prioritized next steps

1. Keep usage optional; do not infer operational safety or exhaustive impact from CALLS edges.
2. Before root rollout, finish attached sessions and obtain a fresh client/process ownership check. Stage immutable binaries and a separate graph again, verify exact hashes/ten tools, then switch project-local configuration for fresh sessions and run a native query against the explicitly intended graph. Recheck rollback first. Do not restart T3 or change global permissions.
3. If further measurement is worthwhile, repair and re-freeze the rubric, add unrelated tasks, obtain more matched runs and optional-use adoption trials, and separately measure discovery, source verification, answer synthesis and setup cost. Do not expand infrastructure to collect this pilot.

## Rollback and reproduction

The private runbook retains original project/worktree configuration and hashes. Rollback for this evaluation restores only its temporary worktree override atomically, preserves existing stdio clients and versioned executables until their owners close, and verifies root configuration/binary/graph hashes. No root rollout occurred, so there is no root binary rollback to perform. Public logs intentionally omit machine paths, hidden configuration contents, private thread identities and raw operational transcripts.

For reproduction in a fresh isolated checkout of the same repository, pin the T3Code commit and export the Afterimage merge commit to a separate build area. Build with `cargo build --offline --locked --no-default-features -p infigraph-cli --bin infigraph -p infigraph-mcp --bin infigraph-mcp -j 2`. Run `cargo test --offline --locked -p infigraph-core --test effect_callables --test typescript_members --test typescript_imports --test typescript_callers -j 2`. From the T3Code checkout use the versioned CLI with `-r "$PWD" index --ast-only --full`, bounded to two threads/cores and 6 GiB sampled process-group RSS. Have the owning operator select that executable for new project-local native clients, never overwrite an attached executable. Re-run the frozen prompts in separate same-model/effort sessions and collect orchestration timestamps and tool activity. A CLI/stdin client is sufficient for protocol smoke tests, never for claiming agent-native use.

## Artifact hashes

| Executable | SHA-256 |
| --- | --- |
| infigraph | `dc071f10d3d7df4a0a89c6b203010324387a39f06d5a9c62642fd9be05558ebf` |
| infigraph-mcp | `94613797957e626cfbfaa5e16a8f749d106e855537cdea1b700b5c40a1152f93` |

The evidence appendix also records graph hash, source-manifest hash, original prompt hashes and private-receipt digests. Sanitized bytes differ from the original private receipts; those digests identify the private originals, not a publicly reconstructible full transcript.

Produced by gpt-6.1-sol (high), Codex harness in T3 Code.
