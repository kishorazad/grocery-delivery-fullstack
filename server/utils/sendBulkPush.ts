import admin from "../config/firebase.js";

const sendBulkPush = async ({
    tokens,
    title,
    body,
}: {
    tokens: string[];
    title: string;
    body: string;
}) => {

    const message = {

        notification: {
            title,
            body,
        },

        tokens,
    };

    const response =
        await admin.messaging()
            .sendEachForMulticast(
                message
            );

    console.log(
        "Bulk Push Sent:",
        response.successCount
    );

    return response;
};

export default sendBulkPush;