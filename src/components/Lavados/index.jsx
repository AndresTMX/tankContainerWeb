import { useState, useContext } from "react";
import { Paper, Stack, Chip, Typography, Button, Alert } from "@mui/material";
//estados genericos
import { NotConexionState } from "../NotConectionState";
import { ItemLoadingState } from "../ItemLoadingState";
//componentes
import { ContainerScroll } from "../ContainerScroll";
import { EvaluationWashing } from "../EvaluationWashing";
import { useWashing } from "../../Hooks/Lavado/useWashing";
//helpers
import { dateMXFormat, datetimeMXFormat, tiempoTranscurrido } from "../../Helpers/date";
//icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccessTimeIcon from "@mui/icons-material/AccessTime";



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

    return (
        <>
            {typeWashing === 'pendiente' &&
                <LavadoPendiente lavado={lavado} updateList={updateList} />
            }

            {typeWashing === 'realizado' &&
                <Typography>pendiente</Typography>
            }
        </>
    );
}

function LavadoPendiente({ lavado, updateList }) {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal)

    const { created_at, data, status, tipo_lavado, registros_detalles_entradas } = lavado;

    const { carga, numero_pipa, numero_tanque, tracto } = registros_detalles_entradas || {};

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
                            <Typography variant='body2'>{tipo_lavado}</Typography>
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

                        {/* <Button
                            size='small'
                            color='primary'
                            variant='contained'
                            endIcon={<ShowerIcon />}
                        >
                            Lavar
                        </Button> */}

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
