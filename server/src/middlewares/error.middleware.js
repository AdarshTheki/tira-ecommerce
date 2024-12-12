import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const errorHandler = async (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    } else {
        // Generic error
        res.status(500).json({
            success: false,
            message: "Internal Server Error! middleware",
        });
    }
};
