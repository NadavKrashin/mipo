// src/components/Navbar.js
import { AppBar, Toolbar, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FeedIcon from "@mui/icons-material/Feed";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ onLogout, isAdmin, isMamash }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        {(isAdmin || isMamash) && (
          <>
            <IconButton
              disabled={location.pathname === "/"}
              edge="end"
              color="inherit"
              onClick={() => navigate("/")}
            >
              <ChecklistIcon />
            </IconButton>
            <IconButton
              disabled={location.pathname === "/home-users"}
              edge="end"
              color="inherit"
              onClick={() => navigate("home-users")}
            >
              <HomeIcon />
            </IconButton>
          </>
        )}
        {isAdmin && (
          <>
            <IconButton
              disabled={location.pathname === "/summary"}
              edge="end"
              color="inherit"
              onClick={() => navigate("summary")}
            >
              <FeedIcon />
            </IconButton>
            <IconButton
              disabled={location.pathname === "/manage-mamash"}
              edge="end"
              color="inherit"
              onClick={() => navigate("manage-mamash")}
            >
              <ManageAccountsIcon />
            </IconButton>
          </>
        )}

        <IconButton edge="start" color="inherit" onClick={onLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
