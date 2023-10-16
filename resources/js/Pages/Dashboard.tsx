import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Profit from "@/Components/Indicators/Profit";
import Deposits from "@/Components/Indicators/Deposits";
import Grid from "@mui/material/Grid";
import Withdraw from "@/Components/Indicators/Withdraw";
import { TotalIncomeBarChart } from "../Components/Charts/TotalIncomeBarChart";
import TotalIncome from "@/Components/Indicators/TotalIncome";
import DayliIncome from "@/Components/Indicators/DayliIncome";

export default function Dashboard({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Box>
        <Typography variant="h5" mb={2}>
          RECEITA
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Profit />
          </Grid>
          <Grid item xs={12} md={4}>
            <Deposits />
          </Grid>
          <Grid item xs={12} md={4}>
            <Withdraw />
          </Grid>
          <Grid item xs={12} md={8}>
            <TotalIncome />
          </Grid>
          <Grid item xs={12} md={4}>
            <DayliIncome />
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}
