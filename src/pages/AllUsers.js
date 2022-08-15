import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/tweet/tweetSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";

const theme = createTheme();

const AllUsers = () => {
  const dispatch = useDispatch();
  const { isLoggedIn ,token } = useSelector((state) => state.user);
  const { allUsers } = useSelector((state) => state.tweet);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);


  const convertTime = (time) => {
    const theDate = new Date(time).toLocaleString();
    const now = new Date().toLocaleString();
    const diffTime = new Date(now) - new Date(theDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMin = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    return diffDays > 0
      ? `${diffDays} Days Ago`
      : diffHours > 0
      ? `${diffHours} Hours Ago`
      : diffMin > 0
      ? `${diffMin} Minutes Ago`
      : `1 Minutes Ago`;
  };

  var colors = [
    "aqua",
    "blanchedalmond",
    "blue",
    "fuchsia",
    "gold",
    "green",
    "lime",
    "coral",
    "navy",
    "olive",
    "orange",
    "mediumpurple",
    "orangered",
    "silver",
    "teal",
    "deepskyblue",
    "yellow",
    "lightsalmon",
    "palegreen",
    "pink",
    "plum",
    "tomato",
    "violet",
    "olivedrab",
    "moccasin",
    "lawngreen",
  ];

  return (
    <ThemeProvider theme={theme}>
      <h1 style={{ textAlign: "center" }}>All Users</h1>
      {allUsers?.map((user) => (
        <List sx={{width: "100%",
             backgroundColor: theme.palette.background.paper,
        }} key={user.userId}>
          <ListItem
            sx={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", wordBreak: "break-word"}}
          >
            <ListItemAvatar>
              <Avatar
                style={{
                  backgroundColor:
                    colors[
                      user.firstName.charAt(0).toUpperCase().charCodeAt(0) -
                        "A".charCodeAt(0)
                    ],
                }}
              >
                {user.firstName.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={user.userId}
              secondary={user.firstName + " " + user.lastName}
            />
            {user.active ? (
              <span style={{color: "green",
              fontWeight: "bold",}}>
                <div className="d-none d-sm-block">Online</div>
                <div className="d-sm-none d-xs-block">
                  {" "}
                  <FiberManualRecordIcon />
                </div>
              </span>
            ) : (
              <span style={{color: "red",
              fontWeight: "bold",}}>
                <div className="d-none d-sm-block">
                  {convertTime(user.lastSeen)}
                </div>
                <div className="d-sm-none d-xs-block">
                  {" "}
                  <FiberManualRecordIcon />
                </div>
              </span>
            )}
          </ListItem>
        </List>
      ))}
    </ThemeProvider>
  );
};

export default AllUsers;
