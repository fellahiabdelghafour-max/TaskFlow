import { Box, Card, Skeleton, Stack, Typography } from "@mui/material";
import { Status, useDashboardContext } from "../../../../context/dashboard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${Math.floor(diffHours / 24)} days ago`;
}

export default function RecentActivities() {
  const dashboardContext = useDashboardContext();
  if (!dashboardContext) return null;

  const { recentA } = dashboardContext;
  if (!recentA)
    return (
      <Stack
        sx={{
          bgcolor: "background.paper",
          p: 2,
          borderRadius: "10px",
          height: "100%",
          boxShadow: "0px 0px 10px 1px #1f293799",
        }}
      >
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Skeleton sx={{ width: 100, height: 30, borderRadius: "10px" }} />
          <Skeleton sx={{ width: 60, height: 30, borderRadius: "10px" }} />
        </Stack>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Stack
              key={i}
              direction={"row"}
              sx={{ alignItems: "center", px: 2 }}
              spacing={1}
            >
              <Skeleton sx={{ width: 20, height: 30, borderRadius: "100%" }} />
              <Skeleton sx={{ width: 40, height: 60, borderRadius: "50%" }} />
              <Stack>
                <Skeleton
                  sx={{ width: 100, height: 30, borderRadius: "10px" }}
                />
                <Skeleton
                  sx={{ width: 150, height: 30, borderRadius: "10px" }}
                />
              </Stack>
              <Skeleton sx={{ width: 60, height: 30, borderRadius: "10px" }} />
            </Stack>
          ))}
      </Stack>
    );

  if (recentA?.length === 0)
    return (
      <Stack
        sx={{
          minHeight: 300,
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
          p: 2,
          borderRadius: "10px",
          height: "100%",
          boxShadow: "0px 0px 10px 1px #1f293799",
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
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "13px" },
              color: "primary",
            }}
          >
            View all
          </Typography>
        </Stack>
        <Typography
          className="disabled"
          sx={{ fontSize: { xs: 15, sm: 15, md: 20 } }}
        >
          No activities yet !!
        </Typography>
        <Image
          alt="image"
          src="/images/boy_image_light.png"
          width={300}
          height={300}
        />
      </Stack>
    );

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
        boxShadow: "0px 0px 10px 1px #1f293799",
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
        <Typography
          sx={{
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
            color: "primary",
          }}
        >
          View all
        </Typography>
      </Stack>

      {recentA?.map((R, i) => {
        const isOverdue = new Date(R.expiresAt) < new Date();

        return (
          <Card key={i} sx={{ p: 1}}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ alignItems: "center" }}
              >
                <Box
                  sx={{
                    color: isOverdue
                      ? "error.main"
                      : R.status === Status.Completed
                        ? "success.main"
                        : R.status === Status.Pending
                          ? "primary.main"
                          : R.status === Status.In_Progress
                            ? "warning.main"
                            : "white",
                  }}
                >
                  <CheckCircleIcon />
                </Box>
                <Image
                  alt="user_image"
                  src={R.author.image || "/images/user.png"}
                  width={50}
                  height={50}
                />
              </Stack>
              <Stack direction="column">
                <Typography
                  className="disabled"
                  sx={{ fontSize: { xs: "13px", sm: "15px", md: "18px" } }}
                >
                  {R.author.username}
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    className="disabled"
                    sx={{ fontSize: { xs: "11px", sm: "13px", md: "13px" } }}
                  >
                    {R.task}
                  </Typography>
                  <Typography
                    className="special-title"
                    sx={{
                      px: 1,
                      color: "#0077ff !important",
                      fontSize: { xs: "11px", sm: "13px", md: "13px" },
                    }}
                  >
                    {R.group ? R.group.name : "Personal"}
                  </Typography>
                </Stack>
              </Stack>
              <Typography
                className="disabled"
                sx={{ fontSize: { xs: "11px", sm: "13px", md: "13px" } }}
              >
                {timeAgo(R.updatedAt)}
              </Typography>
            </Stack>
          </Card>
        );
      })}
    </Box>
  );
}
