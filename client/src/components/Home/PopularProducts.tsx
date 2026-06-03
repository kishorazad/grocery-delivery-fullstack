import { useEffect, useState } from "react";
import type { Product } from "../../types";
import { Link } from "react-router-dom";
import { ArrowRightIcon, Flame } from "lucide-react";
import ProductCard from "../ProductCard";
import api from "../../config/api";
import toast from "react-hot-toast";

const PopularProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get("/products?sort=rating")
            .then(({ data }) => {
                setProducts(data.products);
            })
            .catch((error: any) => {
                toast.error(
                    error.response?.data?.message ||
                    error?.message
                );
            });
    }, []);

    return (
        <section className="py-2">

            <div className="
                bg-white
                rounded-3xl
                shadow-md
                p-4
                md:p-6
            ">

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-5
                ">
                    <div>

                        <div className="
                            flex
                            items-center
                            gap-2
                        ">
                            <Flame
                                className="
                                    w-6
                                    h-6
                                    text-orange-500
                                "
                            />

                            <h2
                                className="
                                    text-xl
                                    md:text-2xl
                                    font-bold
                                    text-gray-800
                                "
                            >
                                Trending Near You
                            </h2>
                        </div>

                        <p
                            className="
                                text-sm
                                text-gray-500
                                mt-1
                            "
                        >
                            Most purchased healthcare products
                        </p>

                    </div>

                    <Link
                        to="/products"
                        className="
                            text-orange-500
                            font-semibold
                            flex
                            items-center
                            gap-1
                        "
                    >
                        View All

                        <ArrowRightIcon
                            className="w-4 h-4"
                        />
                    </Link>
                </div>

                <div
                    className="
                        grid
                        grid-cols-2
                        sm:grid-cols-3
                        lg:grid-cols-5
                        gap-4
                    "
                >
                    {products
                        .slice(0, 10)
                        .map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                </div>

            </div>

        </section>
    );
};

export default PopularProducts;