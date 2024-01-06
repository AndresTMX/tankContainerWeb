import { Modal, Fade, Box, Typography, Button } from "@mui/material";
import { TextGeneral } from "../TextGeneral";

function ModalInfoOperator({ modal, toggleModal, nombre, contacto }) {

    return (
        <Modal
            open={modal}
            sx={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                alignItems: "center",
                paddingTop:'5%'
            }}
        >
            <Fade timeout={300} in={modal}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "white",
                        flexDirection: "column",
                        borderRadius: "4px",
                        alignItems: "start",
                        padding: "20px",
                        width: "auto",
                        gap: "15px",
                    }}
                >
                    <Typography variant="h6">Información del operador</Typography>

                    <TextGeneral text={nombre} label="Nombre del operador" />
                    <TextGeneral
                        text={contacto}
                        label="Contacto del operador"
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={toggleModal}
                    >
                        cerrar
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
}

export { ModalInfoOperator };