import { Request, Response, NextFunction } from "express";
import PageViews from "../db/models/PageViews";

async function getPageViews(req: Request, res: Response, next: NextFunction) {
  const projectId = req.query.projectId;
  const startDate = req.query.startDate || "1900-01-01";
  const endDate = req.query.endDate || "3000-01-01";
  const page = req.query.page || 0;
  const dimension = req.query.dimension || null;
  let rows = [];

  try {
    switch (dimension) {
      case "path":
        rows = await PageViews.getByPath(projectId, startDate, endDate, page);
        break;
      case "referrer":
        rows = await PageViews.getByReferrer(projectId, startDate, endDate, page);
        break;
      case "browserName":
        rows = await PageViews.getByBrowserName(projectId, startDate, endDate, page);
        break;
      case "browserNameVersion":
        rows = await PageViews.getByBrowserNameVersion(projectId, startDate, endDate, page);
        break;
      default:
        rows = await PageViews.getByDate(projectId, startDate, endDate);
        break;
    }

    res.send(rows);
  } catch (e) {
    next(e);
  }
}

export default getPageViews;
