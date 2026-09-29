"use client";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sidebarItems, useDashboardContext } from "../../../context/dashboard";
import { usePathname, useRouter } from "next/navigation";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ModeButton from "../../Home/MButton/MButton";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Image from "next/image";
import { useAuth } from "../../../context/auth";

export default function NavBar() {
  const authContext = useAuth();
  const dashboardContext = useDashboardContext();
  const pathname = usePathname();
  const page = sidebarItems.find((I) => pathname === I.href);
  const router = useRouter();

  if (!authContext || !dashboardContext) return;
  const { user } = authContext;
  const { searchV, setSearchV } = dashboardContext;

  return (
    <Stack spacing={2} sx={{ px: 2 }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Stack sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 20, md: 20, lg: 30 },
              color: "text.secondary",
            }}
          >
            {page?.name}
          </Typography>
          <Typography
            className="disabled"
            sx={{ fontSize: { xs: "11px", sm: "13px", md: "15px" } }}
          >
            {page?.description}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          spacing={1}
          onClick={() => router.push("/")}
          sx={{
            display: { xs: "flex", sm: "flex", md: "none" },
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
            sx={{
              fontSize: { xs: 20, sm: 20, md: 20, lg: 30 },
              color: "text.secondary",
            }}
          >
            Task
            <Box component={"span"} sx={{ color: "text.primary" }}>
              Flow
            </Box>
          </Typography>
        </Stack>

        <TextField
          value={searchV}
          onChange={(e) => setSearchV(e.target.value)}
          placeholder="Search tasks..."
          sx={{
            display: { xs: "none", sm: "flex", md: "flex" },
            width:{xs:'100%',sm:'50%',md:'30%',lg:'37%'},
            m:1,
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <Stack
          direction={"row"}
          spacing={1}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <ModeButton />
          <IconButton
            sx={{
              color: "info.main",
              position: "relative",
              "&:after": {
                content: '""',
                width: 5,
                height: 5,
                borderRadius: "50%",
                bgcolor: "red",
                position: "absolute",
                right: 10,
                top: 10,
              },
            }}
          >
            <NotificationsOutlinedIcon />
          </IconButton>
          <Image
            alt="user_image"
            src={`/images/${user?.image ? user.image : "user.png"}`}
            width={40}
            height={40}
          />
          <Stack sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
            <Typography
              sx={{
                fontSize: { xs: "11px", sm: "15px", md: "18px" },
                color: "text.secondary",
              }}
            >
              {user?.username}
            </Typography>
            <Typography
              className="disabled"
              sx={{ fontSize: { xs: "11px", sm: "13px", md: "15px" } }}
            >
              {user?.role}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <TextField
        value={searchV}
        onChange={(e) => setSearchV(e.target.value)}
        fullWidth
        placeholder="Search tasks..."
        sx={{
          display: { xs: "flex", sm: "none", md: "none" },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  );
}
