# The Sheet Ledger API

A robust API for managing custom character sheets for any tabletop RPG game.

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Authentication](#-authentication)
- [Testing](#-testing)
- [Running the API](#-running-the-api)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Starting the Server](#starting-the-server)
  
## 🎯 Overview
The Sheet Ledger API is a backend service built with Fastify that provides functionality for managing character sheets, sheet templates, and user authentication. It's designed to support tabletop RPG games by providing a flexible system for creating and managing character information.

## 🚀 Features
- User Management
- Authentication & Authorization
- Role-based access control
- Character Sheets
  - Create, read, update, and delete operations
  - Template-based sheet creation
  - Dynamic field validation
  - Modular component system
  - Support for different field types:
    - Text fields
    - Lists
    - Select options
    - Containers (grouping)

## 🛠 Tech Stack
- Runtime: Node.js
- Framework: Fastify
- Database: PostgreSQL
  - ORM: Prisma
- Authentication: JWT
- Validation: Zod
- Testing: Vitest

## 📦 Project Structure
```bash
src/
├── domain/        # Domain entities and types
├── http/          # HTTP layer (controllers, middlewares)
├── lib/           # Shared libraries and utilities
├── repositories/  # Data access layer
├── use-cases/     # Application business logic
└── utils/         # Helper functions
```

### 🔧 Environment Variables
Required environment variables (see src/env/index.ts for more details)

### 🔒 Authentication
The API uses JWT for authentication with refresh token support. Protected routes require a valid JWT token in the Authorization header:

### 🧪 Testing
The project includes comprehensive test coverage using Vitest. Tests are organized by feature and include:
- Unit tests for use cases
- Integration tests for controllers
- Repository tests
- Utility function tests

To run tests:
```bash
npm run test
```

## 🏃 Running the API

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database (see docker-compose.yml for more details)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/sheet-ledger-api.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Database Setup
```bash
# Run database migrations
npm run prisma:migrate:dev

```

### Starting the Server
```bash
# Development mode
npm run start:dev

# Production build
npm run build
npm start
```

The API will be available at `http://localhost:3333` by default.

---
##### Made by [@paulovalleriote](https://www.linkedin.com/in/paulovalleriote/)