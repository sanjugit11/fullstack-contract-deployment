import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://fullstack-contract-deployment.onrender.com/api';

export const tokenService = {
  getBalance: async (address) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/token/balance/${address}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  getTotalSupply: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/token/total-supply`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  transfer: async (to, amount) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/token/transfer`, {
        to,
        amount: parseFloat(amount)
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  mint: async (to, amount) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/token/mint`, {
        to,
        amount: parseFloat(amount)
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  burn: async (amount) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/token/burn`, {
        amount: parseFloat(amount)
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  }
};

export const counterService = {
  getValue: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/counter/value`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  increment: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/counter/increment`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  decrement: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/counter/decrement`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  setValue: async (value) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/counter/set-value`, {
        value: parseInt(value)
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  incrementBy: async (amount) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/counter/increment-by`, {
        amount: parseInt(amount)
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  decrementBy: async (amount) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/counter/decrement-by`, {
        amount: parseInt(amount)
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  }
};
