import { useEffect, useMemo, useState } from "react";
import { fetchAttendanceData } from "../api";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Fab,
  Typography,
} from "@mui/material";
import AbsentTable from "../components/Summary/AbsentTable";
import ShareIcon from "@mui/icons-material/Share";

const SummaryView = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const attendance = await fetchAttendanceData();

      setAttendance(attendance);
    };

    fetchData();
  }, []);

  const absentAttendance = useMemo(
    () => attendance.filter(({ present }) => !present),
    [attendance]
  );

  const getTableDataAsString = (data) => {
    const filteredData = data.map(({ name, team, absentReason }) => ({
      name,
      team: team.split(" ").reverse().join(" "),
      absentReason,
    }));

    return filteredData.map((row) => Object.values(row).join(", ")).join("\n");
  };

  const generateWhatsAppLink = (tableData) => {
    const message = encodeURIComponent(tableData);
    return `https://wa.me/?text=${message}`;
  };

  const ShareTableButton = ({ data }) => {
    const handleShare = () => {
      const tableDataString = getTableDataAsString(data);
      const whatsappLink = generateWhatsAppLink(tableDataString);
      window.open(whatsappLink, "_blank");
    };

    return (
      <Fab
        color="primary"
        onClick={handleShare}
        sx={{ position: "relative", left: 0, width: 40, height: 40 }}
      >
        <ShareIcon />
      </Fab>
    );
  };

  return (
    <Container
      dir="rtl"
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {attendance.length ? (
        <Card sx={{ minHeight: "60%", marginTop: "2vh" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              מצב״ה פלוגה ב׳ גדוד ברוש
            </Typography>
            <Typography gutterBottom variant="h6">
              מצ״ל: {attendance.length}
            </Typography>
            <Typography gutterBottom variant="h6">
              מצ״ן: {attendance.length - absentAttendance.length}
            </Typography>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="subtitle1">פירוט:</Typography>
              <ShareTableButton data={absentAttendance} />
            </Box>
            <AbsentTable absentAttendance={absentAttendance} />
          </CardContent>
        </Card>
      ) : (
        <CircularProgress size={80} />
      )}
    </Container>
  );
};

export default SummaryView;
