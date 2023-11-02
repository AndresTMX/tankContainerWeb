import { useState } from "react";
import { Box, Chip, Stack, Button, IconButton, Typography, Modal, Paper, Divider } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import useMediaQuery from "@mui/material/useMediaQuery";

function DetailsCheckList({ hora, linea, tracto, tanque, operador, celular, action }) {

    const IsSmall = useMediaQuery('(max-width:950px)');
    const IsExtraSmall = useMediaQuery('(max-width:750px)');

    const dateTransform = `${hora.$H}:${hora.$m}`

    const [modal, setModal] = useState(false);

    const ToggleModal = () => {
        setModal(!modal)
    }

    const ToggleAction = () => {
        if (action) {
            action()
        }
    }

    return (
        <>
            <Paper
                elevation={4}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap:'wrap',
                        alignItems: 'center',
                        gap: '20px',
                        backgroundColor: 'whitesmoke',
                        padding: '20px',
                        borderRadius: '4px',
                    }}
                >
                    <Chip color='info' label={dateTransform} icon={<AccessTimeIcon />} sx={{ fontWeight: 500, paddingRight: '2px' }} />
                    {IsExtraSmall && 
                    <>
                    <IconButton
                        color="primary"
                        onClick={ToggleModal}>
                        <ContactPhoneIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        color='error'
                        onClick={ToggleAction}
                    >Descartar</Button>
                    </>}
                    <Stack flexDirection='row' flexWrap={IsExtraSmall? 'wrap' :'nowrap'} gap='10px' width={IsExtraSmall? '100%': 'auto'} >
                        <span>{linea}</span>
                        <Divider orientation={IsSmall? 'horizontal' : 'vertical'} flexItem />
                        <span>{tracto}</span>
                        <Divider orientation={IsSmall? 'horizontal' : 'vertical'} flexItem />
                        <span>{tanque}</span>
                    </Stack>

                    {!IsExtraSmall && 
                    <>
                    <IconButton
                        color="primary"
                        onClick={ToggleModal}>
                        <ContactPhoneIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        color='error'
                        onClick={ToggleAction}
                    >Descartar</Button>
                    </>}
                </Box>
            </Paper>

            <Modal
                open={modal}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        alignItems: 'start',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        width: 'auto',
                        padding: '20px',
                        borderRadius: '4px'
                    }}
                >
                    <Typography variant="h6">Informacion del operador</Typography>

                    <Stack spacing='0px'>
                        <strong>Nombre del operador</strong>
                        <p>{operador}</p>
                    </Stack>

                    <Stack spacing='0px'>
                        <strong>Contacto</strong>
                        <p>{celular}</p>
                    </Stack>

                    <Button
                        fullWidth
                        variant="contained"
                        color='error'
                        onClick={ToggleModal}>
                        cerrar
                    </Button>


                </Box>
            </Modal>
        </>
    );
}

export { DetailsCheckList };