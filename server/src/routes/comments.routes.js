import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comments.controllers.js";

const router = Router();
router.use(verifyJWT);

router.route("/delete-comment/:commentId").delete(deleteComment);
router.route("/update-comment/:commentId").post(updateComment);
router.route("/add-comment/:videoId").post(addComment)
router.route("/:videoId").get(getVideoComments);

export { router as commentRouter };
