/**
 * AA Insurance – Footer Block (AEM EDS / da.live)
 *
 * Loads the /footer fragment and decorates it into:
 *  .footer-nav          – 4-column link grid
 *  .footer-social       – social icon row with inline SVGs
 *  .footer-legal        – legal links bar
 *  .footer-copyright    – copyright line
 */

import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/* ── Inline SVG icons (24 × 24 viewBox) ── */
const ICONS = {
  facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>',
  instagram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
  tiktok: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/></svg>',
  linkedin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  youtube: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>',
  email: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
};

const SOCIAL_URLS = {
  facebook: 'https://www.facebook.com/AAInsuranceNZ/',
  instagram: 'https://www.instagram.com/aainsurancenz/',
  tiktok: 'https://www.tiktok.com/@aainsurancenz',
  linkedin: 'https://www.linkedin.com/company/aa-insurance-ltd',
  youtube: 'https://www.youtube.com/user/aainsurancenz',
  email: '/contact',
};

const SHIELDED_URL = 'https://www.shielded.co.nz/aainsurance';
const SHIELDED_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.5-2.33 6.79-6 7.93-3.67-1.14-6-4.43-6-7.93V7.67L12 5z"/></svg>';

const BOLD_LINKS = ['make a complaint', 'send us a compliment'];

/* ── Helpers ── */

function appendColumn(nav, cell) {
  const col = document.createElement('div');
  col.className = 'footer-nav-column';

  const headingSrc = cell.querySelector('strong, h6, h3, h2');
  if (headingSrc) {
    const h3 = document.createElement('h3');
    h3.textContent = headingSrc.textContent.trim();
    col.append(h3);
  }

  const ul = cell.querySelector('ul');
  if (ul) {
    ul.querySelectorAll('li a').forEach((a) => {
      if (BOLD_LINKS.includes(a.textContent.trim().toLowerCase())) {
        a.classList.add('bold');
      }
    });
    col.append(ul);
  }

  nav.append(col);
}

function buildNavGrid(section) {
  const nav = document.createElement('nav');
  nav.className = 'footer-nav';
  nav.setAttribute('aria-label', 'Footer navigation');

  // Strategy 1: Columns block (div.columns > div > div children)
  const columnsBlock = section.querySelector('.columns');
  if (columnsBlock) {
    const row = columnsBlock.querySelector(':scope > div');
    const cells = row ? [...row.children] : [];
    cells.forEach((cell) => appendColumn(nav, cell));
    return nav;
  }

  // Strategy 2: Separate divs that each contain heading + list
  const cellDivs = [...section.querySelectorAll('div')].filter(
    (d) => d.querySelector('ul') && (d.querySelector('strong') || d.querySelector('h6')),
  );
  if (cellDivs.length >= 2) {
    cellDivs.forEach((cell) => appendColumn(nav, cell));
    return nav;
  }

  // Strategy 3: Flat structure — heading/list pairs in a single div
  // (da.live outputs: <p><strong>Heading</strong></p><ul>...</ul> sequentially)
  const container = section.querySelector(':scope > div') || section;
  const headings = container.querySelectorAll('p > strong, h6, h3, h2');
  headings.forEach((heading) => {
    const col = document.createElement('div');
    col.className = 'footer-nav-column';

    const h3 = document.createElement('h3');
    h3.textContent = heading.textContent.trim();
    col.append(h3);

    // Find the next sibling <ul> after this heading's parent
    const parent = heading.closest('p') || heading;
    let next = parent.nextElementSibling;
    while (next && next.tagName !== 'UL') next = next.nextElementSibling;
    if (next && next.tagName === 'UL') {
      next.querySelectorAll('li a').forEach((a) => {
        if (BOLD_LINKS.includes(a.textContent.trim().toLowerCase())) {
          a.classList.add('bold');
        }
      });
      col.append(next);
    }

    nav.append(col);
  });

  return nav;
}

function buildSocialRow(section) {
  const row = document.createElement('div');
  row.className = 'footer-social';

  // Try to find authored links; detect platform from text or href
  const authoredLinks = section.querySelectorAll('a');
  let matched = 0;

  authoredLinks.forEach((link) => {
    const text = link.textContent.trim().toLowerCase();
    const href = link.href || '';

    // Shielded Site (image or text containing "shielded")
    if (text.includes('shielded') || href.includes('shielded')) {
      const badge = document.createElement('a');
      badge.href = link.href || SHIELDED_URL;
      badge.target = '_blank';
      badge.rel = 'noopener noreferrer';
      badge.setAttribute('aria-label', 'Shielded Site');
      badge.className = 'shielded-site';
      const img = link.querySelector('img');
      if (img) {
        badge.append(img.cloneNode(true));
      } else {
        badge.innerHTML = `${SHIELDED_SVG} Shielded Site`;
      }
      row.append(badge);
      matched += 1;
      return;
    }

    // Social platforms
    const platform = Object.keys(ICONS).find((k) => text.includes(k) || href.includes(k));
    if (platform) {
      const a = document.createElement('a');
      a.href = SOCIAL_URLS[platform] || href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', platform.charAt(0).toUpperCase() + platform.slice(1));
      a.innerHTML = ICONS[platform];
      row.append(a);
      matched += 1;
    }
  });

  // Fallback: build all icons if none were matched
  if (matched === 0) {
    Object.entries(ICONS).forEach(([platform, svg]) => {
      const a = document.createElement('a');
      a.href = SOCIAL_URLS[platform];
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', platform.charAt(0).toUpperCase() + platform.slice(1));
      a.innerHTML = svg;
      row.append(a);
    });
  }

  return row;
}

function buildLegalRow(section) {
  const row = document.createElement('nav');
  row.className = 'footer-legal';
  row.setAttribute('aria-label', 'Legal links');

  section.querySelectorAll('a').forEach((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim();
    row.append(a);
  });

  return row;
}

function buildCopyright(section) {
  const row = document.createElement('div');
  row.className = 'footer-copyright';

  // Find the paragraph that contains the copyright symbol
  const paragraphs = section.querySelectorAll('p');
  let copyrightText = '';
  paragraphs.forEach((p) => {
    const txt = p.textContent.trim();
    if (txt.includes('©') || txt.includes('AA Insurance')) {
      copyrightText = txt;
    }
  });

  const p = document.createElement('p');
  p.textContent = copyrightText || `\u00A9AA Insurance ${new Date().getFullYear()}`;
  row.append(p);
  return row;
}

/* ── Main decorator ── */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  if (!fragment) return;

  block.textContent = '';

  // Collect all top-level sections from the fragment
  const wrapper = document.createElement('div');
  while (fragment.firstElementChild) wrapper.append(fragment.firstElementChild);
  const sections = [...wrapper.querySelectorAll(':scope > div')];

  // Build the four footer parts from sequential sections
  const built = document.createElement('div');

  // Section 0 → nav grid (has columns block or multiple divs with ul)
  if (sections[0]) built.append(buildNavGrid(sections[0]));

  // Section 1 → social icons (has links with platform names)
  if (sections[1]) built.append(buildSocialRow(sections[1]));

  // Section 2 → legal links + copyright (links paragraph + copyright paragraph)
  if (sections[2]) {
    built.append(buildLegalRow(sections[2]));
    built.append(buildCopyright(sections[2]));
  }

  block.append(built);
}
