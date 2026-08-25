# Editing the SODA Nexus website

Only four places matter for content edits. Front matter = the `key: value` block between the `---` lines. File names are never shown on the site.

## News — `_news/*.md`

- **Add:** copy a file, rename it, set `date`, write the announcement below the front matter.
- **Modify:** edit `date` or the announcement text.
- **Remove:** delete the file.

## Team — `_people/*.md`

- **Add:** copy a file, rename to `firstname-lastname.md` (becomes their URL). Fill in `name`, `role`, `role_group` (`faculty`/`phd`/`msc`/`intern`/`alumni`), `position`, `avatar_initials`, `avatar_gradient`. Write their bio below the front matter.
- **Modify:** edit any field or the bio. Optional fields (`email`, `office`, `since`, `socials`, `education`, `awards`, `publications`) — copy the pattern from another profile that has them.
- **Remove:** delete the file, or set `role_group: alumni` to move them to alumni instead.

## Publications — `_publications/*.md`

- **Add:** copy a file, fill in `title`, `venue`, `year`, `order`, `authors` (add `slug` to link a lab-member author to their profile), `pdf_url`, `abstract`, `keywords`.
- **Modify:** edit any field.
- **Remove:** delete the file. To just hide the download button without deleting the entry, set `pdf_url: "#"` — shows a greyed-out "N/A" button instead.
- **PDF already online** (arXiv, etc.): paste the link into `pdf_url`.
- **PDF you're hosting:** upload via GitHub, `assets/pdf` → "Add file" → "Upload files", then set `pdf_url: "/assets/pdf/your-file.pdf"` — leading slash, no `https://`, no `/al-folio`.

## Page text — `_pages/index.md`, `about-lab.md`, `team.md`, `join.md`

Fixed pages — modify only, no add/remove:

- `about-lab.md`: `history` (timeline), `stats`, `values`, `funders`, `address` — each a list of labeled blocks; copy a block to add an entry, edit one to change it.
- Body text below the front matter uses HTML tags (`<p>`, `<b>`), not Markdown — edit in place, keep the tags.

## Publishing

Save on a branch → open a pull request → merge to `main` → live in a few minutes. Can't open a PR yourself? Send the edit to whoever maintains the site.
