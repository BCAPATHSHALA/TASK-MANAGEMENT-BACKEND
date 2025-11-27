import express, { type Router } from 'express';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from '../controllers/tasks';

const router: Router = express.Router();

// Get all tasks
router.get('/', getAllTasks);

// Get single task
router.get('/:id', getTaskById);

// Create task
router.post('/', createTask);

// Update task
router.put('/:id', updateTask);

// Delete task
router.delete('/:id', deleteTask);

export default router;
