import admin from "../config/firebase";

const sendPush = async ({
    token,
    title,
    body,
}: {
    token: string;
    title: string;
    body: string;
}) => {

    console.log("PUSH TOKEN:", token);

    const response = await admin.messaging().send({
        token,

        notification: {
            title,
            body,
        },
    });

    console.log("PUSH RESPONSE:", response);
};

export default sendPush;