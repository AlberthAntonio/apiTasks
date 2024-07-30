import { Tasks } from "../../data";
import { CreateTaskDto, CustomError, UpdateTaskDto } from "../../domain";

enum TaskStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class TaskService {
  async getTasks() {
    try {
      const tasks = await Tasks.find({
        where: {
          status: TaskStatus.ACTIVE,
        },
      });
      return tasks;
    } catch (error) {
      throw CustomError.internalServer("Something went wrong");
    }
  }

  async createTask(taskData: CreateTaskDto) {
    const task = new Tasks();

    task.title = taskData.title.toLowerCase().trim();
    task.description = taskData.description.toLowerCase().trim();

    try {
      return await task.save();
    } catch (error) {
      throw CustomError.internalServer("Something went wrong");
    }
  }

  async getTaskbyId(id: number) {
    const task = await Tasks.findOne({
      where: {
        id: id,
        status: TaskStatus.ACTIVE,
      },
    });
    if (!task) {
      throw CustomError.notFound("Task not found");
    }

    return task;
  }

  async updateTask(id: number, taskData: UpdateTaskDto) {
    const task = await this.getTaskbyId(id);
    task.title = taskData.title.toLowerCase().trim();
    task.description = taskData.description.toLowerCase().trim();

    try {
      return await task.save();
    } catch (error) {
      throw CustomError.internalServer("Something went wrong");
    }
  }

  async deleteTask(id: number) {
    const task = await this.getTaskbyId(id);

    task.status = TaskStatus.INACTIVE;
    try {
      return await task.save();
    } catch (error) {
      throw CustomError.internalServer("Something went wrong");
    }
  }
}
