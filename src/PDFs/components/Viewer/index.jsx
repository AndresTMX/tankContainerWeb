import { Container, Modal, Fade, Box, Paper, Button } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";

function ViewerDocument({ children, stateModal, ToggleModal }) {

    return (
        <>
            <Modal open={stateModal}>
                <Fade in={stateModal}>
                    <Container sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ height: '90%', width: '100%' }}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px', gap: '10px' }}>
                                <Button
                                    onClick={ToggleModal}
                                    variant="contained"
                                    color="error"
                                >
                                    Cerrar</Button>
                                <PDFViewer style={{ width: '100%', height: '90%', }}>
                                    {children}
                                </PDFViewer>
                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>
        </>
    );
}

export { ViewerDocument };

export function ViewerProforma({ children, ToggleModal, stateModal }) {

    return (
        <>
            <Modal open={stateModal}>
                <Fade in={stateModal}>
                    <Container sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ height: '90%', width: '100%' }}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px', gap: '10px' }}>
                                <Button
                                    onClick={ToggleModal}
                                    variant="contained"
                                    color="error"
                                >
                                    Cerrar</Button>
                                <PDFViewer style={{ width: '100%', height: '90%', }}>
                                    {children}
                                </PDFViewer>
                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>
        </>
    )
}