import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "plaintext",
    },
    views: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      index: { expireAfterSeconds: 0 }, // ✅ Auto delete
    },
  },
  { timestamps: true }
);

export default mongoose.model("Paste", pasteSchema);
