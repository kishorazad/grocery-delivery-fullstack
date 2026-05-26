import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import Loading from "../components/Loading";
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon, MinusIcon, PlusIcon } from "lucide-react";
import DummyReviewsSection from "../assets/DummyReviewsSection";
import ProductCard from "../components/ProductCard";
import api from "../config/api";

const ProductPage = () => {
   
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

<div className="bg-white rounded-3xl overflow-hidden border border-app-border shadow-sm">

    <div className="grid lg:grid-cols-[220px_1fr] gap-0">

        {/* LEFT SIDEBAR */}

        <aside className="hidden lg:block border-r border-app-border bg-app-cream/30 p-6">

            <h3 className="text-lg font-semibold text-app-green mb-5">
                Quick Links
            </h3>

            <div className="space-y-4 text-sm">

                <a href="#description" className="block hover:text-orange-500 transition">
                    Description
                </a>

                <a href="#composition" className="block hover:text-orange-500 transition">
                    Composition
                </a>

                <a href="#manufacturer" className="block hover:text-orange-500 transition">
                    Manufacturer
                </a>

                <a href="#usage" className="block hover:text-orange-500 transition">
                    How To Use
                </a>

                <a href="#storage" className="block hover:text-orange-500 transition">
                    Storage
                </a>

                <a href="#benefits" className="block hover:text-orange-500 transition">
    Benefits
</a>

<a href="#side-effects" className="block hover:text-orange-500 transition">
    Side Effects
</a>

<a href="#safety-advice" className="block hover:text-orange-500 transition">
    Safety Advice
</a>

<a href="#interactions" className="block hover:text-orange-500 transition">
    Interactions
</a>
 <a href="#faq" className="block hover:text-orange-500 transition">
    FAQs
</a>

                <a href="#reviews" className="block hover:text-orange-500 transition">
                    Reviews
                </a>
            </div>
        </aside>

        {/* RIGHT CONTENT */}

        <div>

            <div className="grid md:grid-cols-2 gap-10 p-6 lg:p-10">

                {/* IMAGE */}

                <div className="relative">

                    <img
                        src={
                            product.image ||
                            "https://placehold.co/600x400/png"
                        }
                        alt={product.name}
                        className="w-full rounded-2xl bg-gray-50 object-contain p-8"
                    />

                    {product.discount > 0 && (
                        <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {product.discount}% OFF
                        </div>
                    )}
                </div>

                {/* PRODUCT INFO */}

                <div>

                    <h1 className="text-3xl font-bold text-app-green mb-3">
                        {product.name}
                    </h1>

                    <p className="text-sm text-gray-500 capitalize mb-5">
                        {categoryLabel}
                    </p>

                    {/* PRICE */}

                    <div className="flex items-center gap-3 mb-5">

                        <span className="text-4xl font-bold text-app-green">
                          ₹{Number(product.price || 0).toFixed(2)}
                        </span>

                        {product.originalPrice > product.price && (
                            <span className="text-lg line-through text-gray-400">
                               ₹{Number(product.originalPrice || 0).toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* STOCK */}

                    <div className="mb-6">

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

                    {/* QUANTITY */}

                    <div className="flex items-center gap-3 mb-6">

                        <div className="flex items-center border border-app-border rounded-xl overflow-hidden">

                            <button
                                onClick={handleMinus}
                                className="p-3 hover:bg-app-cream"
                            >
                                <MinusIcon className="size-4" />
                            </button>

                            <span className="px-5 font-semibold">
                                {displayQuantity}
                            </span>

                            <button
                                onClick={handlePlus}
                                className="p-3 hover:bg-app-cream"
                            >
                                <PlusIcon className="size-4" />
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                if (!inCart) {
                                    addToCart(product, localQuantity);
                                }
                            }}
                            disabled={product.stock === 0}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
                        >
                            {inCart ? "Added To Cart" : "Add To Cart"}
                        </button>
                    </div>

                    {/* TRANSLATOR */}

                    <button className="border border-app-border rounded-xl px-4 py-2 text-sm hover:bg-gray-50 transition">
                        🌐 Translate Medicine Info
                    </button>
                </div>
            </div>

            {/* DETAILS */}

            <div className="border-t border-app-border p-6 lg:p-10 space-y-8">

                <section id="description">

                    <h2 className="text-2xl font-semibold text-app-green mb-3">
                        Description
                    </h2>

                    <p className="text-gray-600 leading-relaxed">
                        {product.description || "No description available"}
                    </p>
                </section>

{product.benefits && (

<section id="benefits">

    <h2 className="text-2xl font-semibold text-app-green mb-3">
        Benefits
    </h2>

    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
        {product.benefits}
    </p>

</section>

)}
                {product.composition && (

                    <section id="composition">

                        <h2 className="text-2xl font-semibold text-app-green mb-3">
                            Salt Composition
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
{product.sideEffects && (

<section id="side-effects">

    <h2 className="text-2xl font-semibold text-app-green mb-3">
        Side Effects
    </h2>

    <p className="text-gray-600 whitespace-pre-line">
        {product.sideEffects}
    </p>

</section>

)}
                {product.howItWorks && (

                    <section>

                        <h2 className="text-2xl font-semibold text-app-green mb-3">
                            How It Works
                        </h2>

                        <p className="text-gray-600">
                            {product.howItWorks}
                        </p>
                    </section>
                )}
                {product.interaction && (

<section id="interactions">

    <h2 className="text-2xl font-semibold text-app-green mb-3">
        Drug Interactions
    </h2>

    <p className="text-gray-600 whitespace-pre-line">
        {product.interaction}
    </p>

</section>

)}
                {product.safetyAdvice && (

<section id="safety-advice">

    <h2 className="text-2xl font-semibold text-app-green mb-3">
        Safety Advice
    </h2>

    <p className="text-gray-600 whitespace-pre-line">
        {product.safetyAdvice}
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

                {product.prescriptionRequired && (

                    <div className="inline-flex px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                        Prescription Required
                    </div>
                )}
            </div>

            {product.qna && (

<section id="faq" className="px-6 lg:px-10 pb-10">

    <h2 className="text-2xl font-semibold text-app-green mb-4">
        Frequently Asked Questions
    </h2>

    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
        {product.qna}
    </div>

</section>

)}

            {/* REVIEWS */}

            {product.reviewCount > 0 && (
                <div id="reviews" className="px-6 lg:px-10 pb-10">
                    <DummyReviewsSection product={product} />
                </div>
            )}
        </div>
    </div>
</div>
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