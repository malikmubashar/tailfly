import { build } from "esbuild";
import { cp } from "fs/promises";

// bundling
console.log("-> Building...\n");
(await build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    outdir: "dist",
    platform: "node",
    target: "node16",
    minify: true,
    packages: 'external'
})).outputFiles?.forEach((file, i) => console.log(`\t${i + 1}:${file.path}`));
await cp("./types/dec", "dist/types", {
    recursive: true
});
// testing
console.log("\n-> Testing...");
if ((await import("./dist/index.js")).default.default({ def: { primary: ["red"] } })?.config.theme.extend.colors?.primary?.DEFAULT === "hsl(var(--primary-hsl))")
    console.log("Success:\t\x1b[4;32mTest Passed\x1b[0m");
else {
    throw new Error("\x1b[4;31mTest Failed\x1b[0m");
};


