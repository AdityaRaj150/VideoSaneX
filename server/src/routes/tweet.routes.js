import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controllers.js";

const router = Router()
router.use(verifyJWT)

router.route("/delete-tweet/:tweetId").delete(deleteTweet)
router.route("/update-tweet/:tweetId").post(updateTweet)
router.route("/create-tweet").post(createTweet)
router.route("/").get(getUserTweets)

export {router as tweetRouter}