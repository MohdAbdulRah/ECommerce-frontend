
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { product } from './productsInterfaces';
import { getProductById } from './api';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AddProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<product>({
        Id: "",
        name: "",
        brand: "",
        description: "",
        price: 0,
        categoryType: "",
        stockQuantity: 0,
        image: "",
        avalaible: false,
        createdAt: "",
        updatedAt: ""
    });
    const [saving, setSaving] = useState(false);

    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        setSaving(true);

        // Keep your existing FormData and Axios logic here.

        // After successful response:
        navigate(id ? `/product/${id}` : '/');

    } catch (error) {
        console.error("Failed to save product:", error);
    } finally {
        setSaving(false);
    }
};

    const fetchProduct = async (productId: string) => {
        const response = await getProductById(productId);
        setProduct(response);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        setProduct(prev => ({
            ...prev,
            [name]: type === 'number'
                ? Number(value)
                : type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : value
        }));
    };

    const inputStyle = `
        w-full rounded-xl border border-white/10
        bg-white/[0.04] px-4 py-3.5 text-white
        placeholder:text-gray-500 outline-none
        transition-all duration-300
        hover:border-purple-500/30 hover:bg-white/[0.06]
        focus:border-purple-500/70 focus:bg-purple-500/[0.05]
        focus:ring-4 focus:ring-purple-500/10
    `;

    return (
        <div className="relative min-h-screen overflow-hidden px-5 py-12 sm:px-8">

            {/* Background Effects */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

            <div className="relative mx-auto max-w-3xl">

                {/* Heading */}
                <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
                        Product Management
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {id ? 'Update Product' : 'Add New Product'}
                    </h1>

                    <p className="mt-2 text-gray-400">
                        {id
                            ? 'Modify your product information and inventory details.'
                            : 'Fill in the details below to add a new product to your inventory.'
                        }
                    </p>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-7 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-all duration-500 hover:border-purple-500/20 sm:p-9"
                >

                    {/* Basic Information */}
                    <div>
                        <h2 className="mb-5 flex items-center gap-3 text-lg font-semibold text-white">
                            <span className="h-6 w-1 rounded-full bg-purple-500" />
                            Basic Information
                        </h2>

                        <div className="space-y-5">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Product Name
                                </label>

                                <input
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    className={inputStyle}
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Brand
                                </label>

                                <input
                                    name="brand"
                                    value={product.brand}
                                    onChange={handleChange}
                                    placeholder="Enter brand name"
                                    className={inputStyle}
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    placeholder="Describe your product..."
                                    className={`${inputStyle} resize-none`}
                                    rows={4}
                                    required
                                />
                            </div>

                        </div>
                    </div>

                    {/* Pricing and Inventory */}
                    <div>
                        <h2 className="mb-5 flex items-center gap-3 text-lg font-semibold text-white">
                            <span className="h-6 w-1 rounded-full bg-indigo-500" />
                            Pricing & Inventory
                        </h2>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Price (₹)
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    min="0"
                                    className={inputStyle}
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Category
                                </label>

                                <input
                                    name="categoryType"
                                    value={product.categoryType}
                                    onChange={handleChange}
                                    placeholder="Enter category"
                                    className={inputStyle}
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Stock Quantity
                                </label>

                                <input
                                    type="number"
                                    name="stockQuantity"
                                    value={product.stockQuantity}
                                    onChange={handleChange}
                                    placeholder="Enter available quantity"
                                    min="0"
                                    className={inputStyle}
                                    required
                                />
                            </div>

                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <h2 className="mb-5 flex items-center gap-3 text-lg font-semibold text-white">
                            <span className="h-6 w-1 rounded-full bg-blue-500" />
                            Product Image
                        </h2>

                        <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] p-8 text-center transition-all duration-300 hover:border-purple-500/60 hover:bg-purple-500/[0.05]">

                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-3xl transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500/20">
                                ↑
                            </div>

                            <p className="font-medium text-white transition-colors group-hover:text-purple-300">
                                Click to upload image
                            </p>

                            <p className="mt-2 text-xs text-gray-500">
                                PNG, JPG, JPEG and other image formats
                            </p>

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setImageFile(file);
                                    }
                                }}
                            />
                        </label>

                        {imageFile && (
                            <p className="mt-3 text-sm text-purple-300">
                                Selected: {imageFile.name}
                            </p>
                        )}

                        {product.image && !imageFile && (
                            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <p className="mb-3 text-sm font-medium text-gray-400">
                                    Current Product Image
                                </p>

                                <img
                                    src={`${API_URL}${product.image}`}
                                    alt="Current product"
                                    className="h-40 w-full rounded-xl object-contain transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        )}
                    </div>

                    {/* Availability */}
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/[0.03]">

                        <div>
                            <p className="font-medium text-white">
                                Product Availability
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Set whether this product is available for purchase.
                            </p>
                        </div>

                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                name="avalaible"
                                checked={product.avalaible}
                                onChange={handleChange}
                                className="peer sr-only"
                            />

                            <div className="h-7 w-12 rounded-full bg-gray-700 transition-all duration-300 peer-checked:bg-purple-600 peer-focus:ring-4 peer-focus:ring-purple-500/20 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:duration-300 peer-checked:after:translate-x-5" />
                        </label>

                    </div>

                    {/* Submit */}
                   <button
    type="submit"
    disabled={saving}
    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 font-semibold text-white shadow-lg shadow-purple-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
>
    {saving ? (
        <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {id ? 'Updating Product...' : 'Saving Product...'}
        </>
    ) : (
        <>
            {id ? 'Update Product' : 'Add Product'}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
            </span>
        </>
    )}
</button>
                </form>
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

export default AddProduct;
