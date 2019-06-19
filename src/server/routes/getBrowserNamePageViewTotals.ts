import { Request, Response, NextFunction as Next } from "express";
import DailyBrowserNamePageViewTotals from "../db/models/DailyBrowserNamePageViewTotals";

async function getBrowserNamePageViewTotals(req: Request, res: Response, next: Next) {
  const projectId = req.query.projectId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    const rows = await DailyBrowserNamePageViewTotals.getBrowserNameTotals(projectId, startDate, endDate);
    res.send(rows);
  } catch (e) {
    next(e);
  }
}

export default getBrowserNamePageViewTotals;
