import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Chip from "@mui/material/Chip";

import { ReactEventHandler, useCallback, useEffect, useState } from "react";

import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { DatePicker } from "@mui/x-date-pickers";
import DateField from "@/Components/Fields/DateField";
import dayjs, { Dayjs } from "dayjs";

interface ITabListProps {
  resource?: string;
}
export default function DetailsTableTabList({ resource }: ITabListProps) {
  const [date, setDate] = useState<Dayjs | null>(null);
  const { transactionDetails } = usePage<PageProps>().props;
  const [selectedTab, setTabSelected] = useState("");
  const [search, setSearch] = useState<string>();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabSelected(newValue);
    router.get("", { search: search, type: newValue }, { preserveState: true, only: ["transactionDetails"] });
  };

  const handleDateChange = (date: any) => {
    router.get(
      "",
      { date: date ? dayjs(date).format("YYYY-MM-DD") : "" },
      { preserveState: true, only: ["transactionDetails"] }
    );
  };

  // useEffect(() => {
  //   setTabSelected("");
  // }, []);

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
                    color="primary"
                    sx={{ ml: 1, borderRadius: "5px" }}
                    size="small"
                    label={transactionDetails.total_geral || 0}
                  />
                </div>
              }
              value=""
            />

            <Tab
              label={
                <div>
                  {"Depósitos"}
                  <Chip
                    color="primary"
                    sx={{ ml: 1, borderRadius: "5px" }}
                    size="small"
                    label={transactionDetails.total_deposit || 0}
                  />
                </div>
              }
              value="deposit"
            />
            <Tab
              label={
                <div>
                  {"Saques"}
                  <Chip
                    sx={{ ml: 1, borderRadius: "5px" }}
                    color="error"
                    size="small"
                    label={transactionDetails.total_withdraw || 0}
                  />
                </div>
              }
              value="withdraw"
            />
          </TabList>
        </Box>
      </TabContext>
      <Box mr={4} flex={1} display={"flex"} flexDirection={"row"} justifyContent={"end"} alignItems={"center"}>
        <DateField value={date} onChange={handleDateChange} />
      </Box>
    </Box>
  );
}
