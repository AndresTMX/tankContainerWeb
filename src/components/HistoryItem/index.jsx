import { useState } from "react";
import { Box, Button, IconButton, Chip, Stack, Modal, Typography, Divider, Fade, Paper } from "@mui/material";
import { TextGeneral } from "../TextGeneral";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePostRegister } from "../../Hooks/registersManagment/usePostRegister";
//icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import InfoIcon from '@mui/icons-material/Info';
//helpers 
import { dateMXFormat, datetimeMXFormat } from "../../Helpers/date";

function HistoryItem({ data, type }) {

    const { sendRegisters } = usePostRegister();
    const IsSmall = useMediaQuery('(max-width:900px)');
    const IsExtraSmall = useMediaQuery('(max-width:450px)');

    //datos

    const linea = data.registros_detalles[0].transportistas.name;
    const tracto = data.registros_detalles[0].tracto;
    const tanques = data.registros_detalles.map((registro) => ({
        id: registro.id,
        tanque: registro.numero_tanque
    }));
    const operador = data.registros_detalles[0].operadores;

    //numero de tanques por carga
    const numeroTanques = data.registros_detalles.length;

    //tipo de carga
    const typeRegister = data.tipo_registro;

    const typeChargue = data.registros_detalles[0].carga;

    //fecha y hora de entrada formateada
    const dayInput = dateMXFormat(data.date_time);

    const dateInput = datetimeMXFormat(data.date_time);

    //Nmbre corto del operador
    const OperatorSliceName = operador.nombre.split(' ').slice(0, 2);
    const shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;

    const [modal, setModal] = useState({ modal1: false, modal2: false, modal3: false });

    const ToggleModalInfoOperator = () => {
        setModal({ ...modal, modal1: !modal.modal1 })
    }

    const sendExitRegister = (register) => {
        console.log(register)
    }

    const checkRegister = (register) => {
        console.log(register)
    }

    return (
        <Paper
            elevation={4}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
            }}>

                <Stack
                    spacing='8px'
                    flexDirection='column'>

                    <Stack
                        flexDirection='row'
                        justifyContent='space-between'
                        flexWrap='wrap'
                        gap='10px'
                    >

                        <Stack
                            flexDirection='row'
                            alignItems='center'
                            flexWrap='wrap'
                            gap='10px'
                        >
                            <Chip
                                size="small"
                                color={typeRegister === 'entrada' ? 'success' : 'warning'}
                                label={typeRegister}
                                icon={
                                    typeRegister === 'entrada' ?
                                        <KeyboardDoubleArrowRightIcon />
                                        :
                                        <KeyboardDoubleArrowLeftIcon />
                                }
                                sx={{
                                    maxWidth: '100px',
                                    fontWeight: 500,
                                    padding: '5px',
                                }}
                            />

                            <Chip
                                size="small"
                                color='secondary'
                                label={dayInput}
                                icon={<CalendarTodayIcon />}
                                sx={{
                                    width: '120px',
                                    fontWeight: 500,
                                    padding: '5px'
                                }}
                            />

                            <Chip
                                size="small"
                                color='info'
                                label={dateInput}
                                icon={<AccessTimeIcon />}
                                sx={{
                                    maxWidth: '90px',
                                    fontWeight: 500,
                                    padding: '5px'
                                }}
                            />
                        </Stack>

                        {(type === 'vigilancia' && typeChargue == 'Pipa') && (
                            <Button
                                onClick={() => sendExitRegister(data)}
                                size="small"
                                variant="contained"
                                color="info">
                                marcar salida
                            </Button>
                        )}

                        {type === 'maniobras' && (
                            <Button
                                onClick={() => checkRegister(data)}
                                size="small"
                                variant="contained"
                                color="info">
                                check
                            </Button>
                        )}

                    </Stack>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: IsSmall ? 'column' : 'row',
                            gap: '10px',
                            justifyContent: 'space-between',
                            alignItems: !IsSmall ? 'center' : 'start',
                            backgroundColor: 'whitesmoke',
                            borderRadius: '4px',
                            padding: '15px'
                        }}
                    >
                        <Stack
                            sx={{ maxWidth: '700px' }}
                            width={IsSmall ? '100%' : '550px'}
                            flexDirection={IsSmall ? 'column' : 'row'}
                            justifyContent={IsSmall ? 'flex-start' : 'space-around'}
                            alignItems={IsSmall ? 'start' : 'center'}
                            gap='10px'>
                            <TextGeneral text={linea} label="Linea" />
                            <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                            <TextGeneral label='Tracto' text={tracto} />
                            <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                            <TextGeneral label='Tipo de carga' text={typeChargue} />
                        </Stack>

                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent='space-between'
                            gap='10px'>
                            {!IsSmall && <Divider orientation='vertical' flexItem />}
                            <TextGeneral label='Operador' text={shortNameOperator} />
                            <Stack flexDirection='row' gap='10px'>
                                <IconButton
                                    color="info"
                                    onClick={ToggleModalInfoOperator}>
                                    <InfoIcon />
                                </IconButton>
                            </Stack>

                        </Stack>
                    </Box>

                    {(typeChargue === 'Tanque') && (
                        <Stack
                            justifyContent='center'
                            spacing='10px'
                            sx={{
                                borderRadius: '4px',
                                backgroundColor: 'whitesmoke',
                                padding: '15px'
                            }}>
                            <strong>Tanques</strong>
                            {tanques.map((tanque, index) => (
                                <>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                        <TextGeneral
                                            variant='row'
                                            label={`# ${index + 1}`}
                                            text={tanque.tanque} />


                                        {(type === 'vigilancia' ) && (
                                             <Button
                                             onClick={() => sendExitRegister(data)}
                                            size="small"
                                            variant="contained"
                                            color="info">
                                            marcar salida
                                         </Button>
                                        )}

                                        {(type === 'maniobras' ) && (
                                             <Button
                                             onClick={() => {}}
                                             size="small"
                                             variant="contained"
                                             color="info">
                                             Check
                                         </Button>
                                        )}

                                    </Box>
                                    {numeroTanques != (index + 1) && <Divider orientation={'horizontal'} flexItem />}
                                </>
                            ))}
                        </Stack>
                    )}
                </Stack>

            {/* {type === 'maniobras' &&
                <Stack
                    gap='10px'
                    sx={{
                        minWidth: '250px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: IsSmall ? 'column' : 'row',
                            gap: '10px',
                            justifyContent: 'space-between',
                            alignItems: !IsSmall ? 'center' : 'start',
                            backgroundColor: 'whitesmoke',
                            padding: '20px',
                            borderRadius: '4px',
                        }}>

                        <Chip
                            color='info'
                            label={typeRegister}
                            icon={<AccessTimeIcon/>}
                            sx={{ fontWeight: 500, paddingRight: '2px' }}
                        />

                        <Stack
                            sx={{ maxWidth: '700px' }}
                            width={IsSmall ? '100%' : '450px'}
                            flexDirection={IsSmall ? 'column' : 'row'}
                            justifyContent={IsSmall ? 'flex-start' : 'space-around'}
                            alignItems={IsSmall ? 'start' : 'center'}
                            gap='10px'>
                            <TextGeneral text={linea} label="Linea" />
                            <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                            <TextGeneral label='Tracto' text={tracto} />
                            <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                            <TextGeneral label='Tipo de carga' text={typeChargue} />
                            <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                        </Stack>

                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent='space-between'
                            gap='10px'>
                            <TextGeneral label='Operador' text={shortNameOperator} />
                            <Stack flexDirection='row' gap='10px'>
                                <IconButton
                                    color="info"
                                    onClick={ToggleModalInfoOperator}>
                                    <InfoIcon />
                                </IconButton>
                            </Stack>

                        </Stack>
                    </Box>

                    {typeChargue === 'Tanques' && (
                        <Stack
                            spacing='5px'
                            justifyContent='center'
                            sx={{
                                padding: '20px',
                                borderRadius: '4px',
                                backgroundColor: 'whitesmoke'
                            }}>
                            <strong>Tanques</strong>
                            {tanques.map((tanque, index) => (
                                <>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                        <TextGeneral
                                            variant='row'
                                            label='N° Tanque'
                                            text={tanque.tanque} />
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => select(id, tanque.tanque)}
                                        >Check
                                        </Button>
                                    </Box>
                                    {tanquesNum != (index + 1) && <Divider orientation={'horizontal'} flexItem />}
                                </>
                            ))}
                        </Stack>
                    )}
                </Stack>} */}

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
                        <Typography variant='h6'>Información del operador</Typography>

                        <TextGeneral text={operador.nombre} label="Nombre del operador" />
                        <TextGeneral text={operador.contacto} label="Contacto del operador" />

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

        </Paper>
    );
}

export { HistoryItem };