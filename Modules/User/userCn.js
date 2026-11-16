import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "./userMd.js";
import bcrypt from "bcryptjs";
// GETALL USER
export const getAll = catchAsync(async (req, res, next) => {
  const allUsers = new ApiFeatures(User, req.query, req.role)
    .filter()
    .search(["username", "fullname"])
    .sort()
    .limitFields()
    .populate()
    .paginate();
  const result = await allUsers.execute();
  return res.status(200).json(result);
});

// GETONE USER

export const getOne = catchAsync(async (req, res, next) => {
  const condition =
    req.role == "user" ? { _id: req.userId } : { _id: req.params.id };
  const getUser = new ApiFeatures(User, req.query, req.role)
    .addManualFilters(condition)
    .filter()
    .sort()
    .limitFields()
    .populate()
    .paginate();
  const result = await getUser.execute();
  return res.status(200).json(result);
});

// UPDATE

export const update = catchAsync(async (req, res, next) => {
  const { role = null, fullname = null, isActive = "unknown" } = req.body;
  if (req.role == "user" && req.params.id.toString() != req.userId.toString()) {
    return next(new HandleERROR("You dont have a permission"), 400);
  }
  const user = await User.findById(req.params.id);
  user.fullname = fullname || user.fullname;
  if (req.role != "user") {
    user.isActive = isActive == "unknown" ? user.isActive : isActive;
  }
  if (req.role == "superAdmin") {
    user.role == role || user.role;
  }
  const newUser = await user.save();
  return res.status(200).json({
    success: true,
    data: newUser,
    message: "User Update successFully",
  });
});

// Change Password

export const changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword = null, newPassword = null } = req.body;
  if (req.role == "user" && req.params.id.toString() != req.userId.toString()) {
    return next(new HandleERROR("you dont have permission"), 400);
  }
  if (!oldPassword) {
    return next(new HandleERROR(" old password is required"), 400);
  }
  if (!newPassword) {
    return next(new HandleERROR("new password is required "), 400);
  }

  const user = await User.findById(req.params.id);
  const isMAtch = bcrypt.compareSync(oldPassword, user.password);
  if (req.role == "user" && !isMAtch) {
    return next(new HandleERROR("incorrect Old password "), 400);
  }
  const passReg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
  if (!passReg.test(newPassword)) {
    return next(
      new HandleERROR(
        "invalid Password,Password must be Contain A-Z,a-z,0-9 and min 8 character",
        400,
      ),
    );
  }
  const hashPassword = bcrypt.hashSync(newPassword, 10);
  user.password = hashPassword;
  const newUser = await user.save();
  return (
    res.status(200),
    json({
      success: true,
      message: "User password Update successFully",
    })
  );
});
