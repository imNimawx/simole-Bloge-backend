import e from "cors";
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "is required"],
    unique: [true, "already taken"],
    maxlength: [10],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "required"],

    trim: true,
  },
  image: {
    type: [String],
    default:[]
  },
  isPublished:{
    type:Boolean,
    default:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  categoryId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
  }
},{timestamps:true});
const Post=mongoose.model("Post",postSchema)
export default Post;