import { Request, Response, NextFunction as Next } from "express";
import DailyPathPageViewTotals from "../db/models/DailyPathPageViewTotals";

async function getPathPageViewTotals(req: Request, res: Response, next: Next) {
  const projectId = req.query.projectId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    const rows = await DailyPathPageViewTotals.getPathTotals(projectId, startDate, endDate);
    res.send(rows);
  } catch (e) {
    next(e);
  }
}

export default getPathPageViewTotals;
