import mongoose from "mongoose";
const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "is required"],
      unique: [true, "is already tken"],
      maxlength: [10],
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
  { timestamps: true },
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
