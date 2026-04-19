 /**
 * AA Insurance – Footer Block
 * AEM EDS / da.live
 *
 * Expects a footer fragment page authored as a Google Doc / Word Doc table:
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ Footer                                                          │
 * ├──────────────┬──────────────────┬────────────────┬─────────────┤
 * │ Insurance    │ Tools & Guidance │ Manage policy  │ About AA    │
 * │ Car Insurance│ Insurance Calc   │ Make a Claim   │ About us    │
 * │ …            │ …                │ …              │ …           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ social | facebook | instagram | tiktok | linkedin | youtube |  │
 * │ email | shielded-site                                           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ legal | Financial Strength | Online T&Cs | … | Sitemap         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ copyright | © AA Insurance 2026                                 │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Alternatively, the fragment can use heading + list markup (plain HTML
 * authored output from da.live) which this decorator also handles.
 */

import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/* ─── Social platform SVG icons (inline, no external dependency) ─── */
const SOCIAL_ICONS = {
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Facebook"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Instagram"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
  tiktok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="TikTok"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="YouTube"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>`,
  email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Email"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
};

/* ─── Bold link text patterns ─── */
const BOLD_PATTERNS = ['make a complaint', 'send us a compliment'];

/**
 * Wraps plain-text list items that match bold patterns.
 */
function applyBoldLinks(ul) {
  ul.querySelectorAll('li a').forEach((a) => {
    if (BOLD_PATTERNS.includes(a.textContent.trim().toLowerCase())) {
      a.style.fontWeight = '700';
    }
  });
}

/**
 * Builds the social icons bar from a UL of platform names or hrefs.
 * Expected authored format (one list item per platform):
 *   - facebook | https://facebook.com/…
 *   - instagram | https://instagram.com/…
 *   …
 *   - shielded-site | https://…
 */
function buildSocialRow(ul) {
  const row = document.createElement('div');
  row.className = 'footer-social';

  ul.querySelectorAll('li').forEach((li) => {
    const text = li.textContent.trim().toLowerCase();
    const anchor = li.querySelector('a');
    const href = anchor ? anchor.href : '#';

    if (text.startsWith('shielded')) {
      // Shielded site badge – keep as-is or render a placeholder
      const badge = document.createElement('span');
      badge.className = 'shielded-site';
      badge.setAttribute('aria-label', 'Shielded Site');
      if (anchor && anchor.querySelector('img')) {
        badge.append(anchor.querySelector('img').cloneNode(true));
      } else {
        // text fallback
        const a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener';
        a.style.cssText = 'font-size:11px;font-weight:700;color:#131313;text-decoration:none;border:1.5px solid #131313;padding:2px 8px;border-radius:3px;';
        a.textContent = 'Shielded Site';
        badge.append(a);
      }
      row.append(badge);
      return;
    }

    const platform = Object.keys(SOCIAL_ICONS).find((k) => text.includes(k));
    if (!platform) return;

    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', platform.charAt(0).toUpperCase() + platform.slice(1));
    a.innerHTML = SOCIAL_ICONS[platform];
    row.append(a);
  });

  return row;
}

/**
 * Builds the legal links bar.
 */
function buildLegalRow(ul) {
  const row = document.createElement('div');
  row.className = 'footer-legal';
  ul.querySelectorAll('li a').forEach((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim();
    row.append(a);
  });
  return row;
}

/**
 * Builds copyright line.
 */
function buildCopyrightRow(p) {
  const row = document.createElement('div');
  row.className = 'footer-copyright';
  row.innerHTML = `<p>${p.innerHTML}</p>`;
  return row;
}

/**
 * Main decorator — processes the loaded fragment DOM.
 *
 * The fragment is expected to have:
 *  1. One or more <div> sections, each containing:
 *     - A heading (h2/h3/strong) + UL → nav column
 *     - OR a UL with class/data hint "social" → social row
 *     - OR a UL with class/data hint "legal" → legal row
 *     - OR a <p> with class/data hint "copyright" → copyright
 *
 * The decorator is resilient: if no hints are present it uses
 * position-based heuristics (last UL = legal, last p = copyright).
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'footer';

  /* Collect all top-level sections from fragment */
  const sections = [...fragment.children];

  const navWrapper = document.createElement('div');
  navWrapper.className = 'footer-nav';

  let socialRow = null;
  let legalRow = null;
  let copyrightRow = null;

  sections.forEach((section) => {
    const uls = section.querySelectorAll('ul');
    const headings = section.querySelectorAll('h1,h2,h3,h4,h5,h6,strong');
    const paras = section.querySelectorAll('p');

    /* ── Detect section type by authored class or data attribute ── */
    const sectionType = section.dataset.footerSection
      || section.className.split(' ').find((c) => ['social', 'legal', 'copyright'].includes(c))
      || '';

    if (sectionType === 'social' || (uls.length === 1 && section.textContent.toLowerCase().includes('facebook'))) {
      socialRow = buildSocialRow(uls[0]);
      return;
    }

    if (sectionType === 'legal') {
      legalRow = buildLegalRow(uls[0]);
      return;
    }

    if (sectionType === 'copyright') {
      const p = section.querySelector('p');
      if (p) copyrightRow = buildCopyrightRow(p);
      return;
    }

    /* ── Nav columns: each heading + UL pair → one column ── */
    if (headings.length > 0 && uls.length > 0) {
      /* Multiple columns inside one section */
      const cols = section.querySelectorAll(':scope > div, :scope > p, :scope > ul');
      /* Pair headings with their following UL */
      headings.forEach((heading, i) => {
        const col = document.createElement('div');
        col.className = 'footer-nav-column';
        const h = document.createElement('p');
        h.innerHTML = `<strong>${heading.textContent.trim()}</strong>`;
        col.append(h);
        /* Find the next sibling UL */
        let ul = uls[i] || null;
        if (ul) {
          applyBoldLinks(ul);
          col.append(ul.cloneNode(true));
        }
        navWrapper.append(col);
      });
      return;
    }

    /* ── Fallback: plain section with just a UL (legal) or P (copyright) ── */
    if (uls.length === 1 && headings.length === 0) {
      const firstLinkText = uls[0].querySelector('a')?.textContent.toLowerCase() || '';
      if (!legalRow) {
        legalRow = buildLegalRow(uls[0]);
      }
      return;
    }

    if (paras.length > 0 && uls.length === 0 && headings.length === 0) {
      const lastP = paras[paras.length - 1];
      if (!copyrightRow) copyrightRow = buildCopyrightRow(lastP);
    }
  });

  /* ── Assemble ── */
  if (navWrapper.children.length) wrapper.append(navWrapper);
  if (socialRow) wrapper.append(socialRow);
  if (legalRow) wrapper.append(legalRow);
  if (copyrightRow) wrapper.append(copyrightRow);

  block.append(wrapper);
}
