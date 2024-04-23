import { Modal, Container, Paper, Stack, Box, Button, TextField, Typography, IconButton, InputAdornment } from "@mui/material"
//customComponents
import { ContainerScroll } from "../../ContainerScroll";
//hooks
import { useNavigate, useParams } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import ClearIcon from '@mui/icons-material/Clear';

export function CondicionesLavado() {

    const { condiciones, numLavado } = useParams();
    const navigate = useNavigate();

    const conditions = JSON.parse(decodeURIComponent(condiciones));

    const conditionsWashing = {
        '1': ['5', '6'],
        '2': ['1', '3', '5', '6'],
        '3': ['1', '2', '3', '5', '6'],
        '5': ['1', '2', '3', '4', '5', '6']
    }

    const stepsInclude = (type, stepForm) => {
        const arraySteps = conditionsWashing[type]
        return arraySteps.includes(stepForm)
    }

    const movile = useMediaQuery('(max-width:800px)');


    return (
        <>

            <Modal open={true} onClose={() => navigate('/lavado/realizados')} >

                <Container sx={{ display: 'flex', justifyContent: 'center', paddingTop: '3%' }} >

                    <Paper sx={{ padding: '10px', width: 'fit-content' }} >

                        <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px' }}>

                            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'  >
                                <Typography>Recapitulación</Typography>
                                <IconButton color="error" onClick={() => navigate('/lavado/realizados')} >
                                    <ClearIcon />
                                </IconButton>
                            </Stack>

                            <ContainerScroll height='500px'>
                                <Stack gap='10px'>

                                    {(stepsInclude(numLavado, '1')) &&
                                        <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                            <Typography>Enjuague 1</Typography>
                                            <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                                <TextField
                                                    disabled
                                                    label='Temperatura'
                                                    value={conditions.temperatura_enjuague_1}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Presión'
                                                    value={conditions.presion_enjuague_1}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Tiempo'
                                                    value={conditions.tiempo_enjuague_1}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                    }}
                                                />

                                            </Stack>
                                        </Box>
                                    }

                                    {(stepsInclude(numLavado, '2')) &&
                                        <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                            <Typography>Solución desengrasante</Typography>
                                            <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                                <TextField
                                                    disabled
                                                    label='Temperatura'
                                                    value={conditions.temperatura_desengrasante}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Presión'
                                                    value={conditions.presion_desengrasante}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Tiempo'
                                                    value={conditions.tiempo_desengrasante}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                    }}
                                                />

                                                <TextField
                                                    disabled
                                                    label='Concentración'
                                                    value={conditions.concentracion_desengrasante}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>PPM</InputAdornment>,
                                                    }}
                                                />
                                            </Stack>
                                        </Box>}

                                    {(stepsInclude(numLavado, '3')) &&
                                        <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                            <Typography>Solución limpiadora</Typography>
                                            <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                                <TextField
                                                    disabled
                                                    label='Temperatura'
                                                    value={conditions.temperatura_limpiador}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Presión'
                                                    value={conditions.presion_limpiador}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Tiempo'
                                                    value={conditions.tiempo_limpiador}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                    }}
                                                />

                                                <TextField
                                                    disabled
                                                    label='Concentración'
                                                    value={conditions.concentracion_limpiador}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>PPM</InputAdornment>,
                                                    }}
                                                />
                                            </Stack>
                                        </Box>}

                                    {(stepsInclude(numLavado, '4')) &&
                                        <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                            <Typography>Enjuague 2</Typography>
                                            <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                                <TextField
                                                    disabled
                                                    label='Temperatura'
                                                    value={conditions.temperatura_enjuague_2}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Presión'
                                                    value={conditions.presion_enjuague_2}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Tiempo'
                                                    value={conditions.tiempo_enjuage_2}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                    }}
                                                />
                                            </Stack>
                                        </Box>}

                                    {(stepsInclude(numLavado, '5')) &&
                                        <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                            <Typography>Enjuague 3</Typography>
                                            <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                                <TextField
                                                    disabled
                                                    label='Temperatura'
                                                    value={conditions.temperatura_enjuague_3}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Presión'
                                                    value={conditions.presion_enjuague_3}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Tiempo'
                                                    value={conditions.tiempo_enjuague_3}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                    }}
                                                />
                                            </Stack>
                                        </Box>}

                                    {(stepsInclude(numLavado, '6')) &&
                                        <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                            <Typography>Sanitizado</Typography>
                                            <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                                <TextField
                                                    disabled
                                                    label='Temperatura'
                                                    value={conditions.temperatura_sanitizado}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Presión'
                                                    value={conditions.presion_sanitizado}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label='Tiempo'
                                                    value={conditions.tiempo_sanitizado}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                    }}
                                                />

                                                <TextField
                                                    disabled
                                                    label='Concentración'
                                                    value={conditions.concentracion_sanitizado}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position='end'>PPM</InputAdornment>,
                                                    }}
                                                />
                                            </Stack>
                                        </Box>}

                                </Stack>
                            </ContainerScroll>

                        </Box>


                    </Paper>

                </Container>

            </Modal>

        </>
    )
}