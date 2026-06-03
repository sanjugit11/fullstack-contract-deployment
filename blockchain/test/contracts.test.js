const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleToken", function () {
  let token;
  let owner, addr1, addr2;

  beforeEach(async function () {
    const SimpleToken = await ethers.getContractFactory("SimpleToken");
    token = await SimpleToken.deploy();
    await token.waitForDeployment();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should have correct initial state", async function () {
    expect(await token.name()).to.equal("Simple Token");
    expect(await token.symbol()).to.equal("STK");
    expect(await token.decimals()).to.equal(18);
    expect(await token.totalSupply()).to.equal(0);
  });

  it("Should mint tokens correctly", async function () {
    const amount = ethers.parseUnits("100", 18);
    await token.mint(addr1.address, amount);

    expect(await token.balanceOf(addr1.address)).to.equal(amount);
    expect(await token.totalSupply()).to.equal(amount);
  });

  it("Should transfer tokens correctly", async function () {
    const amount = ethers.parseUnits("100", 18);
    await token.mint(addr1.address, amount);

    await token.connect(addr1).transfer(addr2.address, amount);
    expect(await token.balanceOf(addr2.address)).to.equal(amount);
    expect(await token.balanceOf(addr1.address)).to.equal(0);
  });

  it("Should burn tokens correctly", async function () {
    const amount = ethers.parseUnits("100", 18);
    await token.mint(owner.address, amount);

    await token.burn(amount);
    expect(await token.balanceOf(owner.address)).to.equal(0);
    expect(await token.totalSupply()).to.equal(0);
  });

  it("Should prevent minting by non-owner", async function () {
    const amount = ethers.parseUnits("100", 18);
    await expect(
      token.connect(addr1).mint(addr2.address, amount)
    ).to.be.revertedWith("SimpleToken: Only owner can call this function");
  });

  it("Should prevent transfer with insufficient balance", async function () {
    const amount = ethers.parseUnits("100", 18);
    await expect(
      token.connect(addr1).transfer(addr2.address, amount)
    ).to.be.revertedWith("SimpleToken: Insufficient balance");
  });
});

describe("SimpleCounter", function () {
  let counter;
  let owner, addr1;

  beforeEach(async function () {
    const SimpleCounter = await ethers.getContractFactory("SimpleCounter");
    counter = await SimpleCounter.deploy();
    await counter.waitForDeployment();

    [owner, addr1] = await ethers.getSigners();
  });

  it("Should initialize with counter = 0", async function () {
    expect(await counter.getValue()).to.equal(0);
  });

  it("Should increment counter", async function () {
    await counter.increment();
    expect(await counter.getValue()).to.equal(1);

    await counter.increment();
    expect(await counter.getValue()).to.equal(2);
  });

  it("Should decrement counter", async function () {
    await counter.increment();
    await counter.increment();
    await counter.decrement();

    expect(await counter.getValue()).to.equal(1);
  });

  it("Should set value correctly", async function () {
    await counter.setValue(100);
    expect(await counter.getValue()).to.equal(100);
  });

  it("Should increment by amount", async function () {
    await counter.incrementBy(50);
    expect(await counter.getValue()).to.equal(50);

    await counter.incrementBy(50);
    expect(await counter.getValue()).to.equal(100);
  });

  it("Should decrement by amount", async function () {
    await counter.setValue(100);
    await counter.decrementBy(30);

    expect(await counter.getValue()).to.equal(70);
  });

  it("Should prevent decrement below 0", async function () {
    await expect(counter.decrement()).to.be.revertedWith(
      "SimpleCounter: Counter cannot go below 0"
    );
  });

  it("Should prevent setValue by non-owner", async function () {
    await expect(counter.connect(addr1).setValue(50)).to.be.revertedWith(
      "SimpleCounter: Only owner can call this function"
    );
  });

  it("Should emit events correctly", async function () {
    await expect(counter.increment())
      .to.emit(counter, "CounterIncremented")
      .withArgs(owner.address, 1);

    await expect(counter.decrement())
      .to.emit(counter, "CounterDecremented")
      .withArgs(owner.address, 0);

    await expect(counter.setValue(100))
      .to.emit(counter, "ValueSet")
      .withArgs(owner.address, 0, 100);
  });
});
