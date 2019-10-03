import { Router } from "express";
import controller from "../../controllers/calculate";

const router = Router();

router.post(
    "/",
    controller.calculate,
);

export default router;
