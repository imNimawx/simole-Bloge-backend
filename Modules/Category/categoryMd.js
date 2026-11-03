import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: [true, "is already tken"],
      maxlength: [100, "Maximum"],
      trim: true,
    },
    icone: {
      type: String,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
 