import { Paper, Button, IconButton, Stack, Typography, Chip } from "@mui/material";
import { dateMXFormat, datetimeMXFormat } from "../../Helpers/date";
//icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";

function ResultSearch({ typeItem, dataItem }) {

    const isMovile = useMediaQuery('(max-width:850px)')

    return (
        <>

            {typeItem === 'vigilancia' && (
                <Paper>

                    <Stack padding='10px' spacing='10px' justifyContent='center' alignItems='center'>

                        <Stack width='100%' flexDirection='row' flexWrap='wrap' gap='5px'>
                            <Chip
                                color="info"
                                size="small"
                                label={`${dateMXFormat(dataItem.checkIn)}`}
                                icon={
                                    <CalendarTodayIcon />
                                }
                            />
                            <Chip
                                color="info"
                                size="small"
                                label={`${datetimeMXFormat(dataItem.checkIn)}`}
                                icon={
                                    <AccessTimeIcon />
                                }
                            />

                            <Chip
                                size="small"
                                color={dataItem.tipo === "entrada" ? "success" : "warning"}
                                label={dataItem.tipo}
                                icon={
                                    dataItem.tipo === "entrada" ? (
                                        <KeyboardDoubleArrowRightIcon />
                                    ) : (
                                        <KeyboardDoubleArrowLeftIcon />
                                    )
                                }
                                sx={{
                                    maxWidth: "100px",
                                    fontWeight: 500,
                                    padding: "5px",
                                }}
                            />
                        </Stack>

                        <Stack width='100%' justifyContent={'center'} flexDirection={isMovile ? 'column' : 'row'} gap='5px'>

                            <Stack
                                width={isMovile ? '100%' : '100px'}
                                bgcolor='whitesmoke'
                                padding='5px'
                                borderRadius='4px'
                            >
                                <Typography variant='caption'>Carga</Typography>
                                <Typography>{dataItem.carga}</Typography>
                            </Stack>

                            <Stack
                                width={isMovile ? '100%' : '100px'}
                                bgcolor='whitesmoke'
                                padding='5px'
                                borderRadius='4px'
                            >
                                <Typography variant='caption'>Tanque</Typography>
                                <Typography>{dataItem.numero_tanque}</Typography>
                            </Stack>

                            <Stack
                                width={isMovile ? '100%' : '50%'}
                                bgcolor='whitesmoke'
                                padding='5px'
                                borderRadius='4px'
                            >
                                <Typography variant='caption'>Operador</Typography>
                                <Typography>{dataItem.operador}</Typography>
                            </Stack>

                            <Stack
                                width={isMovile ? '100%' : '100px'}
                                bgcolor='whitesmoke'
                                padding='5px'
                                borderRadius='4px'
                            >
                                <Typography variant='caption'>Tracto</Typography>
                                <Typography>{dataItem.tracto}</Typography>
                            </Stack>

                            <Stack
                                width={isMovile ? '100%' : '35%'}
                                bgcolor='whitesmoke'
                                padding='5px'
                                borderRadius='4px'
                            >
                                <Typography variant='caption'>Linea</Typography>
                                <Typography>{dataItem.transportista}</Typography>
                            </Stack>

                        </Stack>
                    </Stack>

                </Paper>
            )}

        </>
    );
}

export { ResultSearch };