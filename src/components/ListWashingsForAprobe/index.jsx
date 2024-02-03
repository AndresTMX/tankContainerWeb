import { useState, useContext, useEffect } from "react";
import {
    Paper,
    Box,
    Stack,
    Button,
    Chip,
    Alert,
    Typography,
    Divider,
    Modal,
    TextField,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { ContainerScroll } from "../ContainerScroll";
import { ItemLoadingState } from "../ItemLoadingState";
import { ItemQuestion } from "../../sections/CheckListCalidadPrelavado";
import { EvaluacionResults } from "../EvaluationWashing";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSendToSanitization } from "../../Hooks/Calidad/useSendToSanitzation";
import { useGetWashingForAprobe } from "../../Hooks/Calidad/useGetWashingForAprobe";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes } from "../../Reducers/GlobalReducer";
//helpers
import { dateTextShort } from "../../Helpers/date";
//icons
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import LaunchIcon from '@mui/icons-material/Launch';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';


function ListWashingForAprobe() {

    const { loading, error, washing, cache, type, setType, updaterList } = useGetWashingForAprobe();
    const [url, setUrl] = useState({ image: '', preview: '', notes: '' });

    const renderPrelavados = washing?.length >= 1 ? true : false;
    const renderCache = cache?.length >= 1 ? true : false;

    return (
        <>
            <Stack gap='10px'>

                <Paper sx={{ padding: '20px', bgcolor: 'whitesmoke' }}>
                    <Stack flexDirection={'row'} gap={'10px'}>
                        <Chip
                            color={type === 'pendientes' ? 'warning' : 'default'}
                            onClick={() => setType('pendientes')}
                            label={'pendientes'} />

                        <Chip
                            color={type === 'realizados' ? 'success' : 'default'}
                            onClick={() => setType('realizados')}
                            label={'realizados'} />
                    </Stack>
                </Paper>

                <ContainerScroll height={'70vh'}>

                    <Stack width={'100%'} gap={'5px'} alignItems={'center'}>

                        {(!loading && error) && <NotConexionState />}

                        {(!loading && !error && !renderPrelavados) &&
                            <Alert severity="info" sx={{ width: '100%' }}>
                                ¡Sin inspecciones pendientes!
                            </Alert>}


                        {(loading && !error) &&
                            <Stack width={'100%'} gap={'5px'}>
                                <ItemLoadingState />
                                <ItemLoadingState />
                                <ItemLoadingState />
                            </Stack>
                        }


                        {(!loading && !error && renderPrelavados) &&
                            washing.map((lavado) => (
                                <ItemWashingForAprobe
                                    key={lavado.id}
                                    lavado={lavado}
                                    updaterList={updaterList}
                                />
                            ))}

                        {(!loading && error && renderCache) &&
                            cache.map((lavado) => (
                                <ItemWashingForAprobe
                                    key={lavado.id}
                                    lavado={lavado}
                                    updaterList={updaterList}

                                />
                            ))}

                    </Stack>


                </ContainerScroll>

            </Stack>
        </>
    );
}

export { ListWashingForAprobe };

function ItemWashingForAprobe({ lavado, updaterList }) {

    const { registros_detalles_entradas, status, tentativeEnd, bahia, condiciones_lavado, tipos_lavado, id: idLavado } = lavado || {};
    const { carga, numero_tanque, numero_pipa, tipo, id: idRegistro } = registros_detalles_entradas || {};
    const { description, duration, lavado: tipoLavado } = tipos_lavado || {};


    //condiciones de lavado
    const [modalConditions, setModalContions] = useState(false);
    const toggleModalConditions = () => setModalContions(!modalConditions);

    //evaluacion de lavado
    const [modalTest, setTest] = useState(false);
    const toggleTest = () => setTest(!modalTest);

    return (
        <>
            <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', width: '100%' }}>

                <Stack flexDirection='row' alignItems='center' justifyContent='space-between' flexWrap='wrap' gap='10px'>

                    <Box display='flex' flexDirection='row' alignItems='center' flexWrap='wrap' gap='10px'>
                        <Chip
                            color="warning"
                            size="small"
                            label={'Bahia: ' + bahia} />

                        <Chip
                            color="info"
                            size="small"
                            label={'Para entregar el ' + dateTextShort(tentativeEnd)} />
                    </Box>

                    <Button
                        onClick={toggleModalConditions}
                        size="small"
                        variant="outlined"
                        endIcon={<LaunchIcon />}
                    >
                        condiciones de lavado
                    </Button>

                </Stack>

                <Stack flexDirection='row' alignItems='center' justifyContent='space-between' flexWrap='wrap' gap='20px'>

                    <Stack flexDirection='row' alignItems='center' flexWrap='wrap' gap='20px'>
                        <Box>
                            <Typography variant='caption' >{carga}</Typography>
                            <Typography>{tipo || ''} {numero_tanque || numero_pipa}</Typography>
                        </Box>
                        <Divider orientation='vertical' flexItem />
                        <Box>
                            <Typography variant='caption' >Lavado asignado</Typography>
                            <Typography>{tipoLavado}</Typography>
                        </Box>

                    </Stack>

                    <Button
                        onClick={toggleTest}
                        endIcon={<PlaylistAddCheckIcon />}
                        size='small'
                        variant="contained">
                        Evaluar lavado
                    </Button>

                </Stack>

            </Paper>

            <ConditionsWashing
                conditionsString={condiciones_lavado}
                modal={modalConditions}
                toggleModal={toggleModalConditions} />

            <WashingTest
                idLavado={idLavado}
                idRegistro={idRegistro}
                updaterList={updaterList}
                modal={modalTest}
                toggleModal={toggleTest} />
        </>
    )
}

function ConditionsWashing({ conditionsString, modal, toggleModal }) {

    const conditions = JSON.parse(conditionsString);

    const movile = useMediaQuery('(max-width:800px)');

    return (
        <>
            <Modal open={modal}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        width: '100vw',
                        paddingTop: '3%',
                        alignItems: 'center',
                        margin: '0px'
                    }}>
                    <Paper
                        sx={{
                            display: 'flex',
                            width: '700px',
                            maxWidth: '95vw',
                            flexDirection: 'column',
                            padding: '20px',
                            gap: '10px',

                        }}
                    >
                        <ContainerScroll height='400px'>
                            <Stack gap='10px'>

                                {conditions?.enjuague_presion_1 &&
                                    <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                        <Typography>Enjuague 1</Typography>
                                        <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                            <TextField
                                                disabled
                                                label='Temperatura'
                                                value={conditions.enjuague_temperatura_1}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Presión'
                                                value={conditions.enjuague_presion_1}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Tiempo'
                                                value={conditions.enjuague_tiempo_1}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                }}
                                            />

                                        </Stack>
                                    </Box>}

                                {conditions?.desengrasante_tiempo &&
                                    <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                        <Typography>Solución desengrasante</Typography>
                                        <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                            <TextField
                                                disabled
                                                label='Temperatura'
                                                value={conditions.desengrasante_temperatura}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Presión'
                                                value={conditions.desengrasante_presion}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Tiempo'
                                                value={conditions.desengrasante_tiempo}
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

                                {conditions?.limpiador_tiempo &&
                                    <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                        <Typography>Solución limpiadora</Typography>
                                        <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                            <TextField
                                                disabled
                                                label='Temperatura'
                                                value={conditions.limpiador_temperatura}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Presión'
                                                value={conditions.limpiador_presion}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Tiempo'
                                                value={conditions.limpiador_tiempo}
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

                                {conditions?.temperatura_enjuague_2 &&
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
                                                value={conditions.enjuague_tiempo_2}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                }}
                                            />
                                        </Stack>
                                    </Box>}

                                {conditions?.temperatura_enjuague_3 &&
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

                                {conditions?.sanitizado_temperatura &&
                                    <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                        <Typography>Sanitizado</Typography>
                                        <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                            <TextField
                                                disabled
                                                label='Temperatura'
                                                value={conditions.sanitizado_temperatura}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Presión'
                                                value={conditions.sanitizado_presion}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Tiempo'
                                                value={conditions.sanitizado_tiempo}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                }}
                                            />

                                            <TextField
                                                disabled
                                                label='Concentración'
                                                value={conditions.concentracion}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>PPM</InputAdornment>,
                                                }}
                                            />
                                        </Stack>
                                    </Box>}

                            </Stack>
                        </ContainerScroll>

                        <Button variant="contained" color='error' onClick={toggleModal}>cerrar</Button>
                    </Paper>
                </Box>
            </Modal>
        </>
    )

}

function WashingTest({ modal, toggleModal, idLavado, idRegistro, updaterList }) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const questionsTest = [
        {
            question: 'Escotilla, conexiones y válvula están limpias y en buen estado',
            value: ''
        },
        {
            question: 'Compuerta de la parte trasera en buenas condiciones',
            value: ''
        },
        {
            question: 'Interior de la pipa/Isotanque en buen estado',
            value: ''
        },
        {
            question: 'Interior de la pipa/Isotanque libre de materia extraña',
            value: ''
        },
        {
            question: 'Libre de olores desagradables',
            value: ''
        },
        {
            question: 'Leyenda Food Grade legible',
            value: ''
        },

    ]
    const [step, setStep] = useState(1)
    const [revision, setRevision] = useState(questionsTest)
    const [url, setUrl] = useState({ valueDome: '', coments: '', previewDome: '', imageDome: '', valueValve: '', previewValve: '', imageValve: '' });
    const { sendToSanitization } = useSendToSanitization();

    useEffect(() => {
        setStep(1)
        setRevision(questionsTest)
    }, [modal])

    const changueValue = (index, value) => {
        const copy = [...revision];
        copy[index].value = value;
        setRevision(copy);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (url.valueDome != '' && url.previewDome != '') {
            await sendToSanitization(idLavado, idRegistro, url)
            updaterList()
            toggleModal()
        }

        if (url.valueDome === '' || url.imageDome === '') {
            dispatchGlobal({
                type: actionTypes.setNotification,
                payload: 'Adjunta evidencias para continuar'
            })
        }
    }

    return (
        <>
            <Modal open={modal}>
                <Box
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
                            width: '700px',
                            maxWidth: '95vw',

                        }}
                    >

                        <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>

                            <Typography>Inspección de Características físicas</Typography>

                            <IconButton
                                onClick={toggleModal}
                                color="error"
                            >
                                <ClearIcon />
                            </IconButton>
                        </Stack>

                        {(step === 1) && <Test setStep={setStep} revision={revision} changueValue={changueValue} />}

                        {(step === 2) && <EvaluacionResults previusStep={() => setStep(1)} sendForm={() => { console.log('enviado') }} />}

                        {(step === 3) && <EvidenceURL url={url} setUrl={setUrl} submitForm={submitForm} />}

                    </Paper>
                </Box>
            </Modal>
        </>
    )
}

function Test({ setStep, revision, changueValue }) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const emptyFields = revision.filter((question) => question.value === '');
    const resultsTest = revision.filter((question) => question.value === 'no');

    const nextStep = () => {

        if (emptyFields.length > 0) {
            dispatchGlobal({
                type: actionTypes.setNotification,
                payload: 'Termina el checklist'
            });
        }

        if (emptyFields.length === 0 && resultsTest.length >= 1) {
            setStep(2)
        }

        if (emptyFields.length === 0 && resultsTest.length === 0) {
            setStep(3)
        }

    }

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
            <Stack
                justifyContent='flex-end'
                flexDirection='row'
                alignItems='center'
                paddingTop='10px'
                gap='10px'
            >

                <Button
                    onClick={nextStep}
                    color="primary"
                    variant="contained"
                >
                    siguiente
                </Button>
            </Stack>
        </>
    )
}

function EvidenceURL({ url, setUrl, submitForm }) {

    const { valueDome, coments, previewDome, imageDome, valueValve, previewValve, imageValve } = url || {};

    const onChangueDomeImage = (e) => {
        const file = e.target.files[0];
        const urlImage = URL.createObjectURL(file);
        setUrl({ ...url, imageDome: file, previewDome: urlImage });
    }

    const onChangueValveImage = (e) => {
        const file = e.target.files[0];
        const urlImage = URL.createObjectURL(file);
        setUrl({ ...url, imageValve: file, previewValve: urlImage });
    }

    return (
        <>
            <form onSubmit={submitForm}>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        bgcolor: 'whitesmoke',
                        padding: '15px',
                        gap: '10px',
                    }}>

                    <Stack
                        width='100%'
                        flexDirection='row'
                    >
                        <Typography textAlign='start'>Anexa evidencias de las pruebas URL</Typography>
                    </Stack>

                    <Stack flexDirection='row' gap='10px' height='150px'>
                        {(previewDome != '') ?
                            <Box>
                                <CardMedia
                                    component="img"
                                    height="140px"
                                    alt="prueba_url"
                                    image={previewDome}
                                    sx={{ width: '140px' }}
                                />
                                <IconButton
                                    sx={{ position: 'relative', top: '-40px', right: '0px', zIndex: '2', }}
                                    onClick={() => setUrl({ ...url, imageDome: '', previewDome: '' })} >
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </Box> :
                            <Box
                                sx={{
                                    display: 'flex',
                                    height: '140px',
                                    width: '140px',
                                    alignItems: 'center',
                                    bgcolor: 'whitesmoke',
                                    justifyContent: 'center',
                                    border: 1,
                                    borderColor: '#cbcbcb',
                                    borderRadius: '4px',
                                }} >

                                <label style={{ position: 'absolute' }} htmlFor={`url-input-1`} >
                                    <IconButton
                                        size='large'
                                        color='info'
                                        variant="contained"
                                        component="span"
                                    >
                                        <AddPhotoAlternateIcon />
                                    </IconButton>
                                </label>

                                <input
                                    type="file"
                                    id='url-input-1'
                                    accept="image/*"
                                    name='image_url-1'
                                    style={{ display: "none", width: '140px', height: '140px' }}
                                    onChange={(e) => onChangueDomeImage(e)}
                                />
                            </Box>
                        }

                        {(previewValve != '') ?
                            <Box>
                                <CardMedia
                                    component="img"
                                    height="140px"
                                    alt="prueba_url"
                                    image={previewValve}
                                    sx={{ width: '140px' }}
                                />
                                <IconButton
                                    sx={{ position: 'relative', top: '-40px', right: '0px', zIndex: '2', }}
                                    onClick={() => setUrl({ ...url, imageValve: '', previewValve: '' })} >
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </Box>

                            :
                            <Box
                                sx={{
                                    display: 'flex',
                                    height: '140px',
                                    width: '140px',
                                    alignItems: 'center',
                                    bgcolor: 'whitesmoke',
                                    justifyContent: 'center',
                                    border: 1,
                                    borderColor: '#cbcbcb',
                                    borderRadius: '4px',
                                }} >
                                {(previewValve != '') &&
                                    <IconButton
                                        sx={{ position: 'relative', top: '50px', right: '45px', zIndex: '2', }}
                                        onClick={() => setUrl({ ...url, imageValve: '', previewValve: '' })} >
                                        <DeleteIcon color="error" />
                                    </IconButton>}

                                <label style={{ position: 'absolute' }} htmlFor={`url-input-2`}>
                                    <IconButton
                                        size='large'
                                        color='info'
                                        variant="contained"
                                        component="span"
                                    >
                                        <AddPhotoAlternateIcon />
                                    </IconButton>
                                </label>

                                <input
                                    type="file"
                                    id='url-input-2'
                                    accept="image/*"
                                    name='image_url-2'
                                    style={{ display: "none", width: '140px', height: '140px' }}
                                    onChange={(e) => onChangueValveImage(e)}
                                />

                            </Box>
                        }
                    </Stack>


                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            width: '100%',
                            bgcolor: 'white'
                        }}>
                        <Typography gutterBottom variant='caption'>
                            Información de la prueba
                        </Typography>

                        <TextField
                            sx={{ width: '100%', padding: '5px', borderRadius: '4px', }}
                            label='valores de url de domo'
                            required
                            onChange={(e) => setUrl({ ...url, valueDome: e.target.value })}
                            value={url.value}
                        />

                        <TextField
                            sx={{ width: '100%', padding: '5px', borderRadius: '4px', }}
                            label='valores de url de valvula de descarga'
                            onChange={(e) => setUrl({ ...url, valueValve: e.target.value })}
                            value={url.value}
                        />

                        <TextField
                            label="comentarios adicionales"
                            multiline
                            rows={2}
                            sx={{ width: '100%', padding: '5px', borderRadius: '4px', }}
                            value={url.notes}
                            onChange={(e) => setUrl({ ...url, notes: e.target.value })}
                        />

                    </CardContent>

                    <CardActions
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            width: '100%'
                        }}>

                        <Button variant="contained" size="small" type="submit" >
                            Liberar
                        </Button>

                    </CardActions>

                </Card>
            </form>

        </>
    )
}

