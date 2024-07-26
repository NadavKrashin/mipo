import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
} from "@mui/material";
import { useMemo } from "react";

const TeamFilter = ({ selectedTeams, setSelectedTeams, attendance }) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTeams(value);
  };

  const teams = useMemo(
    () => [...new Set(attendance.map((user) => user.team))],
    [attendance]
  );

  return (
    <FormControl sx={{ mb: 2, width: "100%", pl: 0.5 }}>
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
