import {
    Pill,
    HeartPulse,
    FlaskConical,
    Stethoscope
} from "lucide-react";
import HealthcareEssentials from "../components/Home/HealthcareEssentials";
import FeaturedBrands from "../components/Home/FeaturedBrands";
import EmergencyServices from "../components/Home/EmergencyServices";   

const services = [
    {
        icon: Pill,
        title: "Medicines",
    },
    {
        icon: FlaskConical,
        title: "Lab Tests",
    },
    {
        icon: Stethoscope,
        title: "Doctor",
    },
    {
        icon: HeartPulse,
        title: "Healthcare",
    },
];

const QuickServices = () => {
    return (
        <section>
            <h2 className="text-xl font-bold mb-4">
                Quick Services
            </h2>

            <div className="grid grid-cols-4 gap-3">

                {services.map((item) => (
                    <div
                        key={item.title}
                        className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        p-4
                        flex
                        flex-col
                        items-center
                        "
                    >
                        <item.icon
                            className="
                            text-orange-500
                            w-6
                            h-6
                            "
                        />

                        <span
                            className="
                            text-xs
                            font-medium
                            mt-2
                            text-center
                            "
                        >
                            {item.title}
                        </span>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default QuickServices;