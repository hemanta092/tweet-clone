import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signupRequest } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const theme = createTheme();

export default function SignUp() {
  let user = {
    firstName: "",
    lastName: "",
    userId: "",
    password: "",
    mobileNo: "",
    gender: "",
    dateOfBirth: "",
  };

  const [datevalue, setdateValue] = React.useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = async (event) => {
    const date = new Date(datevalue);
    const month = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    Object.assign(user, event);
    user.dateOfBirth =
      date.getFullYear() + "-" + month[date.getMonth()] + "-" + date.getDate();
    console.log(user);
    try {
      await dispatch(
        signupRequest({
          body: user,
        })
      ).unwrap();
      const variant = "success";
      enqueueSnackbar("Sign Up Successfully!", { variant });
      navigate("/tweet");
    } catch (err) {
      const variant = "error";
      enqueueSnackbar("UserID Already Exist", { variant });
    }

    reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            pt: 2,
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName", {
                    required: "First Name is Requires",
                    pattern: {
                      value: /^[a-zA-Z]{2,}$/,
                      message: "Enter a valid Name",
                    },
                  })}
                  name="firstName"
                  required
                  helperText={errors.firstName && errors.firstName.message}
                  error={
                    errors.firstName && errors.firstName.message.length > 0
                  }
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onKeyUp={() => {
                    trigger("firstName");
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName", {
                    required: "Last Name is Requires",
                    pattern: {
                      value: /^[a-zA-Z]{2,}$/,
                      message: "Enter a valid Surname",
                    },
                  })}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  helperText={errors.lastName && errors.lastName.message}
                  error={errors.lastName && errors.lastName.message.length > 0}
                  onKeyUp={() => {
                    trigger("lastName");
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("userId", {
                    required: "User ID is Requires",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i,
                      message: "Enter a valid Email",
                    },
                  })}
                  required
                  fullWidth
                  id="userId"
                  label="Email Address"
                  name="userId"
                  helperText={errors.userId && errors.userId.message}
                  error={errors.userId && errors.userId.message.length > 0}
                  onKeyUp={() => {
                    trigger("userId");
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", {
                    required: "Password is Requires",
                    minLength: {
                      value: 5,
                      message: "Password must contain 5 character",
                    },
                  })}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText={errors.password && errors.password.message}
                  error={errors.password && errors.password.message.length > 0}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("mobileNo", {
                    required: "Mobile No is Requires",
                    pattern: {
                      value: /^[0-9]{10,12}$/,
                      message: "Enter a valid Number",
                    },
                  })}
                  required
                  fullWidth
                  name="mobileNo"
                  label="Mobile No"
                  type="number"
                  id="mobileNo"
                  helperText={errors.mobileNo && errors.mobileNo.message}
                  error={errors.mobileNo && errors.mobileNo.message.length > 0}
                  onKeyUp={() => {
                    trigger("mobileNo");
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  {...register("gender", {
                    required: "Select a gender",
                  })}
                  select
                  fullWidth
                  variant="outlined"
                  label="Gender"
                  name="gender"
                  defaultValue="Male"
                  onKeyUp={() => {
                    trigger("gender");
                  }}
                >
                  <MenuItem key="male" value="Male">
                    Male
                  </MenuItem>
                  <MenuItem key="female" value="Female">
                    Female
                  </MenuItem>
                  <MenuItem key="other" value="Other">
                    Others
                  </MenuItem>
                </TextField>
                {errors.gender && (
                  <span className="error-message">{errors.gender.message}</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disableFuture
                    required
                    label="Date of Birth"
                    openTo="day"
                    name="dateofbirth"
                    views={["year", "month", "day"]}
                    value={datevalue}
                    onChange={(newValue) => {
                      setdateValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField style={{ width: "100%" }} {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
