import express from "express" 
import { addProjects, deleteProject, getProjects, updateProject } from "../controllers/projectscontroller.js";

const router = express.Router()

router.get('/', getProjects);
router.post("/",addProjects )
router.put("/:id",updateProject)
router.delete("/:id",deleteProject)


export default router;

