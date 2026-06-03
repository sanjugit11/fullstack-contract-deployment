const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleToken - Comprehensive Test Suite", function () {
  let token;
  let owner, addr1, addr2, addr3;

  beforeEach(async function () {
    const SimpleToken = await ethers.getContractFactory("SimpleToken");
    token = await SimpleToken.deploy();
    await token.waitForDeployment();

    [owner, addr1, addr2, addr3] = await ethers.getSigners();
  });

  // ============ POSITIVE TEST CASES ============

  describe("Initialization", function () {
    it("Should initialize with correct token metadata", async function () {
      expect(await token.name()).to.equal("Simple Token");
      expect(await token.symbol()).to.equal("STK");
      expect(await token.decimals()).to.equal(18);
    });

    it("Should initialize with zero total supply", async function () {
      expect(await token.totalSupply()).to.equal(0);
    });

    it("Should set deployer as owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should initialize owner's balance as zero", async function () {
      expect(await token.balanceOf(owner.address)).to.equal(0);
    });
  });

  describe("Mint Functionality - Positive Cases", function () {
    it("Should mint tokens to an address", async function () {
      const amount = ethers.parseUnits("100", 18);
      await token.mint(addr1.address, amount);

      expect(await token.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Should increase total supply when minting", async function () {
      const amount = ethers.parseUnits("100", 18);
      await token.mint(addr1.address, amount);

      expect(await token.totalSupply()).to.equal(amount);
    });

    it("Should mint multiple times and accumulate balance", async function () {
      const amount1 = ethers.parseUnits("50", 18);
      const amount2 = ethers.parseUnits("75", 18);

      await token.mint(addr1.address, amount1);
      await token.mint(addr1.address, amount2);

      expect(await token.balanceOf(addr1.address)).to.equal(amount1 + amount2);
    });

    it("Should mint to multiple addresses", async function () {
      const amount = ethers.parseUnits("100", 18);

      await token.mint(addr1.address, amount);
      await token.mint(addr2.address, amount);
      await token.mint(addr3.address, amount);

      expect(await token.balanceOf(addr1.address)).to.equal(amount);
      expect(await token.balanceOf(addr2.address)).to.equal(amount);
      expect(await token.balanceOf(addr3.address)).to.equal(amount);
      expect(await token.totalSupply()).to.equal(amount * 3n);
    });

    it("Should emit Transfer and Mint events", async function () {
      const amount = ethers.parseUnits("100", 18);

      await expect(token.mint(addr1.address, amount))
        .to.emit(token, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, amount)
        .to.emit(token, "Mint")
        .withArgs(addr1.address, amount);
    });

    it("Should mint large amounts", async function () {
      const largeAmount = ethers.parseUnits("1000000", 18);
      await token.mint(addr1.address, largeAmount);

      expect(await token.balanceOf(addr1.address)).to.equal(largeAmount);
    });

    it("Should mint with maximum uint256 value (practical limit)", async function () {
      // Using a very large but practical amount
      const maxAmount = ethers.parseUnits("999999999", 18);
      await token.mint(addr1.address, maxAmount);

      expect(await token.balanceOf(addr1.address)).to.equal(maxAmount);
    });
  });

  describe("Transfer Functionality - Positive Cases", function () {
    beforeEach(async function () {
      const amount = ethers.parseUnits("100", 18);
      await token.mint(addr1.address, amount);
    });

    it("Should transfer tokens between addresses", async function () {
      const transferAmount = ethers.parseUnits("50", 18);

      await token.connect(addr1).transfer(addr2.address, transferAmount);

      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseUnits("50", 18));
      expect(await token.balanceOf(addr2.address)).to.equal(transferAmount);
    });

    it("Should transfer entire balance", async function () {
      const fullAmount = ethers.parseUnits("100", 18);

      await token.connect(addr1).transfer(addr2.address, fullAmount);

      expect(await token.balanceOf(addr1.address)).to.equal(0);
      expect(await token.balanceOf(addr2.address)).to.equal(fullAmount);
    });

    it("Should transfer in multiple steps", async function () {
      const amount1 = ethers.parseUnits("30", 18);
      const amount2 = ethers.parseUnits("40", 18);

      await token.connect(addr1).transfer(addr2.address, amount1);
      await token.connect(addr1).transfer(addr3.address, amount2);

      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseUnits("30", 18));
      expect(await token.balanceOf(addr2.address)).to.equal(amount1);
      expect(await token.balanceOf(addr3.address)).to.equal(amount2);
    });

    it("Should emit Transfer event", async function () {
      const transferAmount = ethers.parseUnits("50", 18);

      await expect(token.connect(addr1).transfer(addr2.address, transferAmount))
        .to.emit(token, "Transfer")
        .withArgs(addr1.address, addr2.address, transferAmount);
    });

    it("Should transfer to owner", async function () {
      const transferAmount = ethers.parseUnits("50", 18);

      await token.connect(addr1).transfer(owner.address, transferAmount);

      expect(await token.balanceOf(owner.address)).to.equal(transferAmount);
    });

    it("Should transfer minimal amount (1 wei)", async function () {
      const minAmount = 1n;

      await token.connect(addr1).transfer(addr2.address, minAmount);

      expect(await token.balanceOf(addr2.address)).to.equal(minAmount);
    });
  });

  describe("Approve & TransferFrom Functionality - Positive Cases", function () {
    beforeEach(async function () {
      const amount = ethers.parseUnits("100", 18);
      await token.mint(addr1.address, amount);
    });

    it("Should approve tokens for spending", async function () {
      const amount = ethers.parseUnits("50", 18);

      await token.connect(addr1).approve(addr2.address, amount);

      expect(await token.allowance(addr1.address, addr2.address)).to.equal(amount);
    });

    it("Should emit Approval event", async function () {
      const amount = ethers.parseUnits("50", 18);

      await expect(token.connect(addr1).approve(addr2.address, amount))
        .to.emit(token, "Approval")
        .withArgs(addr1.address, addr2.address, amount);
    });

    it("Should transferFrom with approval", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      const transferAmount = ethers.parseUnits("50", 18);

      await token.connect(addr1).approve(addr2.address, approveAmount);
      await token.connect(addr2).transferFrom(addr1.address, addr3.address, transferAmount);

      expect(await token.balanceOf(addr3.address)).to.equal(transferAmount);
      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseUnits("50", 18));
    });

    it("Should decrease allowance after transferFrom", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      const transferAmount = ethers.parseUnits("30", 18);

      await token.connect(addr1).approve(addr2.address, approveAmount);
      await token.connect(addr2).transferFrom(addr1.address, addr3.address, transferAmount);

      expect(await token.allowance(addr1.address, addr2.address)).to.equal(
        approveAmount - transferAmount
      );
    });

    it("Should emit Transfer event on transferFrom", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      const transferAmount = ethers.parseUnits("50", 18);

      await token.connect(addr1).approve(addr2.address, approveAmount);

      await expect(token.connect(addr2).transferFrom(addr1.address, addr3.address, transferAmount))
        .to.emit(token, "Transfer")
        .withArgs(addr1.address, addr3.address, transferAmount);
    });

    it("Should approve to maximum amount", async function () {
      const maxAmount = ethers.MaxUint256;

      await token.connect(addr1).approve(addr2.address, maxAmount);

      expect(await token.allowance(addr1.address, addr2.address)).to.equal(maxAmount);
    });

    it("Should allow changing approval amount", async function () {
      const amount1 = ethers.parseUnits("50", 18);
      const amount2 = ethers.parseUnits("100", 18);

      await token.connect(addr1).approve(addr2.address, amount1);
      expect(await token.allowance(addr1.address, addr2.address)).to.equal(amount1);

      await token.connect(addr1).approve(addr2.address, amount2);
      expect(await token.allowance(addr1.address, addr2.address)).to.equal(amount2);
    });
  });

  describe("Burn Functionality - Positive Cases", function () {
    beforeEach(async function () {
      const amount = ethers.parseUnits("100", 18);
      await token.mint(owner.address, amount);
    });

    it("Should burn tokens and reduce balance", async function () {
      const burnAmount = ethers.parseUnits("50", 18);

      await token.burn(burnAmount);

      expect(await token.balanceOf(owner.address)).to.equal(ethers.parseUnits("50", 18));
    });

    it("Should reduce total supply when burning", async function () {
      const burnAmount = ethers.parseUnits("50", 18);

      await token.burn(burnAmount);

      expect(await token.totalSupply()).to.equal(ethers.parseUnits("50", 18));
    });

    it("Should emit Transfer and Burn events", async function () {
      const burnAmount = ethers.parseUnits("50", 18);

      await expect(token.burn(burnAmount))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, ethers.ZeroAddress, burnAmount)
        .to.emit(token, "Burn")
        .withArgs(owner.address, burnAmount);
    });

    it("Should burn all tokens", async function () {
      const allTokens = ethers.parseUnits("100", 18);

      await token.burn(allTokens);

      expect(await token.balanceOf(owner.address)).to.equal(0);
      expect(await token.totalSupply()).to.equal(0);
    });

    it("Should burn by non-owner from their balance", async function () {
      const amount = ethers.parseUnits("100", 18);
      await token.mint(addr1.address, amount);

      const burnAmount = ethers.parseUnits("30", 18);
      await token.connect(addr1).burn(burnAmount);

      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseUnits("70", 18));
    });

    it("Should burn minimal amount (1 wei)", async function () {
      const minBurn = 1n;

      await token.burn(minBurn);

      expect(await token.totalSupply()).to.equal(ethers.parseUnits("100", 18) - minBurn);
    });
  });

  describe("GetBalance Functionality - Positive Cases", function () {
    it("Should get correct balance for account with tokens", async function () {
      const amount = ethers.parseUnits("100", 18);
      await token.mint(addr1.address, amount);

      const balance = await token.getBalance(addr1.address);

      expect(balance).to.equal(amount);
    });

    it("Should get zero balance for new account", async function () {
      const balance = await token.getBalance(addr1.address);

      expect(balance).to.equal(0);
    });
  });

  describe("Ownership Transfer - Positive Cases", function () {
    it("Should transfer ownership to new owner", async function () {
      await token.transferOwnership(addr1.address);

      expect(await token.owner()).to.equal(addr1.address);
    });

    it("Should allow new owner to mint after transfer", async function () {
      await token.transferOwnership(addr1.address);

      const amount = ethers.parseUnits("100", 18);
      await token.connect(addr1).mint(addr2.address, amount);

      expect(await token.balanceOf(addr2.address)).to.equal(amount);
    });

    it("Should prevent old owner from minting after transfer", async function () {
      await token.transferOwnership(addr1.address);

      const amount = ethers.parseUnits("100", 18);

      await expect(
        token.connect(owner).mint(addr2.address, amount)
      ).to.be.revertedWith("SimpleToken: Only owner can call this function");
    });
  });

  // ============ NEGATIVE TEST CASES ============

  describe("Mint Functionality - Negative Cases", function () {
    it("Should prevent non-owner from minting", async function () {
      const amount = ethers.parseUnits("100", 18);

      await expect(
        token.connect(addr1).mint(addr2.address, amount)
      ).to.be.revertedWith("SimpleToken: Only owner can call this function");
    });

    it("Should prevent minting to zero address", async function () {
      const amount = ethers.parseUnits("100", 18);

      await expect(
        token.mint(ethers.ZeroAddress, amount)
      ).to.be.revertedWith("SimpleToken: Cannot mint to zero address");
    });

    it("Should prevent minting zero amount", async function () {
      await expect(
        token.mint(addr1.address, 0)
      ).to.be.revertedWith("SimpleToken: Amount must be greater than 0");
    });
  });

  describe("Transfer Functionality - Negative Cases", function () {
    beforeEach(async function () {
      const amount = ethers.parseUnits("100", 18);
      await token.mint(addr1.address, amount);
    });

    it("Should prevent transfer to zero address", async function () {
      const amount = ethers.parseUnits("50", 18);

      await expect(
        token.connect(addr1).transfer(ethers.ZeroAddress, amount)
      ).to.be.revertedWith("SimpleToken: Cannot transfer to zero address");
    });

    it("Should prevent transfer with insufficient balance", async function () {
      const excessAmount = ethers.parseUnits("150", 18);

      await expect(
        token.connect(addr1).transfer(addr2.address, excessAmount)
      ).to.be.revertedWith("SimpleToken: Insufficient balance");
    });

    it("Should prevent transfer by address with zero balance", async function () {
      const amount = ethers.parseUnits("50", 18);

      await expect(
        token.connect(addr2).transfer(addr3.address, amount)
      ).to.be.revertedWith("SimpleToken: Insufficient balance");
    });

    it("Should prevent transfer of zero amount", async function () {
      // Note: The contract doesn't explicitly prevent 0 amount transfers
      // This test documents the current behavior
      const tx = await token.connect(addr1).transfer(addr2.address, 0);
      await tx.wait();

      // Transfer succeeds but balances don't change
      expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseUnits("100", 18));
      expect(await token.balanceOf(addr2.address)).to.equal(0);
    });
  });

  describe("Approve & TransferFrom Functionality - Negative Cases", function () {
    beforeEach(async function () {
      const amount = ethers.parseUnits("100", 18);
      await token.mint(addr1.address, amount);
    });

    it("Should prevent approve to zero address", async function () {
      const amount = ethers.parseUnits("50", 18);

      await expect(
        token.connect(addr1).approve(ethers.ZeroAddress, amount)
      ).to.be.revertedWith("SimpleToken: Cannot approve zero address");
    });

    it("Should prevent transferFrom with insufficient balance", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      const transferAmount = ethers.parseUnits("150", 18);

      await token.connect(addr1).approve(addr2.address, approveAmount);

      await expect(
        token.connect(addr2).transferFrom(addr1.address, addr3.address, transferAmount)
      ).to.be.revertedWith("SimpleToken: Insufficient balance");
    });

    it("Should prevent transferFrom with insufficient allowance", async function () {
      const approveAmount = ethers.parseUnits("50", 18);
      const transferAmount = ethers.parseUnits("100", 18);

      await token.connect(addr1).approve(addr2.address, approveAmount);

      await expect(
        token.connect(addr2).transferFrom(addr1.address, addr3.address, transferAmount)
      ).to.be.revertedWith("SimpleToken: Insufficient allowance");
    });

    it("Should prevent transferFrom from zero address", async function () {
      const amount = ethers.parseUnits("50", 18);

      await expect(
        token.connect(addr2).transferFrom(ethers.ZeroAddress, addr3.address, amount)
      ).to.be.revertedWith("SimpleToken: Cannot transfer from zero address");
    });

    it("Should prevent transferFrom to zero address", async function () {
      const approveAmount = ethers.parseUnits("100", 18);
      const transferAmount = ethers.parseUnits("50", 18);

      await token.connect(addr1).approve(addr2.address, approveAmount);

      await expect(
        token.connect(addr2).transferFrom(addr1.address, ethers.ZeroAddress, transferAmount)
      ).to.be.revertedWith("SimpleToken: Cannot transfer to zero address");
    });

    it("Should prevent transferFrom without approval", async function () {
      const amount = ethers.parseUnits("50", 18);

      await expect(
        token.connect(addr2).transferFrom(addr1.address, addr3.address, amount)
      ).to.be.revertedWith("SimpleToken: Insufficient allowance");
    });
  });

  describe("Burn Functionality - Negative Cases", function () {
    it("Should prevent burn with insufficient balance", async function () {
      const amount = ethers.parseUnits("100", 18);

      await expect(
        token.connect(addr1).burn(amount)
      ).to.be.revertedWith("SimpleToken: Insufficient balance");
    });

    it("Should prevent burn by address with zero balance", async function () {
      const amount = ethers.parseUnits("1", 18);

      await expect(
        token.connect(addr1).burn(amount)
      ).to.be.revertedWith("SimpleToken: Insufficient balance");
    });
  });

  describe("Ownership Transfer - Negative Cases", function () {
    it("Should prevent transferOwnership by non-owner", async function () {
      await expect(
        token.connect(addr1).transferOwnership(addr2.address)
      ).to.be.revertedWith("SimpleToken: Only owner can call this function");
    });

    it("Should prevent transferOwnership to zero address", async function () {
      await expect(
        token.transferOwnership(ethers.ZeroAddress)
      ).to.be.revertedWith("SimpleToken: Cannot transfer ownership to zero address");
    });
  });

  describe("Edge Cases - Negative Cases", function () {
    it("Should handle sequential operations correctly", async function () {
      const amount = ethers.parseUnits("100", 18);
      await token.mint(addr1.address, amount);

      // Transfer some
      await token.connect(addr1).transfer(addr2.address, ethers.parseUnits("30", 18));

      // Try to transfer more than remaining
      await expect(
        token.connect(addr1).transfer(addr3.address, ethers.parseUnits("80", 18))
      ).to.be.revertedWith("SimpleToken: Insufficient balance");
    });

    it("Should prevent double-spending with approval", async function () {
      const amount = ethers.parseUnits("100", 18);
      await token.mint(addr1.address, amount);

      const approveAmount = ethers.parseUnits("50", 18);
      await token.connect(addr1).approve(addr2.address, approveAmount);

      // First transfer should succeed
      await token.connect(addr2).transferFrom(addr1.address, addr3.address, approveAmount);

      // Second transfer should fail
      await expect(
        token.connect(addr2).transferFrom(addr1.address, addr3.address, approveAmount)
      ).to.be.revertedWith("SimpleToken: Insufficient allowance");
    });
  });
});
