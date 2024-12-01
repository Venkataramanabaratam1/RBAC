# RBAC
# Role-Based Authentication with React and Node.js

This project implements a full-stack application with **role-based authentication** and protected routes using React for the frontend and Node.js with Express for the backend. It uses **JWT (JSON Web Tokens)** for secure communication and MongoDB for user data storage.

## Features
- User registration with role assignment (`Admin`, `Moderator`, `User`).
- Secure login with JWT-based authentication.
- Role-based dashboards (`AdminDashboard`, `ModeratorDashboard`, `UserDashboard`).
- Protected routes accessible only with valid tokens.
- Password hashing for enhanced security (using `bcrypt`).


## Tech Stack
### Frontend:
- React
- Axios
- @mui/material

### Backend:
- Node.js
- Express
- MongoDB (with Mongoose)


## Setup Instructions

### Prerequisites:
- Node.js and npm installed
- MongoDB running locally or a cloud database URL (e.g., MongoDB Atlas)


## API Endpoints

### Auth Routes:
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Authenticate user and return JWT
- `POST /auth/logout`: used to Logout a Authenticated user


## Role-Based Redirection
- After login, users are redirected to their respective dashboards based on their roles:
  - **Admin**: `/admin`
  - **Moderator**: `/moderator`
  - **User**: `/user`

## Deployed Links
### Frontend : https://rbac-front-eight.vercel.app/
### Backend : https://rbac-backend-eight.vercel.app/

## Output Screen Shots
![image](https://github.com/user-attachments/assets/806bb8f1-1dc7-4c70-88ef-7931490b65b7)
![image](https://github.com/user-attachments/assets/0baeb89a-e632-47d5-9c13-581b4b764149)
![image](https://github.com/user-attachments/assets/cb3010c9-05bf-469e-a5f0-931c01f2c945)
![photo_2024-11-30_00-17-01](https://github.com/user-attachments/assets/5fa0e57c-dc69-419c-a46a-1cf67c70fd91)
![image](https://github.com/user-attachments/assets/f6331ced-a8bc-4f59-bec0-62112bd04b7e)
![image](https://github.com/user-attachments/assets/ae0cef36-b80e-4f90-b61f-1de0509250f7)
![image](https://github.com/user-attachments/assets/2992ee0d-7c90-4659-af24-b873b791aae6)
![image](https://github.com/user-attachments/assets/c3fa4f8c-c085-48b5-97f1-8c79379b9c28)







