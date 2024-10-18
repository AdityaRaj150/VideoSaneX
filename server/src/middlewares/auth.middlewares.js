import { User } from "../models/user.modals.js"
import ApiError from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import mongoose from "mongoose"

export const verifyJWT = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1]
  

    if (!token) {
        throw new ApiError(400, "User Unauthorized")
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    if (!user) {
        throw new ApiError(401, "invalid access token")
    }

    req.user = user
    next();
    
})