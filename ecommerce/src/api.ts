import axios from "axios"
import type { product } from "./productsInterfaces";



const API_URL = import.meta.env.VITE_API_URL
export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/api/products/get`)
    console.log(response.data);
    return response.data.data
}