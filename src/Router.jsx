//router
import { HashRouter, Routes, Route } from "react-router-dom";
import { UI } from "./UI";
import { PageAdmin } from "./pages/Admin";
import { Login } from "./pages/Login";
import { Perfil } from "./pages/Perfil";
import { Vigilancia } from "./pages/Vigilancia";
import { Maniobras } from "./pages/Maniobras";
import { Reparaciones } from "./pages/Reparaciones";
import { Prelavado } from "./pages/Prelavado";
import { Calidad } from "./pages/Calidad";
import { Lavado } from "./pages/Lavado";
import { ErrorPage } from "./pages/Error";
//theme material ui
import { ThemeProvider, createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#0092ba",
    },
    secondary: {
      main: "#025E73",
    },
  },
});

//context
import { DevelopmentProvider } from "./Context";
import { AuthProvider } from "./Context/AuthContext";
//route protect
import { RouteProtect } from "./Context/AuthContext";

function Router() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <DevelopmentProvider>
            <Routes>

              <Route 
              path="/" 
              element={
                  <Login />
              } />

              <Route
                path="/admin"
                element={
                  <RouteProtect>
                    <UI>
                      <PageAdmin />
                    </UI>
                  </RouteProtect>
                }
              />

              <Route
                path="/perfil"
                element={
                  <RouteProtect>
                    <UI>
                      <Perfil />
                    </UI>
                  </RouteProtect>
                }
              />

              <Route
                path="/vigilancia"
                element={
                  <RouteProtect>
                    <UI>
                      <Vigilancia />
                    </UI>
                  </RouteProtect>
                }
              />

              <Route
                path="/maniobras"
                element={
                  <RouteProtect>
                    <UI>
                      <Maniobras />
                    </UI>
                  </RouteProtect>
                }
              />

              <Route
                path="/reparaciones"
                element={
                  <RouteProtect>
                    <UI>
                      <Reparaciones />
                    </UI>
                  </RouteProtect>
                }
              />

              <Route
                path="/prelavado"
                element={
                  <RouteProtect>
                    <UI>
                      <Prelavado />
                    </UI>
                  </RouteProtect>
                }
              />

              <Route
                path="/calidad"
                element={
                  <RouteProtect>
                    <UI>
                      <Calidad />
                    </UI>
                  </RouteProtect>
                }
              />

              <Route
                path="/lavado"
                element={
                  <RouteProtect>
                    <UI>
                      <Lavado />
                    </UI>
                  </RouteProtect>
                }
              />

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </DevelopmentProvider>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export { Router };
