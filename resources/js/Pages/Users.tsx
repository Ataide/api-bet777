import DatabaseUsers from "@/Components/Indicators/DatabaseUsers";
import NewUsers from "@/Components/Indicators/NewUsers";
import Visitors from "@/Components/Indicators/Visitors";
import DataTable from "@/Components/Table/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Users({ auth, users }: PageProps) {
  console.log(users);
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Usuários" />
      <Box>
        <Typography variant="h5" mb={2}>
          USUÁRIOS
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <DatabaseUsers />
          </Grid>

          <Grid item xs={12} md={4}>
            <NewUsers />
          </Grid>

          <Grid item xs={12} md={4}>
            <Visitors />
          </Grid>

          <Grid item xs={12}>
            <DataTable users={users} />
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}
