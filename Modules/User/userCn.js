// // Its orginal logic code without vanta api package

import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "./userMd.js";
import bcrypt from "bcryptjs";
// // ************************************************
// import User from "./userMd.js";

// export const getAllUser = async (req, res, next) => {
//   try {
//     const filters = req?.query.filters || {};
//     const sort = req?.query.sort || "-createdAt";
//     const limit = req?.query.limit || 10;
//     const page = req?.query.page || 1;
//     const skip = (page - 1) * limit;
//     const fields = req?.query?.fields?.replaceAll(",", " ") || "";
//     const populate = req?.query?.populate || "";
//     const users = await User.find(filters)
//       .sort(sort)
//       .limit(limit)
//       .skip(skip)
//       .populate(populate)
//       .select(fields);
//     const count = await User.countDocuments(filters);
//     return res.status(200).json({
//       success: true,
//       data: users,
//       count,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "ERROR",
//     });
//   }
// };

// // *************************************************
export const getAllUser = catchAsync(async (req, res, next) => {
  // Query
  const features = new ApiFeatures(User, req.query, req?.role)
    .filter()
    .search(["name", "email"])
    .sort()
    .limitFields()
    .populate()
    .paginate();

  // Database
  const result = await features.execute();

  // Response
  return res.status(200).json({
    success: true,
    count: result.count,
    data: result.data,
  });
});

export const getOne = catchAsync(async (req, res, next) => {
  const condition =
    req?.role == "user" ? { _id: req.userId } : { _id: req.params.id };
  const userOne = new ApiFeatures(User, req.query, req?.role)
    .addManualFilters(condition)
    .filter()
    .sort()
    .limitFields()
    .populate()
    .paginate();

  const result = await userOne.execute();

  return res.status(200).json(result);
});

export const update = catchAsync(async (req, res, next) => {
  const { role = null, fullname = null, isActive = "unknown" } = req.body;
  if (req.role == "user" && req.params.id.toString() != req.userId.toString()) {
    return next(new HandleERROR("you dont have a permission to update", 401));
    // return res.status(401).json({
    //   success: false,
    //   message: "you dont have a permission to update",
    // });
  }
  const user = await User.findById(req.params.id);
  user.fullname = fullname || user.fullname;
  if (req.role != "user") {
    user.isActive = isActive == "unknown" ? user.isActive : isActive;
  }
  if (req.role == "superAdmin") {
    user.role = role || user.role;
  }

  const newUser = await user.save();
  return res.status(200).json({
    success: true,
    data: newUser,
    message: "upddate User",
  });
});
//UPDATE PASSWORD
export const changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword = null, newPassword = null } = req.body;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  // Validation
  if (req.role === "user" && req.params.id !== req.userId.toString()) {
    return next(new HandleERROR("you dont have a permission to update", 403));
  }
  if (req.role === "user" && !oldPassword) {
    return next(new HandleERROR("old password is required", 400));
  }
  if (!newPassword) {
    return next(new HandleERROR("new password is required", 400));
  }
  if (!passwordRegex.test(newPassword)) {
    return next(new HandleERROR("invalid password", 400));
  }

  // Database
  const user = await User.findById(req.params.id).select("+password");

  if (!user) {
    return next(new HandleERROR("User not found", 404));
  }

  // Old password
  if (req.role === "user") {
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return next(new HandleERROR("incorrect old password", 400));
    }
  }

  // Update
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  // Response
  return res.status(200).json({
    success: true,
    message: "User password updated",
  });
});