// Offline preview: an approximation of Shopify's storefront renderer for visual QA without
// store access. Renders theme/ Liquid with liquidjs, mock Shopify objects built from
// import/products.csv, and an in-memory cart that answers /cart/add.js and /cart/change.js
// with section HTML. It is not Shopify: use `shopify theme dev` for the real thing.
//
//   npm run preview                      -> http://localhost:9393 (store open)
//   STORE_MODE=prelaunch npm run preview -> pre-launch mode
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { Liquid, Tag, Drop, Hash } from "liquidjs";

const here = path.dirname(new URL(import.meta.url).pathname);
const THEME = process.argv[2] || path.join(here, "../theme");
const CSV = process.argv[3] || path.join(here, "../import/products.csv");
const PORT = Number(process.argv[4] || 9393);
const read = (p) => fs.readFileSync(path.join(THEME, p), "utf8");
const exists = (p) => fs.existsSync(path.join(THEME, p));

/* ---------------- CSV -> products ---------------- */
function parseCSV(text) {
  const rows = []; let row = []; let cell = ""; let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true; else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; } else if (c !== "\r") cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows;
  return body.filter((r) => r.length > 1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}
class OptionValue extends Drop {
  constructor(name, available = true) { super(); this.name = name; this.available = available; this.swatch = null; }
  valueOf() { return this.name; }
  toString() { return this.name; }
}
let vid = 1000;
const products = [];
for (const r of parseCSV(fs.readFileSync(CSV, "utf8"))) {
  let p = products.find((x) => x.handle === r.Handle);
  if (!p) {
    p = { handle: r.Handle, title: r.Title, description: r["Body (HTML)"], type: r.Type, tags: r.Tags.split(",").map((t) => t.trim()),
      url: `/products/${r.Handle}`, vendor: r.Vendor, available: true, has_only_default_variant: false, metafields: { custom: {} },
      _opts: [r["Option1 Name"], r["Option2 Name"]].filter(Boolean), variants: [], media: [], price_varies: false, selected_variant: null };
    products.push(p);
  }
  if (r["Option1 Value"]) {
    const options = [r["Option1 Value"], r["Option2 Value"]].filter(Boolean);
    p.variants.push({ id: ++vid, title: options.join(" / "), options, option1: options[0], option2: options[1], available: true,
      price: Math.round(Number(r["Variant Price"]) * 100), compare_at_price: null, inventory_management: null, inventory_policy: "deny",
      inventory_quantity: 0, sku: r["Variant SKU"] });
  }
  if (r["Image Src"]) {
    const img = { src: r["Image Src"], alt: r["Image Alt Text"], aspect_ratio: r["Image Src"].includes("flat-lay") ? 0.805 : 0.558, width: 1600, height: 2000 };
    p.media.push({ media_type: "image", alt: r["Image Alt Text"], preview_image: img, src: img.src, aspect_ratio: img.aspect_ratio });
  }
}
for (const p of products) {
  p.price = p.price_min = p.variants[0].price;
  p.featured_media = p.media[0]; p.featured_image = p.media[0]?.preview_image;
  p.selected_or_first_available_variant = p.variants[0];
  p.options_with_values = p._opts.map((name, i) => ({ name, position: i + 1,
    values: [...new Set(p.variants.map((v) => v.options[i]))].map((v) => new OptionValue(v)),
    get selected_value() { return this.values[0].name; } }));
  p.options = p._opts;
}
const all = { handle: "all", title: "Products", url: "/collections/all", products, products_count: products.length, description: "", template_suffix: "" };
const collections = { all, "new-drop": { ...all, handle: "new-drop", title: "New drop", url: "/collections/new-drop" } };
const allProducts = Object.fromEntries(products.map((p) => [p.handle, p]));

/* ---------------- cart ---------------- */
const cart = { lines: [] };
function cartObject() {
  const items = cart.lines.map((l, i) => {
    const p = products.find((x) => x.variants.some((v) => v.id === l.id));
    const v = p.variants.find((x) => x.id === l.id);
    return { key: `${l.id}:k`, id: l.id, variant_id: l.id, quantity: l.qty, product: p, variant: v, url: `${p.url}?variant=${v.id}`,
      image: p.featured_image, title: p.title, final_line_price: v.price * l.qty, original_line_price: v.price * l.qty,
      line_level_discount_allocations: [], options_with_values: p._opts.map((n, k) => ({ name: n, value: v.options[k] })) };
  });
  const total = items.reduce((s, i) => s + i.final_line_price, 0);
  return { items, item_count: items.reduce((s, i) => s + i.quantity, 0), total_price: total, items_subtotal_price: total, total_discount: 0,
    cart_level_discount_applications: [], currency: { iso_code: "USD" } };
}

/* ---------------- liquid ---------------- */
const fixup = (t) => t.replace(/posted_successfully\?/g, "posted_successfully").replace(/{%-?\s*schema\s*-?%}[\s\S]*?{%-?\s*endschema\s*-?%}/g, "");
const liquidFs = {
  existsSync: (f) => fs.existsSync(f), exists: async (f) => fs.existsSync(f),
  readFileSync: (f) => fixup(fs.readFileSync(f, "utf8")), readFile: async (f) => fixup(fs.readFileSync(f, "utf8")),
  resolve: (dir, file, ext) => path.resolve(dir, file.endsWith(ext) ? file : file + ext), sep: path.sep, dirname: path.dirname,
  contains: () => true,
};
const engine = new Liquid({ root: [path.join(THEME, "snippets")], extname: ".liquid", fs: liquidFs, strictFilters: false, strictVariables: false, jsTruthy: false });
const kw = (args) => { const o = {}; for (const a of args) if (Array.isArray(a)) o[a[0]] = a[1]; return o; };
const money = (c) => { const v = Number(c || 0) / 100; return `$${Number.isInteger(v) ? v : v.toFixed(2)}`; };
const f = {
  asset_url: (n) => `/assets/${n}`,
  image_url: (img) => (typeof img === "string" ? img : img?.src || img?.preview_image?.src || ""),
  image_tag(src, ...args) { const o = kw(args); const attrs = Object.entries(o).filter(([k]) => !["widths", "preload"].includes(k))
      .map(([k, v]) => `${k}="${String(v ?? "").replace(/"/g, "&quot;")}"`).join(" "); return `<img src="${src}" ${attrs}>`; },
  stylesheet_tag: (u) => `<link rel="stylesheet" href="${u}">`,
  preload_tag(u, ...args) { const o = kw(args); return `<link rel="preload" href="${u}" as="${o.as}" type="${o.type || ""}" crossorigin>`; },
  money, money_without_trailing_zeros: money, money_with_currency: (c) => `${money(c)} USD`, money_without_currency: (c) => (Number(c) / 100).toFixed(2),
  placeholder_svg_tag: (_, cls) => `<svg class="${cls || ""}" viewBox="0 0 10 10"></svg>`,
  default_errors: () => "", pluralize: (n, a, b) => (Number(n) === 1 ? a : b), within: (u) => u, format_address: () => "",
  handle: (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-"), t: (k) => k, video_tag: () => "",
};
for (const [k, fn] of Object.entries(f)) engine.registerFilter(k, fn);

function schemaOf(file) { const m = read(file).match(/{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}/); return m ? JSON.parse(m[1]) : {}; }
function defaults(list = []) { const o = {}; for (const s of list) if (s.id) o[s.id] = s.default ?? (s.type === "checkbox" ? false : null); return o; }
const globalSettings = defaults(JSON.parse(read("config/settings_schema.json")).flatMap((g) => g.settings || []));
if (process.env.STORE_MODE) globalSettings.store_mode = process.env.STORE_MODE;

class RawBlock extends Tag { constructor(t, r, l, p, end) { super(t, r, l); this.tpls = []; const s = p.parseStream(r); s.on(`tag:${end}`, () => s.stop()).on("template", (x) => this.tpls.push(x)).on("end", () => { throw new Error(end); }); s.start(); } *render(ctx, emitter) { yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter); } }
engine.registerTag("paginate", class extends RawBlock { constructor(t, r, l, p) { super(t, r, l, p, "endpaginate"); }
  *render(ctx, emitter) { ctx.push({ paginate: { pages: 1, current_page: 1 } }); yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter); ctx.pop(); } });
engine.registerTag("form", class extends RawBlock {
  constructor(t, r, l, p) { super(t, r, l, p, "endform"); this.args = t.args; }
  *render(ctx, emitter) {
    const type = this.args.match(/'([^']+)'/)[1];
    const idm = this.args.match(/id:\s*('([^']+)'|([\w.]+))/);
    let id = idm ? (idm[2] || ctx.getSync(idm[3].split("."))) : "";
    const clsm = this.args.match(/class:\s*'([^']+)'/);
    const action = type === "product" ? "/cart/add" : type === "storefront_password" ? "/password" : "/contact";
    emitter.write(`<form method="post" action="${action}" id="${id || ""}" class="${clsm ? clsm[1] : ""}" accept-charset="UTF-8" novalidate><input type="hidden" name="form_type" value="${type}">`);
    ctx.push({ form: { posted_successfully: false, errors: null } });
    yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter);
    ctx.pop(); emitter.write("</form>");
  } });

async function renderSection(type, id, cfg = {}, extra = {}) {
  const file = `sections/${type}.liquid`;
  const schema = schemaOf(file);
  const settings = { ...defaults(schema.settings), ...(cfg.settings || {}) };
  const blocks = (cfg.block_order || []).map((bid) => { const b = cfg.blocks[bid]; const bs = (schema.blocks || []).find((x) => x.type === b.type) || {};
    return { id: bid, type: b.type, settings: { ...defaults(bs.settings), ...(b.settings || {}) }, shopify_attributes: "" }; });
  const globals = { ...extra }; delete globals.section; const html = await engine.parseAndRender(fixup(read(file)), { ...extra, section: { id, settings, blocks } }, { globals });
  return `<div id="shopify-section-${id}" class="shopify-section ${schema.class || ""}">${html}</div>`;
}
async function renderGroup(name, extra) {
  const g = JSON.parse(read(`sections/${name}.json`)); let out = "";
  for (const id of g.order) out += await renderSection(g.sections[id].type, `sections--${name}__${id}`, g.sections[id], extra);
  return out;
}
engine.registerTag("section", class extends Tag { constructor(t, r, l) { super(t, r, l); this.name = t.args.match(/'([^']+)'/)[1]; }
  *render(ctx, emitter) { emitter.write(yield renderSection(this.name, this.name, {}, ctx.getAll())); } });
engine.registerTag("sections", class extends Tag { constructor(t, r, l) { super(t, r, l); this.name = t.args.match(/'([^']+)'/)[1]; }
  *render(ctx, emitter) { emitter.write(yield renderGroup(this.name, ctx.getAll())); } });

function baseContext(reqPath, pageType, extra = {}) {
  return { settings: globalSettings, shop: { name: "Swolvation", money_format: "${{amount}}", customer_accounts_enabled: false, description: "",
      privacy_policy: { url: "/policies/privacy-policy" }, terms_of_service: { url: "/policies/terms-of-service" }, refund_policy: {} },
    routes: { root_url: "/", all_products_collection_url: "/collections/all", collections_url: "/collections", cart_url: "/cart", cart_add_url: "/cart/add",
      cart_change_url: "/cart/change", search_url: "/search", account_url: "/account", account_login_url: "/account/login", account_addresses_url: "/account/addresses" },
    request: { path: reqPath, page_type: pageType, locale: { iso_code: "en" }, origin: `http://localhost:${PORT}` },
    cart: cartObject(), collections, all_products: allProducts, linklists: {}, canonical_url: reqPath, page_title: extra.page_title || "Swolvation",
    content_for_header: "", template: { name: pageType }, ...extra };
}
async function renderPage(reqPath, templateName, pageType, extra = {}) {
  const t = JSON.parse(read(`templates/${templateName}.json`));
  const ctx = baseContext(reqPath, pageType, extra);
  let content = "";
  for (const id of t.order) content += await renderSection(t.sections[id].type, `template--1__${id}`, t.sections[id], ctx);
  const layout = read(`layout/${t.layout || "theme"}.liquid`);
  return engine.parseAndRender(fixup(layout), { ...ctx, content_for_layout: content }, { globals: ctx });
}

/* ---------------- server ---------------- */
const types = { ".css": "text/css", ".js": "text/javascript", ".webp": "image/webp", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
async function sectionsFor(ids, reqPath) { const out = {}; const ctx = baseContext(reqPath, "cart");
  for (const id of String(ids || "").split(",").filter(Boolean)) out[id] = id === "cart-drawer" ? await renderSection("cart-drawer", id, {}, ctx) : await renderSection("main-cart", id, {}, ctx);
  return out; }
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`); const p = url.pathname;
    if (p.startsWith("/assets/")) { const file = path.join(THEME, p); res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" }); return fs.createReadStream(file).pipe(res); }
    if (req.method === "POST") {
      let body = ""; for await (const c of req) body += c;
      if (p === "/cart/add.js") { const j = JSON.parse(body); for (const it of j.items) { const l = cart.lines.find((x) => x.id === it.id); l ? (l.qty += it.quantity) : cart.lines.push({ id: it.id, qty: it.quantity }); }
        res.writeHead(200, { "Content-Type": "application/json" }); return res.end(JSON.stringify({ items: j.items, sections: await sectionsFor(j.sections, j.sections_url) })); }
      if (p === "/cart/change.js") { const j = JSON.parse(body); const id = Number(String(j.id).split(":")[0]); const l = cart.lines.find((x) => x.id === id);
        if (l) l.qty = j.quantity; cart.lines = cart.lines.filter((x) => x.qty > 0);
        res.writeHead(200, { "Content-Type": "application/json" }); return res.end(JSON.stringify({ item_count: cartObject().item_count, sections: await sectionsFor(j.sections, j.sections_url) })); }
      res.writeHead(302, { Location: (req.headers.referer || "/") }); return res.end();
    }
    let html;
    if (p === "/") html = await renderPage(p, "index", "index");
    else if (p.startsWith("/collections/")) { const h = p.split("/")[2]; html = await renderPage(p, "collection", "collection", { collection: collections[h], page_title: collections[h].title }); }
    else if (p.startsWith("/products/")) { const prod = allProducts[p.split("/")[2]]; html = await renderPage(p, "product", "product", { product: prod, page_title: prod.title }); }
    else if (p === "/cart") html = await renderPage(p, "cart", "cart", { page_title: "Cart" });
    else if (p === "/search") html = await renderPage(p, "search", "search", { search: { performed: false } });
    else if (p === "/password") html = await renderPage(p, "password", "password");
    else if (p.startsWith("/pages/")) { const h = p.split("/")[2]; const titles = { about: "Our story", faq: "FAQ", shipping: "Shipping", returns: "Returns and exchanges", "size-guide": "Size guide", contact: "Contact us" };
      html = await renderPage(p, exists(`templates/page.${h}.json`) ? `page.${h}` : "page", "page", { page: { title: titles[h] || h, handle: h, content: "" }, page_title: titles[h] }); }
    else html = await renderPage(p, "404", "404");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); res.end(html);
  } catch (err) { console.error(req.url, err); res.writeHead(500, { "Content-Type": "text/plain" }); res.end(String(err.stack || err)); }
}).listen(PORT, () => console.log(`preview on ${PORT}`));
