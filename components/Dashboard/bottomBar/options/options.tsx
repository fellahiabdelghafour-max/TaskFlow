import { Box, Stack, Tooltip } from "@mui/material";
import { sidebarItems } from "../../../../context/dashboard";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Options() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {sidebarItems.map((I, i) => (
        <Stack
          key={i}
          onClick={() => router.push(I.href)}
          sx={{
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
              height: "4px",
              width: "100%",
              position: "absolute",
              top: -1,
              bgcolor: "white",
              transition: "transform .4s ease",
              transform: pathname === I.href ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              borderRadius: "16px",
            },
          }}
        >
          <Tooltip title={I.name} placement="top">
            <Box
              component={"span"}
              sx={{ color: pathname === I.href ? "#9acbff" : "secondary.main" }}
            >
              {I.icon}
            </Box>
          </Tooltip>
        </Stack>
      ))}
      <Stack
        sx={{
          px: 2,
          alignItems: "center",
          py: 1,
          bgcolor: "#006aff",
          borderRadius: "8px",
          overflow: "hidden",
          transition: "all .4s ease",
          boxShadow: "0px 0px 10px 3px rgba(0, 106, 255, 0.4)",
          "&:hover": {
            bgcolor: "#00ffd554",
            cursor: "pointer",
          },
          position: "relative",
          "&:after": {
            content: '""',
            height: "4px",
            width: "100%",
            position: "absolute",
            top: -1,
            bgcolor: "white",
            transition: "transform .4s ease",
            transformOrigin: "left",
            borderRadius: "16px",
          },
        }}
      >
        <Tooltip title="Add todo" placement="top">
          <Box component={"span"} sx={{ color: "secondary.main" }}>
            +++
          </Box>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
