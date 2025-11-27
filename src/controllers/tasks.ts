import { type Request, type Response, type NextFunction } from 'express';
import { prisma } from '../index';
import { createTaskSchema, updateTaskSchema, querySchema } from '../schemas/taskSchema';

// Get all tasks
export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = querySchema.parse(req.query);
    const tasks = await prisma.task.findMany({
      skip: query.skip || 0,
      take: query.take || 10,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.task.count();

    res.json({
      data: tasks,
      pagination: {
        total,
        skip: query.skip || 0,
        take: query.take || 10,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get single task
export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Create task
export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = createTaskSchema.parse(req.body);

    const task = await prisma.task.create({
      data: {
        title: validData.title,
        description: validData.description,
        status: validData.status || 'PENDING',
      },
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Update task
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validData = updateTaskSchema.parse(req.body);

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: validData,
    });

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
