import { useState } from "react";
import { Paper, Stack, Chip, Typography, Button, Alert } from "@mui/material";
//estados genericos
import { NotConexionState } from "../NotConectionState";
import { ItemLoadingState } from "../ItemLoadingState";
//componentes
import { ContainerScroll } from "../ContainerScroll";
import { SaniticeWashing } from "../EvaluationWashing";
import { EvaluationWashing } from "../EvaluationWashing";
import { useWashing } from "../../Hooks/Lavado/useWashing";
//helpers
import { dateMXFormat, datetimeMXFormat, tiempoTranscurrido, timepoParaX, dateTextShort, } from "../../Helpers/date";
//icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function Lavados({ typeWashing }) {

    const { lavados, loading, error, cache, updateList } = useWashing(typeWashing);

    const renderLavados = lavados.length >= 1 ? true : false;

    return (
        <>

            <ContainerScroll height={'75vh'}>

                <Stack gap='8px'>

                    {(error && !loading) &&
                        <NotConexionState />
                    }

                    {(!error && !loading && !renderLavados) &&
                        <Alert severity="info" sx={{ width: '100%' }}>
                            {`Sin lavados ${typeWashing}s`}
                        </Alert>
                    }

                    {(!loading && !error && renderLavados) &&

                        lavados.map((lavado) => (
                            <ItemLavados
                                key={lavado.id}
                                lavado={lavado}
                                updateList={updateList}
                                typeWashing={typeWashing}
                            />
                        ))

                    }

                    {(!loading && error) &&

                        cache.map((lavado) => (
                            <ItemLavados
                                key={lavado.id}
                                lavado={lavado}
                                updateList={updateList}
                                typeWashing={typeWashing}
                            />
                        ))

                    }

                    {(loading && !error) &&
                        <>
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                        </>
                    }

                </Stack>

            </ContainerScroll>

        </>
    );
}

export { Lavados };

function ItemLavados({ lavado, typeWashing, updateList }) {

    const { status } = lavado || {};

    return (
        <>
            {status === 'asignado' &&
                <LavadoPendiente lavado={lavado} updateList={updateList} />
            }

            {status === 'lavado' &&
                <Typography>lavado aprobrado por sanitizar</Typography>
            }

            {status === 'sanitizado' &&
                <ItemSanitizado lavado={lavado} updateList={updateList} />
            }


        </>
    );
}

function LavadoPendiente({ lavado, updateList }) {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal)

    const { created_at, data, status, tipos_lavado, registros_detalles_entradas } = lavado || {};

    const { carga, numero_pipa, numero_tanque, tracto } = registros_detalles_entradas || {};

    const { lavado: lavado_asignado } = tipos_lavado || {};

    return (
        <>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '15px',
                    gap: '10px'
                }}
            >
                <Stack
                    flexDirection={'row'}
                    alignItems={'center'}
                    gap={'10px'}
                >
                    <Chip
                        color='info'
                        size='small'
                        icon={<CalendarTodayIcon />}
                        label={dateMXFormat(created_at)}
                    />

                    <Chip
                        color='info'
                        size='small'
                        icon={<AccessTimeIcon />}
                        label={datetimeMXFormat(created_at)}
                    />

                    <Chip
                        color='info'
                        size='small'
                        icon={<AccessTimeIcon />}
                        label={tiempoTranscurrido(created_at)}
                    />

                </Stack>

                <Stack
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    gap={'20px'}
                >

                    <Stack
                        gap={'20px'}
                        flexDirection={'row'}
                        alignItems={'center'}
                    >
                        <Stack>
                            <Typography variant='caption'>{numero_tanque ? 'Tanque' : 'Pipa'}</Typography>
                            <Typography textTransform='uppercase' variant='body2'>{numero_tanque || numero_pipa}</Typography>
                        </Stack>

                        <Stack>
                            <Typography variant='caption'>Lavado asignado</Typography>
                            <Typography variant='body2'>{lavado_asignado}</Typography>
                        </Stack>
                    </Stack>

                    <Stack
                        gap={'10px'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'flex-end'}
                    >
                        <Button
                            onClick={toggleModal}
                            size='small'
                            color='primary'
                            variant='contained'
                            endIcon={<ManageSearchIcon />}
                        >
                            Iniciar lavado
                        </Button>

                    </Stack>


                </Stack>
            </Paper>

            <EvaluationWashing
                lavado={lavado}
                modal={modal}
                updateList={updateList}
                toggleModal={toggleModal} />

        </>
    )
}

function ItemSanitizado({ lavado, updateList }) {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal)

    const { created_at, tentativeEnd, data, status, tipo_lavado, registros_detalles_entradas, id: idWashing, condiciones_lavado } = lavado;
    const { carga, numero_pipa, numero_tanque, tracto, tipo, id: idRegister } = registros_detalles_entradas || {};

    const dataConditions = JSON.parse(condiciones_lavado);

    return (
        <>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '15px',
                    gap: '10px'
                }}
            >
                <Stack
                    flexWrap={'wrap'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    gap={'10px'}
                >
                    <Chip
                        color='warning'
                        size='small'
                        icon={<FiberManualRecordIcon style={{ color: '#ab5005' }} />}
                        label={'por sanitizar'}
                    />

                    <Chip
                        color='info'
                        size='small'
                        icon={<CalendarTodayIcon />}
                        label={'Entregar antes del ' + dateTextShort(tentativeEnd)}
                    />

                </Stack>

                <Stack
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    gap={'20px'}
                >

                    <Stack
                        gap={'20px'}
                        flexDirection={'row'}
                        alignItems={'center'}
                    >
                        <Stack>
                            <Typography variant='caption'>{numero_tanque ? 'Tanque' : 'Pipa'}</Typography>
                            <Typography textTransform='uppercase' variant='body2'>{tipo || ''}  {numero_tanque || numero_pipa}</Typography>
                        </Stack>


                    </Stack>

                    <Stack
                        gap={'10px'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'flex-end'}
                    >
                        <Button
                            onClick={toggleModal}
                            size='small'
                            color='primary'
                            variant='contained'
                            endIcon={<PlayCircleIcon />}
                        >
                            sanitizar
                        </Button>

                    </Stack>


                </Stack>
            </Paper>

            <SaniticeWashing
                modal={modal}
                idWashing={idWashing}
                idRegister={idRegister}
                updateList={updateList}
                toggleModal={toggleModal}
                dataConditions={dataConditions}
            />
        </>
    )
}


