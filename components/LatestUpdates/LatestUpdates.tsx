"use client";

import { Box, Card, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WaterfallChartOutlinedIcon from "@mui/icons-material/WaterfallChartOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LUpdates = [
  {
    icon: (
      <CalendarTodayOutlinedIcon
        color="info"
        sx={{ filter: `drop-shadow(0 0 2px #fff)` }}
      />
    ),
    total: `${12}`,
    thisWeek: `${3}`,
    title: "Total Tasks",
    BG: "#007bff7a",
    color: "info",
  },
  {
    icon: (
      <RestartAltIcon
        color="warning"
        sx={{ filter: `drop-shadow(0 0 2px #fff)` }}
      />
    ),
    total: `${5}`,
    thisWeek: `${1}`,
    title: "In Progress",
    BG: "#fe87007a",
    color: "warning",
  },
  {
    icon: (
      <AddTaskOutlinedIcon
        color="success"
        sx={{ filter: `drop-shadow(0 0 2px #fff)` }}
      />
    ),
    total: `${7}`,
    thisWeek: `${2}`,
    title: "Completed",
    BG: "#00ff0d7d",
    color: "success",
  },
  {
    icon: (
      <GroupOutlinedIcon
        color="info"
        sx={{ filter: `drop-shadow(0 0 2px #fff)` }}
      />
    ),
    total: `${4}`,
    thisWeek: `${1}`,
    title: "Active Users",
    BG: "#007bff7a",
    color: "info",
  },
];

const features = [
  {
    icon: (
      <CalendarMonthOutlinedIcon
        color={"info"}
        sx={{ filter: `drop-shadow(0 0 2px #fff)` }}
      />
    ),
    title: "Multiple Views",
    desc: "Switch between Day, Week, Month and Year views to see your tasks in the way that works best for you.",
  },
  {
    icon: (
      <SearchOutlinedIcon
        color={"info"}
        sx={{ filter: `drop-shadow(0 0 2px #fff)` }}
      />
    ),
    title: "Smart Search & Filters",
    desc: "Find tasks quickly by title, tag, or user. Filter by status, priority and more.",
  },
  {
    icon: (
      <GroupOutlinedIcon
        color={"info"}
        sx={{ filter: `drop-shadow(0 0 2px #fff)` }}
      />
    ),
    title: "Team Collaboration",
    desc: "Assign tasks, add comments, and work together in real time.",
  },
  {
    icon: (
      <WaterfallChartOutlinedIcon
        color={"info"}
        sx={{ filter: `drop-shadow(0 0 2px #fff)` }}
      />
    ),
    title: "Analytics & Insights",
    desc: "Track your productivity with simple and clear statistics.",
  },
  {
    icon: (
      <NotificationsOutlinedIcon
        color={"info"}
        sx={{ filter: `drop-shadow(0 0 2px #fff)` }}
      />
    ),
    title: "Notifications & Reminders",
    desc: "Never miss a deadline with smart notifications and alerts.",
  },
  {
    icon: (
      <VerifiedUserOutlinedIcon
        color={"info"}
        sx={{ filter: `drop-shadow(0 0 2px #fff)` }}
      />
    ),
    title: "Secure & Reliable",
    desc: "Your data is safe with industry-standard security and 99.9% uptime.",
  },
];

export default function LatestUpdates() {
  const LuPdatesRef = useRef<Array<HTMLElement | null>>([]);
  const FeaturesRef = useRef<Array<HTMLElement | null>>([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(LuPdatesRef.current, {
        start: "top 99%",
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
          }),
        once: true,
      });

      ScrollTrigger.batch(FeaturesRef.current, {
        start: "top 99%",
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.15,
          }),
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      sx={{
        background: "background.default",
        borderTop: "solid 3px rgba(0, 191, 255, 0.11)",
        borderBottom: "solid 3px rgba(0, 191, 255, 0.11)",
        px:4
      }}
    >
      <Box
        sx={{
          width: "100%",
          px: { xs: 1, sm: 2, md: 4, lg: 8 },
          py: 4,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2,minmax(0px,1fr))",
            sm: "repeat(2,minmax(0px,1fr))",
            md: "repeat(4,minmax(0px,1fr))",
            lg: "repeat(4,minmax(0px,1fr))",
          },
          gap: 1,

          borderBottom: "solid 3px rgba(0, 191, 255, 0.11)",
        }}
      >
        {LUpdates.map((LU, i) => (
          <Box
            key={i}
            ref={(e: HTMLElement | null) => {
              if (e) {
                LuPdatesRef.current[i] = e;
              }
            }}
          >
            <Card sx={{ p: { xs: 2, sm: 2, md: 3, lg: 5 } }}>
              <Box
                sx={{
                  background: LU.BG,
                  borderRadius: "10px",
                  width: 30,
                  height: 30,
                  p: 2.3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {LU.icon}
              </Box>
              <Typography sx={{ fontSize: "20px", color: "text.secondary" }}>
                {LU.total}
              </Typography>
              <Typography className="disabled" sx={{ fontSize: "12px" }}>
                {LU.title}
              </Typography>
              <Typography color={LU.color} sx={{ fontSize: "11px" }}>
                + {LU.thisWeek} this week ↗
              </Typography>
            </Card>
          </Box>
        ))}
      </Box>
      <Box
        id="Features"
        sx={{
          px: { xs: 1, sm: 2, md: 4, lg: 8 },
          py: 4,
          scrollMarginTop: "80px",
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 20, sm: 20, md: 10, lg: 30 },
          }}
        >
          Powerful Features for{" "}
          <Box component={"span"} sx={{ color: "text.primary" }}>
            Better Productivity
          </Box>
        </Typography>
        <Typography
          className="disabled"
          sx={{
            fontSize: { xs: "11px", sm: "15px", md: "13px" },
            width: { xs: "100%", sm: "80%", md: "60%", lg: "40%" },
          }}
        >
          Everything you need to manage your tasks, track your progress, and
          work efficlently — all in one place.
        </Typography>
        <Box
          sx={{
            width: "100%",
            px: { xs: 1, sm: 2, md: 4, lg: 8 },
            py: 4,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2,minmax(0px,1fr))",
              sm: "repeat(2,minmax(0px,1fr))",
              md: "repeat(3,minmax(0px,1fr))",
              lg: "repeat(3,minmax(0px,1fr))",
            },
            gap: 1,
            mb: 2,
          }}
        >
          {features.map((F, i) => (
            <Box
              key={i}
              ref={(e: HTMLElement | null) => {
                if (e) {
                  FeaturesRef.current[i] = e;
                }
              }}
            >
              <Card>
                <Box
                  sx={{
                    background: "#007bff7a",
                    borderRadius: "10px",
                    width: 30,
                    height: 30,
                    p: 2.3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {F.icon}
                </Box>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "11px", sm: "15px", md: "18px" },
                  }}
                >
                  {F.title}
                </Typography>
                <Typography
                  className="disabled"
                  sx={{ fontSize: { xs: "11px", sm: "15px", md: "13px" } }}
                >
                  {F.desc}
                </Typography>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
