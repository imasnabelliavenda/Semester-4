import axios from 'axios';

const API_URL = 'http://localhost:5000/items';

export const getBarang = async () => {
  return await axios.get(API_URL);
}

export const addBarang = async (item) => {
  return await axios.post(API_URL, item);
}

export const updateBarang = async (id, item) => {
  return await axios.put(API_URL + '/' + id, item);
}

export const deleteBarang = async (id) => {
  return await axios.delete(API_URL + '/' + id);
}
