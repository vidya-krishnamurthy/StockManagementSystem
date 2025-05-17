const mongoose = require("mongoose");

const yarnSchema = new mongoose.Schema({
  yarnType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Yarn", yarnSchema);
