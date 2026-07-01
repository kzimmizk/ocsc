// Minimal post-build smoke test: assert the expected pages were generated and
// contain key content. Run after `astro build` via `npm run verify`.
// Exits non-zero on failure so CI / Netlify can catch regressions.

import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';

const checks = [
  { file: 'index.html', mustInclude: ['Register', 'Our Sponsors', 'Alpine Bank'] },
  { file: 'about/index.html', mustInclude: ['Our Mission'] },
  { file: 'programs/index.html', mustInclude: ['Program Overview', 'PreK/K', 'Mountain Region League'] },
  { file: 'contacts/index.html', mustInclude: ['Contact Us', 'admin@ouraycountysoccer.org'] },
  { file: 'sponsorship/index.html', mustInclude: ['Our Sponsors', 'zeffy.com'] },
  { file: 'documents/index.html', mustInclude: ['Bylaws of the Ouray County Soccer Club', '/documents/bylaws.pdf', 'Medical Release Form', 'Code of Conduct'] },
];

let failures = 0;

for (const { file, mustInclude } of checks) {
  const path = join(DIST, file);
  try {
    await access(path);
  } catch {
    console.error(`✗ missing page: ${file}`);
    failures++;
    continue;
  }
  const html = await readFile(path, 'utf8');
  for (const needle of mustInclude) {
    if (!html.includes(needle)) {
      console.error(`✗ ${file} is missing expected content: "${needle}"`);
      failures++;
    }
  }
  if (mustInclude.every((n) => html.includes(n))) {
    console.log(`✓ ${file}`);
  }
}

// The Register link must point at the PlayMetrics signup URL.
const home = await readFile(join(DIST, 'index.html'), 'utf8');
if (!home.includes('playmetrics.com/signup')) {
  console.error('✗ index.html is missing the PlayMetrics register link');
  failures++;
} else {
  console.log('✓ register link present');
}

if (failures > 0) {
  console.error(`\nSmoke test FAILED with ${failures} problem(s).`);
  process.exit(1);
}
console.log('\nSmoke test passed.');
