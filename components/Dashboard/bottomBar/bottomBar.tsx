"use client";
import { Box } from "@mui/material";
import Options from "./options/options";

export default function BottomBar() {
  return (
    <Box
      sx={{
        width: "100vw",
        display: { xs: "flex", sm: "flex", md: "none" },
        position: "fixed",
        bottom: 0,
        px: 0.5,
        bgcolor: "#000929",
        py:0.5
      }}
    >
      <Options />
    </Box>
  );
}
