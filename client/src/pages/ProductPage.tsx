import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import Loading from "../components/Loading";
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon, LeafIcon, MinusIcon, PlusIcon, ShoppingCartIcon, StarIcon } from "lucide-react";
import DummyReviewsSection from "../assets/DummyReviewsSection";
import ProductCard from "../components/ProductCard";
import api from "../config/api";

const ProductPage = () => {
    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
    const { slug } = useParams();
    const navigate = useNavigate();
    const { items, addToCart, updateQuantity, removeFromCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [localQuantity, setLocalQuantity] = useState(1);

    useEffect(() => {

    if (!slug) {
        navigate("/products");
        return;
    }

    setLoading(true);

    setLocalQuantity(1);

    window.scrollTo(0, 0);

    const fetchProduct = async () => {

        try {

            const { data } =
                await api.get(
                    `/products/${slug}`
                );

            if (!data.product) {
                navigate("/products");
                return;
            }

            setProduct(data.product);

            const related =
                await api.get(
                    `/products?category=${data.product.category}`
                );

            setRelatedProducts(

                related.data.products.filter(
                    (p: Product) =>
                        p.slug !== slug
                )
            );

        } catch (error) {

            console.error(error);

            navigate("/products");

        } finally {

            setLoading(false);
        }
    };

    fetchProduct();

}, [slug]);

    if (loading) return <Loading />;
    if (!product) return null;

    const cartItem = items.find((item) => item.product.id === product.id);
    const inCart = !!cartItem;
    const displayQuantity = inCart ? cartItem.quantity : localQuantity;

    const handleMinus = () => {
        if (inCart) {
            if (cartItem.quantity > 1) updateQuantity(product.id, cartItem.quantity - 1);
            else removeFromCart(product.id);
        } else {
            setLocalQuantity(Math.max(1, localQuantity - 1));
        }
    };

    const handlePlus = () => {
        if (inCart) updateQuantity(product.id, cartItem.quantity + 1);
        else setLocalQuantity(localQuantity + 1);
    };

    const categoryLabel = product.category.replace(/-/g, " ");
    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
                    <Link to="/" className="hover:text-app-green transition-colors">
                        <HomeIcon className="size-4" />
                    </Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-app-green transition-colors">
                        Products
                    </Link>
                    <span>/</span>
                    <Link to={`/products?category=${product.category}`} className="hover:text-app-green transition-colors capitalize">
                        {categoryLabel}
                    </Link>
                    <span>/</span>
                    <span className="text-app-green font-medium truncate max-w-[200px]">{product.name}</span>
                </nav>

                {/* Back button */}
                <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-1.5 text-sm text-app-text-light hover:text-app-green transition-colors">
                    <ArrowLeftIcon className="size-4" /> Back
                </button>

                {/* Product Details Section */}
                <div className="bg-white/50 rounded-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* left side - Image */}
                        <div className="grid lg:grid-cols-[240px_1fr] gap-6">

    {/* LEFT SIDEBAR */}

    <aside className="hidden lg:block sticky top-24 h-fit bg-white rounded-2xl border border-app-border p-5">

        <h3 className="font-semibold text-lg mb-4 text-app-green">
            Quick Links
        </h3>

        <div className="space-y-3 text-sm">

            <a href="#description" className="block hover:text-orange-500">
                Description
            </a>

            <a href="#composition" className="block hover:text-orange-500">
                Composition
            </a>

            <a href="#manufacturer" className="block hover:text-orange-500">
                Manufacturer
            </a>

            <a href="#usage" className="block hover:text-orange-500">
                How To Use
            </a>

            <a href="#storage" className="block hover:text-orange-500">
                Storage
            </a>

            <a href="#reviews" className="block hover:text-orange-500">
                Reviews
            </a>
        </div>
    </aside>

    {/* RIGHT CONTENT */}

    <div className="bg-white rounded-2xl border border-app-border overflow-hidden">

        <div className="grid md:grid-cols-2 gap-8 p-6 lg:p-10">

            {/* IMAGE */}

            <div className="relative">

                <img
                    src={
                        product.image ||
                        "https://dummyimage.com/600x400/f3f4f6/555555&text=PillNow"
                    }
                    alt={product.name}
                    className="w-full rounded-2xl object-contain bg-gray-50 p-6"
                />

                {product.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {product.discount}% OFF
                    </div>
                )}
            </div>

            {/* CONTENT */}

            <div>

                <h1 className="text-3xl font-bold text-app-green mb-2">
                    {product.name}
                </h1>

                <p className="text-gray-500 mb-4 capitalize">
                    {product.category}
                </p>

                {/* PRICE */}

                <div className="flex items-center gap-3 mb-5">

                    <span className="text-4xl font-bold text-app-green">
                        ₹{product.price}
                    </span>

                    {product.originalPrice > product.price && (
                        <span className="line-through text-gray-400 text-lg">
                            ₹{product.originalPrice}
                        </span>
                    )}
                </div>

                {/* STOCK */}

                <div className="mb-5">

                    {product.stock > 0 ? (
                        <span className="text-green-600 font-medium">
                            In Stock ({product.stock})
                        </span>
                    ) : (
                        <span className="text-red-500 font-medium">
                            Out of Stock
                        </span>
                    )}
                </div>

                {/* BUTTON */}

                <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-4 rounded-xl"
                >
                    Add To Cart
                </button>

                {/* TRANSLATOR */}

                <div className="mt-6">

                    <button className="border border-app-border rounded-xl px-4 py-2 text-sm hover:bg-gray-50">
                        🌐 Translate Medicine Info
                    </button>
                </div>
            </div>
        </div>

        {/* DETAILS */}

        <div className="border-t border-app-border p-6 lg:p-10 space-y-8">

            <section id="description">

                <h2 className="text-2xl font-semibold text-app-green mb-3">
                    Description
                </h2>

                <p className="text-gray-600 leading-relaxed">
                    {product.description}
                </p>
            </section>

            {product.composition && (

                <section id="composition">

                    <h2 className="text-2xl font-semibold text-app-green mb-3">
                        Composition
                    </h2>

                    <p className="text-gray-600">
                        {product.composition}
                    </p>
                </section>
            )}

            {product.manufacturer && (

                <section id="manufacturer">

                    <h2 className="text-2xl font-semibold text-app-green mb-3">
                        Manufacturer
                    </h2>

                    <p className="text-gray-600">
                        {product.manufacturer}
                    </p>
                </section>
            )}

            {product.howToUse && (

                <section id="usage">

                    <h2 className="text-2xl font-semibold text-app-green mb-3">
                        How To Use
                    </h2>

                    <p className="text-gray-600">
                        {product.howToUse}
                    </p>
                </section>
            )}

            {product.storage && (

                <section id="storage">

                    <h2 className="text-2xl font-semibold text-app-green mb-3">
                        Storage
                    </h2>

                    <p className="text-gray-600">
                        {product.storage}
                    </p>
                </section>
            )}
        </div>
    </div>
</div>
                        {/* Badges */}

                        {/* right side - Details */}
                       <div className="bg-white rounded-2xl border border-app-border overflow-hidden">

        <div className="grid md:grid-cols-2 gap-8 p-6 lg:p-10">

            {/* IMAGE */}

            <div className="relative">

                <img
                    src={
                        product.image ||
                        "https://dummyimage.com/600x400/f3f4f6/555555&text=PillNow"
                    }
                    alt={product.name}
                    className="w-full rounded-2xl object-contain bg-gray-50 p-6"
                />

                {product.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {product.discount}% OFF
                    </div>
                )}
            </div>

                            {/* Rating */}
                            {product.rating > 0 && (
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon key={star} className={`w-4 h-4 ${star <= Math.round(product.rating) ? "text-app-warning fill-app-warning" : "text-app-border"}`} />
                                        ))}
                                    </div>

                                    <span className="text-sm font-medium">{product.rating}</span>

                                    <span className="text-sm text-app-text-light">({product.reviewCount} reviews)</span>
                                </div>
                            )}

                            {/* Price */}
                            <div className="flex items-baseline gap-3 mb-5">
                                <span className="text-3xl md:text-4xl font-semibold text-app-green">
                                    {currency}
                                    {product.price.toFixed(2)}
                                </span>

                                {product.originalPrice > product.price && (
                                    <span className="text-lg text-app-text-light line-through">
                                        {currency}
                                        {product.originalPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            {/* Description */}

<div className="mb-6">

    <h3 className="text-lg font-semibold text-app-green mb-2">
        Product Description
    </h3>

    <p className="text-sm text-app-text-light leading-relaxed">
        {product.description || "No description available"}
    </p>
</div>

{/* Medicine Details */}

<div className="space-y-4 mb-8">

    {product.manufacturer && (
        <div>
            <h4 className="font-semibold text-app-green">
                Manufacturer
            </h4>

            <p className="text-sm text-app-text-light">
                {product.manufacturer}
            </p>
        </div>
    )}

    {product.composition && (
        <div>
            <h4 className="font-semibold text-app-green">
                Salt Composition
            </h4>

            <p className="text-sm text-app-text-light">
                {product.composition}
            </p>
        </div>
    )}

    {product.medicineType && (
        <div>
            <h4 className="font-semibold text-app-green">
                Medicine Type
            </h4>

            <p className="text-sm text-app-text-light capitalize">
                {product.medicineType}
            </p>
        </div>
    )}

    {product.howToUse && (
        <div>
            <h4 className="font-semibold text-app-green">
                How To Use
            </h4>

            <p className="text-sm text-app-text-light">
                {product.howToUse}
            </p>
        </div>
    )}

    {product.howItWorks && (
        <div>
            <h4 className="font-semibold text-app-green">
                How It Works
            </h4>

            <p className="text-sm text-app-text-light">
                {product.howItWorks}
            </p>
        </div>
    )}

    {product.storage && (
        <div>
            <h4 className="font-semibold text-app-green">
                Storage
            </h4>

            <p className="text-sm text-app-text-light">
                {product.storage}
            </p>
        </div>
    )}

    {product.prescriptionRequired && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
            Prescription Required
        </div>
    )}
</div>
                            {/* Stock */}

                             {/* CONTENT */}

            <div>

                <h1 className="text-3xl font-bold text-app-green mb-2">
                    {product.name}
                </h1>

                <p className="text-gray-500 mb-4 capitalize">
                    {product.category}
                </p>

                {/* PRICE */}

                <div className="flex items-center gap-3 mb-5">

                    <span className="text-4xl font-bold text-app-green">
                        ₹{product.price}
                    </span>

                    {product.originalPrice > product.price && (
                        <span className="line-through text-gray-400 text-lg">
                            ₹{product.originalPrice}
                        </span>
                    )}
                </div>

                {/* STOCK */}

                            {/* Quantity + Add to Cart */}
                            <div className="flex items-center gap-3">
                                {/* Quantity */}
                                <div className="flex items-center border border-app-border rounded-xl overflow-hidden">
                                    <button onClick={handleMinus} className="p-3 hover:bg-app-cream transition-colors">
                                        <MinusIcon className="w-4 h-4" />
                                    </button>

                                    <span className="px-5 text-sm font-semibold min-w-[40px] text-center">{displayQuantity}</span>

                                    <button onClick={handlePlus} className="p-3 hover:bg-app-cream transition-colors">
                                        <PlusIcon className="w-4 h-4" />
                                    </button>
                                </div>
                                {/* Add to Cart */}
                                <button
                                    onClick={() => {
                                        if (!inCart) addToCart(product, localQuantity);
                                    }}
                                    disabled={product.stock === 0}
                                    className={`flex-1 py-3 font-semibold rounded-xl transition-colors flex-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${inCart ? "bg-app-cream text-app-green border border-app-green" : "bg-app-orange text-white hover:bg-app-orange-dark"}`}
                                >
                                    <ShoppingCartIcon className="w-4 h-4" />
                                    {inCart ? "Added to Cart" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Reviews */}
                {product.reviewCount > 0 && <DummyReviewsSection product={product} />}

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-12 mb-44">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-app-green">Related Products</h2>
                                <p className="text-sm text-app-text-light mt-1">More from {categoryLabel}</p>
                            </div>
                            <Link className="text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors" to={`/products?category=${product.category}`}>
                                View All <ArrowRightIcon className="size-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
                            {relatedProducts.slice(0, 5).map((rp) => (
                                <ProductCard key={rp.id} product={rp} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
