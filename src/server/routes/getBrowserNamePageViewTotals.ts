import { Request, Response, NextFunction as Next } from "express";
import DailyBrowserNamePageViewTotals from "../database/DailyBrowserNamePageViewTotals";

async function getBrowserNamePageViewTotals(
  req: Request,
  res: Response,
  next: Next
) {
  try {
    const rows = await DailyBrowserNamePageViewTotals.getBrowserNameTotals();
    res.send(rows);
  } catch (e) {
    next(e);
  }
}

export default getBrowserNamePageViewTotals;
