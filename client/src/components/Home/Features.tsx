import { heroSectionData } from "../../assets/assets";

const Features = () => {
    return (
        <section className="py-2">

            <div className="
                bg-white
                rounded-3xl
                shadow-md
                border
                border-orange-100
                p-4 md:p-6
            ">

                <div className="mb-5">
                    <h2 className="text-xl font-bold text-gray-800">
                        Why Choose PillNow?
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Trusted healthcare delivered to your doorstep
                    </p>
                </div>

                <div className="
                    grid
                    grid-cols-2
                    md:grid-cols-4
                    gap-4
                ">
                    {heroSectionData.hero_features.map(
                        (feature, i) => (
                            <div
                                key={i}
                                className="
                                    bg-orange-50
                                    rounded-2xl
                                    p-4
                                    transition-all
                                    hover:shadow-md
                                "
                            >
                                <div
                                    className="
                                        w-12
                                        h-12
                                        rounded-xl
                                        bg-orange-500
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        mb-3
                                    "
                                >
                                    <feature.icon
                                        className="w-6 h-6"
                                    />
                                </div>

                                <h3
                                    className="
                                        text-sm
                                        md:text-base
                                        font-semibold
                                        text-gray-800
                                    "
                                >
                                    {feature.title}
                                </h3>

                                <p
                                    className="
                                        text-xs
                                        md:text-sm
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    {feature.desc}
                                </p>
                            </div>
                        )
                    )}
                </div>

            </div>

        </section>
    );
};

export default Features;