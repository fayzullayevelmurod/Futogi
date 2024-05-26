import axios from "axios";

const API_URL = "https://api.futoji.ru/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCategories = () => api.get("categories");
export const getSubCategories = (id) => api.get(`subCategories?q=${id}`);
export const getCategoryById = (id) => api.get(`categories/getById?q=${id}`);
export const getProductById = (id) => api.get(`products/getById?q=${id}`);
export const getProductByName = (name) => api.get(`products/getByName?q=${name}`);
export const getImageById = (id) => api.get(`images/getById?q=${id}`);
export const createOrder = (orderData) => api.post("orders/create", orderData);

export default api;
