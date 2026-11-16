import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: [true, "username is already taken"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    fullname: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
