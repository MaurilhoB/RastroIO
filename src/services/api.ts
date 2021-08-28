import axios from 'axios';

const api = axios.create({
  baseURL: 'https://correios.contrateumdev.com.br/api/',
});

export default api;
