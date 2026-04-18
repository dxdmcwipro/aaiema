/* eslint-disable */
/* global WebImporter */
/** Parser for columns-trust. Base: columns. Source: https://www.aainsurance.co.nz/ */
export default function parse(element, { document }) {
  const cells = [];

  // Each column is a .col-12.col-md-4 inside .row__content
  const columns = element.querySelectorAll('.row__content > div');
  const row = [];

  columns.forEach((col) => {
    const colContent = [];

    // Badge image
    const img = col.querySelector('.image-wrapper img');
    if (img) colContent.push(img);

    // Heading
    const heading = col.querySelector('.content-block__title, h6');
    if (heading) {
      const h6 = document.createElement('h6');
      h6.textContent = heading.textContent.trim();
      colContent.push(h6);
    }

    // Link paragraph
    const paragraphs = col.querySelectorAll('.content-block__content p');
    paragraphs.forEach((p) => {
      if (p.textContent.trim()) colContent.push(p);
    });

    row.push(colContent);
  });

  if (row.length > 0) cells.push(row);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-trust', cells });
  element.replaceWith(block);
}
