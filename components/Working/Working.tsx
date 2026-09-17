"use client";
import { Box, Stack, Typography } from "@mui/material";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Working() {
  const elementRef = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(elementRef.current, {
        start: "top 99%",
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 100,
            opacity: 0,
            ease: "power3.out",
            duration: 0.5,
            stagger: 0.2,
          }),
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      id="How it work"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        py: 4,
        px: 8,
        scrollMarginTop: "80px",
        borderBottom: "solid 3px rgba(0, 191, 255, 0.11)",
      }}
    >
      <Typography
        ref={(e: HTMLElement) => {
          if (e) {
            elementRef.current[0] = e;
          }
        }}
        className="special-title"
        sx={{
          color: "#318eff !important",
          fontSize: { xs: "11px", sm: "15px", md: "13px" },
        }}
      >
        HOW IT WORKS
      </Typography>
      <Typography
        ref={(e: HTMLElement) => {
          if (e) {
            elementRef.current[1] = e;
          }
        }}
        sx={{
          color: "text.secondary",
          fontSize: { xs: 20, sm: 20, md: 20, lg: 30 },
        }}
      >
        Get Started in 3 Simple Steps
      </Typography>
      <Typography
        ref={(e: HTMLElement) => {
          if (e) {
            elementRef.current[2] = e;
          }
        }}
        className="disabled"
        sx={{ fontSize: { xs: "11px", sm: "15px", md: "13px" } }}
      >
        Join thousands of users who are already getting more done with TaskFlow.
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={1}
        sx={{
          alignItems: { xs: "", sm: "", md: "center" },
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {[
          {
            title: "Create Your Acount",
            desc: "Sign up in seconds with your email or social account.",
          },
          {
            title: "Add your tasks ",
            desc: "Create, arganize and set priorites for your tasks.",
          },
          {
            title: "Start Getting Things Done",
            desc: "Track your progress and achieve your goals!",
          },
        ].map((S, i) => (
          <Box
            ref={(e: HTMLElement) => {
              if (e) {
                elementRef.current[3 + i] = e;
              }
            }}
            key={i}
            sx={{
              maxWidth: "300px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              position: "relative",
              gap: 1,
              "&:after": {
                content: '""',
                position: "absolute",
                bgcolor: "background.paper",
                left: "-10px",
                height: "60%",
                width: "3px",
                borderRadius: "50%",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30px",
                height: "30px",
                bgcolor: "primary.main",
                borderRadius: "50%",
                color: "white",
              }}
            >
              {i + 1}
            </Box>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: "11px", sm: "15px", md: "18px" },
              }}
            >
              {S.title}
            </Typography>
            <Typography
              className="disabled"
              sx={{ fontSize: { xs: "11px", sm: "15px", md: "13px" } }}
            >
              {S.desc}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
