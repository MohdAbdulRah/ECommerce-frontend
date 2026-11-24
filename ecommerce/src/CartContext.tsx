import { createContext } from "react";
import type { cartType, product } from "./productsInterfaces";

interface CartContextType {
    cart: cartType[];
    setCart: React.Dispatch<React.SetStateAction<any[]>>;
}
const CartContext = createContext<CartContextType | null>(null)


export default CartContext;
