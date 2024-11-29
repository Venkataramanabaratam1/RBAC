import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from './axiosinstance';

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Alert
} from "@mui/material";

const AddRole = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/auth/logout');
            if (response.status === 200) {
                toast.success("You have logged out successfully!");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                toast.error("Failed to logout. Please try again.");
            }
        } catch (err) {
            toast.error("An error occurred during logout.");
            console.error("Logout error:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/auth/addRole', { name, email, role });
            if (response.status === 201) {
                toast.success("Role added successfully! Temporary password sent to email.");
                navigate('/adminhome');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Error occurred while adding role");
            toast.error("Failed to add role. Please try again.");
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            {/* Navbar */}
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>
                            User Management
                        </Link>
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        component={Link}
                        to="/addRole"
                        sx={{ marginRight: 2 }}
                    >
                        Add Users
                    </Button>
                    <Button variant="contained" color="error" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ mt: 12, p: 3, bgcolor: 'white', boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Role
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                    Create your personal account
                </Typography>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label="Role"
                            required
                        >
                            <MenuItem value="" disabled>
                                Select a role
                            </MenuItem>
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Moderator">Moderator</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, py: 1.5 }}
                    >
                        Register
                    </Button>
                </form>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    <Link to="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
                        Back to Homepage
                    </Link>
                </Typography>
            </Container>
            <ToastContainer />
        </Box>
    );
};

export default AddRole;
