import { Button, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useDashboardContext } from "../../../../context/dashboard";
import { useAuth } from "../../../../context/auth";

export default function Groups() {
  const dashboardContext = useDashboardContext();
  const authContext = useAuth();
  if (!dashboardContext || !authContext) return null;

  const { GroupInfo } = dashboardContext;
  const { user } = authContext;

  // Loading
  if (!GroupInfo) {
    return (
      <Stack
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 2,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          boxShadow: "0px 0px 10px 1px #1f293799",
        }}
        spacing={1}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: 20, lg: 26 },
              fontWeight: 700,
            }}
          >
            My Groups
          </Typography>

          <Typography
            sx={{
              color: "text.disabled",
              fontSize: 13,
            }}
          >
            View all →
          </Typography>
        </Stack>

        {Array.from({ length: 3 }).map((_, i) => (
          <Stack
            key={i}
            direction="row"
            spacing={2}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Skeleton variant="circular" width={45} height={45} />

              <Stack spacing={0.5}>
                <Skeleton width={100} height={22} />
                <Skeleton width={130} height={18} />
              </Stack>
            </Stack>

            <Skeleton width={80} height={35} />
          </Stack>
        ))}
      </Stack>
    );
  }

  // Empty state
  if (GroupInfo.length === 0) {
    return (
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          minHeight: 300,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 2,
          boxSizing: "border-box",
          boxShadow: "0px 0px 10px 1px #1f293799",
        }}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: 20, lg: 26 },
              fontWeight: 700,
            }}
          >
            My Groups
          </Typography>

          <Typography
            sx={{
              color: "text.disabled",
              fontSize: 13,
            }}
          >
            View all →
          </Typography>
        </Stack>

        <Stack
          sx={{
            flex: 1,
            minHeight: 180,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
          spacing={1}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            {"You haven't joined any group yet."}
          </Typography>

          <Typography
            sx={{
              color: "text.disabled",
              fontSize: 13,
            }}
          >
            Create a group or join an existing one to start collaborating.
          </Typography>
        </Stack>
      </Stack>
    );
  }

  // Groups
  return (
    <Stack
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 2,
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        boxShadow: "0px 0px 10px 1px #1f293799",
      }}
      spacing={1}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 20, lg: 26 },
            fontWeight: 700,
          }}
        >
          My Groups
        </Typography>

        <Typography
          sx={{
            color: "primary.main",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          View all →
        </Typography>
      </Stack>

      <Stack spacing={1}>
        {GroupInfo.map((G) => (
          <Stack
            key={G.id}
            direction="row"
            spacing={2}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 1,
              minWidth: 0,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Group information */}
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Image
                alt={`${G.name} admin`}
                src={G.admin?.image || "/images/user.png"}
                width={45}
                height={45}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />

              <Stack spacing={0.3}>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontSize: { xs: 13, sm: 15 },
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {G.name}
                </Typography>

                <Typography
                  sx={{
                    color: "text.disabled",
                    fontSize: 12,
                  }}
                >
                  {G._count?.members ?? 0} members • {G._count?.todos ?? 0}{" "}
                  tasks
                </Typography>
              </Stack>
            </Stack>

            <Typography>
              {G.adminId === user?.id ? "admin" : "member"}
            </Typography>

            {/* Action */}
            <Button
              variant="outlined"
              size="small"
              sx={{
                flexShrink: 0,
                whiteSpace: "nowrap",
                minWidth: { xs: 90, sm: 120 },
              }}
            >
              View Group
            </Button>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
