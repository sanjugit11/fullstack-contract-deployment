const path = require("path");
const { spawnSync } = require("child_process");

const hardhatBin = path.join(
  process.cwd(),
  "node_modules",
  ".bin",
  process.platform === "win32" ? "hardhat.cmd" : "hardhat"
);

const networks = ["sepolia", "hoodi"];

for (const network of networks) {
  console.log(`\n=== Verifying ${network} ===`);

  const result = spawnSync(
    hardhatBin,
    ["run", "scripts/verify.js", "--network", network],
    { stdio: "inherit" }
  );

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log("\nAll verification commands completed.");
