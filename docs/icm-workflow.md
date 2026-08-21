# ICM Workflow — Making Changes Through the Harness

Changes to this repo are driven through the **ICM agent harness**, which lives
in a separate repository at `/home/johnwilson/Desktop/icm`. This site is
onboarded there as client `codetalkers`.

## The client workspace

`/home/johnwilson/Desktop/icm/clients/client_codetalkers/` holds everything
the harness knows about this project:

```
IDENTITY.md / ROUTING.md      Workspace identity and task routing
00_retrieve/ … 04_consolidate/ Numbered pipeline stages (inputs/outputs)
_config/memory/semantic_facts.md   Durable project facts (stack, repo path, backlog)
_config/memory/guardrails.md       Hard rules (WCAG AA, token architecture, build gate)
_config/evals/                     Verification rubrics
episodic_logs/                     Immutable per-run audit traces
```

## The two-phase pipeline

**Phase 1 — context, plan, gate:**

```bash
python3 /home/johnwilson/Desktop/icm/_shared_library/_tools/pipeline_runner.py \
  --client codetalkers --prompt "<exact task description>"
```

This assembles a scoped working context, checks the prompt for ambiguity,
writes `01_plan/output/execution_plan.md`, and stops at Human Gate 1 for
approval. The runner does **not** execute the task.

**Execution:** the agent (Claude, Gemini, etc.) reads the working context and
plan, does the work in *this* repo, and records it:

- `02_execute/output/raw_output.md` — the deliverable/summary
- `02_execute/output/execution_trace.json` — every tool call, with status

**Phase 2 — verify, consolidate, archive:**

```bash
python3 /home/johnwilson/Desktop/icm/_shared_library/_tools/pipeline_runner.py \
  --client codetalkers --prompt "<same task description>" --finalize
```

Finalization runs deterministic self-verification over the real artifacts.
Only a verified run is consolidated into memory and archived to
`episodic_logs/`.

## Exit codes

| Code | Meaning |
|------|---------|
| 0 | Success (phase 1 ready for execution, or finalization passed) |
| 2 | Ambiguity gate — prompt too vague; refine with exact parameters |
| 3 | Verification failed, or Stage 02 artifacts missing — nothing archived |
| 4 | Human Gate 1 not approved (or non-interactive run without `--auto-approve`) |

## What the verifier flags

- **Completion claims without execution evidence** — a deliverable saying the
  work is done while the trace shows only context retrieval fails.
- **Ungrounded file citations** — backtick-quoted paths in the deliverable
  must exist in the assembled working context; invented paths fail.
- **Failed tool calls** left unhandled in the trace.
- **Hedge words** ("assumed", "probably", …) in the deliverable.

## Guardrails specific to this repo

From `_config/memory/guardrails.md` — every change must respect:

- `npm run build` and `npm run lint` both pass cleanly.
- WCAG AA contrast, 44×44px touch targets, `prefers-reduced-motion`.
- The plain-CSS token architecture — no UI frameworks, no CSS-in-JS.
- No API keys, client emails, or Formspree production IDs in stage outputs or
  git history.
- Explicit confirmation before deleting or mutating repository assets.

See [site-operations.md](site-operations.md) for the operational detail behind
each of these.
