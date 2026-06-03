const express = require('express');
const router = express.Router();
const env = require('../config/env');

function hostnameFromUrl(value) {
  try {
    return new URL(value).hostname;
  } catch (error) {
    return 'invalid';
  }
}

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    status: 'Backend API is running',
    hoodiRpcHost: hostnameFromUrl(env.HOODI_RPC_URL),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
