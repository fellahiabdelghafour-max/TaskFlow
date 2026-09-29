"use client";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { sidebarItems } from "../../../../context/dashboard";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardItems() {
  const router = useRouter();

  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      {sidebarItems.map((I, i) => (
        <Stack
          key={i}
          direction={"row"}
          spacing={2}
          onClick={() => router.push(I.href)}
          sx={{
            width: "100%",
            px: 2,
            alignItems: "center",
            py: 1,
            bgcolor: pathname === I.href ? "#006aff" : "",
            borderRadius: "8px",
            overflow: "hidden",
            transition: "all .4s ease",
            boxShadow:
              pathname === I.href
                ? "0px 0px 10px 3px rgba(0, 106, 255, 0.4)"
                : "none",
            "&:hover": {
              bgcolor: pathname === I.href ? "" : "#00ffd554",
              cursor: "pointer",
            },
            position: "relative",
            "&:after": {
              content: '""',
              height: "80%",
              width: "4px",
              position: "absolute",
              left: -0.5,
              top: "10%",
              bgcolor: "white",
              transition: "transform .4s ease",
              transform: pathname === I.href ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "top",
              borderRadius: "16px",
            },
          }}
        >
          <Tooltip title={I.name} placement="right">
            <Box
              sx={{ color: pathname === I.href ? "#9acbff" : "secondary.main" }}
            >
              {I.icon}
            </Box>
          </Tooltip>
          <Typography
            color="secondary"
            sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
          >
            {I.name}
          </Typography>
        </Stack>
      ))}
    </>
  );
}
