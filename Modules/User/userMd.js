import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "already taken"],
      minlength: [5],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8],
    },
    fullname: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User",userSchema)
export default User;