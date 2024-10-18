import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { deleteVideo, getAllVideos, getVideoById, publishAVideo, togglePublishStatus, updateVideo } from "../controllers/video.controllers.js";

const router = Router();


router.use(verifyJWT);
router.route("/upload-video").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);


router.route("/delete-video/:videoId").delete(deleteVideo)
router.route("/:videoId").get(getVideoById)
router.route("/update-video/:videoId").post(upload.single("thumbnail"),updateVideo)
router.route("/toggle-publish/:videoId").get(togglePublishStatus)
router.route("/get-videos").post(getAllVideos)







export { router as videoRouter };
