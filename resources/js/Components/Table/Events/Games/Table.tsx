import * as React from "react";
import { DataGrid, GridColDef, GridRowId, GridValueGetterParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TableTabList from "./TableTabList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import GameAddDialog from "@/Components/Dialog/Game.add";
import moment from "moment";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { UnFire, Fired } from "@/Components/Icons";
import GameFinalizationDialog from "@/Components/Dialog/game.finalization";
import { IGame } from "@/types";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function DataTable({ games, resource }: { games?: any; resource?: string }) {
  const columns: GridColDef[] = [
    {
      field: "times",
      headerName: "Times",
      sortable: false,
      align: "left",
      flex: 1,
      renderCell: (params) => {
        //console.log(params);
        const [selected, setSelected] = useState(false);
        const handleSwitchHotAction = () => {
          router.post(
            route("games.hot", { game: params.row }),
            {},
            {
              onSuccess: (page) => {
                toast.success("asd");
              },
            }
          );
        };
        return (
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <img src={params.row.home_image} width={32} height={32} />
            {params.row.home_name || "unknown"}
            <Typography variant="body1" color="primary">
              vs
            </Typography>
            {params.row.away_name || "unknown"}
            <img src={params.row.away_image} width={32} height={32} />
            {!params.row.done && (
              <IconButton
                onClick={() => {
                  handleSwitchHotAction();
                  setSelected(!selected);
                }}
              >
                {!params.row.hot ? <UnFire /> : <Fired />}
              </IconButton>
            )}
          </Box>
        );
      },
    },
    {
      field: "odds",
      headerName: "Odds",
      headerAlign: "left",
      align: "left",
      width: 190,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.home_rate.toFixed(2) || "unknown"}  | ${params.row.draw_rate.toFixed(2) || "unknown"} |  ${
          params.row.away_rate.toFixed(2) || "unknown"
        }`,
    },
    {
      field: "time_close_bet",
      headerName: "Data do Jogo",
      width: 220,
      valueGetter: (params: GridValueGetterParams) => moment(params.row.time_close_bet).format("DD/MM/yyyy HH:mm"),
    },
    {
      field: "result",
      headerName: "Resultado",
      align: "center",
      headerAlign: "center",
      width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.done ? params.row.home_score + " - " + params.row.away_score : "",
    },
    {
      field: "time_end",
      headerName: "Encerrado em",
      align: "center",
      headerAlign: "center",
      width: 420,
      valueGetter: (params: GridValueGetterParams) => moment(params.row.time_end).format("DD/MM/yyyy HH:mm"),
      renderCell: (params) => {
        return (
          <Stack direction="column" textAlign={"center"}>
            {params.row.time_end && (
              <>
                <Typography variant="body2" color="error">
                  {moment(params.row.time_end).format("DD/MM/yyyy")}
                </Typography>
                <Typography variant="body2" color="error">
                  {moment(params.row.time_end).format("HH:mm")}
                </Typography>
              </>
            )}
          </Stack>
        );
      },
    },
    {
      field: "",
      headerName: "Ações",
      sortable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row">
            <IconButton aria-label="edit" sx={{ mr: 1 }} onClick={handleClickOpen}>
              <ModeEditOutlineIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            <IconButton aria-label="edit" sx={{ mr: 1 }} onClick={() => handleClickOpenDelete(params.row)}>
              <DeleteIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Stack>
        );
      },
      width: 120,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  const [openFinalization, setOpenFinalization] = useState<boolean>(false);
  const [gameselected, setGameSelected] = useState<IGame | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCLickOpenFinalization = () => {
    setOpenFinalization(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = (game: IGame) => {
    setOpenDelete(true);
    setGameSelected(() => game);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setGameSelected(null);
  };

  const handleCloseFinalization = () => {
    setOpenFinalization(false);
  };

  const handleDeleteAction = (game: IGame) => {
    router.delete(route("games.destroy", { game: game }), {
      onSuccess: (page) => {
        toast.success("Jogo deleteado com sucesso.");
        handleCloseDelete();
      },
      onError: (error) => {
        toast.error("Falha ao deletar o jogo.");
      },
    });
  };

  useEffect(() => {
    const selected = games.find((g: IGame) => g.id === selectionModel[0]);
    setGameSelected(() => selected);
  }, [selectionModel]);

  return (
    <>
      <Paper elevation={5} variant="indicator">
        <TableTabList
          resource={resource}
          clickOpenNewEvent={handleClickOpen}
          handleCLickOpenFinalization={handleCLickOpenFinalization}
        />
        {games.length === 0 ? (
          <Box padding={10}>
            <Typography variant="body1" color="gray" textAlign={"center"}>
              Não há dados
            </Typography>
          </Box>
        ) : (
          <DataGrid
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            disableColumnSelector
            rows={games}
            paginationMode="server"
            columns={columns}
            density={"comfortable"}
            checkboxSelection
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(selection) => {
              if (selection.length > 1) {
                const selectionSet = new Set(selectionModel);
                const result = selection.filter((s) => !selectionSet.has(s));

                // router.visit(route("transactions", { id: result[0] }), {
                //   method: "get",
                //   only: ["transactionDetails"],
                //   preserveState: true,
                // });
                // router.get(route("transactions", { id: result[0] }), {}, { preserveState: true, replace: true });
                setSelectionModel(result);
              } else {
                // router.visit(route("transactions", { id: selection[0] }), {
                //   method: "get",
                //   only: ["transactionDetails"],
                //   preserveState: true,
                // });
                // router.get(route("transactions", { id: selection[0] }), {}, { preserveState: true, replace: true });
                setSelectionModel(selection);
              }
            }}
          />
        )}
      </Paper>

      <GameAddDialog open={open} handleClose={handleClose} />
      {gameselected && (
        <GameFinalizationDialog open={openFinalization} handleClose={handleCloseFinalization} game={gameselected} />
      )}

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
            Tem certeza que desenha deletar o jogo {gameselected?.home_name + " vs " + gameselected?.away_name}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", p: 3 }}>
          <>
            {gameselected && (
              <Button variant="contained" color="error" onClick={() => handleDeleteAction(gameselected)}>
                Deletar
              </Button>
            )}
            <Button variant="outlined" onClick={handleCloseDelete}>
              Cancelar
            </Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
}
