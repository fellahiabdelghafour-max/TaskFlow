import { Skeleton, Stack, Typography } from "@mui/material";

export default function TSkelecton() {
  return (
    <Stack sx={{ width: "100%",p:1 }} spacing={1}>
      <Typography
        sx={{ color: "text.secondary", fontSize: { xs: 15, sm: 15, md: 20 } }}
      >
        Sort By Due date:{" "}
      </Typography>
      <Skeleton width={60} height={30} />
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Stack
            key={i}
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              width: "100%",
              borderRadius: "16px",
              alignItems: "center",
              border: "solid 1px #546b8b1f",
              px:1,
            }}
          >
            <Skeleton sx={{ width: 40, height: 60, borderRadius: "50%",p:0,m:0 }} />
            <Skeleton
              sx={{ width: "20%", height: "30px", borderRadius: "10px",p:0,m:0 }}
            />
            <Skeleton sx={{ width: 40, height: 40, borderRadius: "10px",p:0,m:0 }} />
          </Stack>
        ))}
    </Stack>
  );
}
