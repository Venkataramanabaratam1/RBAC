import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosinstance';
import { AuthContext } from './authContext';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(null);       // null = untouched, true = valid, false = invalid
    const [passwordValid, setPasswordValid] = useState(null);
    const navigate = useNavigate();

    const { login: loginContext } = useContext(AuthContext);

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(value);
        setEmailValid(emailRegex.test(value));
    };

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordValid(value.length >= 8 && value.length <= 14); // Password criteria
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!emailValid) {
            toast.error('Please enter a valid email address');
            return;
        }
    
        if (!passwordValid) {
            toast.error('Password must be between 8 and 14 characters');
            return;
        }
    
        try {
            const response = await axiosInstance.post('/auth/login', { email, password },{withCredentials:true});
    
            toast.success('Login successful');
            const { token, role } = response.data;
    
            if (!token || !role) {
                throw new Error('Invalid response from the server');
            }
    
            // Store token in localStorage
            localStorage.setItem('token', token);

            loginContext({ email, role });
    
            // Redirect based on role
            if (role === 'User') {
                setTimeout(() => {
                    navigate('/user'); 
                }, 3000);
            } else if (role === 'Moderator') {
                setTimeout(() => {
                    navigate('/moderator'); 
                }, 3000);
            } else if (role === 'Admin') {
                setTimeout(() => {
                    navigate('/admin'); 
                }, 3000);
            } else {
                toast.error('Invalid role');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data.message || 'Login failed');
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };    
    
    return (
        <Grid 
            container 
            justifyContent="center" 
            alignItems="center" 
            style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}
        >
            <Paper elevation={3} style={{ padding: '2rem', maxWidth: '400px', width: '100%' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Sign in to us
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Email address"
                            variant="outlined"
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}
                            error={emailValid === false}
                            helperText={emailValid === false ? 'Invalid email format' : ''}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => validatePassword(e.target.value)}
                            error={passwordValid === false}
                            helperText={passwordValid === false ? 'Password must be 8-14 characters long' : ''}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="body2">
                            <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
                                Forgot password?
                            </Link>
                        </Typography>
                    </Box>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                </form>
                <Box mt={2} textAlign="center">
                    <Typography variant="body2">
                        New to here ? <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>Create an account</Link>.
                    </Typography>
                    <Typography variant="body2">
                        <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>Back to Homepage</Link>.
                    </Typography>
                </Box>
            </Paper>
            <ToastContainer />
        </Grid>
    );
};

export default Login;
