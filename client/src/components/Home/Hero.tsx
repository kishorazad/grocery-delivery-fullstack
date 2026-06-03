import "swiper/css";
import "swiper/css/pagination";

import { heroBanners } from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const Hero = () => {
    return (
        <section className="w-full">

            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                speed={800}
                className="
                    rounded-2xl
                    overflow-hidden
                    bg-white
                    shadow-lg
                "
            >
                {heroBanners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative">

                            <img
                                src={banner.image}
                                alt={banner.title}
                                loading="lazy"
                                className="
                                    w-full
                                    h-[180px]
                                    sm:h-[240px]
                                    md:h-[320px]
                                    lg:h-[420px]
                                    object-cover
                                "
                            />

                            {/* Optional Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">

                <div className="bg-white rounded-xl shadow-sm p-3 text-center">
                    🚚
                    <p className="text-xs font-medium mt-1">
                        Free Delivery
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-3 text-center">
                    💊
                    <p className="text-xs font-medium mt-1">
                        Genuine Medicines
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-3 text-center">
                    ⚡
                    <p className="text-xs font-medium mt-1">
                        Same Day Delivery
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-3 text-center">
                    🔒
                    <p className="text-xs font-medium mt-1">
                        Secure Payments
                    </p>
                </div>

            </div>

        </section>
    );
};

export default Hero;