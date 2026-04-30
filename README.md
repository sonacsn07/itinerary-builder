# Itinerary Builder Web App

This is a full-stack web application for itinerary building.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Radix UI, Framer Motion
- **Backend**: Node.js, Express, TRPC
- **Database**: MySQL, Drizzle ORM
- **Package Manager**: pnpm

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- A running MySQL database instance

## Local Development Setup

1. **Clone the repository** (if not already done) and navigate into the project directory:
   ```bash
   cd itinerary-builder
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your database connection string and any other required variables. 
   
   *Required:*
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/itinerary_builder"
   ```

   *Optional (depending on features used):*
   ```env
   # Authentication
   VITE_APP_ID=""
   VITE_OAUTH_PORTAL_URL=""
   OAUTH_SERVER_URL=""
   OWNER_OPEN_ID=""
   JWT_SECRET=""

   # Backend API integration
   BUILT_IN_FORGE_API_URL=""
   BUILT_IN_FORGE_API_KEY=""

   # Frontend Map/API integration
   VITE_FRONTEND_FORGE_API_URL=""
   VITE_FRONTEND_FORGE_API_KEY=""
   ```

4. **Initialize the Database**:
   Push the database schema to your MySQL instance:
   ```bash
   pnpm run db:push
   ```

5. **Start the Development Server**:
   ```bash
   pnpm run dev
   ```

The application should now be running locally. Check your terminal output for the exact localhost URL (typically `http://localhost:5173` or similar).

## Available Scripts

- `pnpm run dev`: Starts the development server.
- `pnpm run build`: Builds the application for production.
- `pnpm run start`: Starts the production server.
- `pnpm run db:push`: Pushes schema changes to the database using Drizzle Kit.
- `pnpm run check`: Runs TypeScript checks.
- `pnpm run format`: Formats code using Prettier.
- `pnpm run test`: Runs unit tests using Vitest.
