import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProfitBarChart } from "../Charts/MiniCharts/ProfitBarChart";
import { TotalIncomeBarChart } from "../Charts/TotalIncomeBarChart";
import { DailyIncomeBarChart } from "../Charts/DailyIncomeBarChart";

export default function DayliIncome() {
  return (
    <>
      <Paper elevation={5} variant="indicator">
        <Box sx={{ padding: "16px 20px 0px 20px" }}>
          <Typography variant="body1">Receita do dia</Typography>
          {/* <Typography variant="h5">R$ 1.000</Typography> */}
          <Box>
            <DailyIncomeBarChart />
          </Box>
        </Box>
      </Paper>
    </>
  );
}
