import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProfitBarChart } from "../Charts/MiniCharts/ProfitBarChart";
import { DepositsBarChart } from "../Charts/MiniCharts/DepositsBarChart";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { formatter } from "@/helper";
export default function Deposits() {
  const { dashboard } = usePage<PageProps>().props;

  const getTotal = (data: any) => {
    const values = Object.values(dashboard).map((date: any) =>
      date
        .filter((trasaction: any) => trasaction.type === "deposit")
        .reduce((n: any, { deposit }: any) => n + deposit, 0)
    );

    const total = values.reduce((n: any, deposit: number) => n + deposit, 0);
    return formatter.format(total);
  };

  return (
    <>
      <Box>
        <Paper elevation={5} variant="indicator">
          <Box sx={{ padding: "16px 20px 0px 20px" }}>
            <Typography variant="body2">Total de Depósitos</Typography>
            {/* <Typography variant="body2" color={"primary"}>
              +2.6%
            </Typography> */}
            <Typography variant="h5">{getTotal(dashboard)}</Typography>
            <Box>
              <DepositsBarChart />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
