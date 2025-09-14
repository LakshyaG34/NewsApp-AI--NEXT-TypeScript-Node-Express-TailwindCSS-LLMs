import express from "express"
import { googleGen } from "../controller/ai.controller"

const router = express.Router();

router.post("/ai", googleGen);

export default router;