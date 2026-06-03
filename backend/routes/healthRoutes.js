const express = require('express');
const router = express.Router();

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    status: 'Backend API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
