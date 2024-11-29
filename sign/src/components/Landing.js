import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h2" mb={4}>
        Welcome to the Role-Based App
      </Typography>
      <Box display="flex" gap={2}>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button variant="outlined" color="primary" onClick={() => navigate('/register')}>
          Register
        </Button>
      </Box>
    </Box> 
  );
};

export default Home;
