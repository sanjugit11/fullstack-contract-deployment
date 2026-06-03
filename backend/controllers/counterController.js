const counterService = require('../services/counterService');

class CounterController {
  /**
   * Get current counter value
   */
  static async getValue(req, res) {
    try {
      const result = await counterService.getValue();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Increment counter by 1
   */
  static async increment(req, res) {
    try {
      const result = await counterService.increment();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Decrement counter by 1
   */
  static async decrement(req, res) {
    try {
      const result = await counterService.decrement();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Set counter to specific value
   */
  static async setValue(req, res) {
    try {
      const { value } = req.body;

      if (value === undefined || value === null) {
        return res.status(400).json({
          success: false,
          error: 'Counter value is required'
        });
      }

      const result = await counterService.setValue(value);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Increment counter by a specific amount
   */
  static async incrementBy(req, res) {
    try {
      const { amount } = req.body;

      if (!amount) {
        return res.status(400).json({
          success: false,
          error: 'Amount is required'
        });
      }

      const result = await counterService.incrementBy(amount);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Decrement counter by a specific amount
   */
  static async decrementBy(req, res) {
    try {
      const { amount } = req.body;

      if (!amount) {
        return res.status(400).json({
          success: false,
          error: 'Amount is required'
        });
      }

      const result = await counterService.decrementBy(amount);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = CounterController;
