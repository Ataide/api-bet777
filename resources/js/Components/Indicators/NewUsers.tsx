import Box from "@mui/material/Box";
import { BarChart } from "../Charts/BarChart";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { NewUsersBarChart } from "../Charts/MiniCharts/NewUsersBarCharts";
export default function NewUsers() {
  return (
    <>
      <Paper elevation={5} variant="indicator">
        <Box sx={{ padding: "16px 20px 0px 20px" }}>
          <Typography variant="body2">Usuários</Typography>
          <Typography variant="body2" color={"primary"}>
            {"Novos"}
          </Typography>
          <Box>
            <NewUsersBarChart />
          </Box>
        </Box>
      </Paper>
    </>
  );
}
