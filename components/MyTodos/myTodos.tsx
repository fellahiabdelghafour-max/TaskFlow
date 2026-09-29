import { Box, Grid } from "@mui/material";
import Filters from "./Filters/filters";
import Tasks from "./tasks/tasks";

export default function MyTodos() {
  return (
    <Box sx={{ p: 2 ,width:'100%',height:'100T'}}>
      <Grid container spacing={2}>
        <Grid size={3}><Box sx={{height:'100%'}}><Filters /></Box></Grid>
        <Grid size={6}><Box sx={{height:'100%'}}><Tasks/></Box></Grid>
        <Grid size={3}><Box sx={{height:'100%'}}></Box></Grid>
      </Grid>
    </Box>
  );
}
