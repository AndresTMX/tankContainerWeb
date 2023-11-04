import { useState } from "react";
import { Box, Button, IconButton, Chip, Stack, Modal, Typography, Divider, Fade, Icon } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

function HistoryItem({ hora, linea, tracto, tipo, tanque, operador, celular, firma, children }) {

    const IsSmall = useMediaQuery('(max-width:840px)');
    const IsExtraSmall = useMediaQuery('(max-width:450px)');

    const dayTransform = `${hora.$D}/${hora.$H}/${hora.$y}`

    const dateTransform = `${hora.$H}:${hora.$m}`

    const sliceName = operador.split(' ').slice(0, 2);

    const shortName = `${sliceName[0]} ${sliceName[1]}`;

    const [modal, setModal] = useState({modal1: false, modal2:false});

    const ToggleModalInfoOperator = () => {
        setModal({...modal, modal1: !modal.modal1})
    }

    const ToggleModalInfoDate = () => {
        setModal({...modal, modal2: !modal.modal2})
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: IsSmall ? 'column' : 'row',
                    gap: '10px',
                    justifyContent: 'space-between',
                    backgroundColor: 'whitesmoke',
                    padding: '20px',
                    borderRadius: '4px',
                    minWidth: '300px'
                }}>
                <Stack flexDirection='row' alignItems='center'>
                    <Chip 
                    color='info' 
                    label={dateTransform} 
                    icon={<AccessTimeIcon />} 
                    sx={{ fontWeight: 500, paddingRight: '2px' }}
                    onClick={ToggleModalInfoDate}
                    />
                </Stack>

                <Stack
                    width={IsSmall ? 'auto' : '400px'}
                    flexDirection={IsExtraSmall ? 'column' : 'row'}
                    justifyContent={IsExtraSmall ? 'flex-start' : 'space-around'}
                    alignItems={IsSmall ? 'start' : 'center'}
                    gap='10px'>
                    <span>{linea}</span>
                    <Divider orientation={IsExtraSmall ? 'horizontal' : 'vertical'} flexItem />
                    <span>{tracto}</span>
                    <Divider orientation={IsExtraSmall ? 'horizontal' : 'vertical'} flexItem />
                    <span>{tanque}</span>
                    {!IsSmall && <Divider orientation='vertical' flexItem />}
                </Stack>

                <Stack
                    flexDirection={IsSmall ? 'column' : 'row'}
                    width={IsSmall ? '100%' : '300px'}
                    alignItems={IsSmall ? 'start' : 'center'}
                    justifyContent='space-between'
                    gap='10px'>
                    <span>{shortName}</span>
                    <Stack flexDirection='row'>
                        {children}
                        <IconButton
                            color="primary"
                            onClick={ToggleModalInfoOperator}>
                            <ContactPhoneIcon />
                        </IconButton>
                    </Stack>

                </Stack>
            </Box>

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
                    timeout={500}
                    in={modal.modal1}
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
                        <Typography variant='h6'>Informacion del operador</Typography>
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
                            onClick={ToggleModalInfoOperator}>
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
                    timeout={500}
                    in={modal.modal2}
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
                        <Typography variant='h6'>Detalles de fecha y hora</Typography>
                        <Stack spacing='0px'>
                            <strong>Fecha de ingreso</strong>
                            <p>{operador}</p>
                        </Stack>

                        <Stack spacing='0px'>
                            <strong>Hora de ingreso</strong>
                            <p>{celular}</p>
                        </Stack>

                        <Button
                            fullWidth
                            variant="contained"
                            color='error'
                            onClick={ToggleModalInfoDate}>
                            cerrar
                        </Button>

                    </Box>
                </Fade>


            </Modal>
        </>
    );
}

export { HistoryItem };