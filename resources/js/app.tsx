import "./bootstrap";
import "../css/app.css";
import "react-toastify/dist/ReactToastify.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ToastContainer } from "react-toastify";
import { InertiaProgress } from "@inertiajs/progress";

const appName = import.meta.env.VITE_APP_NAME || "Bet Admin";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob("./Pages/**/*.tsx")),
  setup({ el, App, props }) {
    const root = createRoot(el);

    InertiaProgress.init({ showSpinner: false });

    root.render(
      <>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ToastContainer />

            <App {...props} />
          </LocalizationProvider>
        </ThemeProvider>
      </>
    );
  },

  progress: {
    color: "#7AFF59",
  },
});
