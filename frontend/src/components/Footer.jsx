import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        textAlign: "center",
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} All rights reserved - Nadav Krashin
      </Typography>
    </Box>
  );
};

export default Footer;
