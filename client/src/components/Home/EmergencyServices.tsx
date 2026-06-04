const EmergencyServices = () => {
    return (
        <section className="py-6">
            <div
                className="
                bg-white
                rounded-3xl
                p-5
                shadow-md
                border
                border-orange-100
                "
            >
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Emergency Services
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                    Quick access to emergency healthcare support.
                </p>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        className="
                        bg-red-500
                        text-white
                        rounded-2xl
                        py-3
                        font-semibold
                        "
                    >
                        🚑 Ambulance
                    </button>

                    <button
                        className="
                        bg-orange-500
                        text-white
                        rounded-2xl
                        py-3
                        font-semibold
                        "
                    >
                        👨‍⚕️ Doctor Visit
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EmergencyServices;