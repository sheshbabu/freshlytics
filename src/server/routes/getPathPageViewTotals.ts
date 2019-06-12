import { Request, Response, NextFunction as Next } from "express";
import DailyPathPageViewTotals from "../database/DailyPathPageViewTotals";

async function getPageViewCount(req: Request, res: Response, next: Next) {
  try {
    const rows = await DailyPathPageViewTotals.getPathTotals();
    res.send(rows);
  } catch (e) {
    next(e);
  }
}

export default getPageViewCount;
