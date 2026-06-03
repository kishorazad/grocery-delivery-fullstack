
import { RotateCcw } from "lucide-react";

const PreviouslyBought = () => {

    const medicines = [
        {
            id: 1,
            name: "Paracetamol 650",
            image:
                "https://via.placeholder.com/100",
            price: 45,
        },
        {
            id: 2,
            name: "Vitamin D3",
            image:
                "https://via.placeholder.com/100",
            price: 199,
        },
        {
            id: 3,
            name: "Crocin Advance",
            image:
                "https://via.placeholder.com/100",
            price: 35,
        },
    ];

    return (
        <div className="mt-8">

            <div className="flex items-center justify-between mb-4">

                <h2 className="text-xl font-bold">
                    Previously Bought
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

            <div
                className="
                    flex
                    gap-4
                    overflow-x-auto
                    pb-2
                "
            >

                {medicines.map((item) => (

                    <div
                        key={item.id}
                        className="
                            min-w-[170px]
                            bg-white
                            border
                            rounded-2xl
                            p-3
                            shadow-sm
                        "
                    >

                        <img
                            src={item.image}
                            alt={item.name}
                            className="
                                w-full
                                h-28
                                object-contain
                            "
                        />

                        <h3
                            className="
                                text-sm
                                font-medium
                                mt-2
                                line-clamp-2
                            "
                        >
                            {item.name}
                        </h3>

                        <p
                            className="
                                text-green-600
                                font-bold
                                mt-1
                            "
                        >
                            ₹{item.price}
                        </p>

                        <button
                            className="
                                mt-3
                                w-full
                                bg-green-600
                                text-white
                                py-2
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                gap-2
                            "
                        >
                            <RotateCcw size={16} />
                            Buy Again
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default PreviouslyBought;

