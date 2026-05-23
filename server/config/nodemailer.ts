import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY as string;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({
    to,
    subject,
    body,
}: {
    to: string;
    subject: string;
    body: string;
}) => {

    await tranEmailApi.sendTransacEmail({
        sender: {
            email: process.env.SENDER_EMAIL as string,
            name: "PillNow",
        },

        to: [
            {
                email: to,
            },
        ],

        subject,

        htmlContent: body,
    });

};

export default sendEmail;