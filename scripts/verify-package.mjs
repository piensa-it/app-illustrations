import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const rootUrl = new URL("../", import.meta.url);
const packed = JSON.parse(
  execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
    cwd: rootUrl,
    encoding: "utf8",
  }),
)[0];

const publishedFiles = new Set(packed.files.map((file) => file.path));
const requiredFiles = [
  "dist/index.d.ts",
  "dist/style.css",
  "dist/index.es.js",
  "dist/index.cjs.js",
  "dist/characters/peep-bust.es.js",
  "dist/characters/peep-standing.es.js",
];
const missingFiles = requiredFiles.filter((file) => !publishedFiles.has(file));

if (missingFiles.length > 0) {
  throw new Error(`El paquete no publicaría archivos requeridos: ${missingFiles.join(", ")}`);
}

const leakedSources = packed.files.filter((file) =>
  file.path.startsWith("assets/source/"),
);
if (leakedSources.length > 0) {
  throw new Error("El paquete intentaría publicar assets fuente de Open Peeps.");
}

const maxEsmBytes = 2 * 1024;
const esmEntry = packed.files.find(
  (file) => file.path === "dist/index.es.js",
);
if (!esmEntry || esmEntry.size > maxEsmBytes) {
  throw new Error(
    `El bundle ESM supera ${maxEsmBytes} bytes: ${esmEntry?.size ?? "desconocido"}`,
  );
}

const css = readFileSync(new URL("src/characters/peep-bust.css", rootUrl), "utf8");
if (!css.includes("prefers-reduced-motion: reduce")) {
  throw new Error("PeepBust debe conservar soporte para prefers-reduced-motion.");
}

console.log(
  `Paquete verificado: ${packed.files.length} archivos, ${packed.size} bytes comprimidos, ESM ${esmEntry.size} bytes.`,
);
