import { createContext } from "react";

interface CartContextType {
    cart: any[];
    setCart: React.Dispatch<React.SetStateAction<any[]>>;
}
const CartContext = createContext<CartContextType | null>(null)


export default CartContext;
