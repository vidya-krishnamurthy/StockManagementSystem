const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  pieces: { type: Number, required: true },
  yarnType: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true }, 
  address: { type: String },
  status: { type: String },
  phone: { type: String },
  gstin: { type: String }
}, { collection: 'sales' }); 

module.exports = mongoose.model('Sale', salesSchema);
