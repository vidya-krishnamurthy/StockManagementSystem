import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:5000/api/sales/';

const getAllSales = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getSale = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

const createSale = (saleData) => {
  return axios.post(API_URL, saleData, { headers: authHeader() });
};

const updateSale = (id, saleData) => {
  return axios.put(API_URL + id, saleData, { headers: authHeader() });
};

const deleteSale = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const getMonthlySales = () => {
  return axios.get(API_URL + 'analytics/monthly', { headers: authHeader() });
};

export default {
  getAllSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
  getMonthlySales
};