const { expect } = require("chai");
const { ethers } = require("hardhat");
const solc = require("solc");

const source = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AlertVault {
    bool private locked;
    mapping(address => uint256) public balances;
    event ReentrancyAttemptDetected(address indexed attacker);

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        if (locked) {
            emit ReentrancyAttemptDetected(msg.sender);
            return;
        }

        locked = true;
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "AlertVault: transfer failed");
        locked = false;
    }
}

contract ReentrancyAttacker {
    AlertVault public vault;
    bool public blocked;

    constructor(address vaultAddress) {
        vault = AlertVault(vaultAddress);
    }

    function attack() external payable {
        vault.deposit{value: msg.value}();
        vault.withdraw();
    }

    receive() external payable {
        blocked = true;
        vault.withdraw();
    }
}
`;

function compile(name) {
  const input = {
    language: "Solidity",
    sources: { "AutoAlert.sol": { content: source } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } }
  };
  const contract = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    "AutoAlert.sol"
  ][name];

  return { abi: contract.abi, bytecode: contract.evm.bytecode.object };
}

describe("Auto-Alert System for Reentrancy Detection", function () {
  it("blocks reentrancy and emits alert event", async function () {
    const [owner] = await ethers.getSigners();
    const vaultBuild = compile("AlertVault");
    const attackerBuild = compile("ReentrancyAttacker");

    const vault = await new ethers.ContractFactory(
      vaultBuild.abi,
      vaultBuild.bytecode,
      owner
    ).deploy();
    const attacker = await new ethers.ContractFactory(
      attackerBuild.abi,
      attackerBuild.bytecode,
      owner
    ).deploy(await vault.getAddress());

    console.log("Executing malicious reentrancy attack attempt...");

    await expect(attacker.attack({ value: ethers.parseEther("1") }))
      .to.emit(vault, "ReentrancyAttemptDetected")
      .withArgs(await attacker.getAddress());
      // console.log("error==>",await attacker.attack({ value: ethers.parseEther("1") }))

    expect(await attacker.blocked()).to.equal(true);
    expect(await vault.balances(await attacker.getAddress())).to.equal(0);

    console.log("Reentrancy blocked");
    console.log("ReentrancyAttemptDetected event emitted");
    console.log("ALERT DELIVERED: Reentrancy attempt detected and blocked");
  });
});
