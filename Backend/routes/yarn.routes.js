const express = require("express");
const mongoose = require("mongoose");
const Yarn = require("../models/Yarn");

const router = express.Router();

// @route   GET /api/yarns
router.get("/", async (req, res) => {
  try {
    const yarns = await Yarn.find();
    res.json(yarns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch yarns", error: err.message });
  }
});

// @route   POST /api/yarns
router.post("/", async (req, res) => {
  try {
    const { yarnType, quantity, supplier } = req.body;

    if (!yarnType || !quantity || !supplier) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newYarn = new Yarn({ 
      yarnType, 
      quantity: Number(quantity), 
      supplier 
    });
    
    await newYarn.save();

    res.status(201).json({ 
      message: "Yarn added successfully", 
      yarn: newYarn 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: "Failed to add yarn", 
      error: err.message 
    });
  }
});

// @route   PUT /api/yarns/:id
router.put("/:id", async (req, res) => {
  try {
    const { yarnType, quantity, supplier } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid yarn ID" });
    }

    const updatedYarn = await Yarn.findByIdAndUpdate(
      req.params.id,
      { 
        yarnType, 
        quantity: Number(quantity), 
        supplier 
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedYarn) {
      return res.status(404).json({ message: "Yarn not found" });
    }

    res.json({ 
      message: "Yarn updated successfully", 
      yarn: updatedYarn 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: "Failed to update yarn", 
      error: err.message 
    });
  }
});

// @route   DELETE /api/yarns/:id
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid yarn ID" });
    }

    const deletedYarn = await Yarn.findByIdAndDelete(req.params.id);
    
    if (!deletedYarn) {
      return res.status(404).json({ message: "Yarn not found" });
    }
    
    res.json({ 
      message: "Yarn deleted successfully", 
      yarn: deletedYarn 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: "Failed to delete yarn", 
      error: err.message 
    });
  }
});

module.exports = router;