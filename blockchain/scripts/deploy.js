const fs = require("fs");
const path = require("path");
const { ethers, network } = require("hardhat");

const DEPLOYMENTS_FILE = path.join(process.cwd(), "deployments.json");

const deploymentTargets = {
  sepolia: {
    contractName: "SimpleToken",
    displayName: "Sepolia",
    chainId: 11155111
  },
  hoodi: {
    contractName: "SimpleCounter",
    displayName: "Hoodi",
    chainId: 560048
  }
};

function readExistingDeployments() {
  if (!fs.existsSync(DEPLOYMENTS_FILE)) {
    return { contracts: {} };
  }

  return JSON.parse(fs.readFileSync(DEPLOYMENTS_FILE, "utf8"));
}

function writeDeployment(contractName, deployment) {
  const existing = readExistingDeployments();
  const deploymentData = {
    ...existing,
    updatedAt: new Date().toISOString(),
    contracts: {
      ...existing.contracts,
      [contractName]: deployment
    }
  };

  fs.writeFileSync(DEPLOYMENTS_FILE, JSON.stringify(deploymentData, null, 2));
  return deploymentData;
}

async function main() {
  const target = deploymentTargets[network.name];

  if (!target) {
    throw new Error(
      `Unsupported deployment network "${network.name}". Use "sepolia" for SimpleToken or "hoodi" for SimpleCounter.`
    );
  }

  console.log("Starting deployment...\n");

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying with account: ${deployer.address}`);
  console.log(`Network: ${target.displayName} (${target.chainId})\n`);

  console.log(`Deploying ${target.contractName} to ${target.displayName}...`);
  const Contract = await ethers.getContractFactory(target.contractName);
  const contract = await Contract.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`${target.contractName} deployed at: ${address}`);

  const deployment = {
    address,
    network: target.displayName,
    hardhatNetwork: network.name,
    chainId: target.chainId,
    timestamp: new Date().toISOString(),
    deployer: deployer.address
  };

  const deploymentData = writeDeployment(target.contractName, deployment);

  console.log("\nDeployment summary:");
  console.log(JSON.stringify(deploymentData, null, 2));
  console.log("\nDeployment data saved to deployments.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
