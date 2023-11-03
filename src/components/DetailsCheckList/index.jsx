import { useState } from "react";
import { Box, Chip, Stack, Button, IconButton, Typography, Modal, Paper, Divider, Fade } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import useMediaQuery from "@mui/material/useMediaQuery";

function DetailsCheckList({ hora, linea, tracto, tanque, operador, celular, action, submit }) {

    const IsExtraSmall = useMediaQuery('(max-width:750px)');

    const dateTransform = `${hora.$H}:${hora.$m}`

    const [modal, setModal] = useState({modal1:false, modal2:false});

    const ToggleModal = () => {
        setModal({...modal, modal1: !modal.modal1})
    }

    const ShowModalWarning = () => {
        setModal({...modal, modal2: !modal.modal2})
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
                    onClick={ShowModalWarning}
                    variant='contained'
                    >
                        Check
                    </Button>
                    <IconButton
                        variant="contained"
                        color='error'
                        onClick={ToggleAction}
                    >
                        <DoDisturbIcon/>
                    </IconButton>
                    </>}
                    <Stack flexDirection='row' flexWrap={IsExtraSmall? 'wrap' :'nowrap'} gap='10px' width={IsExtraSmall? '100%': 'auto'} >
                        <span>{linea}</span>
                        <Divider orientation={'vertical'} flexItem />
                        <span>{tracto}</span>
                        <Divider orientation={'vertical'} flexItem />
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
                    variant='contained'
                    onClick={ShowModalWarning}
                    >
                        Check
                    </Button>
                    <IconButton
                        variant="contained"
                        color='error'
                        onClick={ToggleAction}
                    >
                        <DoDisturbIcon/>
                    </IconButton>
                    </>}
                </Box>
            </Paper>

            <Modal
                open={modal.modal1}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
            >
                <Fade
                 in={modal.modal1}
                 timeout={500}
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
                </Fade>
            </Modal>

            <Modal
                open={modal.modal2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
            >
                <Fade
                in={modal.modal2}
                timeout={500}
                >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        width: 'auto',
                        padding: '20px',
                        borderRadius: '4px'
                    }}
                >
                    <Typography variant="h6">¿Desea completar el check list?</Typography>
                    
                    <Stack 
                    width={'100%'}
                    gap='10px'
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    >

                    <Button
                        fullWidth
                        variant="contained"
                        color='primary'
                        size="small"
                        onClick={ShowModalWarning}>
                        completar
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color='error'
                        size="small"
                        onClick={ShowModalWarning}>
                        cancelar
                    </Button>
                    </Stack>

                </Box>
                </Fade>
            </Modal>
        </>
    );
}

export { DetailsCheckList };