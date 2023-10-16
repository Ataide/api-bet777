import Box from "@mui/material/Box";
import { LineChart } from "../Charts/LineChart";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DatabaseUsersLineCharts } from "../Charts/MiniCharts/DatabaseUsersLineCharts";

export default function DatabaseUsers() {
  return (
    <>
      <Paper elevation={5} variant="indicator">
        <Box sx={{ padding: "16px 20px 0px 20px" }}>
          <Typography variant="body2">Todos usuários cadastrados</Typography>
          <Typography variant="body2" color={"primary"}>
            +2.6%
          </Typography>
          <Typography variant="h5">1.200</Typography>
          <Box>
            <DatabaseUsersLineCharts />
          </Box>
        </Box>
      </Paper>
    </>
  );
}
