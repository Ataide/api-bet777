import Box from "@mui/material/Box";
import { FormHTMLAttributes } from "react";

interface FormProps {
  gap?: number;
  width?: string;
}

export default function Form({
  children,
  gap = 1,
  width = "100%",
  ...props
}: FormHTMLAttributes<HTMLFormElement> & FormProps) {
  return (
    <>
      <Box
        component="form"
        width={width}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        gap={gap}
      >
        {children}
      </Box>
    </>
  );
}
