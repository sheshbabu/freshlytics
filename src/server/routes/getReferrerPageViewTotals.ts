import { Request, Response, NextFunction as Next } from "express";
import DailyReferrerPageViewTotals from "../database/DailyReferrerPageViewTotals";

async function getReferrerPageViewTotals(req: Request, res: Response, next: Next) {
  const projectId = req.query.projectId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    const rows = await DailyReferrerPageViewTotals.getReferrerTotals(projectId, startDate, endDate);
    res.send(rows);
  } catch (e) {
    next(e);
  }
}

export default getReferrerPageViewTotals;
