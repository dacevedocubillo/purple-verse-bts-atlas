import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";

const source = "dist/client";
const prefix = "/purple-verse-bts-atlas/";
const routes = ["", "miembros", "discografia", "contacto"];

// TanStack may place prerendered HTML beneath the configured base path.
// The Pages artifact itself is already mounted at that base path.
for (const route of routes) {
  const target = `${source}/${route ? `${route}/` : ""}index.html`;
  try {
    await access(target);
  } catch {
    const nested = `${source}${prefix}${route ? `${route}/` : ""}index.html`;
    await mkdir(`${source}/${route}`, { recursive: true });
    await cp(nested, target);
  }
  const html = await readFile(target, "utf8");
  if (!html.includes(`${prefix}assets/`)) {
    throw new Error(`Missing GitHub Pages asset prefix in ${target}`);
  }
}
await writeFile(`${source}/.nojekyll`, "");
console.log("Verified static HTML for all four GitHub Pages routes.");
