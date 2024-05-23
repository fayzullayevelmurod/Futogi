import axios from "axios";

const API_URL = "https://api.futoji.ru";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
		console.log(response.data.data, 'salom');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const getCategoryById = async (categoryId) => {
  const response = await axios.get(`${API_URL}/categories/getById?q=${categoryId}`);
  return response.data;
};
