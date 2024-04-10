import { Paper, Button, Chip, Stack, Divider, Typography, Box } from "@mui/material";
//icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//helpers
import { datetimeMXFormat, timepoParaX, dateTextShort } from "../../Helpers/date";
//context
import { useContext } from "react";
import { PrelavadoContext } from "../../Context/PrelavadoContext";
import { actionTypes } from "../../Reducers/PrelavadoReducer";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";


function ItemWashing({ data, type }) {

    const [state, dispatch] = useContext(PrelavadoContext);

    const IsSmall = useMediaQuery('(max-width:830px)');
    const IsMovile = useMediaQuery('(max-width:500px)');

    const { status, fecha_entrega, registros_detalles_entradas } = data || {};

    const { carga, clientes, numero_pipa, numero_tanque, tipo, registros } = registros_detalles_entradas || {};

    const { checkIn, checkOut } = registros || {};

    const onWashing = () => {
        dispatch({
            type: actionTypes.setSelectCheck,
            payload: data
        })
    }

    const CancelChecklist = () => {
        dispatch({
            type: actionTypes.setSelectCheck,
            payload: false
        })
    }

    const [expand, setExpand] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpand(isExpanded ? panel : false);
    };

    return (
        <>
            {type === 'header' && (
                <Paper elevation={3} sx={{ width: '100%', padding: '15px', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}>

                    <Stack flexDirection='row' gap='10px' justifyContent='flex-start' flexWrap='wrap'>
                        <Chip color="info" size="small" label={`${carga != 'pipa' ? tipo : ''}  ${numero_tanque || numero_pipa}`} />
                        <Chip color="info" size="small" label={'Cliente:  ' + clientes.cliente} />
                        <Chip color="info" size="small" label={'Llego el ' + dateTextShort(checkIn)} />
                    </Stack>

                    <Button
                        fullWidth={IsMovile}
                        endIcon={<DoDisturbIcon />}
                        onClick={CancelChecklist}
                        variant='contained'
                        color="error"
                        size="small"
                    >
                        Cancelar
                    </Button>

                </Paper>
            )}

            {!type && (
                <Paper
                    sx={{ display: 'flex', flexDirection: 'column', padding: '15px', gap: '10px' }} elevation={3}>

                    <Stack
                        justifyContent='space-between'
                        flexDirection='row'
                        flexWrap='wrap'
                        gap='10px'
                    >

                        <Stack
                            gap='10px'
                            flexWrap='wrap'
                            flexDirection='row'
                            justifyContent='space-between'
                            width={IsSmall ? 'auto' : '100%'}
                        >

                            <Stack flexDirection='row' gap='10px' flexWrap='wrap' >

                                <Chip
                                    icon={<CalendarTodayIcon />}
                                    label={` Entregar el ${dateTextShort(fecha_entrega)}`}
                                    color='info'
                                    size="small"
                                />

                                <Chip
                                    icon={<AccessTimeIcon />}
                                    label={`${datetimeMXFormat(fecha_entrega)}`}
                                    color='info'
                                    size="small"
                                />

                                <Chip
                                    icon={<AccessTimeIcon />}
                                    label={`${timepoParaX(fecha_entrega)} para entrega`}
                                    color='info'
                                    size="small"
                                />

                            </Stack>

                            <Button
                                fullWidth={IsSmall}
                                onClick={onWashing}
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                                Checklist
                            </Button>

                        </Stack>

                    </Stack>

                    <Stack flexDirection={IsSmall? 'column': 'row'} gap={ IsSmall? '5px' : '10px'}>
                        {/* <Box>
                            <Typography variant='subtitle2'>Cita de lavado</Typography>
                            <Typography variant='button'>{` ${dateTextShort(program_date)}  ${datetimeMXFormat(program_date)}`}</Typography>
                        </Box> */}

                        <Divider flexItem />

                        <Box>
                            <Typography variant='subtitle2'>Cliente</Typography>
                            <Typography variant='button'>{clientes?.cliente}</Typography>
                        </Box>
                    </Stack>

                    <Divider flexItem />

                    {/* Informacion */}
                    <Stack flexDirection={IsSmall ? 'column' : 'row'} justifyContent='start' gap='15px'>


                        <Box sx={{ display:'flex', flexDirection:'column'}}>
                            <Typography variant='button'>{`${carga}`}</Typography>
                            <Typography variant='body'>{` ${tipo ||''}  ${numero_tanque || numero_pipa}`}</Typography>
                        </Box>

                    </Stack>

                </Paper>
            )}
        </>
    );
}

export { ItemWashing };