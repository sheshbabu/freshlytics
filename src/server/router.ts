import express from "express";
import collect from "./routes/collect";
import getPageviewCount from "./routes/getPageViewCount";

const router = express.Router();

router.use("/collect", collect);
router.use("/metric/pageview", getPageviewCount);

export default router;
