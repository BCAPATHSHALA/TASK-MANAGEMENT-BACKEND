import { z } from 'zod';
export declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["PENDING", "IN_PROGRESS", "COMPLETED"]>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description?: string | undefined;
    status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | undefined;
}, {
    title: string;
    description?: string | undefined;
    status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | undefined;
}>;
export declare const updateTaskSchema: z.ZodEffects<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["PENDING", "IN_PROGRESS", "COMPLETED"]>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | undefined;
}>, {
    title?: string | undefined;
    description?: string | undefined;
    status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | undefined;
}>;
export declare const querySchema: z.ZodObject<{
    skip: z.ZodOptional<z.ZodNumber>;
    take: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    skip?: number | undefined;
    take?: number | undefined;
}, {
    skip?: number | undefined;
    take?: number | undefined;
}>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type QueryInput = z.infer<typeof querySchema>;
//# sourceMappingURL=taskSchema.d.ts.map