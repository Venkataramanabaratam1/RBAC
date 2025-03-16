import React,{useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Landing';
import AdminDashboard from './components/AdminDashboard';
import ModeratorDashboard from './components/ModeratorDashboard';
import UserDashboard from './components/UserDashboard';
import AddRole from './components/addRole';
import ProtectedRoute from './components/protectedRoutes';
import {AuthContext} from './components/authContext';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         
        <Route
              path="/user"
              element={
                <ProtectedRoute>
                  {user?.role === 'User' ? <UserDashboard /> : <div>Access Denied</div>}
                </ProtectedRoute>
              }
            />
            <Route
              path="/moderator"
              element={
                <ProtectedRoute>
                  {user?.role === 'Moderator' || user?.role === 'Admin' ? ( //for different roles
                    <ModeratorDashboard />
                  ) : (
                    <div>Access Denied</div>
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  {user?.role === 'Admin' ? <AdminDashboard /> : <div>Access Denied</div>}
                </ProtectedRoute>
              }
            />
            <Route
              path="/addRole"
              element={
                <ProtectedRoute>
                  {user?.role === 'Admin' ? <AddRole /> : <div>Access Denied</div>}
                </ProtectedRoute>
              }
            />
      </Routes>
    </Router>
  );
}

export default App;
