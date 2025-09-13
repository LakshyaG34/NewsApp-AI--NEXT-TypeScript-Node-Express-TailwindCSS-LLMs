import express, {Request, Response} from "express"
import { getMe, getUser, logout, signin, signup } from "../controller/auth.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/getUser/:id", getUser);
router.get("/getMe", protectRoute, getMe);

export default router;