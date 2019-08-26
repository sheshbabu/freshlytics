import { Request, Response, NextFunction as Next } from "express";
import PageViews from "../models/PageViews";
import Projects from "../models/Projects";
import DateTimeUtil from "../utils/DateTimeUtil";
import UserAgentUtil from "../utils/UserAgentUtil";
import { PageViewEvent } from "../types/PageViewEvent.type";
import { Project } from "../types/Project.type";

async function collect(req: Request, res: Response, next: Next) {
  try {
    const projects = await getAllProjects(req);
    const event = mapRequestPayload(req, projects);
    await PageViews.add(event);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function getAllProjects(req: Request) {
  if (req.app.locals.projects.length !== 0) {
    return req.app.locals.projects;
  }

  const projects = await Projects.getAll();
  req.app.locals.projects = projects;

  return projects;
}

function mapRequestPayload(req: Request, projects: Project[]): PageViewEvent {
  const projectId = req.query.project_id;
  const path = req.query.path;
  const referrer = req.query.referrer;
  const ua = req.headers["user-agent"] || "";

  validateRequestPayload(projectId, path, referrer, ua);

  const timezone = getProjectTimezone(projectId, projects);
  const date = DateTimeUtil.getCurrentDateTimeInTimezone(timezone);
  const browserName = UserAgentUtil.getBrowserName(ua);
  const browserNameVersion = UserAgentUtil.getBrowserNameVersion(ua);

  return {
    project_id: projectId,
    path,
    referrer,
    date,
    browser_name: browserName,
    browser_name_version: browserNameVersion
  };
}

function getProjectTimezone(projectId: string, projects: Project[]) {
  const project = projects.find(p => p.id === projectId);

  if (project === undefined) {
    throw new Error(`Project with project_id:${projectId} doesn't exist`);
  }

  return project.timezone;
}

function validateRequestPayload(projectId: string, path: string, referrer: string, ua: string) {
  if (typeof projectId !== "string") {
    throw new Error("project_id not sent");
  }

  if (typeof path !== "string") {
    throw new Error("path not sent");
  }

  if (typeof referrer !== "string") {
    throw new Error("referrer not sent");
  }

  if (typeof ua !== "string") {
    throw new Error("useragent not sent");
  }
}

export default {
  collect
};
