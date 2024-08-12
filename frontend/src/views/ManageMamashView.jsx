import {
  Box,
  List,
  ListItem,
  ListItemText,
  Switch,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { updateUserMamashStatus, updateUserAdminStatus } from "../api";
import AvatarItem from "../components/Attendance/AvatarItem";

const ManageMamashView = ({ attendance, setAttendance, isSegel }) => {
  const handleMamashToggle = async (userId) => {
    try {
      const updatedAttendance = await updateUserMamashStatus(userId);
      setAttendance(updatedAttendance);
    } catch (error) {
      console.error("Error updating Mamash status:", error);
    }
  };

  const handleAdminToggle = async (userId) => {
    try {
      const updatedAttendance = await updateUserAdminStatus(userId);
      setAttendance(updatedAttendance);
    } catch (error) {
      console.error("Error updating Admin status:", error);
    }
  };

  const groupedUsers = attendance.reduce((groups, user) => {
    if (!groups[user.team]) {
      groups[user.team] = [];
    }
    groups[user.team].push(user);
    return groups;
  }, {});

  const HandleSwitch = ({ title, value, onChange }) => (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography>{title}</Typography>
      <Switch checked={value} onChange={onChange} />
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        bgcolor: "background.paper",
        mx: "auto",
        my: 2,
      }}
      dir="rtl"
    >
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "5px" }}
        variant="h5"
      >
        ניהול הרשאות צוערים
      </Typography>

      {Object.keys(groupedUsers).map((team) => (
        <Box key={team} sx={{ mb: 2 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ direction: "rtl" }}>
                {team}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {groupedUsers[team].map((user) => (
                  <ListItem
                    key={user._id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <AvatarItem member={user} />
                    <ListItemText primary={user.name} />
                    <HandleSwitch
                      title={"ממ״ש"}
                      value={user.isMamash}
                      onChange={() => handleMamashToggle(user._id)}
                    />
                    {isSegel && (
                      <HandleSwitch
                        title={"ס.מ״פ"}
                        value={user.isAdmin}
                        onChange={() => handleAdminToggle(user._id)}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default ManageMamashView;
