import { Request, Response, NextFunction as Next } from "express";
import DailyBrowserNameVersionPageViewTotals from "../database/DailyBrowserNameVersionPageViewTotals";

async function getBrowserNameVersionPageViewTotals(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const rows = await DailyBrowserNameVersionPageViewTotals.getBrowserNameVersionTotals();
    res.send(rows);
  } catch (e) {
    next(e);
  }
}

export default getBrowserNameVersionPageViewTotals;
