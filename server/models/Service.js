/**
 * models/Service.js
 * Service offerings managed via the admin CMS.
 * Seeded initially, then editable from the dashboard.
 */

import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, "Service title is required"],
      trim:     true,
    },
    slug: {
      type:   String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      enum: [
        "Software & Web Development",
        "Security & Surveillance",
        "IT Infrastructure",
        "Digital Marketing & Media",
        "IT Education & Training",
      ],
      required: true,
    },
    shortDescription: {
      type:     String,
      required: true,
    },
    fullDescription: {
      type:    String,
      default: "",
    },
    icon: {
      // Lucide / Hero icon name string, rendered on frontend
      type:    String,
      default: "Cpu",
    },
    features: {
      type:    [String],
      default: [],
    },
    isActive: {
      type:    Boolean,
      default: true,
    },
    order: {
      type:    Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title before save
serviceSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

export default mongoose.model("Service", serviceSchema);
