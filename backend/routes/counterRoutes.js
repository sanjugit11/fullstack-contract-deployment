const express = require('express');
const router = express.Router();
const CounterController = require('../controllers/counterController');

/**
 * GET /api/counter/value
 * Get current counter value
 */
router.get('/value', CounterController.getValue);
router.get('/current', CounterController.getValue);

/**
 * POST /api/counter/increment
 * Increment counter by 1
 */
router.post('/increment', CounterController.increment);

/**
 * POST /api/counter/decrement
 * Decrement counter by 1
 */
router.post('/decrement', CounterController.decrement);

/**
 * POST /api/counter/set-value
 * Set counter to specific value (owner only)
 * Body: { value: number }
 */
router.post('/set-value', CounterController.setValue);

/**
 * POST /api/counter/increment-by
 * Increment counter by a specific amount
 * Body: { amount: number }
 */
router.post('/increment-by', CounterController.incrementBy);

/**
 * POST /api/counter/decrement-by
 * Decrement counter by a specific amount
 * Body: { amount: number }
 */
router.post('/decrement-by', CounterController.decrementBy);

module.exports = router;
