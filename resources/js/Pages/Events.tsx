import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Typography from "@mui/material/Typography";

export default function Events({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Usuários" />
      <Typography variant="body1">Eventos</Typography>
    </AuthenticatedLayout>
  );
}
