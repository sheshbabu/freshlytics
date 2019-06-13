import { Request, Response, NextFunction as Next } from "express";
import DailyBrowserNameVersionPageViewTotals from "../database/DailyBrowserNameVersionPageViewTotals";

async function getBrowserNameVersionPageViewTotals(req: Request, res: Response, next: Next) {
  const projectId = req.query.projectId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    const rows = await DailyBrowserNameVersionPageViewTotals.getBrowserNameVersionTotals(projectId, startDate, endDate);
    res.send(rows);
  } catch (e) {
    next(e);
  }
}

export default getBrowserNameVersionPageViewTotals;
