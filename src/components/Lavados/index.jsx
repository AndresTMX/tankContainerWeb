import { useState } from "react";
import { Container, Box, Paper, Stack, Alert, Chip, Typography, Button, Modal, IconButton } from "@mui/material";
//estados genericos
import { NotConexionState } from "../NotConectionState";
import { HistoryItemLoading } from "../HistoryItem";
//componentes
import { ContainerScroll } from "../ContainerScroll";
import { ItemQuestion } from "../../sections/CheckListCalidadPrelavado";
//hooks
import { useWashing } from "../../Hooks/Lavado/useWashing";
import { useManagmentWashing } from "../../Hooks/Lavado/useManagmentWashing";
//helpers
import { dateMXFormat, datetimeMXFormat, tiempoTranscurrido } from "../../Helpers/date";
//icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShowerIcon from '@mui/icons-material/Shower';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ClearIcon from '@mui/icons-material/Clear';


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
                                typeWashing={typeWashing}
                            />
                        ))

                    }

                    {(loading && !error) &&
                        <>
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                        </>
                    }

                </Stack>

            </ContainerScroll>

        </>
    );
}

export { Lavados };

function ItemLavados({ lavado, typeWashing }) {

    return (
        <>
            {typeWashing === 'pendiente' &&
                <LavadoPendiente lavado={lavado} />
            }

            {typeWashing === 'realizado' &&
                <Typography>pendiente</Typography>
            }
        </>
    );
}

function LavadoPendiente({ lavado }) {

    const { sendRevision } = useManagmentWashing();

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
        setRevision(questions);
    }

    const { created_at, data, status, tipo_lavado, registros_detalles_entradas } = lavado;

    const { carga, numero_pipa, numero_tanque, tracto } = registros_detalles_entradas || {};

    const questions = [
        {
            question: 'Residuos en escotilla y válvulas',
            value: '',
        },
        {
            question: 'Legibilidad de datos seriales y revisiones',
            value: '',
        },
        {
            question: 'Residuos dentro del tanque',
            value: '',
        },
        {
            question: 'Corrosión dentro del tanque o en escotilla',
            value: '',
        },
        {
            question: 'Condiciones generales de válvulas',
            value: '',
        },
        {
            question: 'Ausencia de juntas y empaques',
            value: '',
        },
        {
            question: 'Portasellos',
            value: '',
        },
    ]

    const [revision, setRevision] = useState(questions);

    const changueValue = (index, value) => {
        const copy = [...revision];
        copy[index].value = value;
        setRevision(copy);
    };

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
                            <Typography variant='body2'>{numero_tanque || numero_pipa}</Typography>
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
                            revision externa
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

            <Modal open={modal}>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '100vh',
                        paddingTop: '5%',
                        width: '100vw',
                    }}>

                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            width: '100%',
                            maxWidth: '700px',

                        }}
                    >

                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                        >
                            <Typography variant="button">
                                Revision externa
                            </Typography>

                            <IconButton
                                onClick={toggleModal}
                            >
                                <ClearIcon color='error' />
                            </IconButton>
                        </Stack>

                        <RevisionLavado
                            revision={revision}
                            changueValue={changueValue}
                        />

                        <Stack paddingTop={'10px'}>
                            <Button
                                onClick={() => sendRevision(revision)}
                                color="primary"
                                variant="contained"

                            >
                                Enviar revision
                            </Button>
                        </Stack>

                    </Paper>

                </Container>
            </Modal>

        </>
    )
}

function RevisionLavado({ revision, changueValue }) {

    return (
        <>
            <ContainerScroll height={'350px'}>
                <Stack gap='8px'>
                    {revision.map((question, index) => (
                        <ItemQuestion
                            key={question.question}
                            question={question}
                            index={index}
                            toggleCheck={changueValue}
                        />
                    ))}
                </Stack>
            </ContainerScroll>

        </>
    );
}

