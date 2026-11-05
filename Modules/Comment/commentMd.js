import mongoose from "mongoose";
const commentSchema=mongoose.Schema({
content:{
  type:String,
  required:[true,"is requierd"],
  trim:true
},
isPablished:{
  type:Boolean,
  default:""
},
postId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Post"
}
,
userId:{
    type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
},{ timestamps: true })
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
