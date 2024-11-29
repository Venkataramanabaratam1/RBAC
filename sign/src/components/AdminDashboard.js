import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "./axiosinstance";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
  Stack,
} from "@mui/material";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");

      if (response.status === 200) {
        toast.success("You have logged out successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Failed to logout. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
      console.error("Logout error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Top Bar */}
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/admin"
            sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
          >
            AdminDashboard
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/addRole"
            >
              Add Users
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: 4, textAlign: "center", bgcolor: "white" }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to AdminDashboard!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            🎉 Congratulations! to you for successfully login to Admin Home Page! 🎉
          </Typography>
        </Paper>
      </Container>
      <ToastContainer />
    </Box>
  );
}

export default AdminDashboard;
