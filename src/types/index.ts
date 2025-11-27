import type { Task, TaskStatus } from '@prisma/client';

export type TaskResponse = Task;

export interface PaginationQuery {
  skip?: number;
  take?: number;
}

export interface ErrorResponse {
  error: string;
  details?: unknown;
}

export type TaskCreateInput = {
  title: string;
  description?: string;
  status?: TaskStatus;
};

export type TaskUpdateInput = {
  title?: string;
  description?: string;
  status?: TaskStatus;
};
