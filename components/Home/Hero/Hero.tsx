"use client";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const subFeatures = [
  {
    title: "Secure Authentication",
    desc: "Your data is protected",
    icon: <VerifiedUserOutlinedIcon color={"info"} />,
  },
  {
    title: "Multi user collaboration",
    desc: "Work together easily",
    icon: <GroupOutlinedIcon color={"info"} />,
  },
  {
    title: "Real-time Update",
    desc: "stay here",
    icon: <ElectricBoltOutlinedIcon color={"info"} />,
  },
  {
    title: "Cross-device Support",
    desc: "Anytime, Anywhere",
    icon: <SupportAgentOutlinedIcon color={"info"} />,
  },
];
export default function Hero() {
  const router = useRouter();
  const elementRef = useRef<HTMLElement[]>([]);
  useEffect(() => {
         gsap.from(elementRef.current,{
            y:100,
            opacity:0,
            duration:1,
            ease:"power3.out",
            stagger: 0.2,
             scrollTrigger:{
                trigger:elementRef.current[0]
             }
         })
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "100dvh", sm: "100dvh", md: "100vh" },
        backgroundImage: {
          xs: "url('images/Hero_phone.png')",
          sm: "url('/images/Hero_tablet.png')",
          md: "url('/images/Hero_md.png')",
          lg: "url('/images/Hero_image.png')",
        },
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflow: "hidden",
        color: "white !important",
      }}
    >
      <Box
        id="Home"
        sx={{
          width: { xs: "100%", sm: "50%", md: "400px", lg: "500px" },
          height: { xs: "85%", sm: "80%", md: "100%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "flex-end", sm: "flex-end", md: "center" },
          alignItems: "flex-start",
          gap: { xs: 2, sm: 2, md: 4, ld: 4 },
          px: 2,
          pb: { xs: 3, sm: 5, md: 0 },
        }}
      >
        <Typography
          ref={(e) => {
            if (e) {
              elementRef.current[0] = e;
            }
          }}
          className="special-title"
          sx={{
            fontSize: { xs: "11px", sm: "13px", md: "15px" },
          }}
        >
          Organize ● Collaborate ● Achieve
        </Typography>
        <Typography
          ref={(e) => {
            if (e) {
              elementRef.current[1] = e;
            }
          }}
          className="title"
          sx={{
            fontSize: { xs: "20px", sm: "40px", md: "30px", lg: 50 },
            fontWeight: 700,
          }}
        >
          Turn Your Plans Into{" "}
          <Box component="span" sx={{ color: "text.primary" }}>
            Real Progress
          </Box>
        </Typography>
        <Typography
          ref={(e) => {
            if (e) {
              elementRef.current[2] = e;
            }
          }}
          sx={{
            fontSize: { xs: "11px", sm: "15px", md: "13px" },
          }}
        >
          TaskFlow is a modern task management platform that helps you stay
          organized, work smarter, and achieve your goals alone or with your
          team
        </Typography>

        <Stack
          ref={(e) => {
            if (e) {
              elementRef.current[3] = e;
            }
          }}
          spacing={1}
          direction={"row"}
          sx={{
            mb: { xs: 2, sm: 2, md: 5, lg: 10 },
            width: "100%",
          }}
        >
          <Button variant="contained" onClick={()=>router.push('/Dashboard')}>
            Get Started Free <EastOutlinedIcon />
          </Button>
          <Button color="secondary" variant="outlined">
            Learn More
          </Button>
        </Stack>
        <Grid
          ref={(e) => {
            if (e) {
              elementRef.current[4] = e;
            }
          }}
          container
          spacing={2}
          sx={{
            width: { xs: "100vw", sm: "100vw", md: "80vw", lg: "55" },
            px: 1,
            justifySelf: "flex-end",
          }}
        >
          {subFeatures.map((SF, i) => (
            <Grid
              key={i}
              size={{ xs: 6, md: 3 }}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "8px",
                minWidth: 0,
              }}
            >
              <Box
                className="icon"
                sx={{ flexShrink: 0, color: "text.primary" }}
              >
                {SF.icon}
              </Box>

              <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "13px", sm: "18px", md: "18px" },
                  }}
                >
                  {SF.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "11px", sm: "15px", md: "15px" },
                    color: "#cccc",
                  }}
                >
                  {SF.desc}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
