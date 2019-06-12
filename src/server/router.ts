import express from "express";
import collect from "./routes/collect";
import getPageviewCount from "./routes/getPageViewCount";
import getPathPageViewTotals from "./routes/getPathPageViewTotals";

const router = express.Router();

router.use("/collect", collect);

router.use("/metric/pageview/path", getPathPageViewTotals);
router.use("/metric/pageview", getPageviewCount);

export default router;
