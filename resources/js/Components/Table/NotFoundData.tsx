import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function NotFoundData() {
  return (
    <Box padding={10} sx={{ height: "100%" }}>
      <Typography variant="body1" color="gray" textAlign={"center"}>
        Não há dados
      </Typography>
    </Box>
  );
}
