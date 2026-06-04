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
                      📄 Upload Prescription
                    </h2>

                    <p className="text-sm mt-1 opacity-90">
                        Get medicines delivered quickly
                    </p>
                </div>

               <button
    className="
    bg-orange-500
    hover:bg-orange-600
    text-white
    px-5
    py-3
    rounded-2xl
    font-semibold
    flex
    items-center
    gap-2
    transition-all
    "
>
    <Upload size={18} />
    Upload Prescription
</button>

            </div>
        </div>
    );
};

export default UploadPrescription;