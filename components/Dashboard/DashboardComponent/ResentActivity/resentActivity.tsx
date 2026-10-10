import { Box, Card, Stack, Typography } from "@mui/material";
import { useDashboardContext } from "../../../../context/dashboard";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import NoResent from "./NoResent/NoResent";
import ResentASkeleton from "./Skeleton/skeleton";
import ResentCard from "./ResentCard/ResentCard";

export default function RecentActivities() {
  const dashboardContext = useDashboardContext();
  if (!dashboardContext) return null;

  const { recentA } = dashboardContext;
  if (!recentA) return <ResentASkeleton />;

  if (recentA?.length === 0) return <NoResent />;

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        bgcolor: "background.paper",
        borderRadius: "10px",
        border: "solid 1px #1f29371f",
      }}
    >
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: "11px", sm: "15px", md: "18px" },
          }}
        >
          Recent Activity
        </Typography>
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            color: "primary.main",
            maxWidth: "100px",
            "&:hover": {
              cursor: "pointer",
              color: "info.main",
              textDecoration: "underline",
            },
          }}
        >
          <Typography>View all</Typography>
          <ArrowForwardOutlinedIcon />
        </Stack>
      </Stack>
      <Stack>
        {recentA?.map((R, i) => (
          <Card
            key={i}
            sx={{ p: 1, border: "solid 1px #607ca21f", boxShadow: "none" }}
          >
            {" "}
            <ResentCard R={R} />
          </Card>
        ))}
      </Stack>
    </Box>
  );
}


