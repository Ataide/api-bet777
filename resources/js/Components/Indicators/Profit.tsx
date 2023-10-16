import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProfitBarChart } from "../Charts/MiniCharts/ProfitBarChart";
export default function Profit() {
  return (
    <>
      <Paper elevation={5} variant="indicator">
        <Box sx={{ padding: "16px 20px 0px 20px" }}>
          <Typography variant="body2">Lucro Total</Typography>
          <Typography variant="body2" color={"primary"}>
            +2.6%
          </Typography>
          <Typography variant="h5">R$ 1.300</Typography>
          <Box>
            <ProfitBarChart />
          </Box>
        </Box>
      </Paper>
    </>
  );
}
