import { Request, Response, NextFunction as Next } from "express";
import DailyPageViewTotals from "../db/models/DailyPageViewTotals";

async function getPageViewCount(req: Request, res: Response, next: Next) {
  const projectId = req.query.projectId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    const rows = await DailyPageViewTotals.getCount(projectId, startDate, endDate);
    res.send(rows);
  } catch (e) {
    next(e);
  }
}

export default getPageViewCount;
