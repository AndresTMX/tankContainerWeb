import { typesBloqueA, BloqueA, typesBloqueB, BloqueB, typesBloqueC, BloqueC, typesBloqueD, BloqueD, typesBloqueE, BloqueE } from "../../layoutData";
import { Modal, Box, Card, Container, Paper, Button, IconButton, CardHeader, CardContent } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GridBlock } from "../../containers/GridBlock";
import CloseIcon from '@mui/icons-material/Close';

function ModalGrid() {

    const { bloque, modal } = useParams();
    const navigate = useNavigate();

    return (
        <>

            <Modal open={modal}>
                <Container>
                    <Paper sx={{ padding: '20px', marginTop:'5%' }}>
                        <IconButton variant="contained" color='error' onClick={() => navigate(`/ubicaciones`)} >
                            <CloseIcon />
                        </IconButton>

                        {(bloque === 'a') &&
                            <GridBlock
                                tipos={typesBloqueA}
                                simulateState={BloqueA}
                                bloque={'a'}
                                levels={['1', '2']}
                            />}



                        {(bloque === 'b') && <GridBlock
                            tipos={typesBloqueB}
                            simulateState={BloqueB}
                            bloque={'b'}
                            levels={['1', '2']}
                        />}


                        {(bloque === 'c') &&
                            <GridBlock
                                tipos={typesBloqueC}
                                simulateState={BloqueC}
                                bloque={'c'}
                                levels={['1', '2']}
                            />}



                        {(bloque === 'd') &&
                            <GridBlock
                                tipos={typesBloqueD}
                                simulateState={BloqueD}
                                bloque={'d'}
                                levels={['1', '2']}
                            />}



                        {(bloque === 'e') && <GridBlock
                            tipos={typesBloqueE}
                            simulateState={BloqueE}
                            bloque={'e'}
                            levels={['1']}
                        />}

                    </Paper>
                </Container>
            </Modal>

        </>
    );
}

export { ModalGrid };