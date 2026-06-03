const express = require('express');
const router = express.Router();
const TokenController = require('../controllers/tokenController');

/**
 * GET /api/token/balance/:address
 * Get balance of an address
 */
router.get('/balance/:address', TokenController.getBalance);

/**
 * GET /api/token/total-supply
 * Get total supply
 */
router.get('/total-supply', TokenController.getTotalSupply);

/**
 * POST /api/token/transfer
 * Transfer tokens
 * Body: { to: address, amount: number }
 */
router.post('/transfer', TokenController.transfer);

/**
 * POST /api/token/mint
 * Mint new tokens (owner only)
 * Body: { to: address, amount: number }
 */
router.post('/mint', TokenController.mint);

/**
 * POST /api/token/burn
 * Burn tokens
 * Body: { amount: number }
 */
router.post('/burn', TokenController.burn);

module.exports = router;
