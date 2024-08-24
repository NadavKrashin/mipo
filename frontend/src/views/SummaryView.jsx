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
    const summaryData = `מצ״ל: ${attendance.length}\nמצ״ן: ${
      attendance.length - absentAttendance.length
    }\nפירוט חסרים:`;

    const filteredData = data.map(({ name, team, absentReason }) => ({
      name,
      team: team.split(" ").reverse().join(" "),
      absentReason,
    }));

    return `${summaryData}\n${filteredData
      .map((row) => Object.values(row).join(", "))
      .join("\n")}`;
  };

  const ShareTableButton = () => {
    const handleShare = async () => {
      const tableDataString = getTableDataAsString(absentAttendance);

      if (navigator.share) {
        try {
          await navigator.share({
            title: "מצב״ה",
            text: tableDataString,
          });
          console.log("Data sent successfully");
        } catch (error) {
          console.log("Error sharing data:", error);
        }
      } else {
        navigator.clipboard.writeText(tableDataString);
        alert(
          "Web Share API is not supported in your browser. Content copied to clipboard."
        );
      }
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
              <ShareTableButton />
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
