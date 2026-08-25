# Documentation index

Two folders, two audiences:

- [`Documentation_for_humans/`](../Documentation_for_humans/) — for content editors. No coding or Jekyll knowledge needed.
  - [Editing Guide](../Documentation_for_humans/EDITING_GUIDE.md): add/modify/remove reference for news, team bios, publications, and page text.
  - [Update checklist](../Documentation_for_humans/al-folio-update-checklist.md): the monthly routine for bumping `al-*` gem versions.
- `docs/` (this folder) — technical reference for coding agents and anyone touching starter wiring or gem boundaries.
  - [Architecture](ARCHITECTURE.md): how the starter and its plugin gems fit together, the failure modes that produce no error message, the v1 config contract, local overrides, and the area-to-gem ownership table.
  - [Contributing](CONTRIBUTING.md): PR routing, validation commands, and agent tooling.

See [`AGENTS.md`](../AGENTS.md) if you are a coding agent — it is the authoritative entry point and links into `ARCHITECTURE.md` for the long-form detail.

## v1 plugin system

`al-folio` v1.x is a thin starter: it owns site wiring, lab content, documentation, and tests. Runtime behavior lives in Ruby gems maintained under [`al-org-dev`](https://github.com/al-org-dev). When changing feature behavior, route the work to the owning plugin repo first; update this starter only for `Gemfile` pins, `_config.yml` activation/flags, or docs/tests. See [Architecture](ARCHITECTURE.md) for the full ownership table.
