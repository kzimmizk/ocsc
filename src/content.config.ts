import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Editors often leave optional fields as empty strings ("") rather than
// deleting the key. Treat "" as "not set" so url()/email() validation passes.
const blankToUndefined = (v: unknown) => (v === '' ? undefined : v);
const optionalUrl = z.preprocess(blankToUndefined, z.string().url().optional());
const optionalEmail = z.preprocess(
  blankToUndefined,
  z.string().email().optional(),
);

/**
 * Content collections = the editable "data" of the site.
 *
 * Each collection points at a folder of files (markdown or YAML). The `schema`
 * below validates every file at build time, so a typo or missing field fails
 * the build with a clear message instead of shipping a broken page.
 *
 * To change site content you edit these files — you do NOT touch the page code.
 * See docs/CONTENT.md for the editor's guide.
 */

// Global site settings — a single file: src/content/settings/site.yaml
const settings = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/settings' }),
  schema: z.object({
    clubName: z.string(),
    shortName: z.string().optional(),
    heroHeadline: z.string(),
    tagline: z.string(),
    registerUrl: z.string().url(),
    donateUrl: optionalUrl,
    contactEmail: optionalEmail,
    location: z.string().optional(),
    mailingAddress: z.string().optional(),
    social: z
      .object({
        facebook: optionalUrl,
        instagram: optionalUrl,
      })
      .optional(),
  }),
});

// Board / contacts — one markdown file per person in src/content/board/
const board = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/board' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: optionalEmail,
    // Filename of a photo placed in public/board/ (optional).
    photo: z.string().optional(),
    // Lower numbers sort first.
    order: z.number().default(99),
  }),
});

// Sponsors — one YAML file per sponsor in src/content/sponsors/
const sponsors = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/sponsors' }),
  schema: z.object({
    name: z.string(),
    // Filename of the logo placed in public/sponsors/ (e.g. "acme.svg").
    logo: z.string(),
    url: optionalUrl,
    tier: z
      .enum(['platinum', 'gold', 'silver', 'bronze', 'community'])
      .default('community'),
    order: z.number().default(99),
  }),
});

// Free-form page copy — markdown files in src/content/pages/
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Short blurb surfaced on other pages (e.g. mission summary on the home page).
    summary: z.string().optional(),
  }),
});

// Club documents (forms & policies) — one YAML file per document.
const documents = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/documents' }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    // Optional grouping label shown as a section heading on the documents page.
    category: z.string().default('Forms & Policies'),
    order: z.number().default(99),
  }),
});

export const collections = { settings, board, sponsors, pages, documents };
