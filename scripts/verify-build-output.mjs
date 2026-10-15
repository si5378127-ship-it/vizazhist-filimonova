import { existsSync, readFileSync } from "node:fs";

const html = readFileSync("out/index.html", "utf8");
const checks = {
  h1: html.includes("Макияж в Твери"),
  sanityCdn: html.includes("cdn.sanity.io"),
  localHeroFallback: html.includes("/images/hero"),
  yandexVerification: html.includes("88d2291861ea2378"),
  jsonLd: html.includes("BeautySalon"),
  dikidi: html.includes("dikidi.net/1144947"),
  robots: existsSync("out/robots.txt"),
  sitemap: existsSync("out/sitemap.xml"),
  privacy: existsSync("out/privacy/index.html"),
  cookies: existsSync("out/cookies/index.html"),
  sanityUrlCount: (html.match(/cdn\.sanity\.io/g) || []).length,
};

console.log(JSON.stringify(checks, null, 2));
