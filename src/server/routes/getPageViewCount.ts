import { Request, Response, NextFunction as Next } from "express";
import DailyPageViewTotals from "../database/DailyPageViewTotals";

async function getPageViewCount(req: Request, res: Response, next: Next) {
  try {
    const rows = await DailyPageViewTotals.getCount();
    res.send(rows);
  } catch (e) {
    next(e);
  }
}

export default getPageViewCount;
