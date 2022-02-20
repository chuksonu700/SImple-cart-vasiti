import axios from 'axios';
import async from 'hbs/lib/async';
// seting the api routes
const url = '/products';

export const initState = async()=>{ 
    return await axios.get(url)
};