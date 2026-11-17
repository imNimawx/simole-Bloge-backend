import { catchAsync, HandleERROR } from "vanta-api";
import bcrypt from "bcryptjs";
import User from "../User/userMd.js";
import jwt from "jsonwebtoken";

// LOGIN

export const login = catchAsync(async (req, res, next) => {
  const { username = "", password = "" } = req.body;
  if (!username || !password) {
    return next(new HandleERROR("username and password are required", 400));
  }
  const user = await User.findOne({ username });
  if (!user) {
    return next(new HandleERROR("incorrect username or Password", 400));
  }
  if (!user.isActive) {
    return next(new HandleERROR("your Account is deActive", 400));
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return next(new HandleERROR("incorrect username or Password", 400));
  }
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.SECRET_JWT,
  );
  return res.status(200).json({
    success: true,
    message: "login successfully",
    data: {
      token,
      user: {
        role: user.role,
        fullname: user.fullname,
        username: user.username,
      },
    },
  });
});
