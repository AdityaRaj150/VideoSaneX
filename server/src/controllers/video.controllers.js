import { Video } from "../models/video.modals.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { User } from "../models/user.modals.js";

const getAllVideos = asyncHandler(async (req, res) => {
    console.log("here");
    const {
        page = 1,
        limit = 10,
        query,
        sortBy = "createdAt",
        sortType = "desc",
        userId,
    } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const match = {};

    if (query) {
        match.title = { $regex: query, $options: "i" };
    }
    if (userId) {
        match.owner = new mongoose.Types.ObjectId(userId);
    }

    const sortOrder = sortType === "desc" ? -1 : 1;

    const allVideos = await Video.aggregate([
        { $match: match },
        { $skip: skip },
        { $limit: limit },
        { $sort: { [sortBy]: sortOrder } },
    ]);

    if (!allVideos) {
        throw new ApiError(400, "could not fetch videos");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                allVideos,
                "fetched all the videos successfully"
            )
        );
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!(title?.trim() !== "") || !(description?.trim() !== "")) {
        throw new ApiError(400, "Title and description are required");
    }

    const videoFile = req.files?.videoFile
        ? req.files?.videoFile[0]?.path
        : null;
    const thumbnail = req.files?.thumbnail
        ? req.files?.thumbnail[0]?.path
        : null;

    if (!videoFile || !thumbnail) {
        throw new ApiError(400, "video and thumbnail are required");
    }

    const videoFileRes = await uploadOnCloudinary(videoFile);
    const thumbnailRes = await uploadOnCloudinary(thumbnail);

    if (!videoFileRes) {
        throw new ApiError(400, "error while uploading video on cloudinary");
    }

    if (!thumbnailRes) {
        throw new ApiError(
            400,
            "error while uploading thumbnail on cloudinary"
        );
    }

    const video = await Video.create({
        videoFile: videoFileRes?.url,
        thumbnail: thumbnailRes?.url,
        title,
        description,
        owner: req.user?._id,
        duration: videoFileRes?.duration,
    });

    if (!video) {
        throw new ApiError(400, "could not upload video");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, video, "video uploaded successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    console.log("land dik gya");
    //TODO: get video by id
    const video = await Video.findByIdAndUpdate(videoId, {
        $inc: {
            views: 1,
        },
    });
    if (!video) {
        throw new ApiError(400, "cannot find video");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $push: {
                watchHistory: video._id,
            },
        },
        {
            new: true,
        }
    );

    if (!user) {
        throw new ApiError(401, "cannot update user watch history");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(201, { video, user }, "fetched video successfully")
        );
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: update video details like title, description, thumbnail
    const { title, description } = req.body;
    const thumbnail = req.file?.path;
    if (!(title?.trim() !== "") || !(description?.trim() !== "")) {
        throw new ApiError(400, "title and descriptions are required");
    }
    if (!thumbnail?.trim === "") {
        throw new ApiError(400, "invalid thumbnail");
    }
    const thumbnailRes = await uploadOnCloudinary(thumbnail);
    if (!thumbnailRes) {
        throw new ApiError(400, "could not upload new thumbnail on cloudinary");
    }

    const video1 = await Video.findById(videoId);
    
    if (!video1) {
        throw new ApiError(400, "could not fetch video details");
    }

    const thumbnailDeleteResponse = await deleteFromCloudinary(
        video1?.thumbnail,
        "image"
    );

     if (!thumbnailDeleteResponse) {
         throw new ApiError(
             400,
             "could not delete old thumbnail on cloudinary"
         );
     }

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title,
                description,
                thumbnail: thumbnailRes.url,
            },
        },
        {
            new: true,
        }
    );

    if (!video) {
        throw new ApiError(400, "could not update video details");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, video, "video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
    try {
        const { videoId } = req.params;
        //TODO: delete video
        const deletedVideo = await Video.findOneAndDelete({ _id: videoId });
        if (!deletedVideo) {
            throw new ApiError("could not delete video");
        }

        const videoFileDeleteResponse = await deleteFromCloudinary(
            deletedVideo.videoFile,
            "video"
        );
        const thumbnailDeleteResponse = await deleteFromCloudinary(
            deletedVideo.thumbnail,
            "image"
        );

        if (!videoFileDeleteResponse) {
            throw new ApiError(
                400,
                "could not delete video file from cloudinary"
            );
        }

        if (!thumbnailDeleteResponse) {
            throw new ApiError(
                400,
                "could not delete thumbnail from cloudinary"
            );
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    deletedVideo,
                    "deleted video successfully from everywhere"
                )
            );
    } catch (error) {
        console.log(error);
        if (error instanceof ApiError) throw error;
        else throw new ApiError(500, "issue with deleting video completely");
    }
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(400, "could not find video");
    }

    if (video.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(
            400,
            "user not authorized to toggle video published status"
        );
    }

    const toggledVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                isPublished: !video.isPublished,
            },
        },
        {
            new: true,
        }
    );

    if (!toggledVideo) {
        throw new ApiError(400, "could not toggle video published status");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                toggledVideo,
                "toggled publish status successfully"
            )
        );
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
};
