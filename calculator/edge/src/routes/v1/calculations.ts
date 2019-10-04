import { Router } from "express";
import controller from "../../controllers/calculations";

const router = Router();

router.post(
    "/",
    controller.calculate,
);

export default router;
