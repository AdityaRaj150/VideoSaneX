import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controllers.js";

const router = Router();

router.use(verifyJWT);
router.route("/toggle-subscription/:channelId").get(toggleSubscription);
router.route("/channel-subscribers/:channelId").get(getUserChannelSubscribers);
router.route("/get-subscribed-channel/:subscriberId").get(getSubscribedChannels)

export { router as subscriptionRouter };
