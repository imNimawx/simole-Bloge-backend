import mongoose, { Mongoose } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: [true, "title is already taken "],
      maxlength: [100, "max of title character"],
      trim: true,
    },
    icon: {
      type: String,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Category=mongoose.model("Category",categorySchema)
export default Category