import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const aboutPath = path.resolve("public/content/about.yaml");
const htmlPath = path.resolve("dist/index.html");

if (!fs.existsSync(aboutPath)) {
    throw new Error(`Missing YAML file: ${aboutPath}`);
}
if (!fs.existsSync(htmlPath)) {
    throw new Error(`Missing dist/index.html. Run "vite build" first.`);
}

const about = yaml.load(fs.readFileSync(aboutPath, "utf8"));
const seo = about.seo ?? {};

const siteUrl = (seo.site_url ?? "").replace(/\/+$/, ""); // no trailing slash
if (!siteUrl) {
    throw new Error(
        `about.yaml is missing seo.site_url (e.g. "https://sascezar.github.io")`,
    );
}

const title = seo.site_title ?? about.name ?? "Website";
const description = seo.description ?? about.bio?.intro ?? "";
const keywords = Array.isArray(seo.keywords) ? seo.keywords.join(", ") : "";
const author = about.name ?? "Website";

const canonicalUrl = `${siteUrl}/`;

const ogImagePath = seo.og_image ?? about.image?.src ?? "";
const faviconPath = seo.favicon ?? ogImagePath ?? "/favicon.ico";

const toAbsolute = (p) => {
    if (!p) return "";
    if (/^https?:\/\//i.test(p)) return p;
    // ensure leading slash
    const normalized = p.startsWith("/") ? p : `/${p}`;
    return `${siteUrl}${normalized}`;
};

const ogImage = toAbsolute(ogImagePath);
const favicon = toAbsolute(faviconPath);

const replacements = {
    "{{TITLE}}": title,
    "{{DESCRIPTION}}": description,
    "{{KEYWORDS}}": keywords,
    "{{AUTHOR}}": author,

    "{{CANONICAL_URL}}": canonicalUrl,

    "{{OG_TITLE}}": title,
    "{{OG_DESCRIPTION}}": description,
    "{{OG_IMAGE}}": ogImage,

    "{{TWITTER_TITLE}}": title,
    "{{TWITTER_DESCRIPTION}}": description,
    "{{TWITTER_IMAGE}}": ogImage,

    "{{FAVICON}}": favicon,
};

let html = fs.readFileSync(htmlPath, "utf8");

for (const [token, value] of Object.entries(replacements)) {
    html = html.replaceAll(token, String(value ?? ""));
}

// Fail loudly if any tokens remain
const leftover = html.match(/{{[A-Z_]+}}/g);
if (leftover?.length) {
    throw new Error(
        `Unreplaced tokens in dist/index.html: ${Array.from(new Set(leftover)).join(", ")}`,
    );
}

fs.writeFileSync(htmlPath, html, "utf8");
console.log("✅ Injected templated meta into dist/index.html from about.yaml");
