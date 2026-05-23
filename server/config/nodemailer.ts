import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",

    port: 2525,

    secure: false,

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,

    tls: {
        rejectUnauthorized: false,
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