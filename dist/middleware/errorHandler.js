"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            error: 'Validation error',
            details: err.errors,
        });
    }
    if (err instanceof Error) {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal server error';
        return res.status(statusCode).json({
            error: message,
            details: err.details,
        });
    }
    res.status(500).json({ error: 'Internal server error' });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map