import mongoose from "mongoose";
const Postschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "required"],
      unique: [true, "unique"],
      maxlength: [100, "max post title"],
      trim: true,
    },
    discription: {
      type: String,
      required: [true, "required"],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);
const Post = mongoose.model("Post", Postschema);
export default Post;
