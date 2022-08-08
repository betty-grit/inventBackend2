import productRoutes from "./productRoutes.js";
import { Router } from "express";
import userRoutes from './userRoutes.js';

const router = Router();

router.use("/api", productRoutes);
router.use('/api', userRoutes);
// save
export default router;
