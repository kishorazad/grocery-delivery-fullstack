
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";

import { Route, Routes } from "react-router-dom";

import { getToken } from "firebase/messaging";

import { messaging } from "./firebase";

import api from "./config/api";

import Login from "./pages/Login";

import AppLayout from "./pages/AppLayout";

import Home from "./pages/Home";

import Products from "./pages/Products";

import ProductPage from "./pages/ProductPage";

import SearchResults from "./pages/SearchResults";

import FlashDeals from "./pages/FlashDeals";

import Checkout from "./pages/Checkout";

import MyOrders from "./pages/MyOrders";

import OrderTracking from "./pages/OrderTracking";

import Addresses from "./pages/Addresses";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./pages/admin/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";

import AdminProducts from "./pages/admin/AdminProducts";

import AdminProductForm from "./pages/admin/AdminProductForm";
import SendNotification from "./pages/admin/SendNotification";
import AdminOrders from "./pages/admin/AdminOrders";

import AdminDeliveryPartners from "./pages/admin/AdminDeliveryPartners";

import ImportMedicines from "./pages/admin/ImportMedicines";

import DeliveryLogin from "./pages/delivery/DeliveryLogin";

import DeliveryLayout from "./pages/delivery/DeliveryLayout";

import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";

const App = () => {

    useEffect(() => {

        const saveFcmToken = async () => {

            try {

                const permission =
                    await Notification.requestPermission();

                if (permission !== "granted") {
                    return;
                }

                const authToken =
                    localStorage.getItem("auth_token");

                if (!authToken) {
                    return;
                }

                const token = await getToken(
                    messaging,
                    {
                        vapidKey:
                            import.meta.env
                                .VITE_FIREBASE_VAPID_KEY,
                    }
                );

                if (!token) {
                    return;
                }
const savedUser = JSON.parse(
    localStorage.getItem("auth_user") || "{}"
);

await api.post(
    "/auth/fcm-token",
    {
        token,
        email: savedUser.email,
    }
);
                console.log(
                    "FCM token saved"
                );

            } catch (error) {

                console.log(
                    "FCM Error:",
                    error
                );
            }
        };

        saveFcmToken();

    }, []);

    return (
        <>

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,

                    style: {
                        background: "#1B3022",
                        color: "#fff",
                        borderRadius: "12px",
                        fontSize: "14px",
                    },
                }}
            />

            <Routes>

                {/* AUTH */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* MAIN APP */}

                <Route
                    path="/"
                    element={<AppLayout />}
                >

                    <Route
                        index
                        element={<Home />}
                    />

                    <Route
                        path="products"
                        element={<Products />}
                    />

                    <Route
                        path="products/:slug"
                        element={<ProductPage />}
                    />

                    <Route
                        path="search"
                        element={<SearchResults />}
                    />

                    <Route
                        path="deals"
                        element={<FlashDeals />}
                    />

                    <Route element={<ProtectedRoute />}>

                        <Route
                            path="checkout"
                            element={<Checkout />}
                        />

                        <Route
                            path="orders"
                            element={<MyOrders />}
                        />

                        <Route
                            path="orders/:id"
                            element={<OrderTracking />}
                        />

                        <Route
                            path="addresses"
                            element={<Addresses />}
                        />

                    </Route>

                </Route>

                {/* ADMIN */}

                <Route
                    path="/admin"
                    element={<AdminLayout />}
                >

                    <Route
                        index
                        element={<AdminDashboard />}
                    />
<Route
    path="/admin/send-notification"
    element={<SendNotification />}
/>
                    <Route
                        path="products"
                        element={<AdminProducts />}
                    />

                    <Route
                        path="products/new"
                        element={<AdminProductForm />}
                    />

                    <Route
                        path="products/:id/edit"
                        element={<AdminProductForm />}
                    />

                    <Route
                        path="products/:slug"
                        element={<ProductPage />}
                    />

                    <Route
                        path="import-medicines"
                        element={<ImportMedicines />}
                    />

                    <Route
                        path="orders"
                        element={<AdminOrders />}
                    />

                    <Route
                        path="delivery-partners"
                        element={<AdminDeliveryPartners />}
                    />

                </Route>

                {/* DELIVERY */}

                <Route
                    path="/delivery/login"
                    element={<DeliveryLogin />}
                />

                <Route
                    path="/delivery"
                    element={<DeliveryLayout />}
                >

                    <Route
                        index
                        element={<DeliveryDashboard />}
                    />

                </Route>

            </Routes>

        </>
    );
};

export default App;
