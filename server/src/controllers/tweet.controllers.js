import { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.modals.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content} = req.body
    if(!(content?.trim() !== "")){
        throw new ApiError(400, "content cannot be empty!")
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user?._id
    })

    if(!tweet){
        throw new ApiError(400, "cannot create tweet")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, tweet, "tweet creted successfully"))

});

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const tweets = await Tweet.find({
        owner: req.user?._id
    }).select("-owner")

    if(!tweets){
        throw new ApiError(400, "could not get user's tweets")
    }

    return res
    .status(200)
    .json(new ApiResponse(201, tweets, "fetched user's all tweets successfully"))
});

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {content} = req.body
    const {tweetId} = req.params
    if(!(content?.trim() !== "")){
        throw new ApiError(400, "content is required")
    }

    if(!isValidObjectId(tweetId)){
        throw new ApiError(401, "invalid tweet id")
    }

    const tweet = await Tweet.findByIdAndUpdate(tweetId)
    
    if(!tweet){
        throw new ApiError(400, "could not fetch tweet to update")
    }

    if(tweet.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(403, "user unauthorized to update the tweet")
    }

    tweet.content = content
    tweet.validate("content")
    const updatedTweet = await tweet.save({validateBeforeSave: false})

    if(!updateTweet){
        throw new ApiError(400, "could not update tweet")
    }

    return res
    .status(200)
    .json(new ApiResponse(201, updatedTweet, "updated tweet successfully"))
});

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
      //TODO: update tweet
    const {tweetId} = req.params

    if(!isValidObjectId(tweetId)){
        throw new ApiError(401, "invalid tweet id")
    }

    const tweet = await Tweet.findByIdAndUpdate(tweetId)
    
    if(!tweet){
        throw new ApiError(400, "could not fetch tweet to delete")
    }

    if(tweet.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(403, "user unauthorized to delete the tweet")
    }

    const deletedTweet = await Tweet.deleteOne({
        _id: tweetId
    })

    if(!deletedTweet){
        throw new ApiError(400, "could not delete tweet")
    }

    return res
    .status(200)
    .json(new ApiResponse(201, deletedTweet, "deleted tweet successfully"))
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
