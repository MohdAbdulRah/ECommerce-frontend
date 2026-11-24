
import { useContext, useEffect, useState, type ChangeEvent } from 'react';
import type { product } from './productsInterfaces';
import { getProducts, getProductsByKeyword } from './api';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from './CartContext';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [products, setProducts] = useState<product[]>([]);
    const [allProducts, setAllProducts] = useState<product[]>([]);
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("Home must be inside CartProvider");
    }

    const { cart, setCart } = context; 
    const [loading, setLoading] = useState(true);
    const [searchKeyWord,setSearchKeyWord] = useState<string>('')
    const navigate = useNavigate();
     const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
                setAllProducts(response);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
    useEffect(() => {
       

        fetchProducts();
    }, []);

    useEffect(() => {
         if(!searchKeyWord.trim()){
            setProducts(allProducts);
            return;
         }
         let cancelled = false;
         const timer = setTimeout(async () => {
             const response = await getProductsByKeyword(searchKeyWord);
             if(!cancelled) setProducts(response);
         },500)

         return () =>{
           cancelled = true;
          clearTimeout(timer);
         }
    },[searchKeyWord])
    function handleChange(event: ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
        setSearchKeyWord(event.target.value)
        console.log(searchKeyWord)
    }


    const handleAddToCard = (prod: product) => {
    setCart(prev => {
        const exists = prev.some(item => item.Id === prod.Id);

        if (exists) return prev;

        return [
            ...prev,
            {
                Id: prod.Id,
                prod: prod,
                quantity: 1
            }
        ];
    });
};

const handleIncrease = (prod: product) => {
    setCart(prev =>
        prev.map(item =>
            item.Id === prod.Id &&
            item.quantity < prod.stockQuantity
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    );
};

const handleDecrease = (prod: product) => {
    setCart(prev =>
        prev
            .map(item =>
                item.Id === prod.Id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0)
    );
};
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
                     <div>

                   <input
  type="text"
  value={searchKeyWord}
  onChange={handleChange}
  placeholder="Search..."
  className="w-full max-w-md rounded-lg border border-white/10 bg-white px-4 py-2 text-black outline-none"
/>
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

                        {products.map((prod, index) => {

    const cartItem = cart.find(
        item => item.Id === prod.Id
    );

    return (
        <div
            key={prod.Id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/40"
        >

            {/* Product Image */}
            <Link to={`/product/${prod.Id}`}>
                <div className="relative h-56 overflow-hidden bg-white/5">

                    <img
                        src={`${API_URL}${prod.image}`}
                        alt={prod.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                </div>

                {/* Product Details */}
                <div className="space-y-4 p-5">

                    <h2 className="text-xl font-semibold text-white">
                        {prod.name}
                    </h2>

                    <p className="text-sm text-purple-300">
                        {prod.brand}
                    </p>

                    <div className="flex justify-between border-t border-white/10 pt-4">
                        <span className="text-sm text-gray-400">
                            Stock Available
                        </span>

                        <span className="text-emerald-400">
                            {prod.stockQuantity}
                        </span>
                    </div>

                </div>
            </Link>

            {/* Cart Controls */}
            <div className="px-5 pb-5">

                {cartItem ? (

                    <div className="flex items-center justify-between">

                        <button
                            onClick={() => handleDecrease(prod)}
                            className="rounded-lg bg-red-500 px-4 py-2 text-white"
                        >
                            −
                        </button>

                        <span className="text-xl font-bold text-white">
                            {cartItem.quantity}
                        </span>

                        <button
                            onClick={() => handleIncrease(prod)}
                            disabled={cartItem.quantity >= prod.stockQuantity}
                            className="rounded-lg bg-purple-600 px-4 py-2 text-white disabled:opacity-40"
                        >
                            +
                        </button>

                    </div>

                ) : (

                    <button
                        onClick={() => handleAddToCard(prod)}
                        disabled={!prod.avalaible || prod.stockQuantity <= 0}
                        className="w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-500 disabled:opacity-40"
                    >
                        Add to Cart
                    </button>

                )}

            </div>

        </div>
    );
})}

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


