import { Request, Response, NextFunction as Next } from "express";
import DailyReferrerPageViewTotals from "../database/DailyReferrerPageViewTotals";

async function getReferrerPageViewTotals(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const rows = await DailyReferrerPageViewTotals.getReferrerTotals();
    res.send(rows);
  } catch (e) {
    next(e);
  }
}

export default getReferrerPageViewTotals;
