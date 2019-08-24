import { Request, Response, NextFunction } from "express";
import generate from "nanoid/generate";
import Projects from "../models/Projects";
import { Project } from "../types/Project.type";

async function add(req: Request, res: Response, next: NextFunction) {
  const project: Project = req.body.project;
  const projectId = generate("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

  try {
    if (project.name === "") {
      throw new Error("Name cannot be empty");
    }

    await Projects.add(projectId, project.name, project.timezone);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  const project_id = req.params.project_id;
  const project: Project = req.body.project;

  try {
    if (project.name === "") {
      throw new Error("Name cannot be empty");
    }

    await Projects.update(project_id, project);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  const project_id = req.params.project_id;

  try {
    await Projects.remove(project_id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const projects = await Projects.getAll();
    res.status(200).send(projects);
  } catch (e) {
    next(e);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  const project_id = req.params.project_id;

  try {
    const project = await Projects.getById(project_id);
    res.status(200).send(project);
  } catch (e) {
    next(e);
  }
}

export default {
  add,
  update,
  remove,
  getAll,
  getById
};
