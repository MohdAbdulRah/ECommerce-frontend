import React, { useState } from 'react'
import CartContext from './CartContext'

interface Props {
    children: React.ReactNode;
}

const CartProvider = ({children} : Props) => {
    const [cart,setCart] = useState<any[]>([])
  return (
    <CartContext.Provider value={{cart,setCart}}>
       {children}
    </CartContext.Provider>
  )
}

export default CartProvider