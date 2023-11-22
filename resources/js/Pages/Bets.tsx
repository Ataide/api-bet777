import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import Typography from "@mui/material/Typography";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import BetsComponent from "@/Components/BetComponent";

export default function Bets({ auth, bets, userPapers }: PageProps) {
  const userDetails = { name: "Meu Nome", total_bets: "10" };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Apostas" />
      <Box>
        <Typography variant="h5" mb={2}>
          APOSTAS
        </Typography>
        <BetsComponent />
      </Box>
    </AuthenticatedLayout>
  );
}
