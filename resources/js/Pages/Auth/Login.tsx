import { useEffect, FormEventHandler } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import Alert from "@mui/material/Alert";

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    status: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("login"), {
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <GuestLayout>
      <Head title="Entrar" />
      <Box
        component="form"
        id="form_"
        onSubmit={submit}
        noValidate
        sx={{
          maxWidth: "375px",
          mt: 1,
          display: "flex",
          flexDirection: "column",
        }}
        gap={1}
      >
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h3" color={"primary"}>
            Entre na sua conta
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            Não tem conta?
            <Link href={route("register")}>
              <Typography component={"span"} variant="body1" color="primary" fontWeight={400} ml={1}>
                cadastre-se
              </Typography>
            </Link>
          </Typography>
        </Box>
        <TextField
          fullWidth
          required
          id="email"
          label="Usuário/E-mail"
          name="email"
          value={data.email}
          error={errors.email ? true : false}
          helperText={errors.email}
          onChange={(e) => setData("email", e.target.value)}
        />
        <TextField
          fullWidth
          required
          type="password"
          id="password"
          label="Senha"
          name="password"
          value={data.password}
          error={errors.password ? true : false}
          helperText={errors.password}
          onChange={(e) => setData("password", e.target.value)}
        />
        <Box textAlign={"end"}>
          <Link href={route("password.request")}>
            <Typography component={"span"} variant="body1" color="primary" fontWeight={400} ml={1}>
              Esqueci minha senha
            </Typography>
          </Link>
          <br />
        </Box>
        {errors.status && <Alert severity="warning">{errors.status}</Alert>}
        <Button
          variant="contained"
          type="submit"
          disabled={processing}
          sx={{
            width: 165,
            margin: "0 auto",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Entrar
        </Button>
      </Box>
    </GuestLayout>
  );
}
