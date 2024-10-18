import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.modals.js";
import mongoose, { isValidObjectId } from "mongoose";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: toggle like on video
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "invalid video id");
    }

    const like = await Like.findOne({
        likedby: req.user?._id,
        video: videoId,
    });

    if (!like) {
        const toggledLike = await Like.create({
            likedby: req.user?._id,
            video: videoId,
        });

        if (!toggledLike) {
            throw new ApiError(401, "could not toggle video like");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    toggledLike,
                    "video-like toggled successfully"
                )
            );
    } else {
        const toggledLike = await Like.deleteOne({
            likedby: req.user?._id,
            video: videoId,
        });

        if (!toggledLike) {
            throw new ApiError(401, "could not toggle video like");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    toggledLike,
                    "video-like toggled successfully"
                )
            );
    }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    //TODO: toggle like on comment
    const { videoId } = req.params;
    //TODO: toggle like on video
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "invalid comment id");
    }

    const like = await Like.findOne({
        likedby: req.user?._id,
        comment: commentId,
    });

    if (!like) {
        const toggledLike = await Like.create({
            likedby: req.user?._id,
            comment: commentId,
        });

        if (!toggledLike) {
            throw new ApiError(401, "could not toggle comment like");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    toggledLike,
                    "comment-like toggled successfully"
                )
            );
    } else {
        const toggledLike = await Like.deleteOne({
            likedby: req.user?._id,
            comment: commentId,
        });

        if (!toggledLike) {
            throw new ApiError(401, "could not toggle comment like");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    toggledLike,
                    "comment-like toggled successfully"
                )
            );
    }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    //TODO: toggle like on tweet

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "invalid tweetId");
    }

    const like = await Like.findOne({
        likedby: req.user?._id,
        tweet: tweetId,
    });

    if (!like) {
        const toggledLike = await Like.create({
            likedby: req.user?._id,
            tweet: tweetId,
        });

        if (!toggledLike) {
            throw new ApiError(401, "could not toggle tweet like");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    toggledLike,
                    "tweetId toggled successfully"
                )
            );
    } else {
        const toggledLike = await Like.deleteOne({
            likedby: req.user?._id,
            tweet: tweetId,
        });

        if (!toggledLike) {
            throw new ApiError(401, "could not toggle tweetId");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    toggledLike,
                    "tweetId toggled successfully"
                )
            );
    }
});

const getAllLikesOfVideo = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "invalid videoId");
    }

    // const videoLikes = await Like.find({video: videoId})
    const videoLikes = await Like.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId),
            },
        },
        {
            $project: {
                likedby: 1,
            },
        },
    ]);

    if (!videoLikes) {
        throw new ApiError(400, "could not fetch video likes");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                videoLikes,
                "fetched all likes of video successfully"
            )
        );
});

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getAllLikesOfVideo,
};
