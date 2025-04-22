import { build, emptyDir } from "@deno/dnt";
import denoJson from "../deno.json" with { type: "json" };

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: "dev",
  },
  package: {
    // package.json properties
    name: "@dsegovia90/redacted",
    version: denoJson.version,
    description:
      "Explicit access to sensitive data. Wraps values in a Redacted class to protect them from being leaked into loggers (ie: console.log) and serializers. Works with zod.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/dsegovia90/redacted",
    },
    bugs: {
      url: "https://github.com/dsegovia90/redacted/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE.md", "npm/LICENSE.md");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
  importMap: "deno.json",
  mappings: {
    "npm:zod@^3.24.3": {
      name: "zod",
      version: "^3.24.3",
      peerDependency: false,
    },
  },
});
