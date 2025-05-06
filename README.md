Task Flow API
A simple task management API built with Node.js and MongoDB. This API allows users to register, login, and manage tasks. Users can create, view, delete, and mark tasks as complete. The tasks are user-specific, ensuring that only the task creator can modify them.

Features
User Registration: Register new users.

User Login: Login to the application using a JWT token.

Task Management:

Create a task.

View tasks (user-specific).

Delete a task.

Mark tasks as "completed."

Assign tasks to users.

Authentication: Simple JWT-based authentication for securing routes.

Database: MongoDB for storing users and tasks data.

Endpoints
Authentication
POST /api/user/register: Register a new user.

Body: { "email": "user@example.com", "password": "yourpassword" }

POST /api/user/login: Login with email and password.

Body: { "email": "user@example.com", "password": "yourpassword" }

Response: { "token": "token" }




Task Management
POST /api/task: Create a new task.

Body: { "title": "Task title", "description": "Task description" }

GET /api/task: Get all tasks of the logged-in user.

Headers: { "Authorization": "Bearer your-jwt-token" }

DELETE /api/task/:taskId: Deletes a task by ID.

Headers: { "Authorization": "Bearer your-jwt-token" }

Params: taskId (task ID)

PUT /api/task/:taskId: Updates the  task status to "completed."

Headers: { "Authorization": "Bearer your-jwt-token" }

Params: taskId (task ID)

PUT /api/task/assign/:taskId: Assigns a task to a user.

Body: { "userId": "user-id" }

Headers: { "Authorization": "Bearer your-jwt-token" }

Installation
Clone the repository:
git clone https://github.com/your-username/your-repo-name.git

cd your-repo-name
npm install
In the .env file initialize the values for 
JWT_SECRET=your_jwt_secret
MONGO_URL=your_mongodb_connection_string
PORT=
Start the server by node server.js
Technologies Used
Node.js

Express

MongoDB (Mongoose)

JWT (JSON Web Tokens)

dotenv for environment variables

Hosted API
The backend server is hosted on Render. You can make API requests to the following URL:

Base URL: https://task-flow-api-0l8w.onrender.com






License
This project is licensed under the MIT License - see the LICENSE file for details.




