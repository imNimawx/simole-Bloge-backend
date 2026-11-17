import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      unique: [true, "post title is already taken"],
      maxlength: [20, "max of character is 10 "],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },
    image: {
      type: [String],
      default: [""],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id  is required"],
    },
  },
  { timestamps: true },
);
const Post = mongoose.model("Post", postSchema);
export default Post;
