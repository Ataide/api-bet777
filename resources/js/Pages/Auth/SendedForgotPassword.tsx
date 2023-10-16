import GuestLayout from "@/Layouts/GuestLayout";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ForgotPassword({ status }: { status?: string }) {
  return (
    <>
      <GuestLayout>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={750}
          gap={2}
        >
          <Typography variant="h3" color={"primary"} textAlign={"center"}>
            Enviamos um e-mail de redefinição para alterar sua senha
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            Verifique sua caixa de entrada ou a parte de spam
          </Typography>
          <Button
            variant="contained"
            href="/login"
            sx={{
              width: 316,
              margin: "0 auto",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Voltar ao site
          </Button>
        </Box>
      </GuestLayout>
    </>
  );
}
