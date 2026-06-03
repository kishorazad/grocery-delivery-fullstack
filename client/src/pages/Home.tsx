import AppPromoBanner from "../components/Home/AppPromoBanner";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import HomeCategories from "../components/Home/HomeCategories";
import Newsletter from "../components/Home/Newsletter";
import PopularProducts from "../components/Home/PopularProducts";
import PreviouslyBought from "../components/Home/PreviouslyBought";
import PastOrders from "./PastOrders";
import UploadPrescription from "../components/Home/UploadPrescription";

const Home = () => {
    return (
        <div className="bg-[#f8f9fa] min-h-screen">

            <Hero />

            <div className="max-w-7xl mx-auto px-3 md:px-6 space-y-6 py-4">

                <UploadPrescription />

                <PreviouslyBought />

                <PastOrders />

                <HomeCategories />

                <PopularProducts />

                <Features />

                <AppPromoBanner />

                <Newsletter />

            </div>

        </div>
    );
};

export default Home;