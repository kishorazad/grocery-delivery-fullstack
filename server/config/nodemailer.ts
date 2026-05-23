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

// Verify SMTP connection
transporter.verify((error, success) => {

    if (error) {

        console.log("SMTP ERROR:", error);

    } else {

        console.log("SMTP CONNECTED");
    }
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

    const response = await transporter.sendMail({

        from: `"PillNow" <${process.env.SENDER_EMAIL}>`,

        to,

        subject,

        html: body,
    });

    return response;
};

export default sendEmail;