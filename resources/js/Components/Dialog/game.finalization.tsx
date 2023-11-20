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
import { IGame, PageProps } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";

export default function GameFinalizationDialog({
  open,
  handleClose,
  game,
}: {
  game: IGame;
  open: boolean;
  handleClose: () => void;
}) {
  const { event } = usePage<PageProps>().props;

  const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
    event_id: event.id,
    home_name: game.home_name,
    home_score: "",
    away_name: game.away_name,
    away_score: "",
  });

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    post(route("games.finalizate", { game: game.id }), {
      onSuccess: (page) => {
        reset();
        handleClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onFinish: (page) => {},
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { backgroundColor: "#2e2e2e" } }}
      maxWidth={"md"}
      fullWidth
    >
      <DialogTitle>Encerramento de Jogo</DialogTitle>
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="white" fontWeight={600}>
                {game.home_name}
              </Typography>
              <TextField
                fullWidth
                required
                type="number"
                id="home_score"
                name="home_score"
                placeholder="Resultado A"
                value={data.home_score}
                error={errors.home_score ? true : false}
                helperText={errors.home_score}
                onChange={(e) => setData("home_score", e.target.value)}
                InputLabelProps={{ shrink: false }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="white" fontWeight={600}>
                {game.away_name}
              </Typography>
              <TextField
                fullWidth
                required
                type="number"
                id="away_score"
                name="away_score"
                placeholder="Resultado B"
                value={data.away_score}
                error={errors.away_score ? true : false}
                helperText={errors.away_score}
                onChange={(e) => setData("away_score", e.target.value)}
                InputLabelProps={{ shrink: false }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ display: "flex", p: 3 }}>
        <Button disabled={processing} variant="contained" type="submit" form="form">
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
