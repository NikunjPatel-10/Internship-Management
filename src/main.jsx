import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
// core styles are required for all packages
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter } from "react-router-dom";
import { variantColorResolver } from "./shared/common-components/StatusBadge.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import ContextProvider from "./shared/store/ContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <BrowserRouter>
        <MantineProvider
          // Inclueded custom theme color
          theme={{
            primaryColor: "bright-blue",
            colors: {
              "bright-blue": [
                "#00488a",
                "#00488a",
                "#00488a",
                "#00488a",
                "#00488a",
                "#00488a",
                "#00488a",
                "#00488a",
                "#00488a",
                "#00488a",
              ],
            },
            variantColorResolver,
          }}
        >
          <ContextProvider>
          <App />
          </ContextProvider>
        </MantineProvider>
      </BrowserRouter>
  </React.StrictMode>
);
