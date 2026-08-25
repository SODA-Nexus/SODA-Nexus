# Architecture (v1.x)

This is the **authoritative** description of how the `al-folio` v1 starter and its plugin gems fit together, and of who owns what. It is written for humans and coding agents alike. [`AGENTS.md`](../AGENTS.md) is the short entry point and links here. Everything in this file should exist in exactly one place — if you find it restated elsewhere, link here instead of copying.

## What the starter is

`al-folio` v1.x is a **thin Jekyll starter, not a theme**. This repo owns only:

- starter wiring (`Gemfile`, `_config.yml`),
- example/lab content (`_pages`, `_posts`, `_news`, `_people`, `_publications`),
- documentation (`docs/`, `Documentation_for_humans/`),
- cross-gem integration tests (`test/integration_*.sh`) and visual parity tests (`test/visual/`).

**All runtime — layouts, includes, Sass, Liquid tags, filters, and feature JS — lives in versioned gems** published independently on RubyGems and developed under the [`al-org-dev`](https://github.com/al-org-dev) organization.

The single most common mistake is editing runtime here. If a change is a layout, include, tag, filter, or feature behavior, it belongs in the owning gem. See the routing table in [`AGENTS.md`](../AGENTS.md#route-your-change) and the ownership table below.

## Failure modes that produce no error message

These three are the reason most "I changed it and nothing happened" reports exist. None of them raises a build error.

### 1. Features fail silently when the gem or the flag is missing

Feature gating is **two-layered**, and a feature renders only when _both_ layers agree:

- **Site-wide config flags** in `_config.yml`: `search_enabled`, `enable_math`, `enable_cookie_consent`, `enable_darkmode`, `al_folio.features.cv.enabled`, `al_folio.features.distill.enabled`, and the provider IDs under `analytics:`.
- **Per-page front matter**: `images:`, `tikzjax`, `chart.*`, `mermaid.*`, `giscus_comments`, `layout: distill`.

`al_folio_core` ships thin wrappers in `_includes/plugins/*.liquid` that call custom Liquid tags defined by the sibling gems. **When the owning gem is not in the plugin list, or the flag is off, the tag emits an empty string.** There is no warning, no missing-tag error, and no visual placeholder — the feature simply is not there.

When debugging a feature that "does nothing", check in this order:

1. Is the gem in **both** the `Gemfile` and the `plugins:` list in `_config.yml`? (See below.)
2. Is the site-wide flag on?
3. Does the page's front matter opt in?
4. Is the relevant `third_party_libraries` entry present with its SRI hash?

### 2. Gemfile and `_config.yml` are two lists that must agree

Plugin activation requires **two edits, in two files**:

- [`Gemfile`](../Gemfile), `group :al_folio_plugins` — the pinned dependency (for example `gem 'al_folio_core', '= 1.0.11'`).
- [`_config.yml`](../_config.yml), the `plugins:` list — the Jekyll activation entry.

A gem present in only one of them is inert. In the `Gemfile` only, Jekyll never loads it; in `plugins:` only, Bundler never installs it. Adding **or removing** a plugin means editing both. Note the spelling difference: repo directories use hyphens (`al-folio-core`), gem and plugin ids use underscores (`al_folio_core`).

### 3. This repo's effective baseurl is `/al-folio`

`_config.yml` sets `baseurl: /al-folio`, so a plain build picks it up:

```bash
bundle exec jekyll build --baseurl /al-folio
bundle exec jekyll serve            # http://localhost:4000/al-folio/  (note the path)
```

Passing `--baseurl` explicitly is redundant but harmless. What breaks the site is **blanking the baseurl out** — build with an empty baseurl and every asset and internal link resolves one path segment too high. The Docker entry point serves under `/al-folio` too. A build that "works" but renders unstyled is almost always a baseurl mismatch.

## Wrapper to tag to gem delegation

`al_folio_core` is the hub: `_config.yml` sets `theme: al_folio_core`, and the gem ships every base `_layouts/*.liquid` and `_includes/*.liquid`, the base theme JS/CSS, the `details` and `file_exists` tags, and the `hideCustomBibtex` and `remove_accents` filters. Its `_includes/plugins/*.liquid` wrappers delegate to tags owned by sibling gems:

| Wrapper / call site       | Liquid tag                                                   | Owning gem                                                                     |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| search assets             | `al_search_assets`                                           | `al_search` (Cmd-K ninja-keys palette; index built at build time from content) |
| comments                  | `al_comments`                                                | `al_comments` (Giscus + Disqus, front-matter gated)                            |
| cookie banner             | `al_cookie_styles` / `al_cookie_scripts`                     | `al_cookie` (consent-mode gating of analytics)                                 |
| icon `<link>`s            | `al_icons_styles`                                            | `al_icons` (FontAwesome/Academicons/Scholar Icons from CDN)                    |
| analytics                 | `al_analytics_scripts`                                       | `al_analytics` (GA/Cronitor/Pirsch/OpenPanel)                                  |
| math                      | `al_math_styles` / `al_math_scripts`                         | `al_math` (MathJax, pseudocode.js, TikZJax)                                    |
| charts                    | `al_charts_scripts`                                          | `al_charts` (Mermaid/Chart.js/ECharts/Plotly/Vega/Leaflet/diff2html)           |
| image tools               | `al_img_tools_styles` / `al_img_tools_scripts`               | `al_img_tools` (zoom, lightbox, sliders, galleries)                            |
| newsletter                | `al_newsletter_form` / `al_newsletter_scripts`               | `al_newsletter` (Loops.so signup)                                              |
| `<html>` attributes       | `al_rtl_html_attrs` / `al_rtl_styles`                        | `al_rtl` (page `lang` in an RTL script; `al_rtl.langs` overrides the set)      |
| email addresses           | `al_email_protect_styles` / `al_email_protect_scripts`       | `al_email_protect` (site `protect_email: true`)                                |
| marimo notebooks          | `al_marimo_styles` / `al_marimo_scripts` / `al_marimo_embed` | `al_marimo` (page `marimo: true`)                                              |
| `layout: cv`              | `al_folio_cv_render`                                         | `al_folio_cv` (RenderCV YAML + JSONResume)                                     |
| `layout: distill`         | `al_folio_distill_render`                                    | `al_folio_distill` (vendored, hash-pinned distillpub runtime)                  |
| citation badges           | `google_scholar_citations` / `inspirehep_citations`          | `al_citations`                                                                 |
| external posts            | (generator, no tag)                                          | `al_ext_posts` (RSS/URL ingestion into synthetic posts)                        |
| legacy Bootstrap behavior | (opt-in assets)                                              | `al_folio_bootstrap_compat`                                                    |
| upgrade/audit CLI         | `bundle exec al-folio …`                                     | `al_folio_upgrade`                                                             |

Most feature gems are Jekyll `Generator`s that inject their JS/CSS as static files at build time, **only when the feature is enabled**. Those assets are not committed to this repo — you will not find them under `assets/` in a fresh checkout, and they appear in `_site/` only for enabled features. Several load from pinned CDN URLs with Subresource Integrity hashes read from `third_party_libraries:` in `_config.yml`; bumping a library version means bumping its `integrity` hash in the same block. Do not vendor icon fonts or runtime JS back into starter paths to "fix" a missing asset — that is the silent-gating symptom above, not a packaging bug.

## The v1 config contract

`_config.yml` must keep the `al_folio` contract keys: `al_folio.api_version: 1`, `al_folio.style_engine: tailwind`, `al_folio.tailwind.{version,css_entry,preflight}`, `al_folio.distill.{engine,source}`. This is enforced twice — as build-time warnings by `al_folio_core`'s `:after_init` hook, and as **blocking** findings by `bundle exec al-folio upgrade audit` (CI: `upgrade-check.yml`). Do not remove these keys.

## Local overrides: your site vs. this repo

These two cases have **opposite** rules, and conflating them is a recurring source of confusion.

**In your own site** (a repo created from this template — this is that case for SODA Nexus): local overrides are fully supported. You may shadow any gem-owned file by adding the same path in your repo — `_layouts/bib.liquid`, `_includes/repository/repo.liquid`, `_sass/_variables.scss`, and so on, and your copy wins. Track them so future gem updates can flag drift:

```bash
bundle exec al-folio upgrade overrides audit
bundle exec al-folio upgrade overrides diff <path>
bundle exec al-folio upgrade overrides accept <path>
```

`overrides audit` records the owning gem, its version, and the upstream/local SHA256 in `.al-folio-overrides.yml`. Commit that file. When a later `bundle update` changes the upstream file, the audit marks your override stale. Fixes that would benefit everyone should be ported to the owning gem instead of kept as a local override.

Every `soda_*.liquid` layout and `soda-*.liquid` include in this repo is a net-new, site-specific file with no gem-owned counterpart — nothing to acknowledge in `.al-folio-overrides.yml` today.

**In the upstream `alshedivat/al-folio` starter repo itself** (not this fork): those directories must not exist at all — `npm run lint:style-contract` fails the build if the starter contains `_includes/`, `_layouts/`, `_sass/`, `_scripts/`, `assets/tailwind/`, `tailwind.config.js`, `assets/webfonts/`, or icon-font artifacts. That check ships to every site created from the template (this repo included), so it still runs here — it just passes because our `_layouts`/`_includes` are tracked, legal local overrides, acknowledged via the (empty) `.al-folio-overrides.yml` manifest.

## Bootstrap compatibility is opt-in and time-boxed

`al_folio.compat.bootstrap.enabled: true` (default `false`) activates `al_folio_bootstrap_compat`, which restores legacy `data-toggle` and Bootstrap-class behavior on the Tailwind-first v1 core. Supported through `v1.2`, deprecated in `v1.3`, removed in `v2.0`.

## Working on a gem alongside the starter

Plugin gems are developed as sibling checkouts next to this repo. Clone the gem repo beside your `al-folio` checkout, then point the `Gemfile` at your working copy and reinstall:

```ruby
gem "al_folio_core", path: "../al-folio-core"     # or git: / branch:
```

```bash
bundle install
bundle exec jekyll build --baseurl /al-folio
```

Revert the `Gemfile` to the pinned released version before committing — the pins in `Gemfile` are starter wiring and `test/style_contract.js` asserts some of them.

## Area-to-gem ownership

- `al-folio` (starter, this repo): example content, wiring, docs, integration harness.
- `al_folio_core`: shared layouts/includes/runtime primitives and upgrade contracts.
- `al_folio_distill`: Distill templates/runtime assets.
- `al_cookie`: cookie consent runtime assets and consent logic.
- `al_icons`: icon runtime loading (Font Awesome, Academicons, Scholar Icons).
- `al_search`: search runtime payload (`ninja-keys`, search setup/hotkey assets).
- Other `al-*` gems: feature-specific assets, tags, filters, and runtime behavior.

| Area                                                                                                                  | Owning repo/gem                                                      |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Base layouts, shared includes, publication card layout, repository cards, style/runtime primitives, upgrade contracts | `al-org-dev/al-folio-core` / `al_folio_core`                         |
| CV data rendering and CV layouts                                                                                      | `al-org-dev/al-folio-cv` / `al_folio_cv`                             |
| Distill layouts, tags, and Distill runtime assets                                                                     | `al-org-dev/al-folio-distill` / `al_folio_distill`                   |
| Bootstrap compatibility CSS/JS during the v1 transition window                                                        | `al-org-dev/al-folio-bootstrap-compat` / `al_folio_bootstrap_compat` |
| Upgrade audit/report/codemods                                                                                         | `al-org-dev/al-folio-upgrade` / `al_folio_upgrade`                   |
| Icons and icon-library loading                                                                                        | `al-org-dev/al-icons` / `al_icons`                                   |
| Search UI/runtime                                                                                                     | `al-org-dev/al-search` / `al_search`                                 |
| Publication/citation helper logic                                                                                     | `al-org-dev/al-citations` / `al_citations`                           |
| External post ingestion                                                                                               | `al-org-dev/al-ext-posts` / `al_ext_posts`                           |
| Analytics providers                                                                                                   | `al-org-dev/al-analytics` / `al_analytics`                           |
| Comments providers                                                                                                    | `al-org-dev/al-comments` / `al_comments`                             |
| Cookie consent UI/runtime                                                                                             | `al-org-dev/al-cookie` / `al_cookie`                                 |
| Image/lightbox helpers                                                                                                | `al-org-dev/al-img-tools` / `al_img_tools`                           |
| Math/TikZ runtime integration                                                                                         | `al-org-dev/al-math` / `al_math`                                     |
| Chart runtime integration                                                                                             | `al-org-dev/al-charts` / `al_charts`                                 |
| Newsletter form integration                                                                                           | `al-org-dev/al-newsletter` / `al_newsletter`                         |
| Right-to-left languages: document direction, RTL styling                                                              | `al-org-dev/al-rtl` / `al_rtl`                                       |
| Email obfuscation and click-to-copy addresses                                                                         | `al-org-dev/al-email-protect` / `al_email_protect`                   |
| marimo notebook embeds and runnable Python snippets                                                                   | `al-org-dev/al-marimo` / `al_marimo`                                 |

## Test ownership

- `al-folio` tests: visual regression/parity (`test/visual/**`), cross-gem integration checks (plugin toggles, compat wiring, upgrade smoke tests), starter wiring contracts only.
- Gem-local tests (`al-folio-core`, `al-folio-distill`, `al-*`): component correctness (tags, filters, generators), runtime asset packaging contracts, feature edge cases, migration/upgrade contract logic in the owning gem.

Do not duplicate gem-owned component correctness tests in `al-folio`, and do not add local starter copies of gem-owned runtime files unless intentionally overriding behavior (and acknowledging it, see above).

## PR triage playbook

- If a PR changes starter wiring/docs/content/tests only: keep it in `al-folio`.
- If a PR changes gem-owned runtime/component behavior: redirect/port to the owning gem repo.
- If a PR introduces a feature without an owner: create a plugin proposal issue, recommend a standalone plugin repo, close/redirect the starter PR with references.
