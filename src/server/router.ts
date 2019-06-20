import express from "express";
import collect from "./routes/collect";
import login from "./routes/login";
import changePassword from "./routes/changePassword";
import getPageViews from "./routes/getPageViews";

const router = express.Router();

router.use("/collect", collect);
router.use("/login", login);
router.use("/changePassword", changePassword);
router.use("/events/pageviews", getPageViews);

export default router;
