/* eslint-disable */
/* global WebImporter */
/** Parser for cards-product. Base: cards. Source: https://www.aainsurance.co.nz/ */
export default function parse(element, { document }) {
  const cells = [];

  // Each tile is a col-* child inside .row__content
  const tiles = element.querySelectorAll('.row__content > div');
  tiles.forEach((tile) => {
    // Icon image (SVG icon inside the tile link)
    const iconImg = tile.querySelector('img');
    const imgCell = [];
    if (iconImg) {
      const img = document.createElement('img');
      img.src = iconImg.src;
      img.alt = iconImg.alt || '';
      imgCell.push(img);
    }

    // Text content: product label + sub-links
    const textCell = [];

    // Main product link and label
    const mainLink = tile.querySelector('a[href]');
    const labelEl = tile.querySelector('[class*="column-heading"], [class*="tile-label"]');

    // Get product name from the tile's text (first meaningful text)
    const tileText = tile.textContent.trim().split('\n')[0].trim();
    if (mainLink) {
      const a = document.createElement('a');
      a.href = mainLink.href;
      a.textContent = tileText.split(/Comprehensive|Home Insurance|Contents Insurance|Caravan|Partner/)[0].trim() || tileText;
      const strong = document.createElement('strong');
      strong.append(a);
      textCell.push(strong);
    }

    // Sub-links (from list items)
    const subLinks = tile.querySelectorAll('li a');
    if (subLinks.length > 0) {
      const ul = document.createElement('ul');
      subLinks.forEach((link) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent.trim();
        li.append(a);
        ul.append(li);
      });
      textCell.push(ul);
    }

    // Partner product tag
    if (tile.textContent.includes('Partner product')) {
      const em = document.createElement('em');
      em.textContent = 'Partner product';
      textCell.push(em);
    }

    if (imgCell.length > 0 || textCell.length > 0) {
      cells.push([imgCell.length > 0 ? imgCell : '', textCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
