// src/components/Navbar.js
import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout, isAdmin, isMamash }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        {(isAdmin || isMamash) && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => navigate("/")}
            >
              <ChecklistIcon />
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => navigate("home-users")}
            >
              <HomeIcon />
            </IconButton>
          </>
        )}
        {isAdmin && (
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => navigate("manage-mamash")}
          >
            <ManageAccountsIcon />
          </IconButton>
        )}
        <IconButton edge="start" color="inherit" onClick={onLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
