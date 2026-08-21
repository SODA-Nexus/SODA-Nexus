# Editing the SODA Nexus website

This guide is for people who update the words, bios, and lists on the SODA Nexus Lab website without writing code. If you have never used Jekyll or Git before, start here and read straight through.

This file is different from CLAUDE.md, which holds rules for coding tools and automated assistants working on this repository. This guide is written for content editors: people updating news, team bios, publications, and the lab's story on the About page by hand.

## What you need before you begin

You do not need to install anything to make a small text change. All you need is:

* A GitHub account with permission to edit this repository. Ask whoever manages the site if you are unsure whether you have this.
* A web browser.

If you would like to see a full working copy of the site before your change goes live, you will also want Docker Desktop, a free program described later in "Previewing your changes."

## How the site is organized

Content lives in plain text files inside this repository, grouped into folders by type. You will only ever need to open a few of these folders.

* News items live in the `_news` folder. They appear under "Latest news" on the home page and in full on the news page.
* Team member bios live in the `_people` folder. Each file covers one person and is shown on the Team page and on that person's own page.
* Publications live in the `_publications` folder. They make up the list shown on the Publications page.
* Lab history, mission text, and other page wording live in the `_pages` folder, inside files such as `about-lab.md`, `index.md`, `team.md`, and `join.md`.

Every file in these folders starts with a block between two lines that each read `---` on their own. That block is called front matter. Think of it as a small form: each line inside it is one labeled answer, written as `label: answer`. Everything below the second `---` is the part a visitor reads as ordinary text on the page.

You will only ever need to change the answer side of a front matter line, not the label side, unless a section below tells you otherwise.

## Editing news items

Each news item is one file inside `_news`, for example `_news/announcement_1.md`.

A news file looks like this:

```
---
layout: post
date: 2026-08-10 09:00:00-0600
inline: true
related_posts: false
---

The lab welcomes three new graduate students this fall.
```

Leave `layout`, `inline`, and `related_posts` as they are. The two parts you will change are:

* `date`, which follows the pattern year, month, day, then a time and time zone. It controls the order items appear in, newest first.
* The line of text below the second `---`, which is the announcement itself.

### Adding a new news item

1. Copy an existing file from `_news`.
2. Give the copy a new file name, for example `_news/announcement_4.md`. The file name itself is never shown on the site, so any short and unused name works.
3. Set `date` to when the announcement should appear as posted.
4. Replace the sentence below the front matter with your announcement.
5. Save your file, then see "Getting your changes published" below.

New items appear automatically under "Latest news" on the home page and on the full news page. No other file needs to change.

## Editing team member bios

Each team member has one file inside `_people`, named after them, for example `_people/abhishekh-jayaprakash.md`.

Open that file to change what it says. The front matter block near the top holds structured details. The paragraph below the second `---` is the biography shown on that person's own page.

The fields you are most likely to change are:

* `name`, the person's full name
* `role`, their title, for example "PhD Student"
* `role_group`, which group they are listed under on the Team page. It must be exactly one of: `faculty`, `phd`, `msc`, `intern`, or `alumni`
* `position`, the longer line shown under their name on their own page
* `avatar_initials`, the two letters shown inside their profile picture circle
* `avatar_gradient`, the background color behind those initials, written in CSS. The simplest way to set this is to copy the value from another profile whose color you like

Some profiles also include `email`, `office`, `since`, a list of `socials` (links to sites such as GitHub), `education`, `awards`, or a short list of `publications` shown only on that person's own page. To add one of these to a profile that does not already have it, copy the pattern from a profile that does, using the same labels and layout.

### Adding a new team member

1. Copy an existing file from `_people`, ideally one for a person in a similar role.
2. Name the new file after the person, using lowercase letters and hyphens, for example `_people/jane-smith.md`. This name becomes part of that person's web address, so avoid spaces and punctuation other than a hyphen.
3. Update every front matter field to the new person's own details, making sure `role_group` matches their actual group.
4. Replace the biography paragraph below the front matter.
5. Save your file, then see "Getting your changes published" below.

The person appears on the Team page automatically, grouped under the label matching their `role_group`. The Team page itself does not need to change.

To remove someone from the active team list, either delete their file or change their `role_group` to `alumni`, whichever fits.

## Editing publications

Each publication is one file inside `_publications`, for example `_publications/2026-far-loc.md`. These files hold only front matter and no separate page of their own; they feed the list on the Publications page.

The fields are:

* `title`, the paper's title
* `venue`, where it was or will be published
* `year`, which year group it appears under on the Publications page. Newer years are shown first
* `order`, a number controlling where the paper sits among others from the same year. Give each paper its own number, with 1 shown first
* `authors`, a list of names. If an author is also a lab member with a file in `_people`, add their `slug` too, matching that person's file name without the `.md` part, so their name links to their profile. If they are not a lab member, leave `slug` out and their name shows as plain text
* `pdf_url`, a link to the paper. Use `"#"` as a stand in if there is no link yet
* `abstract`, the short summary shown when a reader opens the entry
* `keywords`, a list of short tags used by the filter buttons on the Publications page

### Adding a new publication

1. Copy an existing file from `_publications`.
2. Name the new file something short and descriptive, for example `_publications/2027-my-new-paper.md`. The file name is never shown on the site.
3. Fill in every field above for the new paper.
4. Save your file, then see "Getting your changes published" below.

The paper appears automatically in the correct year group on the Publications page, already searchable and filterable.

## Editing lab history and other page text

Some page wording is not a news item, a person, or a publication. It lives directly in front matter inside files in `_pages`, including the lab's mission, its history timeline, and wording on the Home, Team, and Join pages.

The lab history timeline lives in `_pages/about-lab.md`, under `history`. Each entry looks like this:

```
history:
  - year: "2023"
    headline: "Lab founded"
    description: "SODA Nexus opens its doors at the University of Alberta."
```

To add an entry, copy one of these blocks, keep the same spacing, and fill in your own `year`, `headline`, and `description`. To edit an existing entry, change the text after the label on the line you want to update.

The same file also holds the lab's `stats` (the numbers near the top of the About page), `values`, `funders`, and `address`, each written as a list of small blocks in the same pattern. Edit these the same way: find the block you want to change, and edit the text after each label.

The paragraphs below the front matter in `_pages/about-lab.md`, `_pages/index.md`, and similar files use plain HTML tags such as `<p>` for a paragraph and `<b>` for bold text, rather than Markdown. Edit that text in place, keeping the surrounding tags where they are.

## Previewing your changes

There are two ways to check an edit before it goes live.

The simplest way needs no setup. Open the file on GitHub's website and start editing there. GitHub shows a Preview tab next to Edit for the plain text part of a file, so you can see how a paragraph will read. It will not show you the fully styled page, only the raw text.

To see the full page exactly as a visitor would, run the site on your own computer:

1. Install Docker Desktop and open it once so it is running in the background.
2. Open a terminal inside your copy of this repository.
3. Run:

   ```
   docker compose up
   ```
4. Once it finishes starting, open `http://localhost:8080/al-folio/` in your browser.
5. The page updates automatically each time you save a change to a content file.
6. When finished, close the terminal, or press Control and C together to stop it.

If this feels unfamiliar, skip it. It is entirely optional, and a maintainer can check your change once it is submitted.
