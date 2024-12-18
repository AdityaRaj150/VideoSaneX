import cookieParser from "cookie-parser";
import cors from "cors";
import express, { urlencoded } from "express";
import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();
app.use(
    cors({
        origin: process.env.CROSS_ORIGIN,
        credentials: true,
    })
);  
app.use(cookieParser());
app.use(express.json({ limit: "17kb" }));

app.use(urlencoded({ extended: true, limit: "17kb" }));
app.use(express.static("public"));


import { userRouter } from "./routes/user.routes.js";
import { videoRouter } from "./routes/video.routes.js";
import { subscriptionRouter } from "./routes/subscription.routes.js";
import { tweetRouter } from "./routes/tweet.routes.js";
import { commentRouter } from "./routes/comments.routes.js";
import { likeRouter } from "./routes/like.routes.js";
import { dashboardRouter } from "./routes/dashboard.routes.js";
import { healthCheck } from "./controllers/healthChecker.controllers.js";

app.use("/api/v1/health", healthCheck)
app.use("/api/v1/user", userRouter);
app.use("/api/v1/video", videoRouter)
app.use("/api/v1/subscription", subscriptionRouter)
app.use("/api/v1/tweet", tweetRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/like", likeRouter)
app.use("/api/v1/dashboard", dashboardRouter)
app.use((err, req, res, next) => {
  
    res.status(err.statusCode || 500).json(
        new ApiResponse(
            err.statusCode || 500,
            {},
            err.message || "internal server error"
        )
    );
});

export { app };
