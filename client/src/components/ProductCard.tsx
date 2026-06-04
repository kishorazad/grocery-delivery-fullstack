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
        product.slug}`
)
            }
            className="
                bg-white
               rounded-[28px]
                border
               border-orange-100
                overflow-hidden
                shadow-sm
hover:shadow-lg
               hover:-translate-y-2
hover:shadow-xl
                transition-all
                duration-300
                cursor-pointer
                group
            "
        >
            {/* Image */}
           
            <div className="relativebg-gradient-to-b from-orange-50 to-white aspect-square overflow-hidden">
 <button
    className="
    absolute
    top-3
    right-3
    w-8
    h-8
    rounded-full
    bg-white
    shadow-md
    flex
    items-center
    justify-center
    "
>
    ❤️
</button>
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
                               bg-orange-500
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

                {product.rating >= 4.7 && (
    <div className="absolute bottom-3 left-3">
        <span
            className="
            bg-green-600
            text-white
            text-[10px]
            px-2
            py-1
            rounded-full
            "
        >
            Bestseller
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
         <div
    className="
    flex
    items-center
    gap-1
    bg-green-600
    text-white
    px-2
    py-1
    rounded-md
"
>

                    <Star className="size-3.5 fill-yellow-400 text-yellow-400" />

           <span className="text-[11px] text-white font-medium">
                        {product.rating || 4.5}
                    </span>

                   <span className="text-[11px] text-green-100">
                        ({product.reviewCount || 10})
                    </span>

                </div>

                {/* Safety */}
               <div className="flex flex-wrap gap-2 mt-2">

    <div
        className="
        flex
        items-center
        gap-1
        text-orange-600
        bg-orange-50
        px-2
        py-1
        rounded-lg
        "
    >
        <ShieldCheck className="size-3.5" />

        <span className="text-[11px] font-medium">
            Genuine Medicine
        </span>
    </div>

    <div
        className="
        flex
        items-center
        gap-1
        text-green-700
        bg-green-50
        px-2
        py-1
        rounded-lg
        "
    >
        🚚

        <span className="text-[11px] font-medium">
            Free Delivery
        </span>
    </div>

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
                           h-10
 px-4
 rounded-xl
                           
                           bg-orange-500
                            text-white
                            flex
                            items-center
                            justify-center
                             gap-1
                            hover:bg-orange-600
                            transition-all
                            active:scale-95
                            shadow-md
                        "
                    >
                        <Plus className="size-4" /> Add
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;