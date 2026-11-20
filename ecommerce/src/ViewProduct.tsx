
import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from './api';
import type { product } from './productsInterfaces';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const ViewProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<product | null>(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                if (!id) return;

                const response = await getProductById(id);
                setProduct(response);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const deleteProduct = async () => {
        const response = await axios.delete(
            `${API_URL}/api/products/delete/${id}`
        );
        console.log(response.data);
        navigate("/");
    };
    


    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080b18]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500" />
                    <p className="animate-pulse text-sm tracking-wide text-gray-400">
                        Loading product...
                    </p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
                    <h2 className="mb-3 text-2xl font-bold text-white">
                        Product Not Found
                    </h2>
                    <p className="text-gray-400">
                        The requested product could not be found.
                    </p>
                </div>
            </div>
        );
    }

    


    return (
        <div className="relative min-h-screen overflow-hidden px-5 py-12 sm:px-8">

            {/* Background Effects */}
            <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

            <div className="relative mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
                        Product Details
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Explore Product
                    </h1>

                    <p className="mt-2 text-gray-400">
                        View product information and manage your inventory.
                    </p>
                </div>
               
                {/* Main Card */}
                <div className="grid grid-cols-1 gap-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-all duration-500 hover:border-purple-500/30 sm:p-8 md:grid-cols-2 md:p-10">
                     
                    {/* Image Section */}
                    <div className="group relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-5">

                        <div className="absolute inset-0 bg-purple-500/0 transition-all duration-500 group-hover:bg-purple-500/[0.04]" />

                        <img
                            src={`${API_URL}${product.image}`}
                            alt={product.name}
                            className="relative z-10 max-h-[420px] w-full rounded-xl object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                        />

                        <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-gray-300 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                            Product Image
                        </span>
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center space-y-7">

                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                                {product.brand}
                            </p>

                            <h2 className="text-3xl font-bold leading-tight text-white transition-colors duration-300 hover:text-purple-300 sm:text-4xl">
                                {product.name}
                            </h2>

                            <p className="mt-4 leading-7 text-gray-400">
                                {product.description}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-blue-500/5 p-5 transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10">
                            <p className="mb-1 text-sm text-gray-400">
                                Product Price
                            </p>

                            <p className="text-4xl font-extrabold text-purple-400">
                                ₹{product.price}
                            </p>
                        </div>

                        {/* Details */}
                        <div className="space-y-5">

                            <div className="flex items-center justify-between border-b border-white/10 pb-4 transition-colors hover:border-purple-500/40">
                                <span className="text-sm text-gray-400">
                                    Category
                                </span>

                                <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
                                    {product.categoryType}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-white/10 pb-4 transition-colors hover:border-purple-500/40">
                                <span className="text-sm text-gray-400">
                                    Available Stock
                                </span>

                                <span className="font-semibold text-white">
                                    {product.stockQuantity} Units
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">
                                    Availability
                                </span>

                                <span className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 ${
                                    product.avalaible
                                        ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                        : 'border border-red-500/20 bg-red-500/10 text-red-400'
                                }`}>
                                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-current" />
                                    {product.avalaible ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 pt-3 sm:flex-row">

                            <button
                                onClick={() => navigate(`/add/${product.Id}`)}
                                className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-1 hover:from-purple-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-purple-500/20 active:translate-y-0"
                            >
                                Edit Product
                            </button>

                            <button
                                onClick={deleteProduct}
                                className="flex-1 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3.5 font-semibold text-red-400 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/10 active:translate-y-0"
                            >
                                Delete Product
                            </button>

                        </div>

                    </div>
                </div>
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
            `}</style>
        </div>
    );
};

export default ViewProduct;
