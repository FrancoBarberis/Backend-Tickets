# Backend-Tickets

A Node.js backend for a ticket management system using Express and MongoDB.

## Features

- User authentication and authorization
- Ticket creation, management, and workflow
- Comments on tickets
- Role-based access control

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file:
   - `MONGODB_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT
   - `PORT`: Server port (default 3000)
4. Start the server: `npm start` or `npm run dev` for development

## API Endpoints

### Auth
- POST /api/auth/login
- POST /api/auth/register

### Users
- GET /api/users (admin only)
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id (admin only)

### Tickets
- GET /api/tickets
- GET /api/tickets/:id
- POST /api/tickets
- PUT /api/tickets/:id
- DELETE /api/tickets/:id

### Comments
- GET /api/comments/:ticketId
- POST /api/comments
- DELETE /api/comments/:id

## Troubleshooting

- Ensure MongoDB is running
- Check environment variables
- Use `npm run dev` for development with nodemon