/**
 * reset-admin-password.js
 * Usage (from server/):
 *   ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=NewP@ssw0rd node scripts/reset-admin-password.js
 * This connects to MongoDB (MONGO_URI must be set) and updates the admin's password.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!MONGO_URI) {
  console.error("MONGO_URI is not set in environment. Aborting.");
  process.exit(1);
}
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set. Example:\nADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=NewP@ssw0rd node scripts/reset-admin-password.js");
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const user = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (!user) {
      console.error(`No user found with email ${ADMIN_EMAIL}`);
      process.exit(1);
    }

    user.password = ADMIN_PASSWORD;
    await user.save();

    console.log(`Password updated for ${ADMIN_EMAIL}`);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

run();
