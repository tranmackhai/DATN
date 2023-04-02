import { Router } from "express";
import studentRouter from "./student.route.js";

const router = Router();
router.use("/api/student", studentRouter);

export default router;
