import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import * as XLSX from "xlsx";
import slugify from "slugify";
// get admin dashboard data
export const getAdminStats = async (req, res) => {
    const [totalOrders, totalUsers, totalProducts, outOfStock, totalPartners, recentOrders] = await Promise.all([
        prisma.order.count({ where: { NOT: [{ paymentMethod: "card", isPaid: false }] } }),
        prisma.user.count(),
        prisma.product.count(),
        prisma.product.count({ where: { stock: 0 } }),
        prisma.deliveryPartner.count(),
        prisma.order.findMany({
            where: { NOT: [{ paymentMethod: "card", isPaid: false }] },
            orderBy: { createdAt: "desc" },
            take: 8,
            include: {
                user: { select: { name: true, email: true } },
                deliveryPartner: { select: { name: true, phone: true } },
            },
        }),
    ]);
    res.json({ totalOrders, totalUsers, totalProducts, outOfStock, totalPartners, recentOrders });
};
// get delivery partners list for admin
export const getDeliveryPartners = async (req, res) => {
    const partners = await prisma.deliveryPartner.findMany({ orderBy: { createdAt: "desc" } });
    res.json({ partners });
};
// create delivery partner profile
export const createDeliveryPartner = async (req, res) => {
    const { name, email, password, phone, vehicleType } = req.body;
    if (!name || !email || !password || !phone) {
        res.status(400).json({ message: "Please provide all required fields" });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const partner = await prisma.deliveryPartner.create({
        data: { name, email: email.toLowerCase(), password: hashedPassword, phone, vehicleType },
    });
    res.status(201).json({ partner });
};
// update delivery partner profile
export const updateDeliveryPartner = async (req, res) => {
    const { name, phone, vehicleType, isActive } = req.body;
    const data = {};
    if (name)
        data.name = name;
    if (phone)
        data.phone = phone;
    if (vehicleType)
        data.vehicleType = vehicleType;
    data.isActive = isActive;
    try {
        const partner = await prisma.deliveryPartner.update({
            where: { id: req.params.id },
            data,
        });
        res.json({ partner });
    }
    catch (error) {
        res.status(404).json({ message: "Partner not found" });
    }
};
// assign delivery partner for order
export const assignDeliveryPartner = async (req, res) => {
    const { partnerId } = req.body;
    const order = await prisma.order.findUnique({
        where: { id: req.params.id },
    });
    const partner = await prisma.deliveryPartner.findUnique({
        where: { id: partnerId },
    });
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    let status = order.status;
    const history = Array.isArray(order.statusHistory) ? order.statusHistory : [];
    if (order.status === "Placed" || order.status === "Confirmed") {
        status = "Assigned";
        history.push({
            status: "Assigned",
            note: `Assigned to ${partner.name}`,
            timestamp: new Date(),
        });
    }
    await prisma.order.update({
        where: { id: order.id },
        data: { deliveryPartnerId: partner.id, deliveryOtp: otp, status, statusHistory: history },
    });
    res.json({ order });
};
export const importMedicines = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const workbook = XLSX.read(req.file.buffer, {
            type: "buffer",
        });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const medicines = XLSX.utils.sheet_to_json(sheet);
        console.log(`Found ${medicines.length} medicines`);
        let successCount = 0;
        for (const item of medicines) {
            const imageUrls = item["Image URL"]
                ? item["Image URL"]
                    .split("|")
                    .map((url) => url.trim())
                : [];
            try {
                const product = await prisma.product.create({
                    data: {
                        name: item["Product Name"] || "Medicine",
                        slug: slugify(item["Product Name"] || "medicine", {
                            lower: true,
                            strict: true,
                        }) +
                            "-" +
                            Math.floor(Math.random() *
                                100000),
                        description: item["description"] || "",
                        composition: item["short_composition1"] || "",
                        medicineType: item["Product Form"] || "",
                        manufacturer: item["Marketer"] ||
                            "",
                        primaryUse: item["primary_use"] || "",
                        price: Number(item["MRP"]) || 0,
                        originalPrice: Number(item["MRP"]) || 0,
                        image: imageUrls[0] ||
                            "https://via.placeholder.com/300",
                        imageUrls,
                        category: item["type"] ||
                            "medicine",
                        prescriptionRequired: String(item["prescription_required"]).toLowerCase() ===
                            "yes",
                        stock: 100,
                        rating: 4.5,
                        reviewCount: 10,
                        productForm: item["Product Form"] || "",
                        packaging: item["Pack Size"] || "",
                        safetyAdvice: item["safety_advise"] || "",
                        sideEffects: item["common_side_effect"] || "",
                        howToUse: item["How to use"] || "",
                        storage: item["storage"] ||
                            "",
                        howItWorks: item["How it works"] || "",
                    },
                });
                successCount++;
                console.log("CREATED:", product.name);
            }
            catch (err) {
                console.log("FAILED PRODUCT:", item["Product Name"]);
                console.log(err);
            }
        }
        return res.json({
            success: true,
            count: successCount,
            message: "Medicines imported successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
