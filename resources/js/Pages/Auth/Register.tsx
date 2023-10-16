import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Form from "../../Components/Form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import EastIcon from "@mui/icons-material/East";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: "",
    last_name: "",
    birthday: "",
    phone: "",

    user_name: "",
    email: "",
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

    post(route("register"));
  };

  return (
    <GuestLayout>
      <Head title="Cadastro" />

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
        gap={1}
      >
        <Typography variant="body1">Informação Pessoal</Typography>
        <TextField
          fullWidth
          required
          id="first_name"
          label="Primeiro Nome"
          name="first_name"
          value={data.first_name}
          error={errors.first_name ? true : false}
          helperText={errors.first_name}
          onChange={(e) => setData("first_name", e.target.value)}
        />

        <TextField
          fullWidth
          required
          id="last_name"
          label="Sobrenome"
          name="last_name"
          value={data.last_name}
          error={errors.last_name ? true : false}
          helperText={errors.last_name}
          onChange={(e) => setData("last_name", e.target.value)}
        />
        <Typography variant="body1">Data de Nascimento</Typography>

        <Typography variant="body1">Informações para Contato</Typography>
        <TextField
          fullWidth
          required
          id="email"
          label="E-mail"
          name="email"
          value={data.email}
          error={errors.email ? true : false}
          helperText={errors.email}
          onChange={(e) => setData("email", e.target.value)}
        />
        <Typography variant="body1">Número de telefone</Typography>
        <TextField
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "#fff" }}>
                +55
              </InputAdornment>
            ),
          }}
          id="phone"
          label="Celular"
          name="phone"
          value={data.phone}
          error={errors.phone ? true : false}
          helperText={errors.phone}
          onChange={(e) => setData("phone", e.target.value)}
        />
        <Typography variant="body1">Cria login</Typography>
        <TextField
          fullWidth
          required
          id="user_name"
          label="Usuário"
          name="user_name"
          value={data.user_name}
          error={errors.user_name ? true : false}
          helperText={errors.user_name}
          onChange={(e) => setData("user_name", e.target.value)}
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
        <TextField
          fullWidth
          required
          type="password_confirmation"
          id="password_confirmation"
          label="Confirmar senha"
          name="password_confirmation"
          value={data.password_confirmation}
          error={errors.password_confirmation ? true : false}
          helperText={errors.password_confirmation}
          onChange={(e) => setData("password_confirmation", e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={processing}
          endIcon={<EastIcon />}
          sx={{
            width: 316,
            margin: "0 auto",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Continuar
        </Button>
        <Typography variant="body1" textAlign={"center"}>
          Já possui uma conta?
          <Link href={route("login")}>
            <Typography
              component={"span"}
              variant="body1"
              color="primary"
              ml={1}
            >
              Faça login aqui
            </Typography>
          </Link>
        </Typography>
      </Box>

      {/* <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={(e) => setData("name", e.target.value)}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData("email", e.target.value)}
            required
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
            onChange={(e) => setData("password", e.target.value)}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData("password_confirmation", e.target.value)}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route("login")}
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Already registered?
          </Link>

          <PrimaryButton className="ml-4" disabled={processing}>
            Register
          </PrimaryButton>
        </div>
      </form> */}
    </GuestLayout>
  );
}
