import express from "express";
import collect from "./routes/collect";
import getPageviewCount from "./routes/getPageViewCount";
import getPathPageViewTotals from "./routes/getPathPageViewTotals";
import getReferrerPageViewTotals from "./routes/getReferrerPageViewTotals";
import getBrowserNamePageViewTotals from "./routes/getBrowserNamePageViewTotals";
import getBrowserNameVersionPageViewTotals from "./routes/getBrowserNameVersionPageViewTotals";

const router = express.Router();

router.use("/collect", collect);

router.use("/metric/pageview/path", getPathPageViewTotals);
router.use("/metric/pageview/referrer", getReferrerPageViewTotals);
router.use("/metric/pageview/browserName", getBrowserNamePageViewTotals);
router.use(
  "/metric/pageview/browserNameVersion",
  getBrowserNameVersionPageViewTotals
);
router.use("/metric/pageview", getPageviewCount);

export default router;
