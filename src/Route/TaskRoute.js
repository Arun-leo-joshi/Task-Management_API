import express from "express";
import { ValidateTask } from "../Middleware/express-validator.js";
import { Createtask, DeleteTask, GetTaskById, GetTasks, UpdateTask } from "../Controller/TaskController.js";

const TaskRouter=express.Router();

TaskRouter.post('/create', ValidateTask, Createtask);
TaskRouter.get("/",GetTasks);
TaskRouter.get("/:id",GetTaskById);
TaskRouter.put("/:id",ValidateTask,UpdateTask);
TaskRouter.delete("/:id",DeleteTask);
export default TaskRouter;