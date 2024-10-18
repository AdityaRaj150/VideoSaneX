import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comments.modals.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;
});

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { videoId } = req.params;
    const { content } = req.body;
    if (!(content?.trim !== "")) {
        throw new ApiError(400, "invalid comment");
    }
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "invalid video id");
    }

    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user?._id,
    });

    if (!comment) {
        throw new ApiError(402, "could not create comment");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, comment, "created comment successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { commentId } = req.params;
    const { content } = req.body;

    if (!(content?.trim !== "")) {
        throw new ApiError(400, "invalid comment content");
    }
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "invalid comment id");
    }

    const comment = await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(401, "could not fetch comment to update")
    }

    if(comment.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(403, "user is unauthorized to update comment")
    }

    comment.content = content
    comment.validate("content")
    const updatedComment = await comment.save({validateBeforeSave: false})

    if(!updatedComment){
        throw new ApiError(400, "could not update the comment")
    }

    return res
    .status(200)
    .json(new ApiResponse(201, updateComment, "updated the comment successfully"))
});

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
      const { commentId } = req.params;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "invalid comment id");
    }

    const comment = await Comment.findOne({
        video: videoId,
        owner: req.user?._id
    })

    if(!comment){
        throw new ApiError(401, "could not fetch comment to delete")
    }

    if(comment.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(403, "user is unauthorized to delete comment")
    }

    const deletedComment = await Comment.deleteOne({
        video: videoId,
        owner: req.user?._id,
    });

    if(!deletedComment){
        throw new ApiError(400, "could not update the comment")
    }

    return res
    .status(200)
    .json(new ApiResponse(201, deletedComment,"deleted the comment successfully"))
    
});

export { getVideoComments, addComment, updateComment, deleteComment };
