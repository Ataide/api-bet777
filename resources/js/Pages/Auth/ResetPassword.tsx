import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ResetPassword({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.store"));
  };

  return (
    <GuestLayout>
      <Head title="Redefinição de Senha" />
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
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Typography variant="h3" color={"primary"}>
            Redefinir senha
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            Insira sua nova senha
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" ml={2} fontWeight={700}>
            Senha
          </Typography>
          <TextField
            fullWidth
            required
            type="password"
            id="password"
            name="password"
            value={data.password}
            error={errors.password ? true : false}
            helperText={errors.password}
            onChange={(e) => setData("password", e.target.value)}
            InputLabelProps={{ shrink: false }}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" ml={2} fontWeight={700}>
            Confirme a senha
          </Typography>
          <TextField
            fullWidth
            required
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={data.password_confirmation}
            error={errors.password_confirmation ? true : false}
            helperText={errors.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
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
          Redefinir senha
        </Button>
        <Box>
          <Link href={route("login")}>
            <Typography
              component={"span"}
              variant="body1"
              color="primary"
              fontWeight={400}
              ml={1}
            >
              Voltar ao login.
            </Typography>
          </Link>
          <br />
        </Box>
      </Box>

      {/* <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            isFocused={true}
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />

          <TextInput
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData("password_confirmation", e.target.value)}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" disabled={processing}>
            Reset Password
          </PrimaryButton>
        </div>
      </form> */}
    </GuestLayout>
  );
}
