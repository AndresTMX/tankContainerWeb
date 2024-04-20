//router
import { HashRouter, Routes, Route } from "react-router-dom";
import { UI } from "./UI";
import { PageAdmin } from "./pages/Admin";
import { ImportacionPage } from "./pages/Importacion";
import { Transportista } from "./pages/Transportista";
import { Login } from "./pages/Login";
import { Perfil } from "./pages/Perfil";
import { Vigilancia } from "./pages/Vigilancia";
import { Maniobras } from "./pages/Maniobras";
import { Reparaciones } from "./pages/Reparaciones";
import { ManiobrasForm } from "./pages/ManiobrasForm";
import { Programacion } from "./pages/Programacion";
import { Prelavado } from "./pages/Prelavado";
import { ModalChecklistPrelavado } from "./components/ModalChecklistPrelavado";
import { Calidad } from "./pages/Calidad";
import { Lavado } from "./pages/Lavado";
import { Layout } from "./pages/Layout";
import { ErrorPage } from "./pages/Error";
import { ItemGridInfo } from "./outlets/ItemGridInfo";
import { AssignItem } from "./outlets/AssignItem";
import { ModalGrid } from "./outlets/ModalGrid";
//Outlets programacion
import { EntradasVigilancia } from "./components/Vigilancia/Entradas";
import { SalidasVigilancia } from "./components/Vigilancia/Salidas";
import { AgregarCarga } from "./components/AgregarCarga";
import { EditarManiobra } from "./components/EditarManiobra";
import { NuevaSalida } from "./components/NuevaSalida";
import { ProgramacionProvider } from "./Context/ProgramacionContext";
import { SolicitudesDeLavado } from "./components/Programacion/almacenados";
import { TanquesProgramados } from "./components/Programacion/programados";
import { ConfirmarSolicitud } from "./components/Programacion/almacenados";
import { ReprogramarLavado } from "./components/Programacion/programados";
import { LavadosPendientes } from "./components/LavadosPendientes";
import { Prelavados } from "./components/Calidad/Prelavados";
import { PrelavadosPendientes } from "./components/Calidad/Prelavados/PrelavadosPendientes";
import { RevisionPrelavado } from "./components/Calidad/Prelavados/RevisionPrelavado";
import { HistorialPrelavados } from "./components/Calidad/Prelavados/HistorialPrelavados";
//theme material ui
import { ThemeProvider, createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#0092ba",
      border: '#E4E4E7',
    },
    secondary: {
      main: "#025E73",
    },
  },
});

//context
import { AuthProvider } from "./Context/AuthContext";
import { GlobalProvider } from "./Context/GlobalContext";
import { VigilanciaProvider } from "./Context/VigilanciaContext";
import { ManiobrasProvider } from "./Context/ManiobrasContext";
import { ReparacionesProvider } from "./Context/ReparacionesContext";
import { PrelavadoProvider } from "./Context/PrelavadoContext";
import { LavadoProvider } from "./Context/LavadosContext";
import { CalidadProvider } from "./Context/CalidadContext";
import { TransportistaProvider } from "./Context/TransportistaContext";
//route protect
import { RouteProtect } from "./Context/AuthContext";

function Router() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <GlobalProvider>
            <Routes>

              <Route path="/"
                element={
                  <Login />
                } />

              <Route path="/admin"
                element={
                  <RouteProtect>
                    <UI>
                      <PageAdmin />
                    </UI>
                  </RouteProtect>
                }
              />

              <Route path="/perfil"
                element={
                  <RouteProtect>
                    <UI>
                      <Perfil />
                    </UI>
                  </RouteProtect>
                }
              />

              <Route path="/importaciones"
                element={
                  <RouteProtect>
                    <UI>
                      <ImportacionPage />
                    </UI>
                  </RouteProtect>
                }
              />

              <Route path="/transportista"
                element={
                  <RouteProtect>
                    <TransportistaProvider>
                      <UI>
                        <Transportista />
                      </UI>
                    </TransportistaProvider>
                  </RouteProtect>
                }
              />

              <Route path="/vigilancia"
                element={
                  <RouteProtect>
                    <UI>
                      <VigilanciaProvider>
                        <Vigilancia />
                      </VigilanciaProvider>
                    </UI>
                  </RouteProtect>
                }
              >

                <Route path="/vigilancia/entradas" element={<EntradasVigilancia />} />

                <Route path="/vigilancia/salidas" element={<SalidasVigilancia />} />


              </Route>

              <Route path="/maniobras"
                element={
                  <RouteProtect>
                    <UI>
                      <ManiobrasProvider>
                        <Maniobras />
                      </ManiobrasProvider>
                    </UI>
                  </RouteProtect>
                }
              >

                <Route path="/maniobras/adicion/:registro" element={<AgregarCarga />} />

                <Route path="/maniobras/edicion/:items" element={<EditarManiobra />} />

                <Route path="/maniobras/nueva-salida/:registro" element={<NuevaSalida />} />

              </Route>

              <Route path="/create_maniobra"
                element={
                  <RouteProtect>
                    <ManiobrasForm />
                  </RouteProtect>
                }
              />

              <Route path="/reparaciones"
                element={
                  <RouteProtect>
                    <ReparacionesProvider>
                      <UI>
                        <Reparaciones />
                      </UI>
                    </ReparacionesProvider>
                  </RouteProtect>
                }
              />

              <Route path="/programacion"
                element={
                  <RouteProtect>
                    <ProgramacionProvider>
                      <UI>
                        <Programacion />
                      </UI>
                    </ProgramacionProvider>
                  </RouteProtect>
                }
              >

                <Route path="/programacion/solicitudes" element={<SolicitudesDeLavado />} >
                  <Route path="/programacion/solicitudes/programar/:solicitud/:id" element={<ConfirmarSolicitud />} />
                </Route>


                <Route path="/programacion/programados" element={<TanquesProgramados />} >
                  <Route path="/programacion/programados/reprogramar/:tanque" element={<ReprogramarLavado />} />
                </Route>


              </Route>

              <Route path="/prelavado"
                element={
                  <RouteProtect>
                    <PrelavadoProvider>
                      <UI>
                        <Prelavado />
                      </UI>
                    </PrelavadoProvider>
                  </RouteProtect>
                }
              >
                <Route path="/prelavado/checklist/:lavado" element={<ModalChecklistPrelavado />} />
              </Route>

              <Route path="/calidad"
                element={
                  <RouteProtect>
                    <CalidadProvider>
                      <UI>
                        <Calidad />
                      </UI>
                    </CalidadProvider>
                  </RouteProtect>
                }
              >

                <Route path="/calidad/prelavados" element={<Prelavados />}>
                  <Route path="/calidad/prelavados/pendientes" element={<PrelavadosPendientes />}>
                    <Route path="/calidad/prelavados/pendientes/historial-prelavado/:data" element={<HistorialPrelavados />} />
                    <Route path="/calidad/prelavados/pendientes/revision-prelavado/:id" element={<RevisionPrelavado />} />
                  </Route>

                  <Route path="/calidad/prelavados/realizados" element={<p>realizados</p>} >

                  </Route>

                </Route>


                <Route path="/calidad/lavados" element={<p>lavados</p>} >

                  <Route path="/calidad/lavados/pendientes" element={<p>pendientes</p>}>
                    <Route path="/calidad/lavados/pendientes/historial-prelavados/:id" element={<p>ewdqed</p>} />

                  </Route>

                  <Route path="/calidad/lavados/realizados" element={<p>realizados</p>} >
                    <Route path="/calidad/lavados/realizados/historial-prelavados/:id" element={<p>ewdqed</p>} />
                  </Route>

                </Route>

                <Route path="/calidad/liberados" element={<p>liberados</p>} >

                  <Route path="/calidad/liberados/pendientes" element={<p>pendientes</p>}>
                    <Route path="/calidad/liberados/pendientes/historial-prelavados/:id" element={<p>ewdqed</p>} />

                  </Route>

                  <Route path="/calidad/liberados/realizados" element={<p>realizados</p>} >
                    <Route path="/calidad/liberados/realizados/historial-prelavados/:id" element={<p>ewdqed</p>} />
                  </Route>

                </Route>



              </Route>

              <Route
                path="/lavado"
                element={
                  <RouteProtect>
                    <LavadoProvider>
                      <UI>
                        <Lavado />
                      </UI>
                    </LavadoProvider>
                  </RouteProtect>
                }
              >

                <Route path="/lavado/pendientes" element={<LavadosPendientes />} />

                <Route path="/lavado/realizados" element={<p>realizados</p>} />


              </Route>

              <Route
                path="/ubicaciones"
                element={
                  <RouteProtect>
                    <UI>
                      <Layout />
                    </UI>
                  </RouteProtect>
                }
              >

                <Route path="/ubicaciones/layout/:bloque/:modal" element={<ModalGrid />} />

                <Route path="/ubicaciones/layout/asignacion/:item" element={<AssignItem />} />

                <Route path="/ubicaciones/layout/info/:item" element={<ItemGridInfo />} />

              </Route>

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </GlobalProvider>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export { Router };
