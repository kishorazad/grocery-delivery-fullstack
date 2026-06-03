import { Upload } from "lucide-react";

const UploadPrescription = () => {
    return (
        <div className="
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            rounded-3xl
            p-5
            text-white
            shadow-lg
        ">
            <div className="flex items-center justify-between">

                <div>
                    <h2 className="font-bold text-xl">
                        Upload Prescription
                    </h2>

                    <p className="text-sm mt-1 opacity-90">
                        Get medicines delivered quickly
                    </p>
                </div>

                <button className="
                    bg-white
                    text-orange-600
                    px-5
                    py-2
                    rounded-xl
                    font-semibold
                    flex
                    items-center
                    gap-2
                ">
                    <Upload size={18} />
                    Upload
                </button>

            </div>
        </div>
    );
};

export default UploadPrescription;