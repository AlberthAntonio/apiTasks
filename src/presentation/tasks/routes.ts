import { Router } from "express";
import { TasksController } from "./controller";
import { TaskService } from "../services/task.service";

export class TasksRoutes {
  static get routes(): Router {
    const routes = Router();

    const taskService = new TaskService();
    const controller = new TasksController(taskService);

    routes.get("/", controller.getTasks);
    routes.post("/", controller.createTask);
    routes.get("/:id", controller.getTaskbyId);
    routes.put("/:id", controller.updateTask);
    routes.delete("/:id", controller.deleteTask);

    return routes;
  }
}
