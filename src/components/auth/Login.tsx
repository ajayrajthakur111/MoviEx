import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useAppDispatch } from "../../store";
import { login } from "../../store/slices/authSlice";

interface LoginForm {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginForm>({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof LoginForm]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {};
    if (!formData.userName.trim()) {
      newErrors.userName = "UserName is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await dispatch(login(formData));
        if (result) {
          navigate("/search");
        } else {
          setErrors({ userName: "Invalid credentials" });
        }
      } catch (error) {
        setErrors({
          userName: "Login failed. Please check your credentials.",
          password: "Login failed. Please check your credentials.",
        });
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          textAlign: "center",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            mb: 3,
            letterSpacing: "1px",
          }}
        >
          Welcome Back 🎬
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Username"
            name="userName"
            autoComplete="username"
            autoFocus
            value={formData.userName}
            onChange={handleInputChange}
            error={!!errors.userName}
            helperText={errors.userName}
            sx={{
              input: { color: "white" },
              label: { color: "rgba(255, 255, 255, 0.6)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "#b1acac" },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{
              input: { color: "white" },
              label: { color: "rgba(255, 255, 255, 0.6)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "#b1acac" },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: "linear-gradient(45deg, #ff4444, #9000ff)",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "12px",
              borderRadius: "8px",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(45deg, #ff8800, #8f44ff)",
                transform: "scale(1.05)",
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
