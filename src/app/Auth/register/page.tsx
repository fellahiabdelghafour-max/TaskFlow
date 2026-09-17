"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import Image from "next/image";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState, useEffect, useRef } from "react";
import ModeButton from "../../../../components/MButton/MButton";
import Link from "next/link";

import { useModeContext } from "../../../../context/mode";
import { useAuth } from "../../../../context/authContext";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { mode } = useModeContext();
  const authContext = useAuth();
  const elementRef = useRef<HTMLElement[]>([]);

  async function Register(){
    console.log(upInfo)
     const res = await fetch('/api/auth/register',
        {
            method:'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                username:upInfo.username,
                email: upInfo.email,
                password:upInfo.password
            })
        }
     );

     const data = await res.json();
     console.log(data)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(elementRef.current, {
        start: "top 99%",
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
          }),
        once: true,
      });
    });
    return () => ctx.revert();
  },[mode]);

  if (!authContext) return;
  const { upInfo, setUpInfo } = authContext;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight:'100vh'
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        sx={{
          width: { xs: "100%", sm: "100%", md: "70%" },
          minHeight: { xs: "100vh", sm: "100vh", md: "" },
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: { xs: "", sm: "", md: "16px" },
          justifyContent: { xs: "", sm: "", md: "space-between" },
          border: "solid 1px #57739b7d",
          boxShadow: "0px 0px 10px 2px #9e9e9e68",
        }}
      >
        <Image
          ref={(e: HTMLElement | null) => {
            if (e) {
              elementRef.current[0] = e;
            }
          }}
          alt="boy_image_dark"
          src={`/images/${mode === "dark" ? "boy_image_dark.png" : "boy_image_light.png"}`}
          width={500}
          height={500}
          style={{ width: "50%", height: "auto", maxHeight: 500 }}
        />
        <Stack
          spacing={1}
          sx={{
            bgcolor: {
              xs: "background.paper",
              sm: "background.paper",
              md: "background.default",
            },
            p: 3,
            height: "100%",
            width: { xs: "100%", sm: "100%", md: "50%" },
            borderRadius: "16px",
          }}
        >
          <Stack
            ref={(e: HTMLElement | null) => {
              if (e) {
                elementRef.current[1] = e;
              }
            }}
            direction={"row"}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            {" "}
            <Link href={"/"} style={{ textDecoration: "none" }}>
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ alignItems: "center" }}
              >
                <Image
                  alt="app icon"
                  src={"/images/app_icon.png"}
                  width={40}
                  height={40}
                />
                <Typography sx={{ color: "text.secondary" }}>
                  Task
                  <Box component={"span"} sx={{ color: "text.primary" }}>
                    Flow
                  </Box>
                </Typography>
              </Stack>
            </Link>
            <ModeButton />
          </Stack>
          <Typography
            ref={(e: HTMLElement | null) => {
              if (e) {
                elementRef.current[2] = e;
              }
            }}
            sx={{
              fontSize: { xs: 20, sm: 20, md: 20, lg: 30 },
              color: "text.secondary",
            }}
          >
            Create Your Account
          </Typography>
          <Typography
            ref={(e: HTMLElement | null) => {
              if (e) {
                elementRef.current[3] = e;
              }
            }}
            className="disabled"
            sx={{ fontSize: { xs: "11px", sm: "13px", md: "15px" } }}
          >
            Join TaskFlow and start managing your tasks efficiently.
          </Typography>
          <TextField
            ref={(e: HTMLElement | null) => {
              if (e) {
                elementRef.current[4] = e;
              }
            }}
            value={upInfo.username}
            onChange={(e) => {
              setUpInfo({ ...upInfo, username: e.target.value });
            }}
            label="User Name"
            placeholder="Enter Your Name"
            helperText="At least 4 characters"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlinedIcon color="info" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            ref={(e: HTMLElement | null) => {
              if (e) {
                elementRef.current[5] = e;
              }
            }}
            value={upInfo.email}
            onChange={(e) => {
              setUpInfo({ ...upInfo, email: e.target.value });
            }}
            fullWidth
            label="Email"
            placeholder="You@example.com"
            helperText="A valid email address"
            sx={{}}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon color="info" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            ref={(e: HTMLElement | null) => {
              if (e) {
                elementRef.current[6] = e;
              }
            }}
            value={upInfo.password}
            onChange={(e) => {
              setUpInfo({ ...upInfo, password: e.target.value });
            }}
            fullWidth
            label="Password"
            placeholder="●●●●●●●●●●●●●●"
            helperText="characters with letters, numbers & symbols +8"
            type={showPassword ? "text" : "password"}
            sx={{}}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsOutlinedIcon color="info" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((p) => !p)}>
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon color="info" />
                      ) : (
                        <VisibilityOutlinedIcon color="info" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box
            ref={(e: HTMLElement | null) => {
              if (e) {
                elementRef.current[7] = e;
              }
            }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={Register}
            >
              Create Account
            </Button>
          </Box>

          <Divider
            sx={{ my: 2 }}
            ref={(e: HTMLElement | null) => {
              if (e) {
                elementRef.current[8] = e;
              }
            }}
          >
            <Typography
              sx={{ px: 2, color: "text.secondary", fontSize: "13px" }}
            >
              or continue with Google
            </Typography>
          </Divider>
          <Box
            ref={(e: HTMLElement | null) => {
              if (e) {
                elementRef.current[9] = e;
              }
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                alignItems: "center",
                fontSize: { xs: 15, sm: 15, md: 20, lg: 20 },
                fontWeight: 500,
                color: "text.secondary",
                borderColor: "#364b71",
                bgcolor: "background.paper",
              }}
            >
              <Image
                alt="google_Icon"
                src="/images/google.png"
                height={20}
                width={20}
              />
              Google
            </Button>
          </Box>

          <Typography
            ref={(e: HTMLElement | null) => {
              if (e) {
                elementRef.current[10] = e;
              }
            }}
            className="disabled"
            sx={{ fontSize: { xs: "11px", sm: "13px", md: "13px" } }}
          >
            Already have an account ?{" "}
            <Link href={"/Auth/login"} style={{ textDecoration: "none" }}>
              <Box
                component={"span"}
                sx={{
                  color: "text.primary",
                  "&:hover": {
                    color: "#0084ffae",
                    cursor: "pointer",
                    textDecoration: "underline",
                  },
                }}
              >
                Login
              </Box>
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
