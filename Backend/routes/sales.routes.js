const express = require('express');
const router = express.Router();
const Sale = require('../models/Sales');

// Get all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sales data.' });
  }
});

// Add a new sale
router.post('/', async (req, res) => {
  try {
    const sale = new Sale(req.body);
    const saved = await sale.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error saving sale.' });
  }
});

// Update a sale
router.put('/:id', async (req, res) => {
  try {
    const updated = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating sale.' });
  }
});

// Delete a sale
router.delete('/:id', async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sale deleted successfully.' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting sale.' });
  }
});

module.exports = router;
