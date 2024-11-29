# RBAC
# Role-Based Authentication with React and Node.js

This project implements a full-stack application with **role-based authentication** and protected routes using React for the frontend and Node.js with Express for the backend. It uses **JWT (JSON Web Tokens)** for secure communication and MongoDB for user data storage.

## **Features**
- User registration with role assignment (`Admin`, `Moderator`, `User`).
- Secure login with JWT-based authentication.
- Role-based dashboards (`AdminDashboard`, `ModeratorDashboard`, `UserDashboard`).
- Protected routes accessible only with valid tokens.
- Password hashing for enhanced security (using `bcrypt`).


## **Tech Stack**
### Frontend:
- React
- Axios
- React Router DOM

### Backend:
- Node.js
- Express
- MongoDB (with Mongoose)


## **Setup Instructions**

### Prerequisites:
- Node.js and npm installed
- MongoDB running locally or a cloud database URL (e.g., MongoDB Atlas)


## **API Endpoints**

### Auth Routes:
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Authenticate user and return JWT

### Protected Routes:
- `GET /protected`: Accessible only with valid JWT token


## **Role-Based Redirection**
- After login, users are redirected to their respective dashboards based on their roles:
  - **Admin**: `/admin`
  - **Moderator**: `/moderator`
  - **User**: `/user`

## **How to Test Protected Routes**
1. Login to get a valid JWT.
2. Use tools like Postman or Axios to send requests to protected endpoints with the token in the `Authorization` header.

