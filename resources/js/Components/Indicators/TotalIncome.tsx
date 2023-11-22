import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProfitBarChart } from "../Charts/MiniCharts/ProfitBarChart";
import { TotalIncomeBarChart } from "../Charts/TotalIncomeBarChart";

export default function TotalIncome() {
  return (
    <>
      <Paper elevation={5} variant="indicator">
        <Box sx={{ padding: "16px 20px 0px 20px" }}>
          <Typography variant="body1">Total Receita</Typography>
          {/* <Typography variant="h5">R$ 5.300</Typography> */}
          <Box>
            <TotalIncomeBarChart />
          </Box>
        </Box>
      </Paper>
    </>
  );
}
