const { test, expect } = require("@playwright/test");
const { preparePage, stabilizeVisuals } = require("./helpers");

// Every soda_*.liquid page shares one .soda-nav and one .soda-footer, laid
// out via .soda-page's CSS Grid shell (assets/css/soda-lab.css). Neither
// should ever change height based on how much content sits between them —
// if either does, the shell has regressed into coupling header/footer
// height to content height, which is exactly what happened once before
// under a flexbox version of this layout: html,body{height:100%} made
// .soda-page a fixed-height flex container, and .soda-nav — the flex item
// with overflow:hidden, whose automatic minimum size is therefore 0 instead
// of content-based — was crushed to zero height on any page taller than one
// viewport. CSS Grid's `auto` row tracks don't have that shrink-to-overflow
// behavior, but this test exists so a future edit that reintroduces it (or
// reverts to flexbox) fails loudly instead of waiting for a screenshot.
const PAGES = [
  "/al-folio/",
  "/al-folio/about/",
  "/al-folio/team/",
  "/al-folio/publications/",
  "/al-folio/join/",
  "/al-folio/people/an-ran-chen/",
  "/al-folio/news/",
];

test("nav and footer render at a constant height on every page, regardless of content length", async ({ page }) => {
  await preparePage(page, "light");

  const navHeights = [];
  const footerHeights = [];

  for (const path of PAGES) {
    await page.goto(path, { waitUntil: "networkidle" });
    await stabilizeVisuals(page);

    const navBox = await page.locator(".soda-nav").boundingBox();
    const footerBox = await page.locator(".soda-footer").boundingBox();

    expect(navBox, `.soda-nav should render on ${path}`).not.toBeNull();
    expect(footerBox, `.soda-footer should render on ${path}`).not.toBeNull();

    navHeights.push(navBox.height);
    footerHeights.push(footerBox.height);
  }

  const [expectedNav] = navHeights;
  const [expectedFooter] = footerHeights;

  navHeights.forEach((height, i) => {
    expect(height, `.soda-nav on ${PAGES[i]} is ${height}px, expected ${expectedNav}px (same as ${PAGES[0]})`).toBeCloseTo(expectedNav, 0);
  });
  footerHeights.forEach((height, i) => {
    expect(height, `.soda-footer on ${PAGES[i]} is ${height}px, expected ${expectedFooter}px (same as ${PAGES[0]})`).toBeCloseTo(expectedFooter, 0);
  });
});

test("footer sits flush with the viewport bottom on a short page (Join)", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/join/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const footerBox = await page.locator(".soda-footer").boundingBox();
  const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);

  expect(footerBox).not.toBeNull();
  // The footer's bottom edge should land at the end of the document — no
  // trailing white gap below it, and no overlap that would put it past the
  // document's own reported height.
  expect(footerBox.y + footerBox.height, `footer bottom edge vs. document height (${documentHeight}px)`).toBeCloseTo(documentHeight, 0);
});

test("footer appears after all content on a long page (Publications), not mid-scroll", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/publications/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const contentBox = await page.locator(".soda-content").boundingBox();
  const footerBox = await page.locator(".soda-footer").boundingBox();

  expect(contentBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  // The footer must start at or after the bottom edge of .soda-content —
  // never overlapping it, never floating above the end of the real content.
  expect(footerBox.y, `footer top (${footerBox.y}px) vs. content bottom (${contentBox.y + contentBox.height}px)`).toBeGreaterThanOrEqual(
    contentBox.y + contentBox.height - 1
  );
});
