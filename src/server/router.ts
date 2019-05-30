import express from "express";
import collect from "./routes/collect";

const router = express.Router();

router.use("/collect", collect);

export default router;
