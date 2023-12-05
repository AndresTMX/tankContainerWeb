import { Container, Box, Paper, Modal, Fade, Button, Typography, Stack } from "@mui/material";
//hooks

//context
import { useContext } from "react";
import { actionTypes } from "../../Reducers/PrelavadoReducer";
import { PrelavadoContext } from "../../Context/PrelavadoContext";

function FormWashing() {

    const [state, dispatch] = useContext(PrelavadoContext);

    const toggleModal = () => {
        dispatch({
            type:actionTypes.setModalForm,
            payload: !state.modalForm
        })
    }

    return ( 
        <>
        <Modal open={state.modalForm} >
            <Fade in={state.modalForm}>
                <Container
                sx={{
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'column',
                    justifyContent:'center',
                    minHeight:'100vh'
                }}
                >
                    <Box>
                        <Paper 
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            gap:'20px',
                            padding:'15px'
                        }}
                        >

                            <Typography>Formulario de lavado</Typography>

                            <Stack flexDirection='row' gap='10px'>
                            <Button
                            color="error"
                            variant="contained"
                            >
                                Cerrar
                            </Button>
                            <Button
                            onClick={toggleModal}
                            variant="contained"
                            color="primary"
                            >
                                Lavar
                            </Button>
                            </Stack>

                        </Paper>
                    </Box>
                </Container>
            </Fade>
        </Modal>
        </>
     );
}

export {FormWashing};