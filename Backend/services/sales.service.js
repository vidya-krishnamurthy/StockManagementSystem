import axios from 'axios';

const API_URL = '/api/sales';

// Get all sales
const getSales = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Add new sale
const addSale = async (saleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, saleData, config);
  return response.data;
};

// Update sale
const updateSale = async (saleId, saleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${saleId}`, saleData, config);
  return response.data;
};

// Delete sale
const deleteSale = async (saleId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${saleId}`, config);
  return response.data;
};

// Get sales statistics
const getSalesStats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/stats`, config);
  return response.data;
};

// Get monthly sales data
const getMonthlySales = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/monthly`, config);
  return response.data;
};

const salesService = {
  getSales,
  addSale,
  updateSale,
  deleteSale,
  getSalesStats,
  getMonthlySales,
};

export default salesService;