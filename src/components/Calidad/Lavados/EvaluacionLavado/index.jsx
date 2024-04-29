import { Modal, Container, Box, Paper, Stack, Button, IconButton, TextField, CardMedia, FormControl, Select } from "@mui/material";
import { FormControlLabel, Checkbox, MenuItem, Alert, InputLabel, Typography } from "@mui/material";
//customComponents
import { ContainerScroll } from "../../../ContainerScroll";
//hooks
import { useState, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate } from "react-router-dom";
//services
import { sendImageCloudinary } from "../../../../cloudinary";
import { updateRegistroWhitId } from "../../../../services/maniobras";
import { updateWashing, createWashing } from "../../../../services/lavados";
import { postRepair } from "../../../../services/reparaciones";
//libraries
import { toast, Toaster } from "sonner";
import { preset, folderName } from "../../../../cloudinary";
//icons
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ClearIcon from '@mui/icons-material/Clear';

export function EvaluacionLavado() {

    const navigate = useNavigate();
    const { lavado } = useParams();

    const lavadoJson = JSON.parse(decodeURIComponent(lavado)) || {};

    const { registros_detalles_entradas, id_detalle_entrada, orden_id, fecha_recoleccion, fecha_entrega, id_tipo_lavado, ordenes_lavado, bahia, tipos_lavado, condiciones_lavado, id: idLavado } = lavadoJson || {};

    const { carga, clientes, numero_pipa, numero_tanque, tipo, especificacion, id: idRegistro } = registros_detalles_entradas || {};

    const { duration, num: numLavado, lavado: tipoLavado } = tipos_lavado || {};

    const { cliente } = clientes || {};

    const { destinos } = ordenes_lavado || {}

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

    const cloneDataWashing = {
        id_detalle_entrada,
        fecha_recoleccion,
        id_tipo_lavado,
        fecha_entrega,
        orden_id,
    }

    const [step, setStep] = useState(1)
    const [revision, setRevision] = useState(questionsTest)


    const changueValue = (index, value) => {
        const copy = [...revision];
        copy[index].value = value;
        setRevision(copy);
    };


    return (
        <>
            <Toaster richColors position="top-center" />
            <Modal
                open={true}
                onClose={() => navigate(`/calidad/lavados/pendientes`)}
            >

                <Container sx={{ display: 'flex', justifyContent: 'center', paddingTop: '3%', width: 'fit-content', maxWidth: '95vw' }}>
                    <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '10px', width: 'fit-content' }}>

                        <Stack flexDirection='row' alignItems='center' justifyContent='space-between' paddingBottom='5px'>

                            <Typography>Inspección física</Typography>

                            <IconButton
                                onClick={() => navigate(`/calidad/lavados/pendientes`)}
                                color="error"
                            >
                                <ClearIcon />
                            </IconButton>
                        </Stack>

                        {(step === 1) && <Test setStep={setStep} revision={revision} changueValue={changueValue} />}

                        {(step === 2) && <ResultadosEvaluacion idLavado={idLavado} idRegistro={idRegistro} cloneDataWashing={cloneDataWashing} />}

                        {(step === 3) && <EvidenceURL idLavado={idLavado} idRegistro={idRegistro} />}

                    </Paper>
                </Container>
            </Modal>
        </>
    )
}

function Test({ setStep, revision, changueValue }) {

    const emptyFields = revision.filter((question) => question.value === '');
    const resultsTest = revision.filter((question) => question.value === 'no');

    const nextStep = () => {

        if (emptyFields.length > 0) {
            toast.error('Termina el checklist')
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
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    siguiente
                </Button>
            </Stack>
        </>
    )
}

function ResultadosEvaluacion({ idLavado, idRegistro, cloneDataWashing }) {

    const statusRef = useRef('lavado');
    const navigate = useNavigate();

    async function sendHandler() {
        try {

            const status = statusRef.current.value;

            const newRepair = {
                id_detalle_registro: idRegistro,
                tipo_reparacion: status
            }

            const newWashing = {
                ...cloneDataWashing,
                status: 'asignado'
            }

            const { error: errorUpdateWashing } = await updateWashing({ status: 'descartado' }, idLavado);

            if (errorUpdateWashing) {
                throw new Error(`Error al actualizar lavado, error: ${errorUpdateWashing.message} `)
            }

            const routerFunctions = {
                interna: { method: postRepair, params: newRepair },
                externa: { method: postRepair, params: newRepair },
                lavado: { method: createWashing, params: newWashing },
            }

            const postFunction = routerFunctions[status]['method'];
            const postParams = routerFunctions[status]['params'];

            const { error: errorRouter } = await postFunction(postParams)

            if (errorRouter) {
                throw new Error(errorRouter?.message)
            }

            toast.success('registro creado')
            navigate('/calidad/lavados/pendientes')

        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                <Alert severity="error" >
                    Inspección reprobada, elige a que etapa retornar el tanque.
                </Alert>

                <FormControl>
                    <InputLabel>status</InputLabel>
                    <Select
                        label='status'
                        inputRef={statusRef}
                        defaultValue={'lavado'}
                    >
                        <MenuItem value='interna' >reparación interna</MenuItem>
                        <MenuItem value='externa' >reparación externa</MenuItem>
                        <MenuItem value='lavado' >lavado</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    onClick={sendHandler}
                    variant="contained"
                    size="small"
                >
                    enviar
                </Button>

            </Box>

        </>
    )
}

function EvidenceURL({ idLavado, idRegistro }) {

    const navigate = useNavigate();

    const [url, setUrl] = useState({
        valueDome: '',
        coments: '',
        previewDome: '',
        imageDome: '',
        valueValve: '',
        previewValve: '',
        imageValve: ''
    });

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

    async function sendURL() {
        try {

            if (imageDome === '' && imageValve === '') {
                throw new Error('Anexa evidencia del url')
            }

            if (valueDome === '' && valueValve === '') {
                throw new Error('Escribe el valor de la prueba url')
            }

            const urls = []

            const dataURL = [
                { position: 'dome', image: imageDome, value: valueDome },
                { position: 'valve', image: imageValve, value: valueValve },
            ]

            for (let item of dataURL) {

                if (item.image != '') {
                    const formData = new FormData();
                    formData.append('folder', folderName);
                    formData.append('upload_preset', `${preset}`)
                    formData.append('file', item.image);
                    const response = await sendImageCloudinary(formData);

                    if (!response.url) {
                        throw new Error(`Error al subir al subir la imagen, imposible recuperar url, url: ${response.url}`)
                    }

                    urls.push({ ...item, image: response.url })
                }

            }

            const url = { pruebas: urls, coments: coments }

            //actualizar el registro general a sanitizando
            const { error: errorUpdateRegister } = await updateRegistroWhitId(idRegistro, { status: 'sellado' });

            if (errorUpdateRegister) {
                throw new Error(errorUpdateRegister)
            }

            //actualizar el registro de lavado a sanitizado
            const { error: errorUpdateWashing } = await updateWashing({ status: 'sellado', URL: url }, idLavado);

            if (errorUpdateWashing) {
                throw new Error(errorUpdateWashing)
            }

            toast.success('registro actualizado')
            navigate('/calidad/lavados/pendientes')

        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px', gap: '10px' }}>

                <Typography textAlign='start'>Anexa evidencias de las pruebas URL</Typography>

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


                <Box sx={{ display: 'flex', flexDirection: 'column', paddingY: '10px', width: '100%', bgcolor: 'white', gap: '10px' }}>

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

                </Box>

                <Button
                    fullWidth
                    size="small"
                    type="submit"
                    variant="contained"
                    onClick={sendURL}
                >
                    Liberar
                </Button>

            </Box>

        </>
    )
}


function ItemQuestion({ question, index, toggleCheck }) {
    const IsSmall = useMediaQuery("(max-width:700px)");

    return (
        <Paper sx={{ padding: "10px" }}>
            <Box>
                <Stack
                    width={"100%"}
                    flexWrap={"wrap"}
                    alignItems={"center"}
                    flexDirection={IsSmall ? "column" : "row"}
                    justifyContent={"space-between"}
                >
                    <Typography
                        variant="subtitle2"
                        textAlign={IsSmall ? "center" : "start"}
                        width={IsSmall ? "80%" : "70%"}
                    >
                        {question.question}
                    </Typography>

                    <Stack
                        width={IsSmall ? "100%" : "auto"}
                        justifyContent={IsSmall ? "space-around" : "center"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        gap={"10px"}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => toggleCheck(index, "si")}
                                    checked={question.value === "si" ? true : false}
                                />
                            }
                            label="Si"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => toggleCheck(index, "no")}
                                    checked={question.value === "no" ? true : false}
                                />
                            }
                            label="No"
                        />
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    );
}
