import express from "express";
import { getCategories, insertCategories } from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/post", insertCategories);
router.get("/list", getCategories);

export default router;
