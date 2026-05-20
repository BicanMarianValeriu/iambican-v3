import axios from 'axios';

const APIUrl = process.env.REACT_API_URL || 'https://wordpress.mvbican.com//wp-json/';
axios.defaults.baseURL = APIUrl;
const apiConfig = { baseURL: APIUrl };

// Export a base axios instance to be used on some cases
export const requestApi = axios.create(apiConfig);