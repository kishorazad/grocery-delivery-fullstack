import axios from "axios";

const saveFcmToken = async (
    token: string,
    email: string
) => {

    try {

        const response =
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/auth/fcm-token`,
                {
                    token,
                    email,
                }
            );

        console.log(
            "FCM TOKEN SAVED",
            response.data
        );

    } catch (error) {

        console.log(
            "FCM SAVE ERROR",
            error
        );
    }
};

export default saveFcmToken;