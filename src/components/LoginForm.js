import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import "./SignInSide.css";
import Copyright from "./Copyright";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRequest } from "../features/user/userSlice";
import { useSnackbar } from "notistack";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { enqueueSnackbar } = useSnackbar();



  const onSubmit = async(data) => {
    try{
      await dispatch(loginRequest(data)).unwrap();
      navigate("/");
    }
    catch(err){
      const variant = "error";
      enqueueSnackbar("Invalid Username or Password!", { variant });
    }
    reset();
  };
  return (
    <Box
      sx={{
        pt: 6,
        mx: 4,
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
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <TextField
          {...register("userId", {
            required: "Email is Requires",
            pattern: {
              value: /^[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i,
              message: "Enter a valid Email",
            },
          })}
          margin="normal"
          fullWidth
          error={errors.email && errors.email.message.length >0}
          id="userId"
          label="Email Address *"
          name="userId"
          helperText={errors.email && errors.email.message}
          autoFocus
          onKeyUp={() => {
            trigger("userId");
          }}
        />
        <TextField
          margin="normal"
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 5,
              message: "Password must contain atleas 5 character",
            },
          })}
          fullWidth
          error={errors.password && errors.password.message.length>0}
          name="password"
          label="Password *"
          type="password"
          id="password"
          helperText={errors.password && errors.password.message}
          onKeyUp={() => {
            trigger("password");
          }}
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
            <Link to="/login/forgot" variant="body2">
              Forgot password
            </Link>
          </Grid>
          <Grid item>
            <Link to="/login/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 15 }} />
      </Box>
    </Box>
  );
}