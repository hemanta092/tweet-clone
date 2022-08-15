import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./SignInSide.css";
import {
  Outlet
} from "react-router-dom";
import MUINavbar from "./MUINavbar"

const theme = createTheme();

export default function SignInSide() {
  return (
      <ThemeProvider theme={theme}>
        <MUINavbar/>
        <Grid container component="main" sx={{ height: '100vh',  pt : 8}}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              
              backgroundImage: "url(https://images.unsplash.com/photo-1611934786226-7caa0c3654a9)",
              // backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Outlet />
          </Grid>
        </Grid>
      </ThemeProvider>
  );
}
