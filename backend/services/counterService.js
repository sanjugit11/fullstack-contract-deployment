const { ethers } = require('ethers');
const { COUNTER_ABI } = require('../utils/abis');
const env = require('../config/env');

const HOODI_NETWORK = {
  name: 'hoodi',
  chainId: 560048
};

const DEFAULT_HOODI_RPC_URL = 'https://ethereum-hoodi-rpc.publicnode.com';
const BLOCKED_HOODI_RPC_HOSTS = new Set(['0xrpc.io']);

function requireEnv(name) {
  const value = env[name];

  if (!value || value.includes('YOUR_')) {
    throw new Error(`${name} is missing or still using the placeholder value in backend/.env`);
  }

  return value.trim();
}

function hostnameFromUrl(value) {
  try {
    return new URL(value).hostname;
  } catch (error) {
    return 'invalid';
  }
}

function getHoodiRpcUrl() {
  const configuredUrl = requireEnv('HOODI_RPC_URL');
  const hostname = hostnameFromUrl(configuredUrl);

  if (BLOCKED_HOODI_RPC_HOSTS.has(hostname)) {
    console.warn(
      `Ignoring unsupported HOODI_RPC_URL host "${hostname}". Falling back to ${DEFAULT_HOODI_RPC_URL}`
    );
    return DEFAULT_HOODI_RPC_URL;
  }

  return configuredUrl;
}

class CounterService {
  constructor() {
    this.initializationError = null;
    this.rpcUrl = null;

    try {
      const rpcUrl = getHoodiRpcUrl();
      const privateKey = requireEnv('PRIVATE_KEY');
      this.contractAddress = requireEnv('HOODI_COUNTER_ADDRESS');
      this.rpcUrl = rpcUrl;

      if (!ethers.isAddress(this.contractAddress)) {
        throw new Error('HOODI_COUNTER_ADDRESS must be a valid contract address in backend/.env');
      }

      this.provider = new ethers.JsonRpcProvider(rpcUrl, HOODI_NETWORK, {
        staticNetwork: true
      });
      this.signer = new ethers.Wallet(privateKey, this.provider);
      this.contract = new ethers.Contract(this.contractAddress, COUNTER_ABI, this.signer);
    } catch (error) {
      this.initializationError = error;
    }
  }

  getInitializationError() {
    if (!this.initializationError) {
      return null;
    }

    return {
      success: false,
      error: this.initializationError.message,
      rpcHost: this.rpcUrl ? hostnameFromUrl(this.rpcUrl) : null
    };
  }

  getRpcHost() {
    return this.rpcUrl ? hostnameFromUrl(this.rpcUrl) : null;
  }

  /**
   * Get current counter value
   */
  async getValue() {
    try {
      const initializationError = this.getInitializationError();
      if (initializationError) {
        return initializationError;
      }

      const contract = new ethers.Contract(this.contractAddress, COUNTER_ABI, this.provider);
      const value = await contract.getValue();
      return {
        success: true,
        value: value.toString(),
        rpcHost: this.getRpcHost()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        rpcHost: this.getRpcHost()
      };
    }
  }

  /**
   * Increment counter by 1
   */
  async increment() {
    try {
      const initializationError = this.getInitializationError();
      if (initializationError) {
        return initializationError;
      }

      const tx = await this.contract.increment();
      const receipt = await tx.wait();
      
      // Get new value
      const newValue = await this.contract.getValue();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        newValue: newValue.toString(),
        action: 'increment',
        rpcHost: this.getRpcHost()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        rpcHost: this.getRpcHost()
      };
    }
  }

  /**
   * Decrement counter by 1
   */
  async decrement() {
    try {
      const initializationError = this.getInitializationError();
      if (initializationError) {
        return initializationError;
      }

      const tx = await this.contract.decrement();
      const receipt = await tx.wait();
      
      // Get new value
      const newValue = await this.contract.getValue();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        newValue: newValue.toString(),
        action: 'decrement',
        rpcHost: this.getRpcHost()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        rpcHost: this.getRpcHost()
      };
    }
  }

  /**
   * Set counter to specific value (only owner)
   */
  async setValue(newValue) {
    try {
      const initializationError = this.getInitializationError();
      if (initializationError) {
        return initializationError;
      }

      const tx = await this.contract.setValue(newValue);
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        newValue: newValue.toString(),
        action: 'setValue',
        rpcHost: this.getRpcHost()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        rpcHost: this.getRpcHost()
      };
    }
  }

  /**
   * Increment counter by a specific amount
   */
  async incrementBy(amount) {
    try {
      const initializationError = this.getInitializationError();
      if (initializationError) {
        return initializationError;
      }

      const tx = await this.contract.incrementBy(amount);
      const receipt = await tx.wait();
      
      // Get new value
      const newValue = await this.contract.getValue();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        newValue: newValue.toString(),
        incrementBy: amount.toString(),
        action: 'incrementBy',
        rpcHost: this.getRpcHost()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        rpcHost: this.getRpcHost()
      };
    }
  }

  /**
   * Decrement counter by a specific amount
   */
  async decrementBy(amount) {
    try {
      const initializationError = this.getInitializationError();
      if (initializationError) {
        return initializationError;
      }

      const tx = await this.contract.decrementBy(amount);
      const receipt = await tx.wait();
      
      // Get new value
      const newValue = await this.contract.getValue();
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        newValue: newValue.toString(),
        decrementBy: amount.toString(),
        action: 'decrementBy',
        rpcHost: this.getRpcHost()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        rpcHost: this.getRpcHost()
      };
    }
  }
}

module.exports = new CounterService();
