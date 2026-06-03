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
        <div className="min-h-screen bg-gray-50">

            {/* Hero Banner */}
            <Hero />

            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 space-y-6">

                {/* Upload Prescription */}
                <UploadPrescription />

                {/* Buy Again */}
                <PreviouslyBought />

                {/* Recent Orders */}
                <PastOrders />

                {/* Categories */}
                <HomeCategories />

                {/* Trending Products */}
                <PopularProducts />

                {/* Trust Features */}
                <Features />

                {/* App Download */}
                <AppPromoBanner />

                {/* Newsletter */}
                <Newsletter />

            </div>
        </div>
    );
};

export default Home;