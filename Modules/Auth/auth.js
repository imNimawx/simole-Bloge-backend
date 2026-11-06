import { catchAsync, HandleERROR } from "vanta-api";
import bcrypt from "bcryptjs";
import User from "../User/userMd.js";
import jwt from "jsonwebtoken";
import { json } from "express";
export const login = catchAsync(async (req, res, next) => {
  const { username = "", password = "" } = req.body;
  if (!username || !password) {
    return next(new HandleERROR("username or password are required", 400));
  }
  const user = await User.findOne({ username });
  if (!user) {
    return next(new HandleERROR(" password are required", 400));
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return next(new HandleERROR(" password are required", 400));
  }
  if (!user.isActive) {
    return next(new HandleERROR(" nemishe bri dakhel", 400));
  }
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.SECRET_JWT,
  );
  return (
    res.status(200),
    json({
      success: true,
      message: "login successfully",
      data: {
        token,
        user: {
          role: user.role,
          fullname: user.fullnamem,
          username: user.username,
        },
      },
    })
  );
});

export const register = catchAsync(async (req, res, next) => {
  const { fullname = "", username = "", password = "" } = req.body;
  if (!username || !password) {
    return next(new HandleERROR("username or password are required", 400));
  }

  const passReg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
  if (!passReg.test(password)) {
    return next(new HandleERROR("Not availble", 400));
  }

  const hashpassword = bcrypt.hashSync(password, 10);
  const user = await User.create({
    fullname,
    username,
    password: hashpassword,
  });

  return res.status(201).json({
    success: true,
    message: "create an account successfully",
  });
});
