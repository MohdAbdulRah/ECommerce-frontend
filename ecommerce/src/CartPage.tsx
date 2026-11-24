
import React, { useContext } from 'react';
import CartContext from './CartContext';
import type { cartType } from './productsInterfaces';

const API_URL = import.meta.env.VITE_API_URL;

const CartPage = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("CartPage must be inside CartProvider");
    }

    const { cart, setCart } = context;

    // Increase quantity
    const handleIncrease = (item: cartType) => {
        setCart(prev =>
            prev.map(c =>
                c.Id === item.Id &&
                c.quantity < c.prod.stockQuantity
                    ? { ...c, quantity: c.quantity + 1 }
                    : c
            )
        );
    };

    // Decrease quantity
    const handleDecrease = (item: cartType) => {
        setCart(prev =>
            prev
                .map(c =>
                    c.Id === item.Id
                        ? { ...c, quantity: c.quantity - 1 }
                        : c
                )
                .filter(c => c.quantity > 0)
        );
    };

    // Total cart price
    const totalPrice = cart.reduce(
        (total, item) =>
            total + item.prod.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen  p-8 text-white">

            <h1 className="mb-8 text-3xl font-bold">
                My Shopping Cart ({cart.length})
            </h1>

            {cart.length === 0 ? (
                <p className="text-gray-400">
                    Your cart is empty.
                </p>
            ) : (
                <>
                    <div className="space-y-5">

                        {cart.map((c: cartType) => (
                            <div
                                key={c.Id}
                                className="flex flex-col justify-between gap-5 rounded-xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center"
                            >

                                {/* Product details */}
                                <div className="flex items-center gap-5">

                                    <img
                                        src={`${API_URL}${c.prod.image}`}
                                        alt={c.prod.name}
                                        className="h-24 w-24 rounded-lg object-cover"
                                    />

                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            {c.prod.name}
                                        </h2>

                                        <p className="text-gray-400">
                                            {c.prod.brand}
                                        </p>

                                        <p className="mt-2 text-purple-400">
                                            ₹{c.prod.price} each
                                        </p>
                                    </div>

                                </div>

                                {/* Quantity controls */}
                                <div className="flex items-center gap-4">

                                    <button
                                        onClick={() => handleDecrease(c)}
                                        className="rounded-lg bg-red-500 px-4 py-2"
                                    >
                                        -
                                    </button>

                                    <span className="text-xl font-bold">
                                        {c.quantity}
                                    </span>

                                    <button
                                        onClick={() => handleIncrease(c)}
                                        disabled={
                                            c.quantity >= c.prod.stockQuantity
                                        }
                                        className="rounded-lg bg-purple-600 px-4 py-2 disabled:opacity-40"
                                    >
                                        +
                                    </button>

                                </div>

                                {/* Subtotal */}
                                <div className="text-lg font-bold text-green-400">
                                    ₹{c.prod.price * c.quantity}
                                </div>

                            </div>
                        ))}

                    </div>

                    {/* Cart total */}
                    <div className="mt-8 rounded-xl border border-purple-500/20 bg-purple-500/10 p-6">

                        <div className="flex justify-between text-xl font-bold">
                            <span>Total Amount</span>

                            <span className="text-purple-400">
                                ₹{totalPrice}
                            </span>
                        </div>

                    </div>
                </>
            )}

        </div>
    );
};

export default CartPage;
