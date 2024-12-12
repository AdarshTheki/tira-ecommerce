import { isValidObjectId } from "mongoose";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.mode.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadSingleImg, uploadMultiImg } from "../utils/cloudinary.js";

const singleProduct = asyncHandler(async (req, res, next) => {
    try {
        const { productId } = req.params;

        if (!isValidObjectId(productId)) {
            throw new ApiError(401, "Invalid product ID");
        }

        const product = await Product.findOne({ _id: productId });
        if (!product) {
            throw new ApiError(401, "Product not found");
        }
        const related = await Product.find({ category: product.category });
        const reviews = await Review.find({ productId }).populate("userId");

        return res.status(200).json({ product, related, reviews });
    } catch (error) {
        next(error);
    }
});

const getAllProducts = asyncHandler(async (req, res, next) => {
    const {
        page = 1,
        limit = 20,
        brand = "",
        category = "",
        search = "",
    } = req.query;

    const options = {
        page: Number(page),
        limit: Number(limit),
    };

    const project = {
        $project: {
            _id: 1,
            title: 1,
            rating: 1,
            category: 1,
            brand: 1,
            discount: 1,
            price: 1,
            thumbnail: 1,
        },
    };

    let products;

    try {
        if (brand) {
            products = Product.aggregate([
                { $match: { brand: brand } },
                project,
            ]);
        } else if (category) {
            products = Product.aggregate([
                { $match: { category: category } },
                project,
            ]);
        } else if (search) {
            let regex = new RegExp(search, "i");
            products = Product.aggregate([
                {
                    $match: {
                        $or: [
                            { title: { $regex: regex } },
                            { brand: { $regex: regex } },
                            { category: { $regex: regex } },
                        ],
                    },
                },
                project,
            ]);
        } else {
            products = Product.aggregate([project]);
        }

        const results = await Product.aggregatePaginate(products, options);
        return res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

const getAllCategories = asyncHandler(async (req, res, next) => {
    try {
        const results = await Product.distinct("category");
        return res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

const getAllBrands = asyncHandler(async (req, res, next) => {
    try {
        const results = await Product.distinct("brand");
        return res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

const addProduct = asyncHandler(async (req, res, next) => {
    const { thumbnail, images } = req.files;
    const {
        title,
        description,
        category,
        brand,
        price,
        discount,
        rating,
        stock,
    } = req.body;
    try {
        if (!thumbnail[0] || images.length === 0) {
            throw new ApiError(401, "files not upload properly");
        }

        const thumbnailPath = await uploadSingleImg(thumbnail[0].path);
        const imagesPath = await uploadMultiImg(images);

        if (!thumbnailPath && !imagesPath.length === 0) {
            throw new ApiError(401, "files not upload properly on cloudinary");
        }

        const product = await Product.create({
            title,
            description,
            category,
            brand,
            price,
            discount,
            rating,
            stock,
            thumbnail: thumbnailPath,
            images: imagesPath,
        });

        if (!product) {
            throw new ApiError(401, "create product failed");
        }

        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

const updateProduct = asyncHandler(async (req, res, next) => {
    const { title, description, category, price } = req.body;
    try {
        const product = await Product.findOne({ _id: req.params.productId });

        // if (req?.files?.thumbnail[0]?.path) {
        //     const thumbnailPath = await uploadSingleImag(
        //         req?.files?.thumbnail[0]?.path
        //     );
        //     product.thumbnail = thumbnailPath;
        // }

        // if (req?.files?.images.length > 0) {
        //     const imagesPath = await uploadMultiImg(req?.files?.images);
        //     product.images = imagesPath;
        // }

        if (title) {
            product.title = title;
        }

        if (description) {
            product.description = description;
        }
        if (category) {
            product.category = category;
        }
        if (price) {
            product.price = price;
        }

        if (!product) {
            throw new ApiError(401, "create product failed");
        }

        await product.save();

        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
    try {
        const deleted = await Product.deleteOne({ _id: req.params.productId });
        if (!deleted) {
            throw new ApiError(404, "product not deleted on database");
        }

        return res.status(200).json({
            message: "product deleted successfully",
            statusCode: 200,
        });
    } catch (error) {
        next(error);
    }
});

export {
    addProduct,
    singleProduct,
    getAllProducts,
    getAllCategories,
    getAllBrands,
    updateProduct,
    deleteProduct,
};
