import { Request, Response } from "express";
import { CreateTaskDto, CustomError, UpdateTaskDto } from "../../domain";
import { TaskService } from "../services/task.service";

export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  private handleError = (error: any, res: Response) => {
    console.log(error);
    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(500).json({ message: "Something went very wrong" });
  };

  getTasks = (req: Request, res: Response) => {
    this.taskService
      .getTasks()
      .then((tasks) => res.status(200).json(tasks))
      .catch((error) => this.handleError(error, res));
  };

  createTask = (req: Request, res: Response) => {
    const [error, createTaskDto] = CreateTaskDto.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.taskService
      .createTask(createTaskDto!)
      .then((task) => res.status(201).json(task))
      .catch((error) => this.handleError(error, res));
  };

  getTaskbyId = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ message: "Id is not a number" });
    }

    this.taskService
      .getTaskbyId(+id)
      .then((task) => res.status(200).json(task))
      .catch((error) => this.handleError(error, res));
  };

  updateTask = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ message: "Id is not a number" });
    }

    const [error, updateTaskDto] = UpdateTaskDto.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.taskService
      .updateTask(+id, updateTaskDto!)
      .then((task) => res.status(200).json(task))
      .catch((error) => this.handleError(error, res));
  };

  deleteTask = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ message: "Id is not a number" });
    }

    this.taskService
      .deleteTask(+id)
      .then(() => res.status(200).json({ message: "Task deleted" }))
      .catch((error) => this.handleError(error, res));
  };
}
