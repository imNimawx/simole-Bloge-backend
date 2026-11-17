import ApiFeatures, { catchAsync } from "vanta-api";
import Post from "./postMd.js";
import Comment from "../Comment/commentMd.js";

import fs from "fs";
// Post controller

// Get All Posts
export const getAll = catchAsync(async (req, res, next) => {
  const condition =
    req.role != "admin" && req.role != "superAdmin"
      ? { isPubilshed: true }
      : {};
  const getAllPosts = new ApiFeatures(Post, req.query, req.role)
    .addManualFilters(condition)
    .filter()
    .search(["title"])
    .sort()
    .limitFields()
    .populate()
    .paginate();

  const result = await getAllPosts.execute();
  return (res.status(200), json(result));
});

// Get On Post

export const getOne = catchAsync(async (req, res, next) => {
  const getOne = new ApiFeatures(Post, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .search(["title"])
    .sort()
    .limitFields()
    .populate([
      { path: "userId", select: "username role" },
      { path: "categoryId" },
    ])
    .paginate();
  const result = await getOne.execute();
  return res.status(200).json(result);
});

// Create Post

export const createPost = catchAsync(async (req, res, next) => {
  const create = await Post.create(req.body);
  return res.status(201).json({
    success: true,
    data: create,
    messgaes: "post createt",
  });
});

// update Post
export const updatePost = catchAsync(async (req, res, next) => {
  const update = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return (
    res.status(201),
    json({
      success: true,
      data: update,
      message: "Post updated",
    })
  );
});

// Remove Post
export const removePost = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  const remove = await Post.findByIdAndDelete(id);
  for (let img of remove.images) {
    if (fs.existsSync(`${__dirname}/Public/${img}`)) {
      fs.existsSync(`${__dirname}/Public/${img}`);
    }
  }
  await Comment.deleteMany({ postId: id });
  return res.status(200).json({
    success: true,
    message: "post Removed Successfully",
  });
});
