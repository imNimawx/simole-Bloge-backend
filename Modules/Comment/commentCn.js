import ApiFeatures, { catchAsync } from "vanta-api";
import Comment from "./commentMd.js";
// Get All Comment

export const getAll = catchAsync(async (req, res, next) => {
  const getComments = new ApiFeatures(Comment, req.role, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "postId", select: "title" },
      { path: "userId", select: "username role" },
    ]);
  const result = await getComments.execute();
  return res.status(200).json(result);
});

//  Get all comments of One post

export const getAllCommentsOfPost = catchAsync(async (req, res, next) => {
  condition =
    req.role != "admin" && req.role != "superAdmin"
      ? { postId: id, isPublished: true }
      : { postId: id };
  const commentsPost = new ApiFeatures(Comment, req.query, req.role)
    .addManualFilters(condition)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([
      { path: "postId", select: "title" },
      { path: "userId", select: "username role" },
    ]);
  const result = await commentsPost.execute();
  return res.status(200).json(result);
});

// Add comments
export const create = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create({
    ...req.body,
    isPublished: true,
    userId: req.userId,
  });
  return res.status(201).json({
    success: true,
    data: newComment,
    message: "Comment Created Successfully",
  });
});

// Change published
export const changePublished = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (
    req.role == "user" &&
    req.userId.toString() != comment.userId.toString()
  ) {
    return next(new HandleERROR("You do not have permission", 401));
  }
  await Comment.findByIdAndDelete(req.params.id);
  return res.status(201).json({
    success: true,
    message: "Comment deleted Successfully",
  });
});

export const remove = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id)
    if(req.role=='user'&& req.userId.toString()!=comment.userId.toString()){
        return next(new HandleERROR('You do not have permission',401))
    }
     await Comment.findByIdAndDelete(req.params.id)
    return res.status(201).json({
        success: true, 
        message: 'Comment deleted Successfully'
    })
})