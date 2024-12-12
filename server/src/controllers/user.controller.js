import { isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { removeSingleImg, uploadSingleImg } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

// Generate New Access/Refresh Token
export const createToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        // Generate access and refresh tokens by user method
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return new ApiError(404, "error generated to access token", [
            "access token invalid",
        ]);
    }
};

const signUp = asyncHandler(async (req, res, next) => {
    const { email, password, username, role } = req.body;
    try {
        // Validate that all fields are not empty
        if ([email, password, username].some((field) => field?.trim() === "")) {
            throw new ApiError(401, "user :: All fields are required");
        }
        // Check if a user with the same username or email already exists
        const exitsUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (exitsUser) {
            throw new ApiError(401, "User :: Email or Username already exists");
        }
        // Create a new user object and save it to the database
        const user = await User.create({
            email,
            password,
            role,
            username: username?.toLowerCase(),
        });
        const createdUser = await User.findById(user?._id).select(
            "-password -refreshToken"
        );
        if (!createdUser) {
            throw new ApiError(403, null, "Created new user failed");
        }
        return res.status(200).json(createdUser);
    } catch (error) {
        next(error);
    }
});

const signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const tempUser = await User.findOne({ email });
        if (!tempUser) {
            throw new ApiError(404, "user does not exist");
        }

        const isPasswordValid = await tempUser.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(401, null, "Invalid user credentials");
        }

        const { accessToken, refreshToken } = await createToken(tempUser._id);

        const user = await User.findById(tempUser._id).select(
            "-password -refreshToken"
        );

        const payload = {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, payload)
            .cookie("accessToken", accessToken, payload)
            .json({ user, accessToken, refreshToken });
    } catch (error) {
        next(error);
    }
});

const logout = asyncHandler(async (req, res, next) => {
    try {
        const userId = req?.user?._id;

        if (!isValidObjectId(userId)) {
            return res
                .status(401)
                .json(
                    new ApiResponse(401, null, "User :: user Id is not valid")
                );
        }
        await User.findByIdAndUpdate(
            userId,
            { $unset: { refreshToken: 1 } },
            { new: true }
        );

        return res
            .status(200)
            .clearCookie("refreshToken", { httpOnly: true })
            .clearCookie("accessToken", { httpOnly: true })
            .json(new ApiResponse(200, {}, "User :: Logged Out"));
    } catch (error) {
        next(error);
    }
});

const getRefreshToken = asyncHandler(async (req, res, next) => {
    try {
        const incomingRefreshToken =
            req.cookies.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) {
            throw new ApiError(401, "Un-Authorize Access Token Request");
        }

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);
        if (!user) {
            throw new ApiError(401, "User :: Invalid Refresh Token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "User :: Token is Expired");
        }

        const { accessToken, refreshToken } = await createToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, { httpOnly: true })
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .json({ user, accessToken, refreshToken });
    } catch (error) {
        next(error);
    }
});

const updateUser = asyncHandler(async (req, res, next) => {
    const { password, email, role, username } = req.body;
    try {
        const user = await User.findById(req.user?._id);
        if (!user) {
            throw new ApiError(401, "User :: User does not exists");
        }
        if (!!password) {
            user.password = password;
        }
        if (!!email) {
            user.email = email;
        }
        if (!!role) {
            user.role = role;
        }
        if (!!username) {
            user.username = username;
        }

        await user.save({ validateBeforeSave: false });

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

const updateUserAvatar = asyncHandler(async (req, res, next) => {
    try {
        const avatarLocalPath = req.file.path;

        if (!avatarLocalPath) {
            throw new ApiError(404, "local avatar image not found");
        }
        const avatar = await uploadSingleImg(avatarLocalPath);
        if (!avatar) {
            throw new ApiError(400, "Error while uploading on avatar");
        }
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    avatar: avatar,
                },
            },
            { new: true }
        ).select("-password");

        const url = req?.user?.avatar;
        if (url) {
            const path = url.split("/");
            const publicId = path[7].split(".")[0];
            await removeSingleImg(publicId);
        }

        return res
            .status(200)
            .json({ user, message: "Avatar image updated successfully" });
    } catch (error) {
        next(error);
    }
});

const removeUserAvatar = asyncHandler(async (req, res, next) => {
    try {
        const url = req?.user?.avatar;
        if (!url) {
            throw new ApiError(404, "User avatar url not founded");
        }
        const path = url.split("/");
        const publicId = path[7].split(".")[0];
        const remove = removeSingleImg(publicId);
        if (remove) {
            const user = await User.findByIdAndUpdate(
                req.user?._id,
                {
                    $set: {
                        avatar: "",
                    },
                },
                { new: true }
            ).select("-password");

            return res.status(200).json({
                user,
                message: "avatar image deleted successfully",
            });
        }
        return res.status(200).json({
            message: "avatar not deleted ",
        });
    } catch (error) {
        next(error);
    }
});

const removeUserCoverImg = asyncHandler(async (req, res, next) => {
    try {
        const url = req?.user?.avatar;
        if (!url) {
            throw new ApiError(404, "User avatar url not founded");
        }
        const path = url.split("/");
        const publicId = path[7].split(".")[0];
        const remove = removeSingleImg(publicId);
        if (remove) {
            const user = await User.findByIdAndUpdate(
                req.user?._id,
                {
                    $set: {
                        coverImage: "",
                    },
                },
                { new: true }
            ).select("-password");

            return res.status(200).json({
                user,
                message: "Cover image deleted successfully",
            });
        }
        return res.status(200).json({
            message: "Cover image not deleted",
        });
    } catch (error) {
        next(error);
    }
});

const updateUserCoverImg = asyncHandler(async (req, res, next) => {
    try {
        const coverImageLocalPath = req.file.path;
        if (!coverImageLocalPath) {
            throw new ApiError(404, "local cover image not found");
        }
        const avatar = await uploadSingleImg(coverImageLocalPath);
        if (!avatar) {
            throw new ApiError(400, "Error while uploading on cover image");
        }
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            { $set: { coverImage: avatar } },
            { new: true }
        ).select("-password");

        return res
            .status(200)
            .json({ user, message: "Cover image updated successfully" });
    } catch (error) {
        next(error);
    }
});

const getMe = asyncHandler(async (req, res, next) => {
    try {
        if (!req.user) {
            throw new ApiError(500, "user not authorized", [
                "user token invalid",
            ]);
        }
        return res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
});

const wishlist = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        const user = await User.findById(userId);

        const update = user.wishlist.includes(productId)
            ? { $pull: { wishlist: productId } }
            : { $addToSet: { wishlist: productId } };

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            update,
            { new: true }
        );

        await user.save();

        res.status(200).json(updatedUser.wishlist);
    } catch (error) {
        next(error);
    }
});

export {
    signUp,
    signIn,
    getRefreshToken,
    getMe,
    logout,
    updateUser,
    wishlist,
    updateUserAvatar,
    updateUserCoverImg,
    removeUserAvatar,
    removeUserCoverImg,
};
