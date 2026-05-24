import { useNavigate } from "react-router-dom";
import type { Product } from "../types";

import {
    Plus,
    Star,
    ShieldCheck,
} from "lucide-react";

import { useCart } from "../context/CartContext";

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {

    const currency =
        import.meta.env.VITE_CURRENCY_SYMBOL || "₹";

    const { addToCart } = useCart();

    const navigate = useNavigate();

    const discount =
        product.originalPrice &&
        product.originalPrice > product.price
            ? Math.round(
                  ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
              )
            : 0;

    return (
        <div
            onClick={() =>
                navigate(
    `/products/${
        product.slug || product.id
    }`
)
            }
            className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                overflow-hidden
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                cursor-pointer
                group
            "
        >
            {/* Image */}
            <div className="relative bg-slate-50 aspect-square overflow-hidden">

                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="
                        w-full
                        h-full
                        object-contain
                        p-4
                        group-hover:scale-105
                        transition-transform
                        duration-300
                    "
                />

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3">
                        <span
                            className="
                                bg-green-600
                                text-white
                                text-[10px]
                                font-bold
                                px-2
                                py-1
                                rounded-full
                            "
                        >
                            {discount}% OFF
                        </span>
                    </div>
                )}

                {/* Prescription Badge */}
                {product.prescriptionRequired && (
                    <div className="absolute top-3 right-3">
                        <span
                            className="
                                bg-red-100
                                text-red-600
                                text-[10px]
                                font-semibold
                                px-2
                                py-1
                                rounded-full
                            "
                        >
                            Rx Required
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">

                {/* Medicine Name */}
                <h3
                    className="
                        text-sm
                        font-semibold
                        text-slate-800
                        line-clamp-2
                        min-h-[40px]
                    "
                >
                    {product.name}
                </h3>

                {/* Composition */}
                {product.composition && (
                    <p
                        className="
                            text-xs
                            text-slate-500
                            mt-1
                            line-clamp-1
                        "
                    >
                        {product.composition}
                    </p>
                )}

                {/* Manufacturer */}
                {product.manufacturer && (
                    <p
                        className="
                            text-xs
                            text-slate-400
                            mt-1
                            line-clamp-1
                        "
                    >
                        {product.manufacturer}
                    </p>
                )}

                {/* Rating */}
                <div className="flex items-center gap-1 mt-3">

                    <Star className="size-3.5 fill-yellow-400 text-yellow-400" />

                    <span className="text-xs font-medium text-slate-700">
                        {product.rating || 4.5}
                    </span>

                    <span className="text-xs text-slate-400">
                        ({product.reviewCount || 10})
                    </span>

                </div>

                {/* Safety */}
                <div className="flex items-center gap-1 mt-2 text-green-600">

                    <ShieldCheck className="size-3.5" />

                    <span className="text-[11px] font-medium">
                        Genuine Medicine
                    </span>

                </div>

                {/* Price + Cart */}
                <div className="flex items-center justify-between mt-4">

                    <div>

                        <div className="flex items-center gap-2">

                            <span className="text-lg font-bold text-slate-900">
                                {currency}
                                {product.price}
                            </span>

                            {product.originalPrice &&
                                product.originalPrice >
                                    product.price && (
                                    <span
                                        className="
                                            text-sm
                                            text-slate-400
                                            line-through
                                        "
                                    >
                                        {currency}
                                        {product.originalPrice}
                                    </span>
                                )}

                        </div>

                        <p className="text-[11px] text-slate-400 mt-0.5">
                            Inclusive of all taxes
                        </p>

                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="
                            size-10
                            rounded-full
                            bg-green-600
                            text-white
                            flex
                            items-center
                            justify-center
                            hover:bg-green-700
                            transition-all
                            active:scale-95
                            shadow-md
                        "
                    >
                        <Plus className="size-5" />
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;