const tokenService = require('../services/tokenService');

class TokenController {
  /**
   * Get balance of an address
   */
  static async getBalance(req, res) {
    try {
      const { address } = req.params;
      
      if (!address || address.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Address is required'
        });
      }

      const result = await tokenService.getBalance(address);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get total supply
   */
  static async getTotalSupply(req, res) {
    try {
      const result = await tokenService.getTotalSupply();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Transfer tokens
   */
  static async transfer(req, res) {
    try {
      const { to, amount } = req.body;

      if (!to || !amount) {
        return res.status(400).json({
          success: false,
          error: 'Recipient address and amount are required'
        });
      }

      const result = await tokenService.transfer(to, amount);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Mint tokens
   */
  static async mint(req, res) {
    try {
      const { to, amount } = req.body;

      if (!to || !amount) {
        return res.status(400).json({
          success: false,
          error: 'Recipient address and amount are required'
        });
      }

      const result = await tokenService.mint(to, amount);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Burn tokens
   */
  static async burn(req, res) {
    try {
      const { amount } = req.body;

      if (!amount) {
        return res.status(400).json({
          success: false,
          error: 'Amount is required'
        });
      }

      const result = await tokenService.burn(amount);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = TokenController;
