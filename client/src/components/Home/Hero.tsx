
import "swiper/css";
import "swiper/css/pagination";
import { heroBanners } from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";



const Hero = () => {
    return (
        <section className="w-full mb-6 md:mb-10">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                speed={900}
                className="rounded-2xl md:rounded-3xl overflow-hidden shadow-md"
            >
                {heroBanners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="w-full">
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="
                                    w-full
                                    h-[180px]
                                    sm:h-[240px]
                                    md:h-[320px]
                                    lg:h-[420px]
                                    xl:h-[480px]
                                    object-cover
                                    object-center
                                "
                                loading="lazy"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Hero;