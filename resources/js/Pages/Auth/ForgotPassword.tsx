import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };

  return (
    <>
      <GuestLayout>
        <Head title="Recuperação de senha" />
        <Box
          component="form"
          id="form_"
          onSubmit={submit}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
          }}
          gap={2}
        >
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={2}>
            <Typography variant="h3" color={"primary"}>
              Redefinir senha
            </Typography>
            <Typography variant="body1" fontWeight={400}>
              Informe o email para qual deseja redefinir sua senha.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color="primary" ml={2} fontWeight={400}>
              Email
            </Typography>
            <TextField
              fullWidth
              required
              id="email"
              name="email"
              placeholder="example@example.com"
              value={data.email}
              error={errors.email ? true : false}
              helperText={errors.email}
              onChange={(e) => setData("email", e.target.value)}
              InputLabelProps={{ shrink: false }}
            />
          </Box>

          <Button
            variant="contained"
            type="submit"
            disabled={processing}
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Enviar
          </Button>

          <Box>
            <Link href={route("login")}>
              <Typography component={"span"} variant="body1" color="primary" fontWeight={400} ml={1}>
                Voltar ao login.
              </Typography>
            </Link>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <br />
          </Box>
        </Box>
      </GuestLayout>
    </>
  );
}
