import mongoose from "mongoose";
import { Subscription } from "../models/subscription.modals.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    // TODO: toggle subscription
    const DoessubscriptionExist = await Subscription.find({
        channel: channelId,
        subscriber: req.user?._id,
    });

    if (DoessubscriptionExist.length === 0) {
        const subscription = await Subscription.create({
            channel: channelId,
            subscriber: req.user?._id,
        });

        if (!subscription) {
            throw new ApiError(400, "could not toggle subscription");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    subscription,
                    "succuessfully toggled subscription"
                )
            );
    } else {
        const subscription = await Subscription.findOneAndDelete({
            channel: channelId,
            subscriber: req.user?._id,
        });

        if (!subscription) {
            throw new ApiError(400, "could not toggle subscription");
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    subscription,
                    "succuessfully toggled subscription"
                )
            );
    }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const activeSubscription = await Subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(channelId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "subscriber",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            userName: 1,
                            email: 1,
                            avatar: 1,
                            coverImage: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                subscriber: {
                    $first: "$subscriber",
                },
            },
        },
        {
            $project: {
                subscriber: 1,
            },
        },
    ]);

    if (!activeSubscription) {
        throw new ApiError(400, "could not fetch channel's subscriber");
    }

    const allSubscribers = [];
    activeSubscription.forEach((subs) => {
        allSubscribers.push(subs.subscriber);
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                allSubscribers,
                "channel's subscribers fetched successfully"
            )
        );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;

    const channelsSubscribedTo = await Subscription.aggregate([
        {
            $match: {
                subscriber: new mongoose.Types.ObjectId(subscriberId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "channel",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            userName: 1,
                            email: 1,
                            avatar: 1,
                            coverImage: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                channel: {
                    $first: "$channel",
                },
            },
        },
        {
            $project: {
                channel: 1,
            },
        },
    ]);

    if (!channelsSubscribedTo) {
        throw new ApiError(400, "could not fetch user's subscribed channels");
    }

    const allSubscribedChannel = [];
    channelsSubscribedTo.forEach((channels) => {
        allSubscribedChannel.push(channels.channel);
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                allSubscribedChannel,
                "user's subscribed channels fetched successfully"
            )
        );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
