import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { BaseSyntheticEvent, ReactEventHandler, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import DateField from "@/Components/Fields/DateField";
import SearchField from "@/Components/Fields/SearchFields";
import dayjs, { Dayjs } from "dayjs";

interface ITabListProps {
  resource?: string;
  clickOpenNewEvent?: () => void;
  handleCLickOpenFinalization: () => void;
}
export default function TableTabList({ resource, clickOpenNewEvent, handleCLickOpenFinalization }: ITabListProps) {
  const params = new URLSearchParams(window.location.search);

  const { games } = usePage<PageProps>().props;
  const [date, setDate] = useState<any | null>(new Date(params.get("date") ?? "") || null);
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (event: BaseSyntheticEvent) => {
    setSearch(event.target.value);
    router.get("", { search: event.target.value }, { preserveState: true });
  };

  const handleDateChange = (_date: any) => {
    router.get("", { date: _date ? dayjs(_date).format("YYYY-MM-DD") : "" }, { preserveState: true, only: ["games"] });
  };

  return (
    <Box display={"flex"} alignItems={"center"}>
      <TabContext value={""}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList aria-label="lab API tabs example">
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

        <SearchField value={search} onChange={handleSearchChange} />

        <DateField value={date} onChange={handleDateChange} />

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
