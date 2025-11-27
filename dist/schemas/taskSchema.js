"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querySchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
    description: zod_1.z.string().max(1000, 'Description must be less than 1000 characters').optional(),
    status: zod_1.z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
});
exports.updateTaskSchema = zod_1.z
    .object({
    title: zod_1.z
        .string()
        .min(1, 'Title is required')
        .max(255, 'Title must be less than 255 characters')
        .optional(),
    description: zod_1.z.string().max(1000, 'Description must be less than 1000 characters').optional(),
    status: zod_1.z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
});
exports.querySchema = zod_1.z.object({
    skip: zod_1.z.coerce.number().int().nonnegative().optional(),
    take: zod_1.z.coerce.number().int().positive().max(100).optional(),
});
//# sourceMappingURL=taskSchema.js.map