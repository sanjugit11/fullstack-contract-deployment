const { ethers } = require('ethers');
const { TOKEN_ABI } = require('../utils/abis');
const env = require('../config/env');

class TokenService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(env.SEPOLIA_RPC_URL);
    this.signer = new ethers.Wallet(env.PRIVATE_KEY, this.provider);
    this.contractAddress = env.SEPOLIA_TOKEN_ADDRESS;
    this.contract = new ethers.Contract(this.contractAddress, TOKEN_ABI, this.signer);
  }

  /**
   * Get balance of an address
   */
  async getBalance(address) {
    try {
      const contract = new ethers.Contract(this.contractAddress, TOKEN_ABI, this.provider);
      const balance = await contract.balanceOf(address);
      return {
        success: true,
        balance: ethers.formatUnits(balance, 18),
        balanceWei: balance.toString()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get total supply
   */
  async getTotalSupply() {
    try {
      const contract = new ethers.Contract(this.contractAddress, TOKEN_ABI, this.provider);
      const totalSupply = await contract.totalSupply();
      return {
        success: true,
        totalSupply: ethers.formatUnits(totalSupply, 18),
        totalSupplyWei: totalSupply.toString()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Transfer tokens
   */
  async transfer(toAddress, amount) {
    try {
      const amountWei = ethers.parseUnits(amount.toString(), 18);
      const tx = await this.contract.transfer(toAddress, amountWei);
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        from: receipt.from,
        to: toAddress,
        amount: amount
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Mint tokens (only owner)
   */
  async mint(toAddress, amount) {
    try {
      const amountWei = ethers.parseUnits(amount.toString(), 18);
      const tx = await this.contract.mint(toAddress, amountWei);
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        mintTo: toAddress,
        amount: amount
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Burn tokens
   */
  async burn(amount) {
    try {
      const amountWei = ethers.parseUnits(amount.toString(), 18);
      const tx = await this.contract.burn(amountWei);
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        amount: amount,
        burnedBy: receipt.from
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new TokenService();
