import { Modal, Container, Paper, Stack, Button, Fade, } from "@mui/material";
import { InputText } from "../InputText";

function FormAddTransporters({transporter, setTransporter, addTransporter, transporterModal, toggleModal }) {

    return ( 
        <>
        <Modal open={transporterModal}>
            <Fade in={transporterModal} timeout={500}>
                <Container 
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    placeItems:'center',
                    minHeight:'100vh',
                    paddingTop:'100px'
                }}>
                    <form onSubmit={addTransporter}>
                    <Paper 
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        placeItems:'center',
                        padding:'20px',
                        gap:'10px'
                    }}
                    elevation='4'>

                        <InputText
                         label='Linea transportista'
                         value={transporter}
                         onChangue={(e) => setTransporter(e.target.value)}
                         width={'100%'}
                         required={true}
                        />

                        <Stack 
                        gap='10px'
                        alignItems='center'
                        justifyContent='space-between'
                        flexDirection='row'
                        >
                        <Button
                        variant="contained"
                        color="error"
                        onClick={toggleModal}
                        >
                            Cancelar
                        </Button>

                        <Button
                        type='submit'
                        variant="contained"
                        color="primary"
                        >
                            Agregar
                        </Button>
                        </Stack>

                    </Paper>
                    </form>
                </Container>
            </Fade>
        </Modal>
        </>
     );
}

export {FormAddTransporters};