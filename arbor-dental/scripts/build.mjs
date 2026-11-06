// Bundles src/main.js (with the parts of Motion it uses) and copies the self-hosted fonts.
import { build, context } from "esbuild";
import { copyFile, mkdir } from "node:fs/promises";
import { basename } from "node:path";

const fonts = [
  "@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2",
  "@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2",
  "@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2",
];

await mkdir("assets/fonts", { recursive: true });
await Promise.all(fonts.map((f) => copyFile(`node_modules/${f}`, `assets/fonts/${basename(f)}`)));

const options = {
  entryPoints: ["src/main.js"],
  outfile: "assets/js/main.js",
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2020"],
  legalComments: "none",
  logLevel: "info",
};

if (process.argv.includes("--watch")) {
  const ctx = await context(options);
  await ctx.watch();
} else {
  await build(options);
}
