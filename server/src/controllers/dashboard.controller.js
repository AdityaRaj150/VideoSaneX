import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.modals.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.modals.js";
import mongoose from "mongoose";

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const stats = await User.aggregate([
        {
            $match: {
                userName: req.user?.userName,
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
            $addFields: {
                subscribers: { $size: "$subscribers" },
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
                channelsSubscribedTo: { $size: "$subscribedTo" },
            },
        },

        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "owner",
                as: "comments",
                pipeline: [
                    {
                        $lookup: {
                            from: "likes",
                            localField: "_id",
                            foreignField: "comment",
                            as: "likedComment",
                        },
                    },
                    {
                        $addFields: {
                            likedComment: {
                                $size: "$likedComment",
                            },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalComments: { $sum: 1 },
                            totalLikesOnComments: { $sum: "$likedComment" },
                        },
                    },
                    {
                        $project: {
                            totalComments: 1,
                            totalLikesOnComments: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                comments: { $first: "$comments" },
            },
        },
        {
            $lookup: {
                from: "tweets",
                localField: "_id",
                foreignField: "owner",
                as: "tweets",
                pipeline: [
                    {
                        $lookup: {
                            from: "likes",
                            localField: "_id",
                            foreignField: "tweet",
                            as: "likedTweet",
                        },
                    },
                    {
                        $addFields: {
                            likedTweet: {
                                $size: "$likedTweet",
                            },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalTweets: { $sum: 1 },
                            totalLikesOnTweets: { $sum: "$likedTweet" },
                        },
                    },
                ],
            },
        },

        {
            $addFields: {
                comments: { $first: "$tweets" },
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "_id",
                foreignField: "owner",
                as: "videos",
                pipeline: [
                    {
                        $lookup: {
                            from: "likes",
                            localField: "_id",
                            foreignField: "video",
                            as: "allLikes",
                        },
                    },
                    {
                        $addFields: {
                            totalLikes: {
                                $size: "$allLikes",
                            },
                        },
                    },
                    {
                        $group: {
                            _id: "isPublished",
                            totalVideoLikes: { $sum: "$totalLikes" },
                            totalViews: { $sum: "$views" },
                            totalVideos: { $sum: 1 },
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                videos: {
                    $first: "$videos",
                },
            },
        },
        {
            $project: {
                videos: 1,
                comments: 1,
                tweets: 1,
                channelsSubscribedTo: 1,
                subscribers: 1,
            },
        },
    ]);

    if (!stats) {
        throw new ApiError(400, "could not fetch user's stats");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(201, stats[0], "user's stats fetched successfully")
        );
});

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const allVideos = await Video.find({ owner: req.user?._id });
    if (!allVideos) {
        throw new ApiError(400, "could not fetch channel's videos");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                allVideos,
                "channel's video fetched successfully"
            )
        );
});

export { getChannelStats, getChannelVideos };
