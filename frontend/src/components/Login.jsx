// src/components/Login.js
import React, { useState } from "react";
import { Box, TextField, Button, Autocomplete } from "@mui/material";

const Login = ({ attendance, setLocalStorageUser }) => {
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    try {
      const user = attendance.find(({ name }) => name === username);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setLocalStorageUser(user);
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        mx: "auto",
        my: 5,
        direction: "rtl",
      }}
    >
      <Autocomplete
        options={attendance.map((user) => user.name)}
        onInputChange={(event, newInputValue) => {
          setUsername(newInputValue);
        }}
        onChange={(event, newValue) => {
          setUsername(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Username"
            variant="outlined"
            fullWidth
          />
        )}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
