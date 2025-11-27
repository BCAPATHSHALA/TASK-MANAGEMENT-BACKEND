"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = void 0;
const index_1 = require("../index");
const taskSchema_1 = require("../schemas/taskSchema");
// Get all tasks
const getAllTasks = async (req, res, next) => {
    try {
        const query = taskSchema_1.querySchema.parse(req.query);
        const tasks = await index_1.prisma.task.findMany({
            skip: query.skip || 0,
            take: query.take || 10,
            orderBy: { createdAt: 'desc' },
        });
        const total = await index_1.prisma.task.count();
        res.json({
            data: tasks,
            pagination: {
                total,
                skip: query.skip || 0,
                take: query.take || 10,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTasks = getAllTasks;
// Get single task
const getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await index_1.prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.getTaskById = getTaskById;
// Create task
const createTask = async (req, res, next) => {
    try {
        const validData = taskSchema_1.createTaskSchema.parse(req.body);
        const task = await index_1.prisma.task.create({
            data: {
                title: validData.title,
                description: validData.description,
                status: validData.status || 'PENDING',
            },
        });
        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.createTask = createTask;
// Update task
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const validData = taskSchema_1.updateTaskSchema.parse(req.body);
        const task = await index_1.prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const updatedTask = await index_1.prisma.task.update({
            where: { id },
            data: validData,
        });
        res.json(updatedTask);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTask = updateTask;
// Delete task
const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await index_1.prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await index_1.prisma.task.delete({
            where: { id },
        });
        res.json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=tasks.js.map