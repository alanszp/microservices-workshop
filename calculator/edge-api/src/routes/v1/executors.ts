import { Router } from "express";
import controller from "../../controllers/executors";

const router = Router();

router.post(
    "/",
    controller.register,
);

export default router;
