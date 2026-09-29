"use client";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { useRouter } from "next/navigation";
import DashboardItems from "./options/options";

export default function SideBar() {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        display: { sm: "none", md: "flex" },
        flexDirection: "column",
        gap: 2,
        bgcolor: "#000929",
        py: 2,
        px: 1,
        zIndex: 10,
      }}
    >
      <Stack
        direction={"row"}
        spacing={1}
        onClick={() => router.push("/")}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
          alignItems: "center",
        }}
      >
        <Image
          alt="app_icon"
          src="/images/app_icon.png"
          width={50}
          height={50}
        />
        <Typography
          color="secondary"
          sx={{
            fontSize: { xs: 20, sm: 20, md: 20, lg: 30 },
            display: { xs: "none", sm: "none", md: "none", lg: "flex" },
          }}
        >
          Task
          <Box component={"span"} sx={{ color: "text.primary" }}>
            Flow
          </Box>
        </Typography>
      </Stack>

      <DashboardItems />
    </Box>
  );
}
