/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: AA Insurance section breaks and section metadata.
 * Runs in afterTransform only. Uses payload.template.sections.
 * Selectors from captured DOM of https://www.aainsurance.co.nz/
 */

export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };

    // Process sections in reverse order to avoid shifting issues
    const sections = [...template.sections].reverse();

    for (const section of sections) {
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Add section break (hr) before section if not the first section
      // and there is content before it
      if (section.id !== template.sections[0].id) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
