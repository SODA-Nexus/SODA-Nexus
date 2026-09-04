# Editing the SODA Nexus website

Only four places matter for content edits. Front matter = the `key: value` block between the `---` lines. File names are never shown on the site.

## News — `_news/*.md`

- **Add:** copy a file, rename it (the filename itself doesn't matter — `date` decides order and grouping). Fill in:
  - `title` — the headline.
  - `date` (`YYYY-MM-DD`) — decides sort order and which year section the entry lands in on the News page.
  - `category` — exactly one of `Publication`, `Award`, `People`, `Partnership`, `Milestone`, `Other`. Shown as a colored tag and used by the News page's category filter buttons.
  - `excerpt` — 1-2 sentences. Shown on the News page and (for the 3 most recent entries) on Home's "Latest news".
- **Modify:** edit any field.
- **Remove:** delete the file.
- **Related people (optional):** a `people` list adds linked names below the summary on the News page (not shown in Home's compact list). Copy the pattern:
  ```yaml
  people:
    - name: Jane Doe
      slug: jane-doe
  ```
  `slug` must match that person's filename in `_people/` (without `.md`) — it links their name to their profile. Leave `slug` out (name only, no link) for someone who isn't a current lab member. Leave the whole `people:` list out if the entry isn't about anyone in particular.
- **Photo (optional):** upload via GitHub, `assets/img/news` → "Add file" → "Upload files", then add `image: /assets/img/news/your-file.png` to that entry's front matter — leading slash, no `https://`, no `/al-folio`. Only shows up if this entry is the single featured (most recent) one at the top of the News page — the year-grouped entries below it don't have an image slot. No photo? Leave `image` out and the featured slot shows the plain placeholder graphic instead. **To remove:** delete the `image` line.
- **Where entries show up:** Home's "Latest news" always shows the 3 most recent entries across every category. The News page (`/news/`) shows everything — the single most recent entry featured at the top, then the rest grouped by year (most recent year open, older years collapsed; click a year's row to expand or collapse it). The category filter buttons narrow the list to one category at a time, and automatically expand any collapsed year that still has a match after filtering. A year with more than 10 entries adds a "Load more" button rather than showing them all at once.
- **Lab history:** the timeline that used to live on the About page is now News entries tagged `category: Milestone` — add a new one the same way as any other entry.

## Team — `_people/*.md`

- **Add:** copy a file, rename to `firstname-lastname.md` (becomes their URL). Fill in `name`, `role`, `role_group` (`faculty`/`phd`/`msc`/`intern`/`alumni`), `position`, `avatar_initials`, `avatar_gradient`. Write their bio below the front matter.
- **Modify:** edit any field or the bio. Optional fields (`email`, `office`, `since`, `socials`, `education`, `awards`) — copy the pattern from another profile that has them. The sidebar box that holds these is narrow (sized to match the profile photo) — keep `office` and `since` to around 20 characters or less so the value doesn't wrap awkwardly.
- **Google Scholar:** a "Google Scholar" row always shows in the sidebar, below Email/Office/Since. Set `google_scholar_url` to their Google Scholar profile link and the row shows a "View profile" link. Leave it blank and the row shows "Creating as we speak" instead.
- **Highlighted publications:** a profile's "Highlighted Publications" section shows only the papers you list under `highlighted_publications` — up to 3, in the order you list them:
  ```yaml
  highlighted_publications:
    - 2026-far-loc
    - 2025-cross-project-fl
  ```
  Each entry is a paper's filename in `_publications` (no `.md`). Only the first 3 entries are used even if you list more. No papers yet? Leave the list empty (`highlighted_publications: []`) and the section shows "Creating papers as we speak." A person still needs their `slug` on the paper's `authors` list (see below) for the paper's own author byline to link back to them — `highlighted_publications` only controls what shows on their profile.
- **Remove:** delete the file, or set `role_group: alumni` to move them to alumni instead.
- **Photo:** upload the image via GitHub, `assets/img/people` → "Add file" → "Upload files", then add `avatar_image: /assets/img/people/your-file.png` to that person's front matter — leading slash, no `https://`, no `/al-folio`. No photo yet? Leave `avatar_image` out entirely and the site shows their initials on `avatar_gradient` instead. **To remove a photo:** delete the `avatar_image` line (the file can stay in `assets/img/people`, it just won't be used).

## Team page banner — `_pages/team.md`

- Same pattern as a person's photo: upload to `assets/img/team`, set `photo: /assets/img/team/your-file.png`. `photo_caption` is the text shown over it.
- No banner yet? Leave `photo` out and the page shows a plain placeholder background.

## Publications — `_publications/*.md`

- **Add:** copy a file, fill in `title`, `venue`, `year`, `order`, `authors` (add `slug` to link a lab-member author to their profile), `pdf_url`, `abstract`, `keywords`.
- **Modify:** edit any field.
- **Remove:** delete the file. To just hide the download button without deleting the entry, set `pdf_url: "#"` — shows a greyed-out "N/A" button instead.
- **Search & filter dropdowns:** the Publications page's Person, Field, and Year dropdowns are all generated automatically — nothing to maintain by hand. Person only lists people who have at least one paper with their `slug` in its `authors` list; Field lists every value that appears somewhere in a paper's `keywords`; Year lists every year in use.
- **PDF already online** (arXiv, etc.): paste the link into `pdf_url`.
- **PDF you're hosting:** upload via GitHub, `assets/pdf` → "Add file" → "Upload files", then set `pdf_url: "/assets/pdf/your-file.pdf"` — leading slash, no `https://`, no `/al-folio`.
- **Thumbnail:** upload via GitHub, `assets/img/publications` → "Add file" → "Upload files", then add `image: /assets/img/publications/your-file.png` to that paper's front matter. Shows on the Publications page always, and on the home page's "Featured publications" if the paper is one of the 3 most recent. No image? Leave `image` out and it shows the plain placeholder. **To remove:** delete the `image` line.

## Page text — `_pages/index.md`, `about-lab.md`, `team.md`, `join.md`

Fixed pages — modify only, no add/remove:

- `about-lab.md`: `stats`, `values`, `funders`, `address` — each a list of labeled blocks; copy a block to add an entry, edit one to change it. Lab history lives on the News page now (tag entries `category: Milestone`) — see the News section above.
- Body text below the front matter uses HTML tags (`<p>`, `<b>`), not Markdown — edit in place, keep the tags.

## Publishing

Save on a branch → open a pull request → merge to `main` → live in a few minutes. Can't open a PR yourself? Send the edit to whoever maintains the site.
