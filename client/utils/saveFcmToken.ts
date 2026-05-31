import api from "../config/api";

export const saveFcmToken =
async (
    token: string,
    email: string
) => {

    try {

        const response =
            await api.put(
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