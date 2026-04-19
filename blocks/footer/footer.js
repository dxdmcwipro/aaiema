import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  if (!fragment) return;

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Decorate sections: links, social, legal
  const sections = footer.querySelectorAll(':scope > div');
  const classes = ['footer-links', 'footer-social', 'footer-legal'];
  sections.forEach((section, i) => {
    if (classes[i]) section.classList.add(classes[i]);
  });

  // Decorate link columns within the links section
  const linksSection = footer.querySelector('.footer-links');
  if (linksSection) {
    const columns = linksSection.querySelectorAll(':scope > div > div');
    columns.forEach((col) => col.classList.add('footer-col'));
  }

  block.append(footer);
}
