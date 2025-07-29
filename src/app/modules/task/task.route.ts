import express from 'express';
import { TaskController } from './task.controller';

const router = express.Router();

router.route('/')
    .get(TaskController.getAllTask)
    .post(TaskController.createTask);

router.route('/:id')
    .delete(TaskController.deleteTask)
    .patch(TaskController.updateTask)
export const TaskRoute = router;