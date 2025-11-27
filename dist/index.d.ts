import { type Express } from 'express';
import { PrismaClient } from './generated/prisma';
declare const app: Express;
declare const prisma: PrismaClient<import("./generated/prisma").Prisma.PrismaClientOptions, never, import("./generated/prisma/runtime/library").DefaultArgs>;
export { app, prisma };
//# sourceMappingURL=index.d.ts.map