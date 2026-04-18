/* eslint-disable */
/* global WebImporter */
/** Parser for columns-value. Base: columns. Source: https://www.aainsurance.co.nz/ */
export default function parse(element, { document }) {
  const cells = [];

  // Extract the H2 heading as default content above the block
  const h2 = element.querySelector('h2');
  if (h2) {
    const h2Clone = document.createElement('h2');
    h2Clone.textContent = h2.textContent.trim();
    element.before(h2Clone);
  }

  // Each column is a .col-12.col-md-4 inside .row__content
  const columns = element.querySelectorAll('.row__content > div');
  const row = [];

  columns.forEach((col) => {
    const colContent = [];

    // Icon (SVG-based, in span.icon-wrapper)
    const iconImg = col.querySelector('.icon-wrapper img');
    if (iconImg) {
      const img = document.createElement('img');
      img.src = iconImg.src;
      img.alt = '';
      colContent.push(img);
    }

    // Heading
    const heading = col.querySelector('.content-block__title, h6');
    if (heading) {
      const h6 = document.createElement('h6');
      h6.textContent = heading.textContent.trim();
      colContent.push(h6);
    }

    // Description paragraphs
    const paragraphs = col.querySelectorAll('.content-block__content p');
    paragraphs.forEach((p) => {
      if (p.textContent.trim()) colContent.push(p);
    });

    row.push(colContent);
  });

  if (row.length > 0) cells.push(row);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-value', cells });
  element.replaceWith(block);
}
