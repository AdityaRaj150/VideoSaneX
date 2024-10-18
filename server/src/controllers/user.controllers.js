import jwt from "jsonwebtoken";
import { User } from "../models/user.modals.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.validate("refreshToken");
        await user.save({ validateBeforeSave: false });

        return {
            accessToken,
            refreshToken,
        };
    } catch (error) {
        throw ApiError(500, "cannot generate access token and refresh token ");
    }
};

const userRegister = asyncHandler(async (req, res) => {
    const { userName, fullName, email, password, avatar, coverImage } =
        req.body;

    if (
        [userName, fullName, email, password, avatar, coverImage].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required !!");
    }

    const existingUser = await User.findOne({
        $or: [{ userName }, { email }],
    });

    if (existingUser) {
        throw new ApiError(401, "user already exists");
    }

    const avatarLocalPath = req.files?.avatar
        ? req.files.avatar[0]?.path
        : null;

    const coverImageLocalPath = req.files?.coverImage
        ? req.files.coverImage[0]?.path
        : null;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar image is required");
    }

    const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath);
    const uploadedCoverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!uploadedAvatar) {
        throw new ApiError(401, "could not upload avatar image on cloudinary");
    }

    const user = await User.create({
        fullName,
        email,
        userName: userName.toLowerCase(),
        password,
        avatar: uploadedAvatar.url,
        coverImage: uploadedCoverImage?.url || "",
    });

    if (!user) {
        throw new ApiError(500, "could not register user");
    }

    res.status(201).json(
        new ApiResponse(
            200,
            {
                userName: user.userName,
                fullName: user.fullName,
                email: user.email,
                avatar: user.avatar,
                coverImage: user.coverImage,
            },
            "user registered successfully"
        )
    );
});

const userLogin = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { userName, email, password } = req.body;

    if (userName?.trim() === "" && email?.trim() === "") {
        throw new ApiError(400, "invalid credentails");
    }

    console.log(userName, password);
    const user = await User.findOne({
        $or: [{ userName: userName?.toLowerCase() }, { email }],
    });

    if (!user) {
        throw new ApiError(401, "user does not exist");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "wrong password");
    }

    const options = {
        httpOnly: true,
        secure: true,
    };

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                201,
                {
                    user: {
                        _id: user._id,
                        userName: user.userName,
                        fullName: user.fullName,
                        avatar: user.avatar,
                        email: user.email,
                        coverImage: user.coverImage,
                    },
                    accessToken,
                    refreshToken,
                },
                "user logged in successfully"
            )
        );
});

const userLogout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(201, {}, "user logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies?.refreshToken || req.body.refreshToken;

        if (!token) {
            throw new ApiError(400, "user unauthorized/invalid refresh token");
        }

        const decodedToken = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "invalid refresh Token");
        }

        if (token !== user.refreshToken) {
            throw new ApiError(401, "refresh token expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, refreshToken } =
            await generateAccessTokenAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", refreshToken)
            .json(
                new ApiResponse(
                    201,
                    {
                        accessToken,
                        refreshToken,
                    },
                    "access token refreshed successfully"
                )
            );
    } catch (error) {
        throw new ApiError(400, "invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword && !newPassword) {
        throw new ApiError(401, "old password and new password both required");
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(402, "user does not exist, unauthorized");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(403, "wrong old password");
    }

    user.password = newPassword;
    await user.validate("password");
    await user.save({ validateBeforeSave: false });

    res.status(200).json(
        new ApiResponse(201, {}, "password changed successfully")
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "user fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { email, userName, fullName } = req.body;
    if (!email && !userName && !fullName) {
        throw new ApiError(401, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                userName,
                fullName,
                email,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(400, "unauthorized user, user does not exist");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(201, user, "Account details updated successfully")
        );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatar = req.file?.path;

    if (!avatar) {
        throw new ApiError(400, "invalid Avatar sended");
    }

    const avatarImage = await uploadOnCloudinary(avatar);
    if (!avatarImage) {
        throw new ApiError(
            400,
            "error while uploading avatar image on cloudinary"
        );
    }

    const user1 = await User.findById(req.user?._id);
    if (!user1) {
        throw new ApiError(403, "could not fetch user");
    }

    const avatarDeleteRes = await deleteFromCloudinary(user1?.avatar, "image");
    if (!avatarDeleteRes) {
        throw new ApiError(403, "could not delete old avatar image ");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatarImage.url,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(403, "could not update user's avatar");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, user, "avatar image updated successfully"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImage = req.file?.path;

    if (!coverImage) {
        throw new ApiError(400, "invalid cover-image sended");
    }

    const coverImageRes = await uploadOnCloudinary(coverImage);
    if (!coverImageRes) {
        throw new ApiError(
            400,
            "error while uploading cover-image on cloudinary"
        );
    }

    const user1 = await User.find({ userName: req.user?.userName });

    if (!user1) {
        throw new ApiError(403, "could not fetch user");
    }

    const coverImageDeleteRes = await deleteFromCloudinary(
        user1?.coverImage,
        "image"
    );
    if (!coverImageDeleteRes) {
        throw new ApiError(403, "could not delete old cover image ");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImageRes.url,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(403, "could not update user's coverImage");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, user, "Cover image updated successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { userName } = req.params;

    if (!(userName?.trim() !== "")) {
        throw new ApiError(404, "invalid username/channel");
    }

    const channel = await User.aggregate([
        {
            $match: {
                userName: userName?.toLowerCase(),
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo",
            },
        },
        {
            $addFields: {
                subscriberCount: {
                    $size: "$subscribers",
                },
                channelsSubscribedTo: {
                    $size: "$subscribedTo",
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                fullName: 1,
                userName: 1,
                email: 1,
                subscriberCount: 1,
                channelsSubscribedTo: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
            },
        },
    ]);

    if (!channel || channel?.length == 0) {
        throw new ApiError(400, "Channel does not exist");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, channel[0], "channel fetched successfully"));
});

const getWatchHistory = asyncHandler(async (req, res) => {
    const watchHistory = await User.aggregate([
        {
            $match: {
                userName: req.user?.userName,
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner",
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner",
                            },
                        },
                    },
                ],
            },
        },
        {
            $project: {
                watchHistory: 1,
            },
        },
    ]);

    if (!watchHistory) {
        throw new ApiError(403, "could not fetch watch history");
    }
    const watchHistoryArr = [];
    watchHistory[0].watchHistory.forEach((wh) => {
        watchHistoryArr.push(wh);
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                watchHistoryArr,
                "watch history fetched successfully"
            )
        );
});

export {
    userRegister,
    userLogin,
    userLogout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory,
};
