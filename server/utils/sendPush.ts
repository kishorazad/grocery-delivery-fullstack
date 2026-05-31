import admin from "../config/firebase.js";

const sendPush = async ({
    token,
    title,
    body,
    image,
}: {
    token: string;
    title: string;
    body: string;
    image?: string;
}) => {

    console.log(
        "PUSH TOKEN:",
        token
    );

    const response =
        await admin.messaging().send({

            token,

            notification: {
                title,
                body,
                image,
            },

            webpush: {
                notification: {
                    title,
                    body,
                    image,
                    icon:
                        "/logo.png",
                },
            },
        });

    console.log(
        "PUSH RESPONSE:",
        response
    );
};

export default sendPush;