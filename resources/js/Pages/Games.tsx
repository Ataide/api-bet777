import DataTable from "@/Components/Table/Events/Games/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Events({ auth, event, games }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Jogos" />
      <Box>
        <Typography variant="h5" mb={2}>
          {event.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DataTable games={games} />
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}
