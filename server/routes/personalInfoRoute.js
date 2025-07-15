import express from "express" 
import { getInfo, updateInfo } from "../controllers/personalInfoController.js";

const router = express.Router()

router.get('/', getInfo);
router.put("/:id",updateInfo)

export default router;

