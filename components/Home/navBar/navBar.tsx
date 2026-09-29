"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ModeButton from "../MButton/MButton";
import DrawerN from "./Drawer/drawer";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "../../../context/auth";

const options = [
  { title: "Home" },
  { title: "Features" },
  { title: "About" },
  { title: "How it work" },
];
export default function NavBar() {
  const authContext = useAuth();
  const [open, setOpen] = useState(false);
  const [sellected, setSellected] = useState<string>("Home");
  const [blur, setBlur] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (typeof window !== "undefined") {
        setBlur(window.scrollY >= 10);
      }
      onscroll = async () => {
        if (typeof window !== "undefined") {
          setBlur(window.scrollY >= 10);
        }
      };
    }
  }, []);
  if (!authContext) return;

  const { loading, user, logOut } = authContext;

  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: {
          xs: "space-around",
          sm: "space-around",
          md: "space-between",
        },
        alignItems: "center",
        position: "fixed",
        bgcolor: blur ? "#000626f9" : "#00000000",
        borderBottom: blur ? "solid 1px #2b3162cc" : "",
        transition: "all .3s ease",
        top: 0,
        px: 2,
        zIndex: 2,
      }}
    >
      <Link
        href={"/"}
        onClick={() => setSellected("Home")}
        style={{
          textDecoration: "none",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          width={40}
          height={40}
          alt="todo-site-image"
          src={"/images/app_icon.png"}
        />
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: "white",
          }}
        >
          Task
          <Box component={"span"} sx={{ color: "text.primary" }}>
            Flow
          </Box>
        </Typography>
      </Link>

      <Stack
        spacing={2}
        direction={"row"}
        sx={{
          alignItems: "center",
          display: { sm: "none", xs: "none", md: "flex", lg: "flex" },
        }}
      >
        {options.map((option, i) => (
          <Typography
            key={i}
            onClick={() => setSellected(option.title)}
            component={"a"}
            href={`#${option.title}`}
            sx={{
              textDecoration: "none",
              color: "white",
              fontSize: "13px",
              borderBottom:
                sellected === option.title ? "solid #8ccfff 2px" : "",
            }}
            className="option"
          >
            {option.title}
          </Typography>
        ))}
      </Stack>

      <Stack
        spacing={2}
        direction={"row"}
        sx={{
          alignItems: "center",
          display: { sm: "none", xs: "none", md: "flex", lg: "flex" },
        }}
      >
        <ModeButton />

        {loading ? (
          <Button
            loading={loading}
            loadingPosition="start"
            variant="outlined"
            color="secondary"
          >
            loading●●●
          </Button>
        ) : !user ? (
          <>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                redirect("/Auth/login");
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                redirect("/Auth/register");
              }}
            >
              Register
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={logOut}>
            LogOut
          </Button>
        )}
      </Stack>

      <DrawerN
        open={open}
        setOpen={setOpen}
        sellected={sellected}
        setSellected={setSellected}
      />
    </Box>
  );
}
