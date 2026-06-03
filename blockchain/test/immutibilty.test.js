const { expect } = require("chai");
const { ethers } = require("hardhat");
const solc = require("solc");

const source = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FinalizedConfig {
    bool public finalized;
    uint256 public criticalParameter = 100;

    function setCriticalParameter(uint256 value) external {
        require(!finalized, "FinalizedConfig: finalized");
        criticalParameter = value;
    }

    function finalize() external {
        finalized = true;
    }
}
`;

function compile() {
  const input = {
    language: "Solidity",
    sources: { "FinalizedConfig.sol": { content: source } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } }
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contract = output.contracts["FinalizedConfig.sol"].FinalizedConfig;

  return {
    abi: contract.abi,
    bytecode: contract.evm.bytecode.object
  };
}

describe("Section Immutability Testing", function () {
  it("prevents critical parameter changes after finalization", async function () {
    const { abi, bytecode } = compile();
    const factory = new ethers.ContractFactory(abi, bytecode, (await ethers.getSigners())[0]);
    const config = await factory.deploy();

    console.log("Initial criticalParameter:", String(await config.criticalParameter()));

    await config.setCriticalParameter(200);
    console.log("Changed before finalization:", String(await config.criticalParameter()));

    await config.finalize();
    console.log("Finalization called:", await config.finalized());

    await expect(config.setCriticalParameter(300)).to.be.revertedWith(
      "FinalizedConfig: finalized"
    );
    // console.log("Attempt to change immutable parameter after finalization reverted=>",await config.setCriticalParameter(300));

    expect(await config.criticalParameter()).to.equal(200);
    console.log("Immutability test case included and passed");
  });
});
