import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Administration({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Administração" />
      <Box>
        <Typography variant="h5" mb={2}>
          ADMINISTRAÇÃO / DONO
        </Typography>
      </Box>
    </AuthenticatedLayout>
  );
}
