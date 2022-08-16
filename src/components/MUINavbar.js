import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { signoutRequest } from "../features/user/userSlice";
import { Link } from "react-router-dom";

// const drawerWidth = 240;

export default function DrawerAppBar(props) {
  const { isLoggedIn } = useSelector((state) => state.user);

  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signoutRequest({ token }));
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Tweet It
      </Typography>
      <Divider style={{ backgroundColor: "black" }} />
      <List>
        <ListItem disablePadding sx={{ justifyContent: "center" }}>
        <Link
            to="/tweet"
            style={{
              textAlign: "center",
              textDecoration: "none",
              color: "black",
            }}
          >
          <ListItemButton>
            <ListItemText primary="Home" onClick={handleDrawerToggle}/>
          </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding sx={{ justifyContent: "center" }}>
          <Link
            to="/"
            style={{
              textAlign: "center",
              textDecoration: "none",
              color: "black",
            }}
          >
            {isLoggedIn ? (
              <ListItemButton onClick={handleSignOut}>
                <ListItemText primary="Sign Out" onClick={handleDrawerToggle}/>
              </ListItemButton>
            ) : (
              <ListItemButton onClick={handleDrawerToggle}>
                <ListItemText primary="Sign In" onClick={handleDrawerToggle}/>
              </ListItemButton>
            )}
          </Link>
        </ListItem>
      </List>
      <Divider style={{ backgroundColor: "grey" }} variant="middle"/>
      <ListItem disablePadding sx={{ justifyContent: "center" }}>
        <Link
            to="/tweet/my_tweets"
            style={{
              textAlign: "center",
              textDecoration: "none",
              color: "black",
            }}
          >
          <ListItemButton>
            <ListItemText primary="My Tweets" onClick={handleDrawerToggle}/>
          </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding sx={{ justifyContent: "center" }}>
        <Link
            to="/tweet/all_users"
            style={{
              textAlign: "center",
              textDecoration: "none",
              color: "black",
            }}
          >
          <ListItemButton>
            <ListItemText primary="All Users" onClick={handleDrawerToggle}/>
          </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding sx={{ justifyContent: "center" }}>
        <Link
            to="/tweet/search_users"
            style={{
              textAlign: "center",
              textDecoration: "none",
              color: "black",
            }}
          >
          <ListItemButton>
            <ListItemText primary="Search Users" onClick={handleDrawerToggle}/>
          </ListItemButton>
          </Link>
        </ListItem>
      <CloseIcon
         sx={{ color: "grey", position:"absolute", bottom:"15%" }}
        onClick={handleDrawerToggle}
      />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            Tweet It
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            // edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))} */}
            <Link
            to="/tweet"
          >
          <Button sx={{color:"#fff"}}>
            Home
          </Button>
          </Link>
          <Link
            to="/tweet/my_tweets"
            
          >
          <Button sx={{color:"#fff"}}>
          My Tweets
          </Button>
          </Link>
          <Link
            to="/tweet/all_users"
            
          >
          <Button sx={{color:"#fff"}}>
          All Users
          </Button>
          </Link>
          <Link
            to="/tweet/search_users"
            
          >
          <Button sx={{color:"#fff"}}>
          Search User
          </Button>
          </Link>
          <Link
            to="/"
          >
            {isLoggedIn ? (
              <Button onClick={handleSignOut} sx={{color:"#fff"}}>
                Sign Out
              </Button>
            ) : (
              <Button onClick={handleDrawerToggle} sx={{color:"#fff"}}>
                Sign In
              </Button>
            )}
          </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          // container={container}
          // variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "100vw" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
