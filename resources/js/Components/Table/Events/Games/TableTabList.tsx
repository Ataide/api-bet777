import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ReactEventHandler, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";

interface ITabListProps {
  resource?: string;
  clickOpenNewEvent?: () => void;
  handleCLickOpenFinalization: () => void;
}
export default function TableTabList({ resource, clickOpenNewEvent, handleCLickOpenFinalization }: ITabListProps) {
  const { games } = usePage<PageProps>().props;
  const [selectedTab, setTabSelected] = useState("");
  const [search, setSearch] = useState<string>();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabSelected(newValue);
    if (resource) {
      router.get(resource, { search: search, status: newValue }, { preserveState: true });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value);
    if (resource) {
      router.get(resource, { search: event.target.value, status: selectedTab }, { preserveState: true });
    }
  };

  return (
    <Box display={"flex"} alignItems={"center"}>
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab
              label={
                <div>
                  {"Todos"}
                  <Chip
                    sx={{ background: "white", color: "black", ml: 1, borderRadius: "5px" }}
                    size="small"
                    label={games.length}
                  />
                </div>
              }
              value=""
            />
          </TabList>
        </Box>
      </TabContext>

      <Box ml={2} flex={1} display={"flex"} flexDirection={"row"} justifyContent={"end"} alignItems={"center"} gap={2}>
        {clickOpenNewEvent && (
          <Button variant={"contained"} color="primary" onClick={clickOpenNewEvent}>
            Criar Jogo
          </Button>
        )}
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#fff" }} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: false,
          }}
          color="secondary"
          required
          id="search"
          placeholder="Buscar"
          name="search"
          value={search}
          onChange={handleSearchChange}
        />
        <DatePicker
          sx={{
            width: "207px",
            backgroundColor: "#2E2E2E",
            color: "#fff",
            borderRadius: "10px !important",
            "& .MuiIconButton-root": {
              color: "primary.main",
            },
          }}
        />
        <Button variant={"outlined"} color="primary" onClick={handleCLickOpenFinalization}>
          Encerrar eventos
        </Button>
        <IconButton aria-label="delete" sx={{ mr: 2 }}>
          <DeleteIcon sx={{ color: "#ffffff" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
