import admin from "../config/firebase.js";

const sendPush = async ({
    token,
    title,
    body,
}: {
    token: string;
    title: string;
    body: string;
}) => {

    await admin.messaging().send({
        token,

        notification: {
            title,
            body,
        },
    });
};

export default sendPush;