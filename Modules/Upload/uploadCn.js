import { catchAsync, HandleERROR } from "vanta-api";
import { __dirname } from "../../app.js";
import fs from "fs";
export const singleUpload = catchAsync(async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next(new HandleERROR("Upload file ", 400));
  }
  return res.status(200).json({
    sucess: true,
    data: file.filename,
    message: "upload file successfuly",
  });
});

export const multiUpload = catchAsync(async (req, res, next) => {
  const files = req.files;
  if (!files) {
    return next(new HandleERROR("Upload file ", 400));
  }
  const file = files?.map((item) => item.filename);
  return res.status(200).json({
    sucess: true,
    data: file,
    message: "upload file successfuly",
  });
});

export const singleRemove = catchAsync(async (req, res, next) => {
  const { filename } = req.body;
  if (!filename) {
    return next(new HandleERROR("error ", 400));
  }
  const removePath = `${__dirname}/Public/${filename.split("/").at(-1)}`;
  if (fs.existsSync(removePath)) {
    fs.unlinkSync(removePath);
  }
  return res.status(200).json({
    sucess: true,

    message: "remove file successfuly",
  });
});

export const multiRemove = catchAsync(async (req, res, next) => {
  const { filenames } = req.body;
  for (let filename of filenames) {
    const removePath = `${__dirname}/Public/${filename.split("/").at(-1)}`;
    if (fs.existsSync(removePath)) {
      fs.unlinkSync(removePath);
    }
  }

  return res.status(200).json({
    sucess: true,

    message: "remove files successfuly",
  });
});
