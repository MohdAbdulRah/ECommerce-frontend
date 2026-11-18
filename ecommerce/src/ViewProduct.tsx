
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from './api';
import type { product } from './productsInterfaces';

const API_URL = import.meta.env.VITE_API_URL;

const ViewProduct = () => {
    const { id } = useParams();

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

    if (loading) {
        return <div className="p-10 text-center text-white">Loading product...</div>;
    }

    if (!product) {
        return <div className="p-10 text-center text-white">Product not found.</div>;
    }

    return (
        <div className="min-h-screen bg-[#080b18] px-6 py-12">

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-xl md:grid-cols-2 md:p-10">

                {/* Product Image */}
                <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-white/5">
                    <img
                        src={`${API_URL}${product.image}`}
                        alt={product.name}
                        className="h-[400px] w-full rounded-2xl object-contain transition duration-500 hover:scale-105"
                    />
                </div>

                {/* Product Information */}
                <div className="flex flex-col justify-center space-y-6">

                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-400">
                            {product.brand}
                        </p>

                        <h1 className="text-4xl font-bold text-white">
                            {product.name}
                        </h1>
                    </div>

                    <p className="leading-7 text-gray-400">
                        {product.description}
                    </p>

                    <p className="text-3xl font-bold text-purple-400">
                        ₹{product.price}
                    </p>

                    <div className="flex items-center justify-between border-y border-white/10 py-5">
                        <span className="text-gray-400">Category</span>
                        <span className="font-medium text-white">
                            {product.categoryType}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">Available Stock</span>
                        <span className="font-semibold text-emerald-400">
                            {product.stockQuantity} Units
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">Availability</span>
                        <span className={`font-semibold ${product.avalaible ? 'text-emerald-400' : 'text-red-400'}`}>
                            {product.avalaible ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
