import { Box, Stack, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useDashboardContext } from "../../../../context/dashboard";

export default function PriorityDonut() {
  const dashboardContext = useDashboardContext();
  if (!dashboardContext) return;

  const { TBP } = dashboardContext;

  if (!TBP) return;

  const totalTasks = TBP[0].value + TBP[1].value + TBP[2].value;
  return (
    <Stack
      sx={{
        bgcolor: "background.paper",
        width: "100%",
        height:'100%',
        p: 2,
        borderRadius: "10px",
                boxShadow:'0px 0px 10px 1px #1f293799',

      }}
    >
      <Typography sx={{ color: "text.secondary" }}>
        Tasks By Priority.
      </Typography>
      <Typography color="warning" sx={{display:(TBP[0].value + TBP[1].value + TBP[2].value) === 0 ? 'flex' :'none'}}>No tasks yet.</Typography>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={TBP}
            dataKey="value"
            innerRadius={70} // ← هذا ما يجعلها "دونات" بدل دائرة مصمتة
            outerRadius={100}
            paddingAngle={2} // فراغ صغير بين كل قطاع
          >
            {TBP.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Typography
        sx={{ fontSize: { xs: 15, sm: 15, md: 20 }, color: "text.secondary" }}
      >
        Total Tasks: {totalTasks}
      </Typography>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Stack sx={{ width: "100%" }}>
          {TBP.map((D, i) => (
            <Stack
              direction={"row"}
              key={i}
              sx={{ justifyContent: "space-between", width: "100%" }}
            >
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ alignItems: "center" }}
              >
                <Box
                  sx={{
                    bgcolor: D.color,
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: 11, sm: 11, md: 13 },
                    color: "text.secondary",
                  }}
                >
                  {D.name}
                </Typography>
              </Stack>
              <Stack key={i} spacing={1} direction={"row"}>
                <Typography
                  sx={{
                    fontSize: { xs: 11, sm: 11, md: 13 },
                    color: "text.secondary",
                  }}
                >
                  {D.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 11, sm: 11, md: 13 },
                    color: "text.secondary",
                  }}
                >
                  ({Math.floor((D.value * 100) / totalTasks)}%)
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
