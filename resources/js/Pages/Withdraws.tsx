import DataTable from "@/Components/Table/Withdraws/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Withdraws({ auth, withdraws }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Solicitação de saques" />
      <Box>
        <Typography variant="h5" mb={2}>
          SOLICITAÇÕES DE SAQUES
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DataTable withdraws={withdraws} />
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}
