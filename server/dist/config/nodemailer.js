import axios from "axios";
const sendEmail = async ({ to, subject, body, }) => {
    const response = await axios.post("https://api.brevo.com/v3/smtp/email", {
        sender: {
            name: "PillNow",
            email: process.env.SENDER_EMAIL,
        },
        to: [
            {
                email: to,
            },
        ],
        subject,
        htmlContent: body,
    }, {
        headers: {
            accept: "application/json",
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json",
        },
    });
    return response.data;
};
export default sendEmail;
