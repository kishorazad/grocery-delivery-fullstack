import { createTransport } from "nodemailer";

const transporter = createTransport({

    host: "smtp-relay.brevo.com",

    port: 587,

    secure: false,

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },

});

const sendEmail = async ({
    to,
    subject,
    body,
}: {
    to: string;
    subject: string;
    body: string;
}) => {

    return transporter.sendMail({

        from: `"PillNow" <${process.env.SENDER_EMAIL}>`,

        to,

        subject,

        html: body,
    });

};

export default sendEmail;