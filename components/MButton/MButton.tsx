"use client";
import { Box, IconButton } from "@mui/material";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useModeContext } from "../../context/mode";

export default function ModeButton() {
  const { mode, switchMode } = useModeContext();

  return (
    <Box
      sx={{
        width: "60px",
        height: "30px",
        position: "relative",
        borderRadius: "16px",
        bgcolor: "#405aea00",
       border:mode ==='dark'?'1px white solid':'1px #008cff solid'
      }}
    >
      <IconButton
        onClick={switchMode}
        sx={{
          position: "absolute",
          top: 0,
          left: "1px",
          transform:
            mode === "light"
              ? "translateX(0) rotate(0deg)"
              : "translateX(29px) rotate(180deg)",
          transition: "transform 0.4s ease",
          width: "29px",
          height: "29px",
          borderRadius: "50%",
          color: "white",
          bgcolor:'#5b62c92d',

        }}
      >
        {mode === "dark" ? (
          <Brightness7Icon  color={'info'}/>
        ) : (
          <BedtimeIcon color={'info'}/>
        )}
      </IconButton>
    </Box>
  );
}
