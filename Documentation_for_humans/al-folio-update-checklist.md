# Keeping al-folio Up to Date

## Why there's no "merge from al-folio"

This site was created from al-folio's GitHub **template**, not a fork — so there's no shared git history and nothing to `git merge`. Al-folio ships as a set of versioned **gems**, pinned in the `Gemfile`. "Getting updates" means bumping those version numbers, not merging branches.

Do the check below **monthly**.

---

## 1. Check for new versions

```bash
docker compose exec web bundle outdated --group=al_folio
```

(Drop `--group=al_folio` to check all gems, but the al-folio ones are what matter here.)

## 2. Bump the version

Edit the `Gemfile` and update the version pin for whichever gem showed as outdated:

```ruby
gem "al_email_protect", "1.0.1"   # was 1.0.0
```

Then lock it in:

```bash
docker compose exec web bundle update al_email_protect
```

(Replace `al_email_protect` with whichever gem you bumped.)

## 3. Run the overrides audit

```bash
docker compose exec web bundle exec al-folio upgrade overrides audit
```

This checks whether the new gem version changed anything our custom files (`soda-lab.css`, `soda_*.liquid`) depend on or override.

## 4. Rebuild and smoke-test

```bash
docker compose down && docker compose up --build
```

Then confirm all six pages return `200`:

```bash
curl -sI http://localhost:8080/al-folio/ | head -1
curl -sI http://localhost:8080/al-folio/about/ | head -1
curl -sI http://localhost:8080/al-folio/team/ | head -1
curl -sI http://localhost:8080/al-folio/publications/ | head -1
curl -sI http://localhost:8080/al-folio/join/ | head -1
curl -sI http://localhost:8080/al-folio/team/jordan-whitfield/ | head -1
```

> Adjust the last URL to a real person-page slug, and double-check these paths against `_config.yml` the first time — `baseurl` and permalinks could differ from what's shown here. After that first check, it's copy-paste.

## 5. Commit

```bash
git add Gemfile Gemfile.lock
git commit -m "chore: bump al_email_protect 1.0.0 -> 1.0.1, overrides audit clean"
git push
```

---

## Quick reference

| Step               | Command                                                                       |
| ------------------ | ----------------------------------------------------------------------------- |
| 1. Check versions  | `docker compose exec web bundle outdated --group=al_folio`                    |
| 2. Bump + lock     | Edit `Gemfile`, then `docker compose exec web bundle update <gem>`            |
| 3. Audit overrides | `docker compose exec web bundle exec al-folio upgrade overrides audit`        |
| 4. Rebuild + test  | `docker compose down && docker compose up --build`, then `curl -sI` each page |
| 5. Commit          | `git add Gemfile Gemfile.lock && git commit -m "..." && git push`             |
