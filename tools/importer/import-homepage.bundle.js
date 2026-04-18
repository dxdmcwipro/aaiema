var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-promo.js
  function parse(element, { document }) {
    const cells = [];
    const bgPicture = element.querySelector(".hero-abl-backdrop picture, .hero-abl-backdrop img");
    if (bgPicture) {
      cells.push([bgPicture]);
    }
    const contentCell = [];
    const heading = element.querySelector(".hero-abl-header h1, .hero-abl-header h2");
    if (heading) contentCell.push(heading);
    const ctaLinks = element.querySelectorAll(".hero-abl-card-link > a.button");
    ctaLinks.forEach((link) => {
      const labelEl = link.querySelector(".button--label__text");
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = labelEl ? labelEl.textContent.trim() : link.textContent.trim();
      const p = document.createElement("p");
      p.append(a);
      contentCell.push(p);
    });
    const disclaimerContent = element.querySelector(".hero-abl-card-content");
    if (disclaimerContent) {
      const paragraphs = disclaimerContent.querySelectorAll("p.paragraph");
      paragraphs.forEach((p) => {
        if (p.textContent.trim()) contentCell.push(p);
      });
    }
    if (contentCell.length > 0) cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse2(element, { document }) {
    const cells = [];
    const tiles = element.querySelectorAll(".row__content > div");
    tiles.forEach((tile) => {
      const iconImg = tile.querySelector("img");
      const imgCell = [];
      if (iconImg) {
        const img = document.createElement("img");
        img.src = iconImg.src;
        img.alt = iconImg.alt || "";
        imgCell.push(img);
      }
      const textCell = [];
      const mainLink = tile.querySelector("a[href]");
      const labelEl = tile.querySelector('[class*="column-heading"], [class*="tile-label"]');
      const tileText = tile.textContent.trim().split("\n")[0].trim();
      if (mainLink) {
        const a = document.createElement("a");
        a.href = mainLink.href;
        a.textContent = tileText.split(/Comprehensive|Home Insurance|Contents Insurance|Caravan|Partner/)[0].trim() || tileText;
        const strong = document.createElement("strong");
        strong.append(a);
        textCell.push(strong);
      }
      const subLinks = tile.querySelectorAll("li a");
      if (subLinks.length > 0) {
        const ul = document.createElement("ul");
        subLinks.forEach((link) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = link.href;
          a.textContent = link.textContent.trim();
          li.append(a);
          ul.append(li);
        });
        textCell.push(ul);
      }
      if (tile.textContent.includes("Partner product")) {
        const em = document.createElement("em");
        em.textContent = "Partner product";
        textCell.push(em);
      }
      if (imgCell.length > 0 || textCell.length > 0) {
        cells.push([imgCell.length > 0 ? imgCell : "", textCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-featured.js
  function parse3(element, { document }) {
    const cells = [];
    const cards = element.querySelectorAll(".grid-card");
    cards.forEach((card) => {
      const img = card.querySelector(".grid-card-hero img");
      const imgCell = img ? [img] : [""];
      const textCell = [];
      const heading = card.querySelector(".grid-card-title");
      if (heading) textCell.push(heading);
      const descParagraphs = card.querySelectorAll(".grid-card-description p");
      descParagraphs.forEach((p) => {
        if (p.textContent.trim()) textCell.push(p);
      });
      const ctaLink = card.querySelector(".grid-card-footer a");
      if (ctaLink) {
        const a = document.createElement("a");
        a.href = ctaLink.href;
        a.textContent = ctaLink.textContent.trim();
        const p = document.createElement("p");
        p.append(a);
        textCell.push(p);
      }
      cells.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-featured", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-announce.js
  function parse4(element, { document }) {
    const cells = [];
    const cards = element.querySelectorAll(".card-grid-cell .grid-card");
    cards.forEach((card) => {
      const img = card.querySelector(".grid-card-hero img");
      const imgCell = img ? [img] : [""];
      const textCell = [];
      const heading = card.querySelector(".grid-card-title");
      if (heading) textCell.push(heading);
      const descParagraphs = card.querySelectorAll(".grid-card-description p");
      descParagraphs.forEach((p) => {
        if (p.textContent.trim()) textCell.push(p);
      });
      const ctaLink = card.querySelector(".grid-card-footer a");
      if (ctaLink) {
        const a = document.createElement("a");
        a.href = ctaLink.href;
        a.textContent = ctaLink.textContent.trim();
        const p = document.createElement("p");
        p.append(a);
        textCell.push(p);
      }
      cells.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-announce", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-value.js
  function parse5(element, { document }) {
    const cells = [];
    const h2 = element.querySelector("h2");
    if (h2) {
      const h2Clone = document.createElement("h2");
      h2Clone.textContent = h2.textContent.trim();
      element.before(h2Clone);
    }
    const columns = element.querySelectorAll(".row__content > div");
    const row = [];
    columns.forEach((col) => {
      const colContent = [];
      const iconImg = col.querySelector(".icon-wrapper img");
      if (iconImg) {
        const img = document.createElement("img");
        img.src = iconImg.src;
        img.alt = "";
        colContent.push(img);
      }
      const heading = col.querySelector(".content-block__title, h6");
      if (heading) {
        const h6 = document.createElement("h6");
        h6.textContent = heading.textContent.trim();
        colContent.push(h6);
      }
      const paragraphs = col.querySelectorAll(".content-block__content p");
      paragraphs.forEach((p) => {
        if (p.textContent.trim()) colContent.push(p);
      });
      row.push(colContent);
    });
    if (row.length > 0) cells.push(row);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-value", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-trust.js
  function parse6(element, { document }) {
    const cells = [];
    const columns = element.querySelectorAll(".row__content > div");
    const row = [];
    columns.forEach((col) => {
      const colContent = [];
      const img = col.querySelector(".image-wrapper img");
      if (img) colContent.push(img);
      const heading = col.querySelector(".content-block__title, h6");
      if (heading) {
        const h6 = document.createElement("h6");
        h6.textContent = heading.textContent.trim();
        colContent.push(h6);
      }
      const paragraphs = col.querySelectorAll(".content-block__content p");
      paragraphs.forEach((p) => {
        if (p.textContent.trim()) colContent.push(p);
      });
      row.push(colContent);
    });
    if (row.length > 0) cells.push(row);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-trust", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/aainsurance-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        ".modal-popup",
        ".bokeh-container"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header.header",
        ".header-component",
        "footer.aa-footer",
        ".aa-nav",
        "noscript",
        "iframe",
        "link"
      ]);
    }
  }

  // tools/importer/transformers/aainsurance-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
      const sections = [...template.sections].reverse();
      for (const section of sections) {
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (section.id !== template.sections[0].id) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-promo": parse,
    "cards-product": parse2,
    "cards-featured": parse3,
    "cards-announce": parse4,
    "columns-value": parse5,
    "columns-trust": parse6
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "AA Insurance homepage with hero banner, product grid, featured cards, announcements, value propositions, and trust bar",
    urls: [
      "https://www.aainsurance.co.nz/"
    ],
    blocks: [
      {
        name: "hero-promo",
        instances: [".hero-abl.hero-abl--style-default"]
      },
      {
        name: "cards-product",
        instances: [".columns.mobile-lower-50"]
      },
      {
        name: "cards-featured",
        instances: [".card-grid .card-grid-columns-1"]
      },
      {
        name: "cards-announce",
        instances: [".card-grid .card-grid-columns-3"]
      },
      {
        name: "columns-value",
        instances: [".columns.why-choose-aai-footer"]
      },
      {
        name: "columns-trust",
        instances: [".columns.text__align-center"]
      }
    ],
    sections: [
      {
        id: "section-hero",
        name: "Hero Banner",
        selector: ".hero-abl.hero-abl--style-default",
        style: null,
        blocks: ["hero-promo"],
        defaultContent: []
      },
      {
        id: "section-products",
        name: "Product Grid",
        selector: ".columns.mobile-lower-50",
        style: null,
        blocks: ["cards-product"],
        defaultContent: []
      },
      {
        id: "section-featured",
        name: "Featured Card",
        selector: ".card-grid:has(.card-grid-columns-1)",
        style: null,
        blocks: ["cards-featured"],
        defaultContent: []
      },
      {
        id: "section-announcements",
        name: "Announcement Cards",
        selector: ".card-grid:has(.card-grid-columns-3)",
        style: null,
        blocks: ["cards-announce"],
        defaultContent: []
      },
      {
        id: "section-why-choose",
        name: "Why Choose AA Insurance",
        selector: ".columns.why-choose-aai-footer",
        style: null,
        blocks: ["columns-value"],
        defaultContent: [".columns__heading.center"]
      },
      {
        id: "section-trust",
        name: "Trust Bar",
        selector: ".columns.text__align-center",
        style: null,
        blocks: ["columns-trust"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
