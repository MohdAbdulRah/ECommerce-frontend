
import { useEffect, useState } from 'react';
import type { product } from './productsInterfaces';
import { getProducts } from './api';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [products, setProducts] = useState<product[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden px-6 py-12">

            {/* Background Glow */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center animate-[fadeIn_0.6s_ease-out]">

                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
                            Discover Collection
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Our Products
                        </h1>

                        <p className="mt-2 text-gray-400">
                            Explore our latest products and collections.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/add")}
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 active:translate-y-0"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <span className="text-xl transition-transform duration-300 group-hover:rotate-90">
                                +
                            </span>
                            Add Product
                        </span>
                    </button>

                </div>

                {/* Loading Skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] animate-pulse"
                            >
                                <div className="h-56 bg-white/10" />

                                <div className="space-y-4 p-5">
                                    <div className="h-5 w-3/4 rounded-lg bg-white/10" />
                                    <div className="h-4 w-1/2 rounded-lg bg-white/10" />

                                    <div className="flex justify-between border-t border-white/10 pt-4">
                                        <div className="h-4 w-1/3 rounded-lg bg-white/10" />
                                        <div className="h-6 w-12 rounded-full bg-white/10" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && products.length === 0 && (
                    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] text-center backdrop-blur-xl animate-[fadeIn_0.6s_ease-out]">
                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-500/10 text-4xl text-purple-400">
                            +
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            No Products Yet
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Start building your collection by adding a product.
                        </p>

                        <button
                            onClick={() => navigate("/add")}
                            className="mt-6 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-purple-500"
                        >
                            Add Your First Product
                        </button>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {products.map((prod, index) => (
                            <Link
                                key={prod.Id}
                                to={`/product/${prod.Id}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 backdrop-blur-xl opacity-0 animate-[cardEnter_0.6s_ease-out_forwards] transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-purple-900/20"
                            >

                                {/* Product Image */}
                                <div className="relative h-56 overflow-hidden bg-white/5">

                                    <img
                                        src={`${API_URL}${prod.image}`}
                                        alt={prod.name}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    <span className="absolute bottom-4 right-4 translate-y-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        View Details →
                                    </span>

                                </div>

                                {/* Product Details */}
                                <div className="space-y-4 p-5">

                                    <div>
                                        <h2 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-purple-300">
                                            {prod.name}
                                        </h2>

                                        <p className="mt-1 text-sm text-purple-300">
                                            {prod.brand}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-white/10 pt-4">

                                        <span className="text-sm text-gray-400">
                                            Stock Available
                                        </span>

                                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 transition-all duration-300 group-hover:bg-emerald-500/20">
                                            {prod.stockQuantity}
                                        </span>

                                    </div>

                                </div>

                            </Link>
                        ))}

                    </div>
                )}

            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes cardEnter {
                    from {
                        opacity: 0;
                        transform: translateY(25px) scale(0.97);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>

        </div>
    );
};

export default Home;
