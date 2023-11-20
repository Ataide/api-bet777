import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import Typography from "@mui/material/Typography";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataTable from "@/Components/Table/Bets/Table";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { formatter } from "@/helper";
import DetailsTableTabList from "@/Components/Table/Bets/Details/DetailsTableTabList";

export default function Bets({ auth, bets, userPapers }: PageProps) {
  const userDetails = { name: "MEu Nome", total_bets: "10" };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Apostas" />
      <Box>
        <Typography variant="h5" mb={2}>
          APOSTAS
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <DataTable bets={bets} />
          </Grid>
          <Grid item xs={5}></Grid>
          {/* <DataTableDetails transactions={transactions} /> */}

          {userPapers.data && (
            <>
              <Grid item xs={12}>
                <DetailsTableTabList />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}
