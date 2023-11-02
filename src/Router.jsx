//router
import { HashRouter, Routes, Route } from "react-router-dom"
import { UI } from "./UI"
import { Login } from "./pages/Login"
import { Perfil } from "./pages/Perfil"
import { Vigilancia } from "./pages/Vigilancia"
import { Maniobras } from "./pages/Maniobras"
import { Reparaciones } from "./pages/Reparaciones"
import { Prelavado } from "./pages/Prelavado"
import { Calidad } from "./pages/Calidad"
import { Lavado } from "./pages/Lavado"
import { ErrorPage } from "./pages/Error"
//theme material ui
import { ThemeProvider ,createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#0092ba',
    },
    secondary: {
      main: '#025E73',
    },
  },
});

function Router() {

  return (
  <ThemeProvider theme={theme}>
    <HashRouter>
      <Routes>

      <Route
        path="/"
        element={
            <Login/>
        }
        />

        <Route
        path="/perfil"
        element={
          <UI>
            <Perfil/>
          </UI>
        }
        />

        <Route
        path="/vigilancia"
        element={
          <UI>
            <Vigilancia/>
          </UI>
        }
        />

        <Route
        path="/maniobras"
        element={
          <UI>
            <Maniobras/>
          </UI>
        }
        />

        <Route
        path="/reparaciones"
        element={
          <UI>
            <Reparaciones/>
          </UI>
        }
        />

        <Route
        path="/prelavado"
        element={
          <UI>
            <Prelavado/>
          </UI>
        }
        />

        <Route
        path="/calidad"
        element={
          <UI>
            <Calidad/>
          </UI>
        }
        />

        <Route
        path="/lavado"
        element={
          <UI>
            <Lavado/>
          </UI>
        }
        />

         <Route
        path="*"
        element={<ErrorPage/>}
        />

      </Routes>
    </HashRouter>
  </ThemeProvider>
  )
}

export {Router}
