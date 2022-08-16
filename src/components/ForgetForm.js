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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { updateForgotUserid, forgotRequest } from "../features/user/userSlice";

export default function ForgetForm() {
  let user = {
    userId: "",
    mobileNo: "",
    dateOfBirth: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const [datevalue, setdateValue] = React.useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const onSubmit = async (data) => {
    const date = new Date(datevalue);
    const month = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    Object.assign(user, data);
    user.dateOfBirth =
      date.getFullYear() + "-" + month[date.getMonth()] + "-" + date.getDate();
    
    
    console.log(user);
    dispatch(updateForgotUserid(user.userId));
    try{
      await dispatch(forgotRequest(user)).unwrap();
      navigate("update");
    }catch(err){
      const variant = "error";
      enqueueSnackbar("User Not Found For The Given Date.", { variant });
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
        Reset Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1, px: 4.5 }}
      >
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
          id="userId"
          error={errors.userId && errors.userId.message.length > 0}
          label="Email Address *"
          name="userId"
          helperText={errors.userId && errors.userId.message}
          autoFocus
          onKeyUp={() => {
            trigger("userId");
          }}
        />
        <TextField
          {...register("mobileNo", {
            required: "Mobile No is Requires",
            pattern: {
              value: /^[0-9]{10,12}$/,
              message: "Enter a valid Number",
            },
          })}
          fullWidth
          name="mobileNo"
          label="Mobile No *"
          type="number"
          id="mobileNo"
          helperText={errors.mobileNo && errors.mobileNo.message}
          error={errors.mobileNo && errors.mobileNo.message.length > 0}
          onKeyUp={() => {
            trigger("mobileNo");
          }}
        />

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
              <TextField sx={{ width: "100%", mt: 1.5 }} {...params} />
            )}
          />
        </LocalizationProvider>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Confirm
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
