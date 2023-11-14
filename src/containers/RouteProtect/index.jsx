import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate } from "react-router-dom";

function RouteProtect({ children }) {

    const { session, loading } = useContext(AuthContext);

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

    if (!loading && !session?.session) {
        return <Navigate to="/" />;
    }

    return children

}

export { RouteProtect };