//imports materialui
import { Box, Button, Stack, Chip, Divider, Modal, Paper, Typography, Input } from "@mui/material";
//helpers
import {  dateInText } from "../../Helpers/date";
//hooks

function MaintenancesItem({ maintance, selectItem, typeRepair, }) {

    return (
        <>

            {typeRepair === 'pendiente' &&
                <MaintancePending maintance={maintance} selectItem={selectItem} />
            }

            {typeRepair === 'proceso' &&
                <MaintanceProces maintance={maintance} selectItem={selectItem} />
            }

            {typeRepair === 'completado' &&
                <MaintancesComplete maintance={maintance} selectItem={selectItem} />
            }



        </>
    );
}

export { MaintenancesItem };


function MaintancePending({ maintance, selectItem }) {

    const { checkIn, registros_detalles_entradas } = maintance || {};
    const { carga, created_at, especificacion, numero_tanque, numero_pipa, tipo, registros, id } = registros_detalles_entradas || {};

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '15px',
                    border: 1,
                    borderStyle: 'solid',
                    borderColor: 'whitesmoke',
                }}
            >
                <Stack flexDirection='row' alignItems='center' gap='10px'>
                    <Chip size="small" color="info" label={`Ingreso: ${dateInText(checkIn)}`} />
                </Stack>

                <Stack flexDirection='row' alignItems='center' gap='10px' justifyContent='space-between'>

                    <Box>
                        <Typography variant='caption' >{carga}</Typography>
                        <Typography variant='body2' >{`${numero_tanque}  ${tipo} ${especificacion}`}</Typography>
                    </Box>

                    <Button
                        onClick={() => selectItem(maintance)}
                        size="small"
                        variant="contained">
                        Iniciar
                    </Button>

                </Stack>
            </Paper>

        </>
    )
}

function MaintanceProces({ maintance, selectItem }) {
    const { checkIn, registros_detalles_entradas } = maintance || {};
    const { carga, created_at, especificacion, numero_tanque, numero_pipa, tipo, registros, id } = registros_detalles_entradas || {};

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '15px',
                    border: 1,
                    borderStyle: 'solid',
                    borderColor: 'whitesmoke',
                }}
            >
                <Stack flexDirection='row' alignItems='center' gap='10px'>
                    <Chip size="small" color="info" label={`Ingreso: ${dateInText(checkIn)}`} />
                </Stack>

                <Stack flexDirection='row' alignItems='center' gap='10px' justifyContent='space-between'>

                    <Box>
                        <Typography variant='caption' >{carga}</Typography>
                        <Typography variant='body2' >{`${numero_tanque}  ${tipo} ${especificacion}`}</Typography>
                    </Box>

                    <Button
                        onClick={() => selectItem(maintance)}
                        size="small"
                        variant="contained">
                        Completar
                    </Button>

                </Stack>
            </Paper>
        </>
    )
}

function MaintancesComplete({ maintance, selectItem }) {

    const { checkIn, registros_detalles_entradas } = maintance || {};
    const { carga, created_at, especificacion, numero_tanque, numero_pipa, tipo, registros, id } = registros_detalles_entradas || {};

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '15px',
                    border: 1,
                    borderStyle: 'solid',
                    borderColor: 'whitesmoke',
                }}
            >
                <Stack flexDirection='row' alignItems='center' gap='10px'>
                    <Chip size="small" color="info" label={`Ingreso: ${dateInText(checkIn)}`} />
                </Stack>

                <Stack flexDirection='row' alignItems='center' gap='10px' justifyContent='space-between'>

                    <Box>
                        <Typography variant='caption' >{carga}</Typography>
                        <Typography variant='body2' >{`${numero_tanque}  ${tipo} ${especificacion}`}</Typography>
                    </Box>

                    <Button
                        onClick={() => selectItem(maintance)}
                        size="small"
                        variant="contained">
                        visualizar
                    </Button>

                </Stack>
            </Paper>

        </>
    )
}