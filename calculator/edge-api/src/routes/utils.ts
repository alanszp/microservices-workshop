import { Router } from "express";
const router = Router();

router.get("/health", (req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(200).send();
});

export default router;
