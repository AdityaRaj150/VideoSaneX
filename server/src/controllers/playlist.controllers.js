import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Playlist } from "../models/playlist.modals.js";
import { isValidObjectId } from "mongoose";

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if (!(name?.trim() !== "") || !(description?.trim() !== "")) {
        throw new ApiError(400, "name and description are required");
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user?._id,
    });

    if (!playlist) {
        throw new ApiError(400, "could not create playlist");
    }
    return res
        .status(200)
        .json(new ApiResponse(201, playlist, "playlist created successfully"));

    //TODO: create playlist
});

const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    //TODO: get user playlists
    if (!isValidObjectId(userId)) {
        throw new ApiError(403, "invalid userId");
    }

    const playlist = await Playlist.find({
        owner: userId,
    }).select("--owner");

    if (!playlist) {
        throw new ApiError(400, "could not fetch user's playlist");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                playlist,
                "user's playlist fetched successfully"
            )
        );
});

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    //TODO: get playlist by id

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(403, "invalid playlistId");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(400, "could not get playlist");
    }
    return res
        .status(200)
        .json(new ApiResponse(201, playlist, "playlist fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    //TODO: get user playlists
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(403, "invalid playlistId");
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(403, "invalid videoId");
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push: {
                videos: videoId,
            },
        },
        {
            new: true,
        }
    );

    if (!playlist) {
        throw new ApiError(400, "could not add video to playlist");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                playlist,
                "video added to playlist successfully"
            )
        );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    // TODO: remove video from playlist
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(403, "invalid playlistId");
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(403, "invalid videoId");
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: {
                videos: videoId,
            },
        },
        {
            new: true,
        }
    );

    if (!playlist) {
        throw new ApiError(400, "could not delete video to playlist");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                playlist,
                "video deleted to playlist successfully"
            )
        );
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    // TODO: delete playlist
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(403, "invalid playlistId");
    }

    const playlist = await Playlist.deleteOne({
        _id: playlistId,
    });

    if (!playlist) {
        throw new ApiError(400, "could not delete playlist");
    }
    return res
        .status(200)
        .json(new ApiResponse(201, playlist, "playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;
    //TODO: update playlist
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(403, "invalid playlistId");
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set: {
                name,
                description,
            },
        },
        {
            new: true,
        }
    );

    if (!playlist) {
        throw new ApiError(400, "could not update playlist");
    }
    return res
        .status(200)
        .json(new ApiResponse(201, playlist, "playlist updated successfully"));
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
};
