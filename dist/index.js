"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("./generated/prisma");
const tasks_1 = __importDefault(require("./routes/tasks"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const prisma = new prisma_1.PrismaClient();
exports.prisma = prisma;
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Request logging middleware for debugging
app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
// Routes for tasks
app.use('/api/tasks', tasks_1.default);
// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Handle 404 errors
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Start server and connect to database
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Graceful shutdown the Prisma Client on process termination
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
    });
});
//# sourceMappingURL=index.js.map