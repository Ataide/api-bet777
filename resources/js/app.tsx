import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const appName = import.meta.env.VITE_APP_NAME || "Bet Admin";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob("./Pages/**/*.tsx")),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App {...props} />
          </LocalizationProvider>
        </ThemeProvider>
      </>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
