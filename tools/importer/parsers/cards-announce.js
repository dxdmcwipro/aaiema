/* eslint-disable */
/* global WebImporter */
/** Parser for cards-announce. Base: cards. Source: https://www.aainsurance.co.nz/ */
export default function parse(element, { document }) {
  const cells = [];

  // Each card in the 3-column grid
  const cards = element.querySelectorAll('.card-grid-cell .grid-card');
  cards.forEach((card) => {
    // Image cell
    const img = card.querySelector('.grid-card-hero img');
    const imgCell = img ? [img] : [''];

    // Text cell: heading + description + CTA
    const textCell = [];
    const heading = card.querySelector('.grid-card-title');
    if (heading) textCell.push(heading);

    const descParagraphs = card.querySelectorAll('.grid-card-description p');
    descParagraphs.forEach((p) => {
      if (p.textContent.trim()) textCell.push(p);
    });

    const ctaLink = card.querySelector('.grid-card-footer a');
    if (ctaLink) {
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      const p = document.createElement('p');
      p.append(a);
      textCell.push(p);
    }

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-announce', cells });
  element.replaceWith(block);
}
