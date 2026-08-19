# Student & Employee Management Portal

A React + Vite frontend and Express + MongoDB backend for a role-based student and employee management portal. The app supports login, student/employee profiles, document management, and admin/HR workflows.

## Tech Stack

- Frontend: React 18, Vite, React Router
- Backend: Express.js, MongoDB/Mongoose
- Auth: JWT + bcryptjs
- Security: Helmet, CORS, rate limiting, validation

## Project Structure

- `src/` - React application
- `backend/` - Express REST API and database models
- `dist/` - production frontend build output

## Local Setup

1. Install dependencies:
   npm install
   cd backend && npm install && cd ..

2. Create environment files:
   - Copy `.env.example` to `.env` in the project root for frontend variables.
   - Copy `backend/.env.example` to `backend/.env` for backend variables.

3. Start MongoDB locally or provide a reachable Mongo connection string.

4. Start the backend:
   cd backend
   npm start

5. Start the frontend in another terminal:
   npm run dev

The frontend runs at http://localhost:5173 and proxies API requests to the backend on http://localhost:5000.

## Environment Variables

### Frontend

- `VITE_APP_BASE_PATH` - Optional subpath for deployment under a domain prefix, such as `/portal`.
- `VITE_API_URL` - Base URL for the API, such as `http://localhost:5000/api`.

### Backend

- `PORT` - Backend port, default `5000`.
- `NODE_ENV` - Runtime environment, such as `development` or `production`.
- `CLIENT_URL` - Allowed CORS origin for the frontend.
- `MONGO_URI` - MongoDB connection string.
- `JWT_SECRET` - Secret key used to sign JWT tokens.

## Production / Base Path Deployment

If the app is mounted beneath a route such as `/portal`, set:

- `VITE_APP_BASE_PATH=/portal`

This is used in the Vite config and the frontend app config to keep the app routing consistent when deployed behind a reverse proxy or static hosting path.

For a corporate or company website deployment, the frontend can be served from a subdirectory while the backend remains on a separate origin or internal service. Keep the API URL aligned to the backend endpoint and ensure the reverse proxy forwards `/api` correctly.

## Authentication Notes

- Login and registration routes are rate-limited.
- Passwords are securely hashed.
- JWTs are validated on protected routes.
- Role-based access is enforced by middleware.

## Available Scripts

### Root

- `npm run dev` - Start the Vite frontend.
- `npm run build` - Build the production frontend bundle.
- `npm run preview` - Preview the production build locally.

### Backend

- `cd backend && npm start` - Start the Express server.
- `cd backend && npm test` - Run backend tests if added.

## Notes

- The app uses a default development secret if `JWT_SECRET` is missing, but production should always provide a strong secret.
- The app includes a health endpoint at `/health` for simple service checks.
