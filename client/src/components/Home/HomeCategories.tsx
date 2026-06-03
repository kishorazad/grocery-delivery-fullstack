import { Link } from "react-router-dom";
import { categoriesData } from "../../assets/assets";

const HomeCategories = () => {
    return (
        <section className="py-6">

            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                        Shop by Category
                    </h2>

                    <p className="text-sm text-gray-500">
                        Medicines, healthcare & wellness
                    </p>
                </div>

                <Link
                    to="/products"
                    className="text-orange-500 font-semibold text-sm"
                >
                    View All →
                </Link>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">

                {categoriesData.map((cat) => (
                    <Link
                        key={cat.slug}
                        to={`/products?category=${cat.slug}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="
                            min-w-[110px]
                            bg-white
                            rounded-2xl
                            p-3
                            shadow-sm
                            hover:shadow-md
                            transition-all
                            border
                            border-gray-100
                            flex
                            flex-col
                            items-center
                        "
                    >
                        <div
                            className="
                                w-20
                                h-20
                                rounded-2xl
                                bg-orange-50
                                flex
                                items-center
                                justify-center
                                overflow-hidden
                            "
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="
                                    w-14
                                    h-14
                                    object-contain
                                "
                            />
                        </div>

                        <p
                            className="
                                mt-3
                                text-sm
                                font-medium
                                text-center
                                text-gray-700
                                line-clamp-2
                            "
                        >
                            {cat.name}
                        </p>
                    </Link>
                ))}

            </div>
        </section>
    );
};

export default HomeCategories;