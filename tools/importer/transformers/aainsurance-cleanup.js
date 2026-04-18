/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: AA Insurance cleanup.
 * Selectors from captured DOM of https://www.aainsurance.co.nz/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove modals and popups that may interfere with block parsing
    WebImporter.DOMUtils.remove(element, [
      '.modal-popup',
      '.bokeh-container',
    ]);
  }
  if (hookName === H.after) {
    // Remove non-authorable site chrome: header, footer, nav
    WebImporter.DOMUtils.remove(element, [
      'header.header',
      '.header-component',
      'footer.aa-footer',
      '.aa-nav',
      'noscript',
      'iframe',
      'link',
    ]);
  }
}
