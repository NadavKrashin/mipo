// src/components/TeamFilter.js
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
} from "@mui/material";

const TeamFilter = ({ selectedTeams, setSelectedTeams }) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTeams(value);
  };

  const teams = Array.from({ length: 8 }, (_, i) => `צוות ${i + 1}`);

  return (
    <FormControl sx={{ mb: 2, width: "100%" }}>
      <InputLabel id="team-filter-label">הצגה לפי צוותים</InputLabel>
      <Select
        labelId="team-filter-label"
        multiple
        value={selectedTeams}
        onChange={handleChange}
        input={
          <OutlinedInput id="select-multiple-chip" label="הצגה לפי צוותים" />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {teams.map((team) => (
          <MenuItem key={team} value={team}>
            {team}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TeamFilter;
