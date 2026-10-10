import { Skeleton, Stack } from "@mui/material";

export default function ResentASkeleton(){

  return (
      <Stack
        sx={{
          bgcolor: "background.paper",
          p: 2,
          borderRadius: "10px",
          height: "100%",
          border: "solid 1px #1f29371f",
        }}
      >
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Skeleton sx={{ width: 100, height: 30, borderRadius: "10px" }} />
          <Skeleton sx={{ width: 60, height: 30, borderRadius: "10px" }} />
        </Stack>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Stack
              key={i}
              direction={"row"}
              sx={{ alignItems: "center", px: 2 }}
              spacing={1}
            >
              <Skeleton sx={{ width: 20, height: 30, borderRadius: "100%" }} />
              <Skeleton sx={{ width: 40, height: 60, borderRadius: "50%" }} />
              <Stack>
                <Skeleton
                  sx={{ width: 100, height: 30, borderRadius: "10px" }}
                />
                <Skeleton
                  sx={{ width: 150, height: 30, borderRadius: "10px" }}
                />
              </Stack>
              <Skeleton sx={{ width: 60, height: 30, borderRadius: "10px" }} />
            </Stack>
          ))}
      </Stack>
    )
}