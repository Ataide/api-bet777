import { createTheme } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#7AFF59",
      contrastText: "#1B1C1B",
    },
    secondary: {
      main: "#1B1C1B",
    },
    error: {
      main: "#F32A5E",
    },
    background: {
      default: "#2e2e2e",
      paper: "#1B1C1B",
    },
    text: {
      primary: "#ffffff",
      secondary: "#1B1C1B",
    },
  },

  typography: {
    fontFamily: ["Poppins", "cursive"].join(","),
    fontWeightRegular: "700",
    body1: {
      color: "#ffffff",
    },

    h3: {
      fontSize: "40px",
    },

    h4: {
      color: "text.primary",
    },
  },

  components: {
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiButtonBase-root": {
            color: theme.palette.common.white,
            textTransform: "none",
          },
        }),
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderStyle: "none",
          ".MuiDataGrid-withBorderColor": {
            borderColor: "#969796",
          },
          ".MuiDataGrid-columnHeadersInner": {
            backgroundColor: "#2E2E2E",
          },
          ".MuiDataGrid-row:hover": {
            cursor: "pointer",
            backgroundColor: "#353535",
          },
          ".MuiCheckbox-root": {
            color: theme.palette.primary.main,
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-row": {
            "& .MuiIconButton-root": {
              backgroundColor: "#2E2E2E",
              "&.Mui-disabled ": {
                "& svg": {
                  fill: "gray",
                },
              },
            },
          },
        }),
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "title" },
          style: {
            fontSize: "40px",
            color: "primary.main",
          },
        },
      ],
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& svg": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },

    MuiPaper: {
      variants: [
        {
          props: { variant: "indicator" },
          style: {
            borderRadius: "10px",
          },
        },
      ],
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiDayCalendar-weekDayLabel": {
            color: theme.palette.primary.main,
          },
          "& .MuiPickersArrowSwitcher-button": {
            color: theme.palette.primary.main,
          },
          "& .MuiPickersCalendarHeader-switchViewIcon": {
            color: theme.palette.primary.main,
          },
          "& .MuiClockNumber-root": {
            color: theme.palette.common.white,
          },
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "10px",
            ".MuiTypography-root": {
              color: theme.palette.common.black,
            },
          },
          ":hover": {
            borderRadius: "10px",
            backgroundColor: "#a0a0a0",
          },
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: "none",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: "36.6px",
          textTransform: "none",
          borderRadius: "10px",
          "& .MuiButton-endIcon": {
            position: "relative",
            right: "0",
          },
          "& .MuiTypography-root": {
            flexGrow: 1,
            fontSize: "12px",
            fontWeight: "700",
          },
          "&:hover": {
            color: "#fff",
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            fontSize: "32px",
          },
          // "& .MuiBottomNavigationAction-root": {
          //   padding: 0,
          // },
          "& .MuiBottomNavigationAction-label.Mui-selected": {
            display: "none",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiTablePagination-actions": {
            svg: {
              color: theme.palette.primary.light,
            },
          },
          height: "90px",
        }),
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: 400,
          padding: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&.Mui-disabled": {
            textFillColor: "#fff",
            borderRadius: "10px",
            backgroundColor: "#1B1C1B",
          },
        },
        root: {
          fontWeight: 400,
          fontSize: "13px",
          "& input::placeholder": {
            fontSize: "13px",
          },
          borderRadius: "10px !important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontWeight: 400,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: 6,
          marginBottom: 6,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "primary" && {
            // backgroundColor: "#1B1C1B",
            color: "#fff",
            borderRadius: "10px !important",
            ".MuiOutlinedInput-notchedOutline": {
              border: "1px solid #7AFF59",
            },
          }),
          ...(ownerState.color === "secondary" && {
            backgroundColor: "#2E2E2E",
            color: "#fff",
            borderRadius: "10px !important",
            // ".MuiOutlinedInput-notchedOutline": {
            //   border: "1px solid #7AFF59",
            // },
          }),
        }),
      },
    },
  },
});

export default theme;
