
import { Package, ChevronRight } from "lucide-react";

const PastOrders = () => {

    const orders = [
        {
            id: "PN1234",
            status: "Delivered",
            date: "2 days ago",
            total: 450,
        },
        {
            id: "PN1235",
            status: "Out For Delivery",
            date: "Today",
            total: 299,
        },
    ];

    return (
        <div className="mt-8">

            <div className="flex items-center justify-between mb-4">

                <h2 className="text-xl font-bold">
                    Past Orders
                </h2>

                <button
                    className="
                        text-green-600
                        text-sm
                        font-medium
                    "
                >
                    View All
                </button>

            </div>

            <div className="space-y-3">

                {orders.map((order) => (

                    <div
                        key={order.id}
                        className="
                            bg-white
                            border
                            rounded-2xl
                            p-4
                            shadow-sm
                        "
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <div className="flex items-center gap-2">

                                    <Package
                                        className="
                                            text-green-600
                                        "
                                        size={18}
                                    />

                                    <span
                                        className="
                                            font-semibold
                                        "
                                    >
                                        Order #{order.id}
                                    </span>

                                </div>

                                <p
                                    className="
                                        text-sm
                                        text-slate-500
                                        mt-1
                                    "
                                >
                                    {order.date}
                                </p>

                            </div>

                            <span
                                className="
                                    text-xs
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-green-100
                                    text-green-700
                                    font-medium
                                "
                            >
                                {order.status}
                            </span>

                        </div>

                        <div
                            className="
                                flex
                                justify-between
                                items-center
                                mt-4
                            "
                        >

                            <span
                                className="
                                    font-bold
                                    text-slate-800
                                "
                            >
                                ₹{order.total}
                            </span>

                            <div className="flex gap-2">

                                <button
                                    className="
                                        px-3
                                        py-2
                                        border
                                        rounded-xl
                                        text-sm
                                    "
                                >
                                    Reorder
                                </button>

                                <button
                                    className="
                                        px-3
                                        py-2
                                        bg-green-600
                                        text-white
                                        rounded-xl
                                        text-sm
                                        flex
                                        items-center
                                        gap-1
                                    "
                                >
                                    Track
                                    <ChevronRight
                                        size={14}
                                    />
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default PastOrders;

