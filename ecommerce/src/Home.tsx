
import { useEffect, useState } from 'react';
import type { product } from './productsInterfaces';
import { getProducts } from './api';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [products, setProducts] = useState<product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen px-6 py-10">

            <h1 className="mb-8 text-3xl font-bold text-white">
                Our Products
            </h1>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {products.map((prod) => (
                    <Link
                        key={prod.Id}
                        className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/[0.10]"
                       to={`/product/${prod.Id}`}
                    >

                        {/* Product Image */}
                        <div className="h-56 overflow-hidden bg-white/5">
                            <img
                                src={`${API_URL}${prod.image}`}
                                alt={prod.name}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="space-y-3 p-5">

                            <h2 className="text-xl font-semibold text-white">
                                {prod.name}
                            </h2>

                            <p className="text-sm text-purple-300">
                                {prod.brand}
                            </p>

                            <div className="flex items-center justify-between border-t border-white/10 pt-3">
                                <span className="text-sm text-gray-400">
                                    Stock Available
                                </span>

                                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
                                    {prod.stockQuantity}
                                </span>
                            </div>

                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
};

export default Home;
