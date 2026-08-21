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
