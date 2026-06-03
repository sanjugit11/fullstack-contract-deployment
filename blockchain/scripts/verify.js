const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

const DEPLOYMENTS_FILE = path.join(process.cwd(), "deployments.json");

const verificationTargets = {
  sepolia: {
    contractName: "SimpleToken",
    contractPath: "contracts/SimpleToken.sol:SimpleToken",
    envAddress: "SEPOLIA_TOKEN_ADDRESS"
  },
  hoodi: {
    contractName: "SimpleCounter",
    contractPath: "contracts/SimpleCounter.sol:SimpleCounter",
    envAddress: "HOODI_COUNTER_ADDRESS"
  }
};

function readDeployments() {
  if (!fs.existsSync(DEPLOYMENTS_FILE)) {
    return { contracts: {} };
  }

  return JSON.parse(fs.readFileSync(DEPLOYMENTS_FILE, "utf8"));
}

function getContractAddress(target) {
  const deployments = readDeployments();
  const deployedAddress = deployments.contracts?.[target.contractName]?.address;
  const envAddress = process.env[target.envAddress];

  return (envAddress || deployedAddress || "").trim();
}

function isAlreadyVerified(error) {
  const message = `${error.message || ""} ${error.stack || ""}`.toLowerCase();
  return message.includes("already verified") || message.includes("already been verified");
}

async function main() {
  const target = verificationTargets[hre.network.name];

  if (!target) {
    throw new Error(
      `Unsupported verify network "${hre.network.name}". Use "sepolia" or "hoodi".`
    );
  }

  const address = getContractAddress(target);

  if (!address) {
    throw new Error(
      `Missing address for ${target.contractName}. Add it to deployments.json or ${target.envAddress}.`
    );
  }

  console.log(`Verifying ${target.contractName} on ${hre.network.name}...`);
  console.log(`Address: ${address}`);

  try {
    await hre.run("verify:verify", {
      address,
      contract: target.contractPath,
      constructorArguments: []
    });

    console.log(`${target.contractName} verified successfully.`);
  } catch (error) {
    if (isAlreadyVerified(error)) {
      console.log(`${target.contractName} is already verified.`);
      return;
    }

    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
