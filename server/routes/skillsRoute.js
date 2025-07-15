import express from "express" 
import { addSkills, deleteSkills, getSkills, updateSkills } from "../controllers/skillsController.js";

const router = express.Router()

router.get('/', getSkills);
router.post("/",addSkills )
router.put("/:id",updateSkills)
router.delete("/:id",deleteSkills)


export default router;

