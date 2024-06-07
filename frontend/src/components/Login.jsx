// src/components/Login.js
import React, { useState } from "react";
import { Box, TextField, Button, Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = ({ attendance, setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = attendance.find(({ name }) => name === username);

      if (user) {
        localStorage.setItem("userId", JSON.stringify(user._id));
        setCurrentUser(user);
        navigate("/");
      } else {
        alert("משתמש לא נמצא");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("אופס... קרתה שגיאה");
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
            dir="rtl"
            {...params}
            label="איך קוראים לך?"
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
        תכניס אותי
      </Button>
    </Box>
  );
};

export default Login;
