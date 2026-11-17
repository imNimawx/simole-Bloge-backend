import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true },
);
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
