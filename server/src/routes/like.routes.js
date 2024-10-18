import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getAllLikesOfVideo, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controllers.js";

const router = Router()

router.use(verifyJWT)

router.route("/toggle-video-like/:videoId").get(toggleVideoLike)
router.route("/toggle-tweet-like/:tweetId").get(toggleTweetLike)
router.route("/toggle-comment-like/:commentId").get(toggleCommentLike)
router.route("/get-all-liked-videos/:videoId").get(getAllLikesOfVideo);

export { router as likeRouter}