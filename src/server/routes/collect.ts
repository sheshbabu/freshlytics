import { Request, Response, NextFunction as Next } from "express";
import PageViews from "../models/PageViews";
import DateTimeUtil from "../utils/DateTimeUtil";
import UserAgentUtil from "../utils/UserAgentUtil";
import { PageViewEventPayload, PageViewEvent } from "../types/PageViewEvent";

async function collect(req: Request, res: Response, next: Next) {
  try {
    const event = mapRequestPayload(req);
    await PageViews.add(event);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

function mapRequestPayload(req: Request): PageViewEvent {
  const payload: PageViewEventPayload = {
    project_id: req.query.project_id,
    path: req.query.path,
    referrer: req.query.referrer,
    ua: req.headers["user-agent"] || ""
  };

  validateRequestPayload(payload);

  const { project_id, path, referrer, ua } = payload;
  const date = DateTimeUtil.getCurrentDateInUtc();
  const browser_name = UserAgentUtil.getBrowserName(ua);
  const browser_name_version = UserAgentUtil.getBrowserNameVersion(ua);

  return { project_id, path, referrer, date, browser_name, browser_name_version };
}

function validateRequestPayload(payload: PageViewEventPayload) {
  if (typeof payload.project_id !== "string") {
    throw new Error("project_id not sent");
  }

  if (typeof payload.path !== "string") {
    throw new Error("path not sent");
  }

  if (typeof payload.referrer !== "string") {
    throw new Error("referrer not sent");
  }

  if (typeof payload.ua !== "string") {
    throw new Error("useragent not sent");
  }
}

export default collect;
