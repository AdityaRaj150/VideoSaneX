import express from "express";
import {
  userLogin,
  userLogout,
  userRegister,
  getWatchHistory,
  getUserChannelProfile,
  updateUserCoverImage,
  updateUserAvatar,
  updateAccountDetails,
  getCurrentUser,
  changeCurrentPassword,
  refreshAccessToken,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userRegister
);


router.route("/update-coverImage").post(upload.single("coverImage"),updateUserCoverImage);
router.route("/update-avatar").post(upload.single("avatar"),updateUserAvatar);


router.route("/login").post(userLogin);

router.use(verifyJWT);
router.route("/refreshToken").post(refreshAccessToken);
router.route("/logout").get(userLogout);
router.route("/user-channel-profile/:userName").get(getUserChannelProfile);
router.route("/watch-history").get(getWatchHistory);

router.route("/update-account-details").post(updateAccountDetails);
router.route("/get-current-user").post(getCurrentUser);
router.route("/change-password").post(changeCurrentPassword);




export { router as userRouter };
