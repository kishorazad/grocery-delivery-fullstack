import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import sendEmail from "../config/nodemailer.js";

const otpStore: Record<string, string> = {};

// Generate JWT token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "30d" });
};

// Check if user is admin
const getAdminStatus = (email: string | null | undefined): boolean => {
    if (!email) return false;
    const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase()) : [];
    return adminEmails.includes(email.toLowerCase());
};

// Register
// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { name, email: email.toLowerCase(), password: hashedPassword },
    });

    const token = generateToken(user.id);

    const userData: any = { ...user };
    delete userData.password;
    userData.isAdmin = getAdminStatus(userData.email);

    res.status(201).json({ user: userData, token });
};

// Login
// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() }, include: { addresses: true } });

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);

    const userData: any = { ...user };
    delete userData.password;
    userData.isAdmin = getAdminStatus(userData.email);

    res.json({ user: userData, token });
};
export const sendOtp = async (req: Request, res: Response) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP
       otpStore[email] = otp;

await sendEmail({
            to: email,
            subject: "Your OTP Code",
            body: `
                <div style="font-family: Arial; padding: 20px;">

                    <h2>PillNow Login OTP</h2>

                    <h1 style="color: green;">
                        ${otp}  </h1>
 <p>Use this OTP to login.</p>
        </div>
            
            `
        });

        console.log("OTP SENT:", otp);

        return res.json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error: any) {

        console.log("OTP MAIL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Verify OTP
export const verifyOtp = async (req: Request, res: Response) => {

    try {

        const { email, otp } = req.body;

        if (!email || !otp) {

            return res.status(400).json({
                success: false,
                message: "Email and OTP required"
            });
        }

        // TEST OTP
        if (otpStore[email] !== otp) {

            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        let user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase()
            }
        });

        // Create user if not exists
        if (!user) {

            user = await prisma.user.create({
                data: {
                    name: email.split("@")[0],
                    email: email.toLowerCase(),
                    password: await bcrypt.hash("otp-user", 10)
                }
            });
        }

        const token = generateToken(user.id);

        const userData: any = { ...user };

        delete userData.password;

        userData.isAdmin = getAdminStatus(userData.email);

        return res.json({
            success: true,
            token,
            user: userData
        });

    } catch (error: any) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const saveFcmToken = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            token,
            email,
        } = req.body;

        console.log(
            "BODY:",
            req.body
        );

        if (
            !token ||
            !email
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Token and email required",
            });
        }

        const updatedUser =
            await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    fcmToken: token,
                },
            });

        return res.json({
            success: true,
            message:
                "FCM token saved",
            user: updatedUser,
        });

    } catch (error) {

        console.log(
            "FCM SAVE ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Internal server error",
        });
    }
};