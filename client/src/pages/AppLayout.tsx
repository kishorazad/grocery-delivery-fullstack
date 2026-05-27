import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-[#fafaf9] flex flex-col overflow-x-hidden">
            
            {/* Top Offer Banner */}
            <Banner />

            {/* Sticky Navbar */}
            <Navbar />

            {/* Main Content */}
            <main
                className="
                flex-1
                w-full
                overflow-hidden
                "
            >
                <div
                    className="
                    w-full
                    max-w-[1400px]
                    mx-auto
                    px-3
                    sm:px-4
                    md:px-6
                    lg:px-8
                    py-4
                    md:py-6
                    "
                >
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <Footer />

            {/* Cart Sidebar */}
            <CartSidebar />
        </div>
    );
};

export default AppLayout;