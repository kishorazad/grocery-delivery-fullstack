

const Notifications = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Notifications
            </h1>

            <div className="space-y-3">

                <div className="p-3 border rounded-lg">
                    🎉 Order Confirmed
                </div>

                <div className="p-3 border rounded-lg">
                    🚚 Out For Delivery
                </div>

                <div className="p-3 border rounded-lg">
                    📦 Delivered
                </div>

                <div className="p-3 border rounded-lg">
                    💊 50% OFF on Medicines
                </div>

                <div className="p-3 border rounded-lg">
                    🔥 New Product Added
                </div>

            </div>
        </div>
    );
};

export default Notifications;