/**
 * scripts/seed.js
 * Seeds the database with initial services and an admin user.
 * Run once: node scripts/seed.js
 */

import mongoose from "mongoose";
import dotenv   from "dotenv";
import User     from "../models/User.js";
import Service  from "../models/Service.js";

dotenv.config();

const services = [
  // ── Software & Web Development ───────────────────────────
  {
    title:            "Custom Web Application Development",
    category:         "Software & Web Development",
    shortDescription: "Tailor-made web applications built with modern stacks to automate and scale your business.",
    fullDescription:  "We design, develop, and deploy high-performance web applications using React, Node.js, and cloud infrastructure. From MVPs to enterprise-grade systems.",
    icon:             "Code2",
    features:         ["SPA & PWA Development", "REST & GraphQL APIs", "Cloud Deployment", "Performance Optimisation"],
    order:            1,
  },
  {
    title:            "ERP & CRM Systems",
    category:         "Software & Web Development",
    shortDescription: "Streamline operations with custom Enterprise Resource Planning and CRM solutions.",
    icon:             "LayoutDashboard",
    features:         ["Inventory Management", "HR & Payroll", "Sales Pipeline", "Custom Dashboards"],
    order:            2,
  },
  {
    title:            "E-commerce Solutions",
    category:         "Software & Web Development",
    shortDescription: "End-to-end e-commerce platforms with payment gateways, inventory, and order management.",
    icon:             "ShoppingCart",
    features:         ["eSewa / Khalti Integration", "Product Management", "Order Tracking", "Mobile-first Design"],
    order:            3,
  },
  // ── Security & Surveillance ──────────────────────────────
  {
    title:            "CCTV & IP Camera Installation",
    category:         "Security & Surveillance",
    shortDescription: "Professional installation of CCTV and IP camera systems for homes, offices, and enterprises.",
    icon:             "Camera",
    features:         ["HD / 4K Cameras", "Remote Viewing", "Night Vision", "NVR / DVR Setup"],
    order:            4,
  },
  {
    title:            "Biometric Access Control",
    category:         "Security & Surveillance",
    shortDescription: "Fingerprint and face-recognition-based attendance and access control systems.",
    icon:             "Fingerprint",
    features:         ["Attendance Tracking", "Door Access Control", "Payroll Integration", "Real-time Reports"],
    order:            5,
  },
  // ── IT Infrastructure ────────────────────────────────────
  {
    title:            "Network Setup & Management",
    category:         "IT Infrastructure",
    shortDescription: "Structured cabling, LAN/WAN design, and wireless network installation for businesses.",
    icon:             "Network",
    features:         ["Structured Cabling", "Wi-Fi Deployment", "Firewall Setup", "VPN Configuration"],
    order:            6,
  },
  {
    title:            "Cloud Solutions",
    category:         "IT Infrastructure",
    shortDescription: "Cloud migration, hosting, and management on AWS, Azure, and Google Cloud.",
    icon:             "Cloud",
    features:         ["Cloud Migration", "Server Management", "Backup & DR", "Cost Optimisation"],
    order:            7,
  },
  {
    title:            "Hardware Supply & AMC",
    category:         "IT Infrastructure",
    shortDescription: "Supply of genuine IT hardware and Annual Maintenance Contracts for seamless operations.",
    icon:             "HardDrive",
    features:         ["Desktops & Laptops", "Servers & UPS", "Printers & Peripherals", "On-site Support"],
    order:            8,
  },
  // ── Digital Marketing & Media ────────────────────────────
  {
    title:            "SEO & Digital Marketing",
    category:         "Digital Marketing & Media",
    shortDescription: "Data-driven SEO, Google Ads, and social media campaigns to grow your online presence.",
    icon:             "TrendingUp",
    features:         ["On-page & Off-page SEO", "Google / Meta Ads", "Analytics & Reporting", "Content Strategy"],
    order:            9,
  },
  {
    title:            "Commercial Printing & Design",
    category:         "Digital Marketing & Media",
    shortDescription: "High-quality brochures, banners, visiting cards, and brand identity design.",
    icon:             "Printer",
    features:         ["Logo & Brand Identity", "Brochures & Flyers", "Flex & Banner Printing", "Social Media Graphics"],
    order:            10,
  },
  // ── IT Education & Training ──────────────────────────────
  {
    title:            "Coding Bootcamps",
    category:         "IT Education & Training",
    shortDescription: "Intensive, project-based coding bootcamps for beginners to advanced learners.",
    icon:             "GraduationCap",
    features:         ["Web Dev (MERN)", "Python & Data Science", "Certificate on Completion", "Job Assistance"],
    order:            11,
  },
  {
    title:            "Digital Literacy Training",
    category:         "IT Education & Training",
    shortDescription: "Practical computer and internet skills training for individuals and corporate teams.",
    icon:             "Monitor",
    features:         ["MS Office Suite", "Internet & Email Safety", "Corporate Batches", "Government Schemes"],
    order:            12,
  },
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅  Connected to MongoDB");

    // ── Clear existing data ──────────────────────────────────
    await Service.deleteMany({});
    await User.deleteMany({});
    console.log("🗑️   Cleared services and users");

    // ── Seed services ────────────────────────────────────────
    await Service.insertMany(services);
    console.log(`🌱  Seeded ${services.length} services`);

    // ── Create admin user ────────────────────────────────────
    if (!process.env.ADMIN_PASSWORD) {
      console.error("❌  ADMIN_PASSWORD environment variable not set. Aborting seeding for safety.");
      process.exit(1);
    }

    await User.create({
      name:     "Nirmala Tech Admin",
      email:    process.env.ADMIN_EMAIL    || "admin@nirmalatech.com.np",
      password: process.env.ADMIN_PASSWORD,
      role:     "admin",
    });
    console.log("👤  Admin user created");

    console.log("✅  Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌  Seed failed:", err.message);
    process.exit(1);
  }
};

run();
