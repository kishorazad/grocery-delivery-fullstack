const brands = [
    "Cipla",
    "Sun Pharma",
    "Dabur",
    "Himalaya",
    "Zydus",
];

const FeaturedBrands = () => {
    return (
        <section className="py-4">
            <h2 className="text-xl font-bold mb-4">
                Featured Brands
            </h2>

            <div className="flex gap-3 overflow-x-auto">
                {brands.map((brand) => (
                    <div
                        key={brand}
                        className="
                        min-w-[120px]
                        bg-white
                        rounded-2xl
                        p-4
                        shadow-sm
                        border
                        border-orange-100
                        text-center
                        "
                    >
                        {brand}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedBrands;