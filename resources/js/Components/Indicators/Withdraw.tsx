import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProfitBarChart } from "../Charts/MiniCharts/ProfitBarChart";
import { DepositsBarChart } from "../Charts/MiniCharts/DepositsBarChart";
import { WithdrawBarChart } from "../Charts/MiniCharts/WithdrawBarChart";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { formatter } from "@/helper";
export default function Withdraw() {
  const { dashboard } = usePage<PageProps>().props;

  const getTotal = () => {
    const values = Object.values(dashboard).map((date: any) =>
      date
        .filter((trasaction: any) => trasaction.type === "withdraw")
        .reduce((n: any, { withdraw }: any) => n + withdraw, 0)
    );

    const total = values.reduce((n: any, withdraw: number) => n + withdraw, 0);
    return formatter.format(total);
  };
  return (
    <>
      <Box>
        <Paper elevation={5} variant="indicator">
          <Box sx={{ padding: "16px 20px 0px 20px" }}>
            <Typography variant="body2">Total de Saques</Typography>
            <Typography variant="body2" color={"primary"}>
              +2.6%
            </Typography>
            <Typography variant="h5">{getTotal()}</Typography>
            <Box>
              <WithdrawBarChart />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
