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
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch,useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { updatePassword } from "../features/user/userSlice";

export default function UpdateForm() {
  const [showPass, setShowPass] = useState(false);
  const { forgotUserid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const body = {
      userId: forgotUserid,
      newPassword: data.password,
    };
    
    dispatch(updatePassword(body));
    const variant="success";
    enqueueSnackbar("Password updated successfully", {variant});
    navigate("/");
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
        Update Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1, px: 4.5 }}
      >
        <TextField
          {...register("password", {
            required: "Password is Requires",
            minLength: {
              value: 5,
              message: "Password must contain 5 character",
            },
          })}
          fullWidth
          name="password"
          label="Password *"
          type={showPass ? "text" : "password"}
          id="password"
          helperText={errors.password && errors.password.message}
          error={errors.password && errors.password.message.length>0}
          onKeyUp={() => {
            trigger("password");
          }}
          sx={{ mb: 1.5 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPass(!showPass)}>
                  {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          {...register("conpassword", {
            required: "Confirm Pasword is required",
            validate: {
              conpassword: (value) =>
                value === getValues().password || "Password does not match",
            },
          })}
          fullWidth
          name="conpassword"
          label="Confirm Password *"
          type="password"
          id="conpassword"
          helperText={errors.conpassword && errors.conpassword.message}
          error={errors.conpassword && errors.conpassword.message.length>0}
          onKeyUp={() => {
            trigger("conpassword");
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>

        <Grid container>
          <Grid item xs>
            <Link to="/" variant="body2">
              Sign In
            </Link>
          </Grid>
          <Grid item>
            <Link to="signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 15 }} />
      </Box>
    </Box>
  );
}
