import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProfitBarChart } from "../Charts/MiniCharts/ProfitBarChart";
import { DepositsBarChart } from "../Charts/MiniCharts/DepositsBarChart";
import { WithdrawBarChart } from "../Charts/MiniCharts/WithdrawBarChart";
export default function Withdraw() {
  return (
    <>
      <Box>
        <Paper elevation={5} variant="indicator">
          <Box sx={{ padding: "16px 20px 0px 20px" }}>
            <Typography variant="body2">Total de Saques</Typography>
            <Typography variant="body2" color={"primary"}>
              +2.6%
            </Typography>
            <Typography variant="h5">300</Typography>
            <Box>
              <WithdrawBarChart />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
