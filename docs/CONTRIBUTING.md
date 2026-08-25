# Contributing

## Repository routing (v1.x)

`al-folio` is a thin starter in `v1.x`. Before opening a PR, route your change to the owning repo:

- `al-folio` (this repo): starter wiring (`Gemfile`, `_config.yml`), lab content, documentation, visual tests, cross-gem integration tests.
- `al-folio-core` and other `al-*` gem repos: component runtime behavior, layouts/includes/style primitives, feature logic, unit/component tests.
- If a feature does not fit an existing plugin, it needs a new plugin, not a starter-local workaround.

For the change-type routing table, see [`AGENTS.md`](../AGENTS.md#route-your-change). For the authoritative area-to-gem mapping and PR triage playbook, see [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Local validation

Before opening or updating a PR:

```bash
bundle install
npm ci
npm run lint:prettier
npm run lint:style-contract
bundle exec jekyll build --baseurl /al-folio
```

If your change touches plugin wiring or feature behavior, run the integration tests it affects — all seven are gated by `unit-tests.yml`:

```bash
bash test/integration_comments.sh
bash test/integration_plugin_toggles.sh
bash test/integration_distill.sh
bash test/integration_bootstrap_compat.sh
bash test/integration_upgrade_cli.sh
bash test/integration_css_minify.sh
bash test/integration_new_plugins.sh
```

If your change touches visual tests, install Playwright once and run `npm run test:visual` (`npx playwright install chromium webkit` first).

The full validated command set lives in [`AGENTS.md`](../AGENTS.md#validated-local-command-set).

## Test ownership

- `al-folio` (this repo): visual regression + cross-gem integration + starter wiring contracts.
- Gem repos (`al-folio-core`, `al-folio-distill`, `al-*`): component correctness/unit tests and asset/runtime contract checks.

Do not add duplicate component-level correctness tests to this starter when the component is gem-owned. See [`ARCHITECTURE.md`](ARCHITECTURE.md#area-to-gem-ownership).

## AI agent guidance

This repository carries agent entry points for Claude, Codex, and Copilot. `CLAUDE.md` imports `AGENTS.md` — the shared, ecosystem-neutral entry point every agent should read first (change routing, the gem-ownership stop sign, the three silent failure modes, the validated command set). Repo-local skills for common workflows live in `.agents/skills/` (symlinked into `.codex/skills/` and `.claude/skills/`). GitHub Copilot's own entry point (`.github/copilot-instructions.md`) is a thin pointer to `AGENTS.md` for the same reason — so the rules live in one place instead of drifting apart across tools.

Whatever agent makes a change, review it before applying: check that modifications fit the routing rules above, test locally, and verify YAML/Markdown/Liquid syntax before committing.

## License

By contributing to al-folio, you agree that your contributions will be licensed under the LICENSE file in the root directory of the source tree.
