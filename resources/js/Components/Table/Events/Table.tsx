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

export default function DataTable({ events, resource }: { events?: any; resource?: string }) {
  console.log(events);
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Nome",
      sortable: false,
      flex: 1,
      // valueGetter: (params: GridValueGetterParams) => `${params.row.name || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "sport",
      headerName: "Esporte",
      headerAlign: "left",
      align: "left",
      flex: 1,
      // valueGetter: (params: GridValueGetterParams) => params.row.profile.phone,
    },
    {
      field: "games.count",
      headerName: "Jogos",
      width: 120,
      valueGetter: (params: GridValueGetterParams) => params.row.games.length,
      // renderCell: (params) => {
      //   switch (params.row.profile.account_status) {
      //     case "Ativo":
      //       return (
      //         <Typography variant="body1" sx={{ color: "success.main" }}>
      //           Ativo
      //         </Typography>
      //       );
      //     case "Inativo":
      //       return (
      //         <Typography variant="body1" color="error">
      //           Inativo
      //         </Typography>
      //       );
      //     case "Novo":
      //       return <Typography sx={{ color: "warning.main" }}>Novo</Typography>;

      //     default:
      //       return <Typography variant="body1">{params.row.profile.account_status}</Typography>;
      //   }
      // },
    },
    {
      field: "created_at",
      headerName: "Criado em",
      headerAlign: "left",
      align: "left",
      flex: 1,
      // valueGetter: (params: GridValueGetterParams) => params.row.profile.phone,
    },
    {
      field: "",
      headerName: "Ações",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: any) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

        return (
          <Stack direction="row">
            <IconButton aria-label="edit" sx={{ mr: 1 }} onClick={handleClickOpen}>
              <ModeEditOutlineIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            <IconButton aria-label="edit" sx={{ mr: 1 }} onClick={handleClickOpenDelete}>
              <DeleteIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            <IconButton aria-label="more-options" sx={{ mr: 1 }} onClick={onClick}>
              <MoreVertIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Stack>
        );
      },
      width: 120,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const { errors } = usePage().props;

  const handleClickOpen = () => {
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

  const { data, setData, post, processing } = useForm({
    title: "",
    sport: "",
    end_date: "",
  });

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    router.post(route("events.storeFromModal"), data, {
      preserveState: true,
      onSuccess: (page) => {
        // setSending(false);
        setOpen(false);
      },
      onError: (errors) => {
        console.log(errors);
      },
    });
  };

  return (
    <>
      <Paper elevation={5} variant="indicator">
        <TableTabList resource={resource} clickOpenNewEvent={handleClickOpen} />

        <DataGrid
          disableRowSelectionOnClick
          onRowClick={(e) => router.get("/eventos/" + e.row.id)}
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
                    value={data.sport}
                    placeholder="Selecione um esporte"
                    onChange={(e) => setData("sport", e.target.value)}
                  >
                    <MenuItem value={"Selecione um esporte"}>Selecione um esporte</MenuItem>
                    <MenuItem value={"Futebol"}>Futebol</MenuItem>
                    <MenuItem value={"Vôlei"}>Vôlei</MenuItem>
                    <MenuItem value={"Basquete"}>Basquete</MenuItem>
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
            Tem certeza que desenha deletar <strong>4 contas</strong> selecionadas?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", p: 3 }}>
          <>
            <Button variant="contained" color="error">
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