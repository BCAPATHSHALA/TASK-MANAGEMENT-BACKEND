import type { Task, TaskStatus } from '../generated/prisma';
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
//# sourceMappingURL=index.d.ts.map