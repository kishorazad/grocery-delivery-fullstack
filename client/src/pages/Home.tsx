import AppPromoBanner from "../components/Home/AppPromoBanner";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import HomeCategories from "../components/Home/HomeCategories";
import Newsletter from "../components/Home/Newsletter";
import PopularProducts from "../components/Home/PopularProducts";
import PreviouslyBought from "../components/Home/PreviouslyBought";
import PastOrders from "./PastOrders";
import UploadPrescription from "../components/Home/UploadPrescription";

// New Sections
import QuickServices from "../components/Home/QuickServices";
import HealthcareEssentials from "../components/Home/HealthcareEssentials";
import FeaturedBrands from "../components/Home/FeaturedBrands";
import EmergencyServices from "../components/Home/EmergencyServices";

const Home = () => {
    return (
        <div className="bg-slate-50 min-h-screen">

            {/* Hero Banner */}
            <Hero />

            <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 space-y-8">

                {/* MedaDock Style Quick Actions */}
                <QuickServices />

                {/* PillNow Core Feature */}
                <UploadPrescription />

                {/* PillNow Categories */}
                <HomeCategories />

                {/* Personalized */}
                <PreviouslyBought />

                {/* Orders */}
                <PastOrders />

                {/* Trending */}
                <PopularProducts />

                {/* Healthcare Essentials */}
                <HealthcareEssentials />

                {/* Featured Brands */}
                <FeaturedBrands />

                {/* Emergency Services */}
                <EmergencyServices />

                {/* Trust Section */}
                <Features />

                {/* Download App */}
                <AppPromoBanner />

                {/* Newsletter */}
                <Newsletter />

            </div>

        </div>
    );
};

export default Home;