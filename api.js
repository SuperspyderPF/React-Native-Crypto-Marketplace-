import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoData = () => {
  return axios.get(`${API_URL}/coins/markets?vs_currency=usd`);
};
