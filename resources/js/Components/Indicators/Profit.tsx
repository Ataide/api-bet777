import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProfitBarChart } from "../Charts/MiniCharts/ProfitBarChart";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { formatter } from "@/helper";
export default function Profit() {
  const { dashboard } = usePage<PageProps>().props;

  const getTotal = () => {
    const values = Object.values(dashboard).map((date: any) =>
      date.reduce((n: any, { withdraw, deposit }: any) => n + (deposit - withdraw), 0)
    );
    const total = values.reduce((n: any, profit: number) => n + profit, 0);
    return formatter.format(total);
  };

  return (
    <>
      <Paper elevation={5} variant="indicator">
        <Box sx={{ padding: "16px 20px 0px 20px" }}>
          <Typography variant="body2">Lucro Total</Typography>
          <Typography variant="h5" color={getTotal().includes("-") ? "error" : "primary"}>
            {getTotal()}
          </Typography>
          <Box>
            <ProfitBarChart />
          </Box>
        </Box>
      </Paper>
    </>
  );
}
