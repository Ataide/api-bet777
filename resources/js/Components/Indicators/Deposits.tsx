import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProfitBarChart } from "../Charts/MiniCharts/ProfitBarChart";
import { DepositsBarChart } from "../Charts/MiniCharts/DepositsBarChart";
export default function Deposits() {
  return (
    <>
      <Box>
        <Paper elevation={5} variant="indicator">
          <Box sx={{ padding: "16px 20px 0px 20px" }}>
            <Typography variant="body2">Total de Depósitos</Typography>
            <Typography variant="body2" color={"primary"}>
              +2.6%
            </Typography>
            <Typography variant="h5">500</Typography>
            <Box>
              <DepositsBarChart />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
