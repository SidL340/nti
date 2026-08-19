/**
 * models/Message.js
 * Contact form submissions stored in MongoDB.
 * Admin can read and manage these from the CMS dashboard.
 */

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, "Name is required"],
      trim:     true,
    },
    email: {
      type:     String,
      required: [true, "Email is required"],
      trim:     true,
      lowercase: true,
    },
    phone: {
      type:  String,
      trim:  true,
      default: "",
    },
    subject: {
      type:  String,
      trim:  true,
      default: "General Inquiry",
    },
    message: {
      type:     String,
      required: [true, "Message body is required"],
    },
    isRead: {
      type:    Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
