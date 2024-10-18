import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/channel-stats").get(getChannelStats)
router.route("/channel-videos").get(getChannelVideos)

export { router as dashboardRouter };
