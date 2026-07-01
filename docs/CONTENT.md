# Editing the Website Content

This guide is for **non-technical editors** (board members, volunteers). You can
update most of the website without writing any code. You only edit simple text
files; when you save, the website rebuilds itself and the changes go live in a
minute or two.

> **You do not need to install anything.** All of this can be done from your web
> browser on GitHub. (Ask whoever set up the repo to add you as a collaborator.)

## How it works (the 30-second version)

The website's content — sponsors, contacts, page text, the Register link — lives
in small text files in this project. When you change a file and save it, GitHub
tells Netlify, and Netlify rebuilds the website automatically. There's no
separate "admin login" to learn (yet — see the last section).

To edit a file on GitHub:

1. Open the file in the GitHub website.
2. Click the **pencil ✏️ icon** (top right) to edit.
3. Make your change.
4. Scroll down, click **Commit changes**.
5. Wait ~1–2 minutes, then refresh the live site.

---

## 1. Change the Register link, club info, or social links

**File:** `src/content/settings/site.yaml`

This one file controls site-wide things:

| Field          | What it does                                                              |
| -------------- | ------------------------------------------------------------------------- |
| `heroHeadline` | The big headline on the home-page hero                                    |
| `tagline`      | Short kicker shown above the headline (also the default page description) |
| `registerUrl`  | Where the **Register** button goes (PlayMetrics link)                     |
| `donateUrl`    | The **Donate** button link (Zeffy). Blank → points at the Sponsorship page |
| `contactEmail` | Club email shown in the footer (blank = hidden)                           |
| `social`       | Facebook / Instagram links (icons in the header + footer)                 |

Just change the text inside the quotes. Leave a value as `""` (empty quotes) to
hide it.

---

## 2. Add, edit, or remove a Sponsor

Sponsors appear automatically on both the **home page** and the **Sponsorship &
Donations** page. Each sponsor is two things: a **logo image** and a small
**info file**.

**To add a sponsor:**

1. **Add the logo:** put the logo image in the `public/sponsors/` folder.
   (On GitHub: open the `public/sponsors` folder → **Add file → Upload files**.)
   PNG, SVG, or WebP all work. Name it simply, e.g. `mountain-market.png`.
2. **Add the info file:** in `src/content/sponsors/`, create a new file named
   after the sponsor, e.g. `mountain-market.yaml`, with this content:

   ```yaml
   name: "Mountain Market"
   logo: "mountain-market.png"   # the filename you uploaded in step 1
   url: "https://example.com"    # optional — their website
   tier: "gold"                  # platinum | gold | silver | bronze | community
   order: 1                      # lower numbers show first
   ```

3. Commit. Done — the logo grid updates itself.

**To remove a sponsor:** delete that sponsor's `.yaml` file in
`src/content/sponsors/`.

> **Logo tip:** logos display up to ~130px tall, centered on a white tile. A wide
> or square logo is fine — but avoid lots of empty margin around the artwork, as
> it makes the logo look small in the grid. Crop tight to the logo first.

---

## 3. Change the contact email

The **Contacts** page shows a single club email — there is no per-person board
roster to maintain. The email comes from the `contactEmail` field in
`src/content/settings/site.yaml` (the same value used in the footer).

To change it, edit that one line:

```yaml
contactEmail: "admin@ouraycountysoccer.org"
```

The mailing address and location shown on the Contacts page also come from
`site.yaml` (`mailingAddress`, `location`). Leave any of these as `""` to hide
it.

---

## 4. Edit the About or Sponsorship page text

**Files:** `src/content/pages/about.md` and `src/content/pages/sponsorship.md`

The text below the `---` block is the page body. It's written in **Markdown**
(plain text where `##` makes a heading and `**bold**` makes bold). Edit it like a
normal document and commit.

---

## 5. Add or edit a Club Document (forms & policies)

These appear on the **Documents** page (linked in the top menu and the footer).
Each document is one small file in `src/content/documents/`.

**To add a document**, you need two things: the file's link, and a small info
file. The link can be **either**:

- **A file you upload to this site (recommended).** Put the PDF in the
  `public/documents/` folder (on GitHub: open `public/documents` → **Add file →
  Upload files**), then use its path as the link, e.g. `/documents/bylaws.pdf`.
- **A link to a file already hosted online**, e.g.
  `https://example.com/registration-form.pdf`.

Then create a file in `src/content/documents/`, e.g. `registration-form.yaml`:

```yaml
title: "Registration Form"
url: "/documents/registration-form.pdf"   # uploaded file …or a full https:// link
category: "Forms"   # section heading on the page (e.g. Forms, Policies)
order: 1            # lower numbers show first
```

The page groups documents by `category` and shows a PDF/DOCX badge based on the
link. To remove a document, delete its file.

---

## If something breaks

The build **checks your files** when you save. If you make a mistake (e.g. a
sponsor file missing its `logo`), the deploy will fail and the **live site stays
unchanged** — nothing breaks for visitors. Netlify will show the error. Fix the
file (or ask a developer) and commit again.

---

## Later: a visual editor (Sveltia CMS)

Right now you edit files directly on GitHub. When the club wants a friendlier
experience, we can add **Sveltia CMS** — a visual editor at
`yoursite.com/admin` with forms, image-upload buttons, and a "Publish" button,
all on top of these *same* files. No content needs to be re-done; it's an
add-on. See `docs/ARCHITECTURE.md` for the developer notes on enabling it.
