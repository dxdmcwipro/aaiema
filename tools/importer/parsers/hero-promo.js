/* eslint-disable */
/* global WebImporter */
/** Parser for hero-promo. Base: hero. Source: https://www.aainsurance.co.nz/. */
export default function parse(element, { document }) {
  const cells = [];

  // Row 1: Background image (from .hero-abl-backdrop picture)
  const bgPicture = element.querySelector('.hero-abl-backdrop picture, .hero-abl-backdrop img');
  if (bgPicture) {
    cells.push([bgPicture]);
  }

  // Row 2: Heading + CTAs + disclaimer
  const contentCell = [];

  const heading = element.querySelector('.hero-abl-header h1, .hero-abl-header h2');
  if (heading) contentCell.push(heading);

  // CTA buttons (Get a quote, Start a claim, Pay/Renew)
  const ctaLinks = element.querySelectorAll('.hero-abl-card-link > a.button');
  ctaLinks.forEach((link) => {
    const labelEl = link.querySelector('.button--label__text');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = labelEl ? labelEl.textContent.trim() : link.textContent.trim();
    const p = document.createElement('p');
    p.append(a);
    contentCell.push(p);
  });

  // Disclaimer text
  const disclaimerContent = element.querySelector('.hero-abl-card-content');
  if (disclaimerContent) {
    const paragraphs = disclaimerContent.querySelectorAll('p.paragraph');
    paragraphs.forEach((p) => {
      if (p.textContent.trim()) contentCell.push(p);
    });
  }

  if (contentCell.length > 0) cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-promo', cells });
  element.replaceWith(block);
}
