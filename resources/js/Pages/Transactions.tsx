import DataTable from "@/Components/Table/Transations/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Transactions({ auth, transactions }: PageProps) {
  console.log(transactions);
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Transações" />
      <Box>
        <Typography variant="h5" mb={2}>
          TRANSAÇÕES
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DataTable transactions={transactions} />
          </Grid>
          <Grid item xs={12}>
            <DataTable transactions={transactions} />
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}
