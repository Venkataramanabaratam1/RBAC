import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './axiosinstance';
import {
    Box,
    Typography,
    TextField,
    Checkbox,
    Button,
    FormControlLabel,
    Container,
    Paper,
} from '@mui/material';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState({ name: false, email: false, password: false });
    const navigate = useNavigate();

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;

    const handleValidation = (field, value) => {
        if (field === 'name') setValidation((prev) => ({ ...prev, name: nameRegex.test(value) }));
        if (field === 'email') setValidation((prev) => ({ ...prev, email: emailRegex.test(value) }));
        if (field === 'password') setValidation((prev) => ({ ...prev, password: passwordRegex.test(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validation.name || !validation.email || !validation.password) {
            toast.error('Please correct the highlighted fields before submitting');
            return;
        }

        try {
            const response = await axiosInstance.post('/auth/register', { name, email, password });
            toast.success('Registration successful');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            if (err.response && err.response.data.errors) {
                err.response.data.errors.forEach((error) => {
                    toast.error(error.msg || error);
                });
            } else if (err.response && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <ToastContainer />
            <Paper elevation={3} sx={{ padding: 4, marginY: 8 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Join us
                </Typography>
                <Typography variant="subtitle1" gutterBottom align="center">
                    Create your personal account
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        marginTop: 2,
                    }}
                >
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            handleValidation('name', e.target.value);
                        }}
                        error={!validation.name && name.length > 0}
                        helperText={!validation.name && name.length > 0 ? 'Name must only contain letters' : ''}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            handleValidation('email', e.target.value);
                        }}
                        error={!validation.email && email.length > 0}
                        helperText={!validation.email && email.length > 0 ? 'Enter a valid email address' : ''}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            handleValidation('password', e.target.value);
                        }}
                        error={!validation.password && password.length > 0}
                        helperText={
                            !validation.password && password.length > 0
                                ? 'Password must be 8-14 characters, include an uppercase letter, a number, and a special character'
                                : ''
                        }
                        required
                        fullWidth
                    />
                    <FormControlLabel
                        control={<Checkbox required />}
                        label={
                            <>
                                I agree to all statements in{' '}
                                <a
                                    href="https://google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'underline', color: '#1976d2' }}
                                >
                                    terms of service
                                </a>
                                .
                            </>
                        }
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ marginTop: 2 }}
                        fullWidth
                    >
                        Register
                    </Button>
                </Box>
                <Typography variant="body2" align="center" sx={{ marginTop: 3 }}>
                    <Link to="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
                        Back to Homepage
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Register;
