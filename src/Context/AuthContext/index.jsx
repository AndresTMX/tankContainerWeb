import { createContext } from "react";
import { Container } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSupabase } from "../../Hooks/useSupabase";
import CircularProgress from "@mui/material/CircularProgress";
import { useSession } from "../../Hooks/sessionManagment/useSession";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const { supabase } = useSupabase();

    const logIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            console.log("🚀 ~ file: index.jsx:21 ~ logIn ~ data:", data)
            console.log(email, password)
        } catch (error) {
            
        }
    }

    const logOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
        } catch (error) {

        }
    }

    const auth = { logIn, logOut }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };


function RouteProtect({ children }) {

    const { session, loading } = useSession();
    const location = useLocation()
    const routeCurrent = location.pathname;

    const routes = [
        {
            rol: 'admin',
            routes: ['/', '/admin', 'developer', '/perfil', '/vigilancia', '/maniobras', '/reparaciones', '/prelavado', '/calidad', '/lavado']
        },
        {
            rol: 'developer',
            routes: ['/', '/admin', 'developer', '/perfil', '/vigilancia', '/maniobras', '/reparaciones', '/prelavado', '/calidad', '/lavado']
        },
        {
            rol: 'vigilante',
            routes: ['/', '/vigilancia',]
        },
    ]

    function asignedModules(routes, userRol, pathname) {

        const licenses = routes.find((route) => route.rol === userRol);

        const routesAprove = licenses?.routes;

        if (routesAprove.includes(pathname)) {
            return children
        } else {
            return <Navigate to={routesAprove[1]} />
        }

    }

    if (loading) {
        return (
            <Container
                maxWidth='xxs'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: 'whitesmoke',


                }}>
                <CircularProgress />
            </Container>
        )
    }

    if (!loading && !session) {
        return <Navigate to="/" />;
    }

    return asignedModules(routes, session.rol, routeCurrent);


}

export { RouteProtect };
