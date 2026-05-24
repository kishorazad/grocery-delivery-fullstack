import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const app = express();
app.use(express.json());
/* =========================
   BREVO SMTP CONFIG
========================= */
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
/* =========================
   SMTP VERIFY
========================= */
transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP ERROR:", error);
    }
    else {
        console.log("SMTP SERVER READY");
    }
});
/* =========================
   TEST MAIL ROUTE
========================= */
app.get("/api/test-mail", async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: "brizkishor.azad@gmail.com",
            subject: "PillNow Test Email",
            html: `
        <div style="font-family: Arial; padding: 20px;">
          <h1 style="color: green;">
            Order Confirmed
          </h1>

          <p>
            Your test email is working successfully.
          </p>

          <p>
            Brevo SMTP integration connected correctly.
          </p>

          <h3>
            PillNow Grocery & Pharmacy
          </h3>
        </div>
      `,
        });
        console.log("MAIL SENT:", info);
        res.json({
            success: true,
            message: "Email sent successfully",
            info,
        });
    }
    catch (error) {
        console.log("MAIL ERROR:", error);
        res.json({
            success: false,
            error,
        });
    }
});
/* =========================
   SERVER START
========================= */
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
