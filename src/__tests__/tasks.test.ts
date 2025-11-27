import { describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import { app, prisma } from '../index';

// Tests for Tasks API endpoints
describe('Tasks API', () => {
  // Clean up database after each test
  afterEach(async () => {
    await prisma.task.deleteMany({});
  });

  describe('GET /api/tasks', () => {
    it('should return empty list initially', async () => {
      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
      expect(response.body.pagination.total).toBe(0);
    });

    it('should return all tasks with pagination', async () => {
      // Create test tasks
      await prisma.task.create({
        data: {
          title: 'Test Task 1',
          description: 'Description 1',
          status: 'PENDING',
        },
      });

      await prisma.task.create({
        data: {
          title: 'Test Task 2',
          description: 'Description 2',
          status: 'COMPLETED',
        },
      });

      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination.total).toBe(2);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'New Task',
        description: 'Task description',
      };

      const response = await request(app).post('/api/tasks').send(taskData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
      expect(response.body.status).toBe('PENDING');
      expect(response.body.id).toBeDefined();
    });

    it('should validate required title field', async () => {
      const taskData = {
        description: 'Missing title',
      };

      const response = await request(app).post('/api/tasks').send(taskData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation error');
    });

    it('should validate title length', async () => {
      const taskData = {
        title: 'a'.repeat(256),
      };

      const response = await request(app).post('/api/tasks').send(taskData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation error');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a specific task', async () => {
      const task = await prisma.task.create({
        data: {
          title: 'Test Task',
          status: 'PENDING',
        },
      });

      const response = await request(app).get(`/api/tasks/${task.id}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(task.id);
      expect(response.body.title).toBe('Test Task');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).get('/api/tasks/non-existent-id');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Task not found');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update task status', async () => {
      const task = await prisma.task.create({
        data: {
          title: 'Test Task',
          status: 'PENDING',
        },
      });

      const response = await request(app)
        .put(`/api/tasks/${task.id}`)
        .send({ status: 'COMPLETED' });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('COMPLETED');
    });

    it('should update task title and description', async () => {
      const task = await prisma.task.create({
        data: {
          title: 'Original Title',
          description: 'Original Description',
          status: 'PENDING',
        },
      });

      const response = await request(app).put(`/api/tasks/${task.id}`).send({
        title: 'Updated Title',
        description: 'Updated Description',
      });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Title');
      expect(response.body.description).toBe('Updated Description');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .put('/api/tasks/non-existent-id')
        .send({ title: 'Updated' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Task not found');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const task = await prisma.task.create({
        data: {
          title: 'Task to Delete',
          status: 'PENDING',
        },
      });

      const response = await request(app).delete(`/api/tasks/${task.id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Task deleted successfully');

      const deletedTask = await prisma.task.findUnique({
        where: { id: task.id },
      });

      expect(deletedTask).toBeNull();
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).delete('/api/tasks/non-existent-id');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Task not found');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
      expect(response.body.timestamp).toBeDefined();
    });
  });
});
