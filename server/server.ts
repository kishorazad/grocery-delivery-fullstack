import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import addressRouter from "./routes/addressRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import deliveryPartnerRouter from "./routes/deliveryPartnerRoutes.js";
import { stripeWebhook } from "./controllers/webhooks.js";

import nodemailer from "nodemailer";
const app = express();
app.get("/hello", (req, res) => {
    res.send("HELLO WORKING");
});

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP ERROR:", error);
    } else {
        console.log("SMTP SERVER READY");
    }
});

/* =========================
   TEST MAIL ROUTE
========================= */

app.get("/api/test-mail", async (req: Request, res: Response) => {
   
   console.log("TEST ROUTE HIT");
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
                        Your email system is working successfully.
                    </p>

                    <p>
                        Brevo SMTP connected correctly.
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

    } catch (error: any) {

        console.log("MAIL ERROR:", error);

        res.json({
            success: false,
            error: error.message,
        });
    }
});

app.post("/api/stripe", express.raw({ type: "application/json" }), stripeWebhook);

// Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://grocery-delivery-fullstack-chi.vercel.app"
    ],
    credentials: true,
}));

app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
    res.send("Server is Live!");
});
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/orders", orderRouter);
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/addresses", addressRouter);
app.use("/api/admin", adminRouter);
app.use("/api/delivery", deliveryPartnerRouter);

// Error handling
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).json({ message: error.message });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
