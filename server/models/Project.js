/**
 * models/Project.js
 * Portfolio project model — managed via the admin CMS.
 */

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, "Project title is required"],
      trim:     true,
    },
    description: {
      type:     String,
      required: [true, "Project description is required"],
    },
    // Cloudinary image URL + public_id (for deletion)
    image: {
      url:      { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    // Comma-separated or array of tech tags
    techStack: {
      type:    [String],
      default: [],
    },
    liveLink: {
      type:    String,
      default: "",
      trim:    true,
    },
    githubLink: {
      type:    String,
      default: "",
      trim:    true,
    },
    category: {
      type: String,
      enum: [
        "Web Development",
        "Mobile App",
        "ERP / CRM",
        "E-commerce",
        "Security & Surveillance",
        "Networking",
        "Digital Marketing",
        "Other",
      ],
      default: "Web Development",
    },
    featured: {
      type:    Boolean,
      default: false,
    },
    order: {
      type:    Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
