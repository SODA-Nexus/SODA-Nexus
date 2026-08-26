# Editing the SODA Nexus website

Only four places matter for content edits. Front matter = the `key: value` block between the `---` lines. File names are never shown on the site.

## News — `_news/*.md`

- **Add:** copy a file, rename it, set `date`, write the announcement below the front matter.
- **Modify:** edit `date` or the announcement text.
- **Remove:** delete the file.

## Team — `_people/*.md`

- **Add:** copy a file, rename to `firstname-lastname.md` (becomes their URL). Fill in `name`, `role`, `role_group` (`faculty`/`phd`/`msc`/`intern`/`alumni`), `position`, `avatar_initials`, `avatar_gradient`. Write their bio below the front matter.
- **Modify:** edit any field or the bio. Optional fields (`email`, `office`, `since`, `socials`, `education`, `awards`) — copy the pattern from another profile that has them.
- **Publications:** shown automatically — a profile's Publications section lists every paper in `_publications` whose `authors` list includes that person's `slug` (see below). Nothing to edit here; add the person's `slug` to the paper instead. No papers yet? Shows "Creating papers as we speak."
- **Remove:** delete the file, or set `role_group: alumni` to move them to alumni instead.
- **Photo:** upload the image via GitHub, `assets/img/people` → "Add file" → "Upload files", then add `avatar_image: /assets/img/people/your-file.png` to that person's front matter — leading slash, no `https://`, no `/al-folio`. No photo yet? Leave `avatar_image` out entirely and the site shows their initials on `avatar_gradient` instead. **To remove a photo:** delete the `avatar_image` line (the file can stay in `assets/img/people`, it just won't be used).

## Team page banner — `_pages/team.md`

- Same pattern as a person's photo: upload to `assets/img/team`, set `photo: /assets/img/team/your-file.png`. `photo_caption` is the text shown over it.
- No banner yet? Leave `photo` out and the page shows a plain placeholder background.

## Publications — `_publications/*.md`

- **Add:** copy a file, fill in `title`, `venue`, `year`, `order`, `authors` (add `slug` to link a lab-member author to their profile), `pdf_url`, `abstract`, `keywords`.
- **Modify:** edit any field.
- **Remove:** delete the file. To just hide the download button without deleting the entry, set `pdf_url: "#"` — shows a greyed-out "N/A" button instead.
- **PDF already online** (arXiv, etc.): paste the link into `pdf_url`.
- **PDF you're hosting:** upload via GitHub, `assets/pdf` → "Add file" → "Upload files", then set `pdf_url: "/assets/pdf/your-file.pdf"` — leading slash, no `https://`, no `/al-folio`.
- **Thumbnail:** upload via GitHub, `assets/img/publications` → "Add file" → "Upload files", then add `image: /assets/img/publications/your-file.png` to that paper's front matter. Shows on the Publications page always, and on the home page's "Featured publications" if the paper is one of the 3 most recent. No image? Leave `image` out and it shows the plain placeholder. **To remove:** delete the `image` line.

## Page text — `_pages/index.md`, `about-lab.md`, `team.md`, `join.md`

Fixed pages — modify only, no add/remove:

- `about-lab.md`: `history` (timeline), `stats`, `values`, `funders`, `address` — each a list of labeled blocks; copy a block to add an entry, edit one to change it.
- Body text below the front matter uses HTML tags (`<p>`, `<b>`), not Markdown — edit in place, keep the tags.

## Publishing

Save on a branch → open a pull request → merge to `main` → live in a few minutes. Can't open a PR yourself? Send the edit to whoever maintains the site.
