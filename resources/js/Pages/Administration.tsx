import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Typography from "@mui/material/Typography";

export default function Administration({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Administração" />
      <Typography variant="body1">Administração</Typography>
    </AuthenticatedLayout>
  );
}
