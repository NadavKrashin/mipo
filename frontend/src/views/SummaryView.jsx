import React, { useEffect, useMemo, useState } from "react";
import { fetchAttendanceData } from "../api";
import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import AbsentTable from "../components/Summary/AbsentTable";

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
            <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold", textAlign:"center"}}>
              מצבה השלמה טכנולוגית 014
            </Typography>
            <Typography gutterBottom variant="h6">
              מצ״ל: {attendance.length}
            </Typography>
            <Typography gutterBottom variant="h6">
              מצ״ן: {attendance.length - absentAttendance.length}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              פירוט:
            </Typography>

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
