import ApiFeatures, { catchAsync } from "vanta-api";
import Category from "./categoryMd.js";
import Post from "../Post/postMd.js";

export const getAll = catchAsync(async (req, res, next) => {
  const condition =
    req.role != "admin" && req.role != "superAdmin"
      ? { isPublished: true }
      : {};
  const allCategory = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters(condition)
    .filter()
    .search(["title"])
    .sort()
    .populate()
    .paginate();

  const result = await allCategory.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const getCategory = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .search()
    .sort()
    .populate()
    .paginate();
  const result = await getCategory.execute();
  return res.status(200).json(result);
});

export const create = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  return res.status(200).json({
    success: true,
    data: category,
    message: "category create successfully",
  });
});

export const update = catchAsync(async (req, res, next) => {
  const updateCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );
  return res.status(200).json({
    success: true,
    data: updateCategory,
    message: "category update successfully",
  });
});


export const remove=catchAsync(async (req,res,next) => {
    const {id}=req.body
    const post = new Post.findOne({categoryId:id})
    if(!post){
                return next(new HandleERROR('THIS category contain some post, you can not deleted', 400))

    }
     const category = await Category.findByIdAndDelete(id)
    if (category.icon && fs.existsSync(`${__dirname}/Public/${category.icon}`)) {
        fs.unlinkSync(`${__dirname}/Public/${category.icon}`)
    }
    return res.status(200).json({
        success: true,
        message: 'category Removed Successfully'
    })
})