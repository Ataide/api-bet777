import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid";
import PaperInfo from "@/Components/PaperInfo";

const columns: GridColDef[] = [
  {
    field: "",
    headerName: "",
    sortable: false,
    headerClassName: "super-hidden",
    flex: 1,
    renderCell: (params) => {
      return <PaperInfo paper={params.row} />;
    },
  },
];

export default function DetailsTableTabList() {
  const { userPapers } = usePage<PageProps>().props;
  const [selectedTab, setTabSelected] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabSelected(newValue);
    router.get("", { type: newValue }, { preserveState: true, only: ["userPapers"], preserveScroll: true });
  };

  return (
    <Paper elevation={5} variant="indicator">
      <Box display={"flex"} alignItems={"center"}>
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab
                label={
                  <div>
                    {"Todas"}
                    <Chip
                      color="primary"
                      sx={{ ml: 1, borderRadius: "5px" }}
                      size="small"
                      label={userPapers.total_open + userPapers.total_close}
                    />
                  </div>
                }
                value=""
              />
              <Tab
                label={
                  <div>
                    {"Apostas Abertas"}
                    <Chip
                      color="primary"
                      sx={{ ml: 1, borderRadius: "5px" }}
                      size="small"
                      label={userPapers.total_open}
                    />
                  </div>
                }
                value="-1"
              />
              <Tab
                label={
                  <div>
                    {"Apostas Encerradas"}
                    <Chip
                      sx={{ ml: 1, borderRadius: "5px" }}
                      color="error"
                      size="small"
                      label={userPapers.total_close || 0}
                    />
                  </div>
                }
                value="1"
              />
            </TabList>
          </Box>
        </TabContext>
      </Box>

      {userPapers && userPapers.data.length === 0 ? (
        <Box padding={10}>
          <Typography variant="body1" color="gray" textAlign={"center"}>
            Não há dados
          </Typography>
        </Box>
      ) : (
        <DataGrid
          disableRowSelectionOnClick
          disableColumnSelector
          rows={userPapers.data}
          rowCount={userPapers.total}
          paginationMode="server"
          columns={columns}
          density={"comfortable"}
          // rowHeight={120}
          getRowHeight={() => "auto"}
          initialState={{
            pagination: {
              paginationModel: { page: userPapers.current_page - 1, pageSize: userPapers.per_page },
            },
          }}
          onPaginationModelChange={(model, details) => {
            router.get(
              "",
              { page: model.page + 1, per_page: model.pageSize },
              { preserveState: true, only: ["userPapers"], preserveScroll: true }
            );
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              display: "none",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "inherit",
            },
          }}
          checkboxSelection={false}
        />
      )}
    </Paper>
  );
}
