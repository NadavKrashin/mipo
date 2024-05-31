// src/components/SearchBar.js
import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextField
      label="חיפוש לפי שם"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchBar;
