//router
import { HashRouter, Routes, Route } from "react-router-dom"
import { UI } from "./UI"
import { Login } from "./pages/Login"
import { Vigilancia } from "./pages/Vigilancia"
import { ErrorPage } from "./pages/Error"
import { Maniobras } from "./pages/Maniobras"
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
        path="*"
        element={<ErrorPage/>}
        />

      </Routes>
    </HashRouter>
  </ThemeProvider>
  )
}

export {Router}
