import axios from "axios";
// seting the api routes
const url ='/products';

export const fetchProducts = () => axios.get(url);