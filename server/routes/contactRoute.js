import express from "express" 
import { deleteContacts, getContacts, submitContacts } from "../controllers/contactController.js";

const router = express.Router()

router.get('/', getContacts);
router.post("/",submitContacts )
router.delete("/:id",deleteContacts)


export default router;

