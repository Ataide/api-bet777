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
import { Grid, Paper, styled } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { toast } from "react-toastify";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function GameUpdateDialog({
  open,
  handleClose,
  selectedGame,
}: {
  selectedGame: IGame | null;
  open: boolean;
  handleClose: () => void;
}) {
  const { event } = usePage<PageProps>().props;

  const { data, setData, post, processing, progress, reset, errors, clearErrors } = useForm<IGame>({
    event_id: event.id,
    home_name: "",
    away_name: "",
    home_rate: "",
    draw_rate: "",
    away_rate: "",
    time_close_bet: "",
    home_image: "",
    away_image: "",
  });

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    post(route("games.storeFromModal"), {
      onSuccess: () => {
        reset();
        handleClose();
      },
    });
  };

  const handleUploadFileHome = (file: any) => {
    router.post(
      route("files.store"),
      { file: file },
      {
        onSuccess: (page: any) => {
          const url = page.props.flash.file;
          setData("home_image", url);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleUploadFileAway = (file: any) => {
    router.post(
      route("files.store"),
      { file: file },
      {
        onSuccess: (page: any) => {
          const url = page.props.flash.file;
          setData("away_image", url);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    if (selectedGame) {
      console.log("oque vem de fora", selectedGame.time_close_bet);
      setData({
        ...selectedGame,
        home_rate: String(selectedGame.home_rate),
        away_rate: String(selectedGame.away_rate),
        draw_rate: String(selectedGame.draw_rate),
        time_close_bet: selectedGame.time_close_bet,
        time_game: moment(selectedGame.time_close_bet).format("hh:mm aa"),
      });
    }
  }, [selectedGame]);

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
        <Box component="form" id="form" onSubmit={submit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={4}>
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
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" color="white" fontWeight={600}>
                EMPATE
              </Typography>
              <TextField fullWidth disabled={true} required value={"EMPATE"} />
            </Grid>
            <Grid item xs={4}>
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
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={4}>
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
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="white" fontWeight={600}>
                ODD EMPATE
              </Typography>
              <TextField
                fullWidth
                required
                id="draw_rate"
                name="draw_rate"
                value={data.draw_rate}
                error={errors.draw_rate ? true : false}
                helperText={errors.draw_rate}
                InputProps={{
                  inputComponent: OddFloatMask as any,
                }}
                onChange={(e) => setData("draw_rate", e.target.value)}
                InputLabelProps={{ shrink: false }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" color="white" fontWeight={600}>
                ODD TIME B
              </Typography>
              <TextField
                fullWidth
                required
                id="away_rate"
                name="away_rate"
                value={data.away_rate}
                error={errors.away_rate ? true : false}
                helperText={errors.away_rate}
                InputProps={{
                  inputComponent: OddFloatMask as any,
                }}
                onChange={(e) => setData("away_rate", e.target.value)}
                InputLabelProps={{ shrink: false }}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="white" fontWeight={600}>
                BRASÂO DO TIME A
              </Typography>
              <Paper>
                <Box sx={{ minHeight: 250 }} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                  {data.home_image ? (
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={2}>
                      <img src={data.home_image} width={150} height={150} alt="" />
                      <Button component="label" variant="outlined">
                        +
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(e) => handleUploadFileHome(e?.target?.files?.[0])}
                        />
                      </Button>
                    </Box>
                  ) : (
                    <Button component="label" variant="outlined">
                      +
                      <VisuallyHiddenInput type="file" onChange={(e) => handleUploadFileHome(e?.target?.files?.[0])} />
                    </Button>
                  )}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="white" fontWeight={600}>
                BRASÂO DO TIME B
              </Typography>
              <Paper>
                <Box sx={{ minHeight: 250 }} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                  {data.away_image ? (
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={2}>
                      <img src={data.away_image} width={150} height={150} alt="" />
                      <Button component="label" variant="outlined">
                        +
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(e) => handleUploadFileAway(e?.target?.files?.[0])}
                        />
                      </Button>
                    </Box>
                  ) : (
                    <Button component="label" variant="outlined">
                      +
                      <VisuallyHiddenInput type="file" onChange={(e) => handleUploadFileAway(e?.target?.files?.[0])} />
                    </Button>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="caption" color="white" fontWeight={600}>
                Data do Jogo
              </Typography>
              <DatePicker
                value={new Date(data.time_close_bet)}
                onChange={(e) => setData("time_close_bet", moment(e as any).format("YYYY-MM-DD"))}
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
            </Grid>
            <Grid item xs={4}>
              <Typography variant="caption" color="white" fontWeight={600}>
                Horário do Jogo
              </Typography>
              <TimePicker
                sx={{
                  width: "100%",
                  backgroundColor: "#1B1C1B",
                  color: "#fff",
                  borderRadius: "10px !important",
                  "& .MuiIconButton-root": {
                    color: "primary.main",
                  },
                }}
                ampm={false}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                value={new Date(data.time_close_bet)}
                onChange={(newValue) => setData("time_close_bet", moment(newValue).format("YYYY-MM-DD HH:mm:ss"))}
              />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <br />
        </Box>
      </DialogContent>

      <DialogActions sx={{ display: "flex", p: 3 }}>
        <Button
          variant="contained"
          onClick={() => {
            console.log(data);
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
