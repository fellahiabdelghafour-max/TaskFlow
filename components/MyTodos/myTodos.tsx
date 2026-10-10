import React from "react";
import { Box, Grid } from "@mui/material";
import Filters from "./Filters/filters";
import Tasks from "./tasks/tasks";
import Progress from "./progress/progress";

export default function MyTodos() {

  return (
    <Box sx={{ p: 2, width: "100%", height: "100%" }}>
      <Grid container spacing={2}>
        <Grid
          size={{ xs: 12, sm: 12, md: 3, lg: 3 }}
          sx={{ order: { md: 1, xs: 3 } }}
        >
          <Filters />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 9, lg: 6 }}
          sx={{ order: { md: 2, xs: 2 } }}
        >
          <Tasks />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 12, lg: 3 }}
          sx={{ order: { md: 3, xs: 1 } }}
        >
          <Progress />
        </Grid>
      </Grid>
    </Box>
  );
}
