import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Typography from "@mui/material/Typography";

export default function Transactions({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Transações" />
      <Typography variant="body1">Transações</Typography>
    </AuthenticatedLayout>
  );
}
