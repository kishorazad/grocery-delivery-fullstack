import api from "../config/api";

const saveFcmToken = async (
    token: string,
    email: string
) => {

    try {

        const response =
            await api.post(
                "/auth/fcm-token",
                {
                    token,
                    email,
                }
            );

        console.log(
            "FCM TOKEN SAVED:",
            response.data
        );

    } catch (error) {

        console.log(
            "FCM SAVE ERROR:",
            error
        );
    }
};

export default saveFcmToken;