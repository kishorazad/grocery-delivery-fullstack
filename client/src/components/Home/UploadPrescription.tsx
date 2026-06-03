import { Upload } from "lucide-react";

const UploadPrescription = () => {
    return (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-5 shadow-md">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-lg font-bold">
                        Upload Prescription
                    </h2>

                    <p className="text-sm opacity-90 mt-1">
                        Get medicines delivered at your doorstep
                    </p>
                </div>

                <button className="bg-white text-orange-600 px-4 py-2 rounded-xl font-semibold flex items-center gap-2">
                    <Upload size={18} />
                    Upload
                </button>

            </div>

        </div>
    );
};

export default UploadPrescription;