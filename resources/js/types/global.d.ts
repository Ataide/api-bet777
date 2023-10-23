import { AxiosInstance } from "axios";
import ziggyRoute, { Config as ZiggyConfig } from "ziggy-js";

declare global {
  interface Window {
    axios: AxiosInstance;
  }

  var route: typeof ziggyRoute;
  var Ziggy: ZiggyConfig;
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    indicator: true;
  }
}

// declare module '@inertiajs/core' {
//   interface PageProps extends Page<PageProps> {
//       auth: {
//           status: number | null
//           user: {
//               id: number
//               name: string
//           }
//       }
//       route: {
//           name: string
//       }
//   }
// }
