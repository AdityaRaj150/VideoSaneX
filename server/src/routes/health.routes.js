import { Router } from "express";
import { healthCheck } from "../controllers/healthChecker.controllers";

const router = Router()

router.route("/").get(healthCheck)
export {router as healthCheckRouter}