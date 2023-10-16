import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import Typography from "@mui/material/Typography";
import { Head } from "@inertiajs/react";

export default function Bets({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Apostas" />
      <Typography variant="body1">Apostas</Typography>
    </AuthenticatedLayout>
  );
}
