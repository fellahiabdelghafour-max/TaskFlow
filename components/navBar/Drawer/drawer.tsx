import {
  Box,
  Button,
  Drawer,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ModeButton from "../../MButton/MButton";
import Image from "next/image";

import HomeIcon from "@mui/icons-material/Home";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InfoIcon from "@mui/icons-material/Info";
import { redirect } from "next/navigation";

export default function DrawerN({
  open,
  setOpen,
  sellected,
  setSellected,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
  sellected: string;
  setSellected: (sellected: string) => void;
}) {
  const options = [
    {
      title: "Home",
      icon: (
        <HomeIcon
          sx={{
            borderRadius: "4px",
            color: sellected === "Home" ? "primary.main" : "#00c8ff",
          }}
        />
      ),
    },
    {
      title: "Features",
      icon: (
        <AutoAwesomeIcon
          sx={{
            borderRadius: "4px",
            color: sellected === "Features" ? "primary.main" : "#00c8ff",
          }}
        />
      ),
    },
    {
      title: "About",
      icon: (
        <CreditCardIcon
          sx={{
            borderRadius: "4px",
            color: sellected === "About" ? "primary.main" : "#00c8ff",
          }}
        />
      ),
    },
    {
      title: "How it work",
      icon: (
        <InfoIcon
          sx={{
            borderRadius: "4px",
            color: sellected === "How it work" ? "primary.main" : "#00c8ff",
          }}
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: { sm: "", xs: "", md: "none", lg: "none" },
      }}
    >
      <Box
        className="icon"
        onClick={() => setOpen(true)}
        sx={{
          borderRadius: "10px",
          transition: "all .3s ease",
          "&:hover": {
            cursor: "pointer",
          },
          display: open ? "none" : "",
          color: "primary.main",
        }}
      >
        <MenuOutlinedIcon />
      </Box>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <ListItem
          sx={{
            bgcolor: "#00437d",
            height: "100vh",
            minWidth: "320px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            py: 2,
            position: "relative",
            backgroundImage: "url(/images/drawerBG.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            "& .MuiDrawer-paper": {
              width: 260,
              boxShadow: "-4px 0 20px rgba(0,0,0,0.3)",
            },
          }}
        >
          <Box
            className="icon"
            onClick={() => setOpen(false)}
            sx={{
              borderRadius: "10px",
              "&:hover": {
                cursor: "pointer",
              },
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <CloseOutlinedIcon color={"primary"} />
          </Box>
          <Stack
            direction={"row"}
            spacing={1}
            sx={{ alignItems: "center", mb: 3 }}
          >
            <Image
              alt="drawerIcon"
              src={"/images/drawerIcon.png"}
              width={60}
              height={60}
            />
            <Stack>
              <Typography sx={{ fontSize: "18px" }}>
                Task
                <Box component={"span"} sx={{ color: "text.primary" }}>
                  Flow
                </Box>
              </Typography>
              <Typography className="disabled" sx={{ fontSize: "13px" }}>
                Work Smarter, Live Better
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={1} direction={"column"} sx={{ width: "100%" }}>
            {options.map((option, i) => (
              <Typography
                key={i}
                component={"a"}
                href={`#${option.title}`}
                onClick={() => {
                  setOpen(false);
                  setSellected(option.title);
                }}
                sx={{
                  width: "100%",
                  textAlign: "left",
                  height: "40px",
                  background: sellected === option.title ? "#0166bf" : "",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 2,
                  boxShadow:
                    sellected === option.title ? "0px 0px 7px #e9e9e9" : "",
                  border:
                    sellected === option.title ? "solid 0.5px #0044ff" : "",
                  position: "relative",
                  overflow: "hidden",
                  color:'white',
                  "&:after": {
                    content: '""',
                    width: "5px",
                    height: "80%",
                    bgcolor: "white",
                    position: "absolute",
                    left: -0.5,
                    borderRadius: "3px",
                    display: sellected === option.title ? "block" : "none",
                  },
                }}
              >
                <Box>{option.icon}</Box>

                {option.title}
              </Typography>
            ))}
          </Stack>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{
              width: "90%",
              alignItems: "center",
              borderTop: "solid 2px #7272bc72",
              borderRadius: "2px",
              py: 2,
              mt: 4,
            }}
          >
            <ModeButton />
            <Button variant="outlined" color="secondary" fullWidth onClick={()=>{redirect('/Auth/login')}} sx={{bgcolor:'#0e1b55c1'}}>
              Login
            </Button>
            <Button variant="contained" fullWidth onClick={()=>{redirect('/Auth/register')}}>
              Register
            </Button>
          </Stack>
        </ListItem>
      </Drawer>
    </Box>
  );
}
