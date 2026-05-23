import SibApiV3Sdk from "sib-api-v3-sdk";

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY as string;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({
    to,
    subject,
    body,
}: {
    to: string;
    subject: string;
    body: string;
}) => {

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
        email: process.env.SENDER_EMAIL as string,
        name: "PillNow",
    };

    sendSmtpEmail.to = [
        {
            email: to,
        },
    ];

    sendSmtpEmail.subject = subject;

    sendSmtpEmail.htmlContent = body;

    return await apiInstance.sendTransacEmail(sendSmtpEmail);

};

export default sendEmail;