const { expect } = require("chai");
const { ethers } = require("hardhat");
const solc = require("solc");

const source = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecureVault {
    address public owner;
    uint256 public value = 7;

    constructor() {
        owner = msg.sender;
    }

    function delegateExecute(address target, bytes calldata data) external {
        require(msg.sender == owner, "SecureVault: not owner");
        (bool ok, ) = target.delegatecall(data);
        require(ok, "SecureVault: delegatecall failed");
    }
}

contract MaliciousDelegatecall {
    uint256 public value;

    function attack(address vault) external {
        SecureVault(vault).delegateExecute(
            address(this),
            abi.encodeWithSignature("pwn()")
        );
    }

    function pwn() external {
        value = 999;
    }
}
`;

function compile(name) {
  const input = {
    language: "Solidity",
    sources: { "DelegatecallDemo.sol": { content: source } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } }
  };
  const contract = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    "DelegatecallDemo.sol"
  ][name];

  return { abi: contract.abi, bytecode: contract.evm.bytecode.object };
}

describe("Delegatecall Attack Simulation", function () {
  it("rejects malicious delegatecall attempt", async function () {
    const [owner] = await ethers.getSigners();
    const vaultBuild = compile("SecureVault");
    const attackerBuild = compile("MaliciousDelegatecall");

    const vault = await new ethers.ContractFactory(
      vaultBuild.abi,
      vaultBuild.bytecode,
      owner
    ).deploy();
    const attacker = await new ethers.ContractFactory(
      attackerBuild.abi,
      attackerBuild.bytecode,
      owner
    ).deploy();

    console.log("Vault value before attack:", String(await vault.value()));

    await expect(attacker.attack(await vault.getAddress())).to.be.revertedWith(
      "SecureVault: not owner"
    );

    // console.log("Attack reverted; delegatecall was blocked=>",await attacker.attack(await vault.getAddress()));
    expect(await vault.value()).to.equal(7);
    console.log("Vault value after attack:", String(await vault.value()));
    console.log("Delegatecall attack simulation test included and passed");
  });
});
