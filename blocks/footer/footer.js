import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function buildSocialIcon(name, href) {
  const icons = {
    facebook: '<svg viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>',
    instagram: '<svg viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>',
    tiktok: '<svg viewBox="0 0 448 512"><path fill="currentColor" d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z"/></svg>',
    linkedin: '<svg viewBox="0 0 448 512"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>',
    youtube: '<svg viewBox="0 0 576 512"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>',
    email: '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>',
  };
  const a = document.createElement('a');
  a.href = href;
  a.className = 'footer-social-btn';
  a.setAttribute('aria-label', name);
  a.setAttribute('target', '_blank');
  a.setAttribute('rel', 'noopener noreferrer');
  a.innerHTML = icons[name] || '';
  return a;
}

const SOCIAL_MAP = {
  facebook: 'https://www.facebook.com/AAInsuranceNZ/',
  instagram: 'https://www.instagram.com/aainsurancenz/',
  tiktok: 'https://www.tiktok.com/@aainsurancenz',
  linkedin: 'https://www.linkedin.com/company/aa-insurance-ltd',
  youtube: 'https://www.youtube.com/user/aainsurancenz',
  email: '/contact',
};

/**
 * Find column cells in the fragment - looks for table cells (td) or
 * column divs that each contain a heading + list of links together.
 */
function findColumnCells(section) {
  // Try table cells first (columns block renders as div > div > div)
  const rows = section.querySelectorAll(':scope > div > div > div');
  if (rows.length >= 4) return [...rows];

  // Fallback: direct child divs that contain both a heading and a list
  const divs = [...section.querySelectorAll(':scope > div > div')];
  const candidates = divs.filter((d) => d.querySelector('ul') && (d.querySelector('strong') || d.querySelector('h6') || d.querySelector('h2') || d.querySelector('h3')));
  if (candidates.length >= 4) return candidates;

  return [...section.querySelectorAll(':scope div > div')].filter((d) => d.querySelector('ul'));
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  if (!fragment) return;

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const sections = [...footer.querySelectorAll(':scope > div')];

  // Section 1: Link columns - find cells that each contain heading + links
  if (sections[0]) {
    sections[0].classList.add('footer-links');
    const cells = findColumnCells(sections[0]);
    if (cells.length > 0) {
      const grid = document.createElement('div');
      grid.className = 'footer-grid';
      cells.forEach((cell) => {
        const col = document.createElement('div');
        col.className = 'footer-column';
        // Find heading: strong, h6, h2, h3, or first p with strong
        const heading = cell.querySelector('strong, h6, h2, h3');
        if (heading) {
          const headingEl = document.createElement('p');
          headingEl.className = 'footer-col-heading';
          headingEl.textContent = heading.textContent.trim();
          col.append(headingEl);
        }
        // Append the link list
        const ul = cell.querySelector('ul');
        if (ul) col.append(ul);
        grid.append(col);
      });
      const wrapper = sections[0].querySelector(':scope > div');
      if (wrapper) {
        wrapper.textContent = '';
        wrapper.append(grid);
      }
    }
  }

  // Section 2: Social icons - rebuild with inline SVG circular buttons
  if (sections[1]) {
    sections[1].classList.add('footer-social');
    const socialRow = document.createElement('div');
    socialRow.className = 'footer-social-row';
    const links = sections[1].querySelectorAll('a');
    links.forEach((link) => {
      const text = link.textContent.trim().toLowerCase();
      const key = Object.keys(SOCIAL_MAP).find((k) => text.includes(k));
      if (key) socialRow.append(buildSocialIcon(key, SOCIAL_MAP[key]));
    });
    // Fallback if no text-based links found
    if (socialRow.children.length === 0) {
      Object.entries(SOCIAL_MAP).forEach(([key, href]) => {
        socialRow.append(buildSocialIcon(key, href));
      });
    }
    const inner = sections[1].querySelector(':scope > div');
    if (inner) {
      inner.textContent = '';
      inner.append(socialRow);
    }
  }

  // Section 3: Legal links + copyright
  if (sections[2]) {
    sections[2].classList.add('footer-legal');
    // Wrap legal links in a flex container
    const legalP = sections[2].querySelector('p');
    if (legalP) {
      const legalLinks = [...legalP.querySelectorAll('a')];
      if (legalLinks.length > 0) {
        const legalRow = document.createElement('div');
        legalRow.className = 'footer-legal-links';
        legalLinks.forEach((a) => legalRow.append(a));
        legalP.replaceWith(legalRow);
      }
    }
  }

  block.append(footer);
}
