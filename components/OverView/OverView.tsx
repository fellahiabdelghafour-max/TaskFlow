"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function OverView() {
  const elementRef = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(elementRef.current, {
        start: "top 99%",
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: "power3.out",
          }),
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      id="About"
      sx={{
        scrollMarginTop: "80px",
        bgcolor: "#001127",
        px: 8,
        py:4,
        width: "100%",
        borderBottom: "solid 3px rgba(0, 191, 255, 0.11)",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        sx={{ width: "100%" }}
      >
        <Stack spacing={2}>
          <Typography
            ref={(e) => {
              if (e) {
                elementRef.current[0] = e;
              }
            }}
            className="special-title"
            sx={{
              fontSize: { xs: "11px", sm: "15px", md: "13px" },
              color: "white",
              maxWidth: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            REAL-TIME OVERVIEW
          </Typography>
          <Typography
            ref={(e) => {
              if (e) {
                elementRef.current[1] = e;
              }
            }}
            sx={{
              fontSize: { xs: 20, sm: 20, md: 20, lg: 30 },
              color: "white",
            }}
          >
            Your Tasks, All in One Place
          </Typography>
          <Typography
            ref={(e) => {
              if (e) {
                elementRef.current[2] = e;
              }
            }}
            className="disabled"
            sx={{ fontSize: { xs: "11px", sm: "15px", md: "13px" } }}
          >
            Get a comlete view of your tasks, track progress, manage priorites
            and stay on top of deadlines with our intuitive dashboard.
          </Typography>

          {[
            "Clean and organized interface",
            "Quick actions and easy navigation",
            "Works seamlessly on all devices",
          ].map((F, i) => (
            <Typography
              ref={(e) => {
                if (e) {
                  elementRef.current[3 + i] = e;
                }
              }}
              key={i}
              className="disabled"
              sx={{
                fontSize: { xs: "11px", sm: "15px", md: "13px" },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                component={"span"}
                sx={{
                  borderRadius: "50%",
                  bgcolor: "#00aeff7a",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckIcon sx={{color:'#b7eeff',filter:`drop-shadow(0 0 3px #ffffff)`}} />
              </Box>
              {F}
            </Typography>
          ))}
          <Box
            ref={(e:HTMLElement) => {
              if (e) {
                elementRef.current[6] = e;
              }
            }}
          >
            <Button color="primary" variant="contained">
              Explore Dashboard <ArrowForwardIcon />
            </Button>
          </Box>
        </Stack>
        <Box
          sx={{ position: "relative", width: "100%" }}
          ref={(e: HTMLElement | null) => {
            if (e) {
              elementRef.current[7] = e;
            }
          }}
        >
          <Image
            alt="dashboard Image"
            src={"/images/Dashboard_Image.png"}
            width={1903}
            height={826}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}
