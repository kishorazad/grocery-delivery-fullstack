import { TruckIcon, LeafIcon, ClockIcon, ShieldCheckIcon, MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";
import { SiFacebook, SiX, SiInstagram } from "@icons-pack/react-simple-icons";
import hero_bg from "./hero_bg.jpeg";
import delivery_truck from "./delivery_truck.svg";

import dairy_eggs from "./dairy_eggs.png";

import personal_care from "./personal_care.png";
import baby_care from "./baby_care.png";
import devices from "./devices.png";
import diabetes from "./diabetes.png";
import medicines from "./medicines.png";
import wellness from "./wellness.png";

export const assets = {
    delivery_truck,
    hero_bg,
};

export const categoriesData = [
   { slug: "medicines", name: "Medicines", image: medicines },
{ slug: "wellness", name: "Wellness", image: wellness },
{ slug: "personal-care", name: "Personal Care", image: personal_care },
{ slug: "diabetes-care", name: "Diabetes Care", image: diabetes },
{ slug: "baby-care", name: "Baby Care", image: baby_care },
{ slug: "health-devices", name: "Health Devices", image: devices },
    { slug: "dairy-eggs", name: "Dairy & Eggs", image: dairy_eggs },
];

export const heroSectionData = {
    description: "Order medicines, healthcare essentials, wellness products, and prescription drugs online with PillNow.",
    hero_image: hero_bg,
    hero_features: [
        { icon: TruckIcon, title: "Free Delivery", desc: "Orders over 500" },
        { icon: LeafIcon, title: "100% Authentic", desc: "Certified medicines" },
        { icon: ClockIcon, title: "Same Day", desc: "Express delivery" },
        { icon: ShieldCheckIcon, title: "Secure Pay", desc: "Safe checkout" },
    ],
};

export const deliveryPartnerLoginImage = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200";

export const appPromoBannerData = {
    title: "Get fresh groceries in minutes",
    description: "Download the Instacart app for exclusive deals, real-time tracking, and the freshest selection delivered right to your door.",
};

export const footerData = {
    brand: {
        name: "Instacart",
        description: "Delivering medicines, healthcare essentials, and wellness products quickly and safely to your doorstep.",
        socials: [
            { icon: SiFacebook, link: "#" },
            { icon: SiX, link: "#" },
            { icon: SiInstagram, link: "#" },
        ],
    },

    sections: [
        {
            title: "Quick Links",
            links: [
                { label: "All Products", to: "/products" },
                { label: "Flash Deals", to: "/deals" },
                { label: "Track Order", to: "/orders" },
                { label: "Delivery Partner", to: "/delivery" },
            ],
        },
        {
            title: "Customer Service",
            links: [
                { label: "My Account", to: "#" },
                { label: "Order History", to: "#" },
                { label: "Addresses", to: "#" },
                { label: "Help Center", href: "#" },
            ],
        },
    ],

    contact: [
        { icon: MapPinIcon, text: "Bengalaru" },
        { icon: PhoneIcon, text: "91 8770762307" },
        { icon: MailIcon, text: "support@pillnow.com" },
    ],

    bottom: {
        copyright: "© 2026 Pillnow. All rights reserved.",
        links: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
        ],
    },
};

export const statusColors: Record<string, string> = {
    Placed: "bg-blue-100 text-blue-700",
    Confirmed: "bg-indigo-100 text-indigo-700",
    Packed: "bg-purple-100 text-purple-700",
    "Out for Delivery": "bg-app-orange/10 text-app-orange",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
};

export const iconsForLeafpad = {
    truck: "https://cdn-icons-png.flaticon.com/512/3097/3097180.png",
    destination: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
};

export const dummyProducts = [];

export const dummyAdminDashboardData = {
    totalOrders: 1,
    totalUsers: 3,
    totalProducts: 27,
    outOfStock: 0,
    totalPartners: 2,
    recentOrders: [
        {
            shippingAddress: {
                label: "Home",
                address: "New Market Road ",
                city: "New York ",
                state: "NY",
                zip: "876543",
                lat: 40.7128,
                lng: -74.006,
            },
            liveLocation: {
                lat: 40.7128,
                lng: -74.006,
                updatedAt: "2026-04-06T08:41:27.211Z",
            },
            id: "69d366617ed7e54198d67dac",
            user: {
                id: "69bb6caf448f2d818db59122",
                name: "Admin",
                email: "admin@example.com",
            },
            items: [
                {
                    product: "69c22613ae75a98c7cd13b3b",
                    name: "Butter Croissant 100g",
                    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
                    price: 45,
                    quantity: 2,
                    unit: "100g",
                    id: "69d366617ed7e54198d67dad",
                },
                {
                    product: "69c22613ae75a98c7cd13b36",
                    name: "Barley 1kg",
                    image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png",
                    price: 140,
                    quantity: 1,
                    unit: "1kg",
                    id: "69d366617ed7e54198d67dae",
                },
            ],
            paymentMethod: "cash",
            subtotal: 230,
            deliveryFee: 0,
            tax: 18.4,
            total: 248.4,
            status: "Delivered",
            statusHistory: [
                {
                    status: "Placed",
                    note: "Order placed successfully",
                    id: "69d366617ed7e54198d67daf",
                    timestamp: "2026-04-06T07:53:05.769Z",
                },
                {
                    status: "Assigned",
                    note: "Assigned to Rahul",
                    id: "69d366ab7ed7e54198d67dbe",
                    timestamp: "2026-04-06T07:54:19.796Z",
                },
                {
                    status: "Packed",
                    note: "Status updated to Packed",
                    id: "69d366b37ed7e54198d67ddc",
                    timestamp: "2026-04-06T07:54:27.171Z",
                },
                {
                    status: "Out for Delivery",
                    note: "Status updated to Out for Delivery",
                    id: "69d366b57ed7e54198d67e00",
                    timestamp: "2026-04-06T07:54:29.226Z",
                },
                {
                    status: "Delivered",
                    note: "Delivered by partner",
                    id: "69d373207ed7e54198d681b1",
                    timestamp: "2026-04-06T08:47:28.983Z",
                },
            ],
            deliveryPartner: {
                id: "69bbfc3866db7c6cdea47ede",
                name: "Rahul",
                phone: "987654321",
            },
            deliveryOtp: "",
            isPaid: false,
            createdAt: "2026-04-06T07:53:05.774Z",
            updatedAt: "2026-04-06T08:47:28.984Z",
            __v: 4,
        },
    ],
};

export const dummyDeliveryPartnerData = [
    {
        id: "69bbfc6c66db7c6cdea47ee4",
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "987654321",
        avatar: "",
        vehicleType: "bike",
        isActive: true,
        createdAt: "2026-03-19T13:38:52.827Z",
        updatedAt: "2026-03-19T13:38:52.827Z",
        __v: 0,
    },
    {
        id: "69bbfc3866db7c6cdea47ede",
        name: "Rahul",
        email: "rahul@example.com",
        phone: "987654321",
        avatar: "",
        vehicleType: "bike",
        isActive: true,
        createdAt: "2026-03-19T13:38:00.872Z",
        updatedAt: "2026-03-19T13:38:00.872Z",
        __v: 0,
    },
];

export const dummyDashboardOrdersData = [
    {
        shippingAddress: {
            label: "Home",
            address: "New Market Road ",
            city: "New York ",
            state: "NY",
            zip: "876543",
            lat: 40.7128,
            lng: -74.006,
        },
        liveLocation: {
            lat: 40.7128,
            lng: -74.006,
            updatedAt: "2026-04-06T08:41:27.211Z",
        },
        id: "69d366617ed7e54198d67dac",
        user: {
            id: "69bb6caf448f2d818db59122",
            name: "Admin",
            email: "admin@example.com",
        },
        items: [
            {
                product: "69c22613ae75a98c7cd13b3b",
                name: "Butter Croissant 100g",
                image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png",
                price: 45,
                quantity: 2,
                unit: "100g",
                id: "69d366617ed7e54198d67dad",
            },
            {
                product: "69c22613ae75a98c7cd13b36",
                name: "Barley 1kg",
                image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png",
                price: 140,
                quantity: 1,
                unit: "1kg",
                id: "69d366617ed7e54198d67dae",
            },
        ],
        paymentMethod: "cash",
        subtotal: 230,
        deliveryFee: 0,
        tax: 18.4,
        total: 248.4,
        status: "Delivered",
        statusHistory: [
            { status: "Placed", note: "Order placed successfully", id: "69d366617ed7e54198d67daf", timestamp: "2026-04-06T07:53:05.769Z" },
            { status: "Assigned", note: "Assigned to Rahul", id: "69d366ab7ed7e54198d67dbe", timestamp: "2026-04-06T07:54:19.796Z" },
            { status: "Packed", note: "Status updated to Packed", id: "69d366b37ed7e54198d67ddc", timestamp: "2026-04-06T07:54:27.171Z" },
            { status: "Out for Delivery", note: "Status updated to Out for Delivery", id: "69d366b57ed7e54198d67e00", timestamp: "2026-04-06T07:54:29.226Z" },
            { status: "Delivered", note: "Delivered by partner", id: "69d373207ed7e54198d681b1", timestamp: "2026-04-06T08:47:28.983Z" },
        ],
        deliveryPartner: { id: "69bbfc3866db7c6cdea47ede", name: "Rahul", email: "rahul@example.com", phone: "987654321" },
        deliveryOtp: "",
        isPaid: false,
        createdAt: "2026-04-06T07:53:05.774Z",
        updatedAt: "2026-04-06T08:47:28.984Z",
        __v: 4,
    },
    {
        shippingAddress: { label: "Home", address: "New Market Road ", city: "New York ", state: "NY", zip: "876543", lat: 40.7128, lng: -74.006 },
        liveLocation: { lat: 40.7128, lng: -74.006, updatedAt: "2026-04-06T08:41:27.211Z" },
        id: "69d366617ed7e54198d67dad",
        user: { id: "69bb6caf448f2d818db59122", name: "Admin", email: "admin@example.com" },
        items: [
            { product: "69c22613ae75a98c7cd13b3b", name: "Butter Croissant 100g", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/zvoeqbvrbrt7atqj0dbu.png", price: 45, quantity: 2, unit: "100g", id: "69d366617ed7e54198d67dad" },
            { product: "69c22613ae75a98c7cd13b36", name: "Barley 1kg", image: "https://raw.githubusercontent.com/avinashdm/gs-images/main/greencart/spb5sgy8g24rned9nwog.png", price: 140, quantity: 1, unit: "1kg", id: "69d366617ed7e54198d67dae" },
        ],
        paymentMethod: "cash",
        subtotal: 230,
        deliveryFee: 0,
        tax: 18.4,
        total: 248.4,
        status: "Out for Delivery",
        statusHistory: [
            { status: "Placed", note: "Order placed successfully", id: "69d366617ed7e54198d67daf", timestamp: "2026-04-06T07:53:05.769Z" },
            { status: "Assigned", note: "Assigned to Rahul", id: "69d366ab7ed7e54198d67dbe", timestamp: "2026-04-06T07:54:19.796Z" },
            { status: "Packed", note: "Status updated to Packed", id: "69d366b37ed7e54198d67ddc", timestamp: "2026-04-06T07:54:27.171Z" },
            { status: "Out for Delivery", note: "Status updated to Out for Delivery", id: "69d366b57ed7e54198d67e00", timestamp: "2026-04-06T07:54:29.226Z" },
        ],
        deliveryPartner: { id: "69bbfc3866db7c6cdea47ede", name: "Rahul", email: "rahul@example.com", phone: "987654321" },
        deliveryOtp: "754730",
        isPaid: false,
        createdAt: "2026-04-06T07:53:05.774Z",
        updatedAt: "2026-04-06T08:47:28.984Z",
        __v: 4,
    },
];

export const dummyCartData = [
    { product: dummyProducts[0], quantity: 1 },
    { product: dummyProducts[1], quantity: 1 },
    { product: dummyProducts[2], quantity: 1 },
];

export const dummyAddressData = [
    { label: "Home", address: "123 Main St ", city: "New York ", state: "NY", zip: "10001", isDefault: true, lat: 40.7128, lng: -74.006, id: "69d3652df9a340288f1a0f8c" },
    { label: "Work", address: "456 Market St ", city: "New York ", state: "NY", zip: "10002", isDefault: false, lat: 40.7128, lng: -74.006, id: "69d3652df9a340288f1a0f8d" },
];

export const heroBanners = [
    {
        id: 1,
        title: "Banner 1",
        image: "/client/src/assets/banner1.png",
    },
    {
        id: 2,
        title: "Banner 2",
        image: "/client/src/assets/banner2.png",
    },
    {
        id: 3,
        title: "Banner 3",
        image: "/client/src/assets/banner3.png",
    },
    {
        id: 4,
        title: "Banner 4",
        image: "/client/src/assets/banner4.png",
    },
];