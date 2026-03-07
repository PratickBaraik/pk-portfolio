/**
 * Environment & dependency diagnostic script
 * Works in Vercel build environment and local Node
 */

import { execSync } from "node:child_process";
import os from "node:os";
import fs from "node:fs";

/**
 * Execute shell command safely
 */
function run(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "Not installed";
  }
}

/**
 * Read dependency version from package.json
 */
function getPackageVersion(pkg) {
  try {
    const pkgJson = JSON.parse(
      fs.readFileSync(new URL("../package.json", import.meta.url)),
    );

    return (
      pkgJson.dependencies?.[pkg] ||
      pkgJson.devDependencies?.[pkg] ||
      "Not listed"
    );
  } catch {
    return "Unknown";
  }
}

console.log("\n===== ENVIRONMENT DIAGNOSTICS =====\n");

console.log("OS");
console.log("----------------------------");
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("Release:", os.release());

console.log("\nNode Environment");
console.log("----------------------------");
console.log("Node:", process.version);
console.log("NPM:", run("npm -v"));
console.log("Vercel CLI:", run("vercel --version"));

console.log("\nProject Dependencies");
console.log("----------------------------");
console.log("React:", getPackageVersion("react"));
console.log("React DOM:", getPackageVersion("react-dom"));
console.log("Vite:", getPackageVersion("vite"));
console.log("TypeScript:", getPackageVersion("typescript"));
console.log("Resend:", getPackageVersion("resend"));

console.log("\nGit");
console.log("----------------------------");
console.log("Git:", run("git --version"));

console.log("\n====================================\n");
