# Task Management API

Backend API for the Task Management application built with Express.js, TypeScript, Prisma, and PostgreSQL.

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 14+

### Installation

```bash
# Install dependencies
pnpm install

# Generate Prisma Client
pnpm run prisma:generate

# Setup database
pnpm run prisma:migrate
```

### Development

```bash
# Start development server (watches for changes)
pnpm run dev

# Server runs on http://localhost:5000
```

### Testing

```bash
# Run all tests
pnpm run test
```

## Project Structure

```bash
src/
├── __tests__/         # Test files
├── controllers/       # Express controllers
├── middleware/        # Express middleware
├── routes/            # API routes
├── schemas/           # Zod validation schemas
├── types/             # TypeScript types
└── index.ts           # Entry point
```

## Environment Variables

Create `.env` file:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/task_management_db
NODE_ENV=development
PORT=5000
```

## API Routes

### Tasks CRUD Operations

- `GET /api/tasks` - Get all tasks (with pagination)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Health Check

- `GET /health` - Health check

## Database

Database schema defined in `prisma/schema.prisma`

### Run Migrations

```bash
pnpm run prisma:migrate
```

### View Database

```bash
pnpm run prisma:studio
```

## Testing

Tests use Vitest and cover:

- CRUD operations
- Validation
- Error handling

```bash
pnpm test
```

## Build for Production

```bash
pnpm run build
pnpm start
```
