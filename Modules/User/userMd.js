import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username not found"],
      unique: [true, "usernam is already taken "],
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
    fullnsme: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },
    isActiv: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
