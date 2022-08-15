import React from "react";
import { Outlet } from "react-router-dom";

import pic from "../resources/blank.jpg";
import { useSelector } from "react-redux";
import "./SharedLayout.css";
import MUINavbar from "../components/MUINavbar"
import { Grid } from "@mui/material";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <MUINavbar />
      
      <Grid container  style={{marginTop:"5rem"}}>
        <Grid item className="col col-md-3 d-none d-md-block mx-0 px-0">
          <img src={pic} alt="" className="profileimage" />
          <h1 style={{ textAlign: "center" }}>{user.name}</h1>
        </Grid>
        <Grid item className="col col-xs-12 px-2 col-md-8 mx-0 justify-content-center">
          <Outlet />
        </Grid>
        
        {/* <Grid item  className="col col-lg-3 d-none d-lg-block mx-0 px-3" >
          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
            className="buttonGroup"
          >
            <Link to="/" className="linkTo">
              <Button className="mainButton">All Tweets</Button>
            </Link>
            <Link to="/my_tweets" className="linkTo">
              <Button className="mainButton">My Tweets</Button>
            </Link>
            <Link to="/all_users" className="linkTo">
              <Button className="mainButton">All Users</Button>
            </Link>
            <Link to="/search_users" className="linkTo">
              <Button className="mainButton">Search Users</Button>
            </Link>
          </ButtonGroup>
        </Grid> */}
        
      </Grid>
    </>
  );
};
export default Home;
