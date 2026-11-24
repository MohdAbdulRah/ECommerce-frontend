import React, { useState } from 'react'
import CartContext from './CartContext'
import type { cartType, product } from './productsInterfaces';

interface Props {
    children: React.ReactNode;
}

const CartProvider = ({children} : Props) => {
    const [cart,setCart] = useState<cartType[]>([])
  return (
    <CartContext.Provider value={{cart,setCart}}>
       {children}
    </CartContext.Provider>
  )
}

export default CartProvider