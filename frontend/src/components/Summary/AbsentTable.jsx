import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useRef } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AbsentTable = ({ absentAttendance }) => {
  const tableRef = useRef(null);

  return (
    <TableContainer sx={{ marginTop: "15px" }} component={Paper}>
      <Table ref={tableRef}>
        <TableHead>
          <TableRow>
            <StyledTableCell>שם</StyledTableCell>
            <StyledTableCell>צוות</StyledTableCell>
            <StyledTableCell>סיבה</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {absentAttendance.map((user) => (
            <StyledTableRow
              key={user._id}
              sx={{
                direction: "rtl",
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <TableCell>{user.team}</TableCell>
              <StyledTableCell>
                {user.absentReason || "לא הוזנה סיבה"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AbsentTable;
