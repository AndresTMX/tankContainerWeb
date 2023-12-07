//imports hooks
import { useEffect, useContext } from "react";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
//imports materialui
import { Container, Box, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
//components
import { RegisterVigilancia } from "../../components/RegistersVigilancia";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { Notification } from "../../components/Notification";

function Vigilancia() {

    const [state, dispatch] = useContext(ManiobrasContext)
    const IsSmall = useMediaQuery('(max-width:900px)');

    useEffect(() => {
        dispatch({ type: actionTypes.setTypeRegister, payload: 'entrada' })
    }, [])

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '20px',
                    alignItems: IsSmall ? '' : 'center',
                    minHeight: '100%',
                }}
            >
                <Box>
                    <RegisterVigilancia />
                </Box>

            </Container>

            <Notification />
        </>
    );
}

export { Vigilancia };