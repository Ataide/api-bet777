import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { OddFloatMask } from "../TextMasks/TextMasks";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import DialogActions from "@mui/material/DialogActions";
import { router, useForm, usePage } from "@inertiajs/react";
import Button from "@mui/material/Button";
import { PageProps } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

export default function GameAddDialog({ open, handleClose }: { open: boolean; handleClose: () => void }) {
  const { event } = usePage<PageProps>().props;

  const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
    event_id: event.id,
    home_name: "",
    away_name: "",
    home_rate: "",
    draw_rate: "",
    away_rate: "",
    time_close_bet: "",
  });

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    post(route("games.storeFromModal"));
    handleClose();
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { backgroundColor: "#2e2e2e" } }}
      maxWidth={"md"}
      fullWidth
    >
      <DialogTitle>Criar Jogo</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.primary.main,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box
          component="form"
          id="form"
          onSubmit={submit}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "row",
          }}
          gap={2}
        >
          <Box display="flex" flexDirection="column" gap={2} width={"100%"}>
            <Box width={"100%"} minHeight={"110px"}>
              <Typography variant="subtitle2" color="white" fontWeight={600}>
                TIME A
              </Typography>
              <TextField
                fullWidth
                required
                id="home_name"
                name="home_name"
                placeholder="Time A"
                value={data.home_name}
                error={errors.home_name ? true : false}
                helperText={errors.home_name}
                onChange={(e) => setData("home_name", e.target.value)}
                InputLabelProps={{ shrink: false }}
              />
            </Box>

            <Box width={"100%"} minHeight={"110px"}>
              <Typography variant="subtitle2" color="white" fontWeight={600}>
                ODD TIME A
              </Typography>
              <TextField
                fullWidth
                required
                id="home_rate"
                name="home_rate"
                placeholder="Time A"
                value={data.home_rate}
                error={errors.home_rate ? true : false}
                helperText={errors.home_rate}
                onChange={(e) => setData("home_rate", e.target.value)}
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  inputComponent: OddFloatMask as any,
                }}
              />
            </Box>

            <Box width={"100%"} minHeight={"110px"}>
              <Typography variant="caption" color="white" fontWeight={600}>
                Data do Jogo
              </Typography>
              <DatePicker
                onChange={(e) => setData("time_close_bet", moment(e as any).format("YYYY-MM-DD H:mm:ss"))}
                sx={{
                  width: "100%",
                  backgroundColor: "#1B1C1B",
                  color: "#fff",
                  borderRadius: "10px !important",
                  "& .MuiIconButton-root": {
                    color: "primary.main",
                  },
                }}
              />
              {errors.time_close_bet && (
                <Box ml={2}>
                  <Typography variant="caption" color="error" fontWeight={600}>
                    {errors.time_close_bet}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={2} width={"100%"}>
            <Box width={"100%"} minHeight={"110px"}>
              <Typography variant="caption" color="white" fontWeight={600}>
                <span>.</span>
              </Typography>
              <TextField fullWidth disabled={true} required value={"EMPATE"} />
            </Box>
            <Box width={"100%"} minHeight={"110px"}>
              <Typography variant="subtitle2" color="white" fontWeight={600}>
                ODD EMPATE
              </Typography>
              <TextField
                fullWidth
                required
                type="number"
                id="draw_rate"
                name="draw_rate"
                value={data.draw_rate}
                error={errors.draw_rate ? true : false}
                helperText={errors.draw_rate}
                onChange={(e) => setData("draw_rate", e.target.value)}
                InputLabelProps={{ shrink: false }}
              />
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={2} width={"100%"}>
            <Box width={"100%"} minHeight={"110px"}>
              <Typography variant="caption" color="white" fontWeight={600}>
                TIME B
              </Typography>
              <TextField
                fullWidth
                required
                id="away_name"
                name="away_name"
                placeholder="Time B"
                value={data.away_name}
                error={errors.away_name ? true : false}
                helperText={errors.away_name}
                onChange={(e) => setData("away_name", e.target.value)}
                InputLabelProps={{ shrink: false }}
              />
            </Box>
            <Box width={"100%"} minHeight={"110px"}>
              <Typography variant="caption" color="white" fontWeight={600}>
                ODD TIME B
              </Typography>
              <TextField
                fullWidth
                required
                type="number"
                id="away_rate"
                name="away_rate"
                value={data.away_rate}
                error={errors.away_rate ? true : false}
                helperText={errors.away_rate}
                onChange={(e) => setData("away_rate", e.target.value)}
                InputLabelProps={{ shrink: false }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ display: "flex", p: 3 }}>
        <Button
          variant="contained"
          onClick={() => {
            clearErrors();
          }}
        >
          Reset
        </Button>
        <Button variant="contained" type="submit" form="form">
          Salvar
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            handleClose();
          }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
