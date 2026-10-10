import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function NoResent(){

    return (
      <Stack
        sx={{
          minHeight: 300,
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
          p: 2,
          borderRadius: "10px",
          height: "100%",
          border: "solid 1px #1f29371f",
        }}
      >
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "11px", sm: "15px", md: "18px" },
            }}
          >
            Recent Activity
          </Typography>
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "13px" },
            }}
          >
            View all
          </Typography>
        </Stack>
        <Typography
          className="disabled"
          sx={{ fontSize: { xs: 15, sm: 15, md: 20 } }}
        >
          No activities yet !!
        </Typography>
        <Image
          alt="image"
          src="/images/boy_image_light.png"
          width={300}
          height={300}
        />
      </Stack>
    )
}