import * as React from "react";
import "./index.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Menu from "../Menu";
const theme = createTheme();

export default function Login_UI() {
    const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    LoginUser(data.get("email"), data.get("password"));
  };

  const LoginUser = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5001/login", {
        email: email,
        password: password,
      });
      if (res) {
        localStorage.setItem("accessToken",res?.data?.token)
        getUser(res?.data?.token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async (getToken) => {
    try {
      const res = await axios.get("http://localhost:5001/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      });
      if (res) {
        return navigate('/')

      }
    } catch (error) {}
  };

  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <ul className="wrapper">
            <li className="icon facebook">
              <span className="tooltip">Facebook</span>
              <span>
                <FacebookIcon />
              </span>
            </li>
            <li className="icon google">
              <span className="tooltip">Google</span>
              <span>
                <GoogleIcon />
              </span>
            </li>
          </ul>

          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?
                <Link to="/register">Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
