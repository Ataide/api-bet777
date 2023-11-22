import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TableTabList from "./TableTabList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { router, useForm, usePage } from "@inertiajs/react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import { formatRelative, format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { PageProps } from "@/types";
import NotFoundData from "../NotFoundData";

export default function DataTable({ events, resource }: { events?: any; resource?: string }) {
  const { errors, sports, auth } = usePage<PageProps>().props;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Nome",
      sortable: false,
      filterable: false,
      flex: 1,
    },
    {
      field: "sport",
      headerName: "Esporte",
      headerAlign: "left",
      align: "left",
      sortable: false,
      filterable: false,
      flex: 1,
    },
    {
      field: "games.count",
      headerName: "Jogos",
      width: 120,
      sortable: false,
      filterable: false,
      valueGetter: (params: GridValueGetterParams) => params.row.games.length,
    },
    {
      field: "created_at",
      headerName: "Criado em",
      headerAlign: "left",
      align: "right",
      sortable: false,
      filterable: false,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.games.length,
      renderCell: (params) => {
        return (
          <Typography variant="body1" color="error">
            {formatDistanceToNow(new Date(2023, 10, 11), { locale: ptBR })}
          </Typography>
        );
      },

      // formatRelative(subDays(new Date(), 3), new Date(), { locale: ptBR }),
    },
    {
      field: "",
      headerName: "Ações",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row">
            <IconButton
              aria-label="edit"
              sx={{ mr: 1 }}
              onClick={(e) => {
                e.preventDefault();
                setEditing(true);
                setData(params.row);
                handleClickOpen();
              }}
            >
              <ModeEditOutlineIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            {auth?.roles?.includes("create events") && (
              <IconButton
                aria-label="delete"
                sx={{ mr: 1 }}
                onClick={() => {
                  setData(params.row);
                  handleClickOpenDelete();
                }}
              >
                <DeleteIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            )}
          </Stack>
        );
      },
      width: 200,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setEditing(false);
  };

  const handleClickNewOpen = () => {
    reset();
    setOpen(true);
    setEditing(true);
  };

  const handleClose = () => {
    setEditing(false);
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const { data, setData, reset, post, processing } = useForm({
    id: 0,
    title: "",
    sport: "",
    sport_id: 0,
    end_date: "",
  });

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const sport_name = sports.find((ea) => ea.id === data.sport_id).name;
    setData("sport", sport_name);
    setTimeout(() => {
      router.post(
        route("events.storeFromModal"),
        { ...data, sport: sport_name },
        {
          preserveState: true,
          onSuccess: (page) => {
            // setSending(false);
            setOpen(false);
          },
          onError: (errors) => {
            //console.log(errors);
          },
        }
      );
    }, 500);
  };

  function handleClickConfirmationDelete(): void {
    router.delete(route("events.destroy", { id: data.id }), {
      onSuccess: (page) => {
        handleCloseDelete();
      },
    });
  }

  return (
    <>
      <Paper elevation={5} variant="indicator">
        <TableTabList resource={resource} clickOpenNewEvent={handleClickNewOpen} />
        {events.data.length === 0 ? (
          <NotFoundData />
        ) : (
          <DataGrid
            disableRowSelectionOnClick
            disableColumnMenu
            onRowSelectionModelChange={(row) => {
              //console.log(row);
            }}
            onRowClick={(e, event: any) => {
              if (event.target.nodeName === "DIV") {
                router.get("/eventos/" + e.row.id);
              }
            }}
            disableColumnSelector
            rows={events.data}
            rowCount={events.total}
            paginationMode="server"
            columns={columns}
            density={"comfortable"}
            initialState={{
              pagination: {
                paginationModel: { page: events.current_page - 1, pageSize: events.per_page },
              },
            }}
            onPaginationModelChange={(model, details) => {
              router.get("/eventos", { page: model.page + 1, per_page: model.pageSize }, { preserveState: true });
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: "#2e2e2e" } }}
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle>Criar Evento</DialogTitle>
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
            id="form_edit"
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
              <Box width={"100%"}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Nome do evento
                </Typography>
                <TextField
                  fullWidth
                  required
                  disabled={!editing}
                  id="title"
                  name="title"
                  placeholder="Campeonato Brasileiro"
                  value={data.title}
                  error={errors.title ? true : false}
                  helperText={errors.title}
                  onChange={(e) => setData("title", e.target.value)}
                  InputLabelProps={{ shrink: false }}
                />
              </Box>
              <Box width={"100%"}>
                <Typography variant="caption" color="white" fontWeight={600}>
                  Data final do evento ( o evento se encerrara automaticamente)
                </Typography>
                <DatePicker
                  value={new Date(data.end_date)}
                  onChange={(e) => setData("end_date", moment(e as any).format("YYYY-MM-DD H:mm:ss"))}
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
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" gap={2} width={"100%"}>
              <Box width={"100%"}>
                <Typography variant="caption" color="white" fontWeight={600}>
                  Esporte
                </Typography>
                <FormControl fullWidth>
                  <Select
                    sx={{ backgroundColor: "#1B1C1B", color: "#fff" }}
                    value={data.sport_id}
                    placeholder="Selecione um esporte"
                    onChange={(e) => {
                      setData("sport_id", +e.target.value);
                    }}
                  >
                    {sports &&
                      sports.map((sport, index) => (
                        <MenuItem key={index} value={sport.id}>
                          {sport.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ display: "flex", p: 3 }}>
          {!editing && (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  setEditing(true);
                }}
              >
                Mudar informações
              </Button>
            </>
          )}

          {editing && (
            <>
              <Button variant="contained" type="submit" form="form_edit">
                Salvar
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setEditing(false);
                }}
              >
                Cancelar
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        PaperProps={{ sx: { backgroundColor: "#2e2e2e" } }}
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle>Deletar contas</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDelete}
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
          <Typography variant="body1" fontWeight={400}>
            Tem certeza que desenha deletar esse evento?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", p: 3 }}>
          <>
            <Button variant="contained" color="error" onClick={handleClickConfirmationDelete}>
              Deletar
            </Button>
            <Button variant="outlined" onClick={handleCloseDelete}>
              Cancelar
            </Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
}
