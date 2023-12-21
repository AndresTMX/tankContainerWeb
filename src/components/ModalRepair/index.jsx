import { useState, useContext, useEffect } from "react";
import { Box, Paper, Stack, Button, IconButton, Typography, Card, CardMedia, CardActionArea, CardContent, CardActions, Modal, Fade, Alert, Skeleton } from "@mui/material";
import { DataGridRepairs } from "../DataGridRepairs";
import { DataGridMaterials } from "../DataGridMaterials";
//hooks
import { useGetCheckList } from "../../Hooks/reparaciones/useGetChecklist";
import { useUpdateRepair } from "../../Hooks/reparacionesManagment/useUpdateRepair";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
//icons
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PanoramaIcon from '@mui/icons-material/Panorama';
import { SelectSimple } from "../SelectSimple";
import { ContainerScroll } from "../ContainerScroll";

function ModalRepair({ tanque, selectItem, updateRepairs, typeRepair }) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const { updateRepair, completeRepair } = useUpdateRepair();
    const { checklist, dataJson, loading, error } = useGetCheckList(tanque.id_detalle_registro)

    const questionWhitEvidence = dataJson.filter((question) => question.image != '');

    const questionWhitRepairsImages = dataJson.filter((question) => question.image != '').map((question) => ({
        ...question,
        previewEvidence: '',
        imageEvidence: ''
    }));

    const [reparation, setReparation] = useState('');

    //stados de la dataGrid de conceptos
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    //stados de la dataGrid de materiales
    const [rowsMaterials, setRowMaterials] = useState([]);
    const [rowModesMaterials, setRowModesMaterials] = useState({});

    //fotos de daños
    const [evidence, setEvidences] = useState([]);

    const toggleImage = (question) => {
        const exist = evidence.findIndex((quest) => quest.question === question.question);
        let newState

        if (exist >= 0) {
            setEvidences(evidence.filter((quest) => quest.question != question.question));
        } else {
            newState = evidence.length >= 1 ? [...evidence] : [];
            newState.push(question)
            setEvidences(newState)
        }
    }

    const onChangueImage = (event, index) => {
        const copyState = [...evidence];
        const file = event.target.files[0];
        const urlImage = URL.createObjectURL(file);
        copyState[index].previewEvidence = urlImage;
        copyState[index].imageEvidence = file;
        setEvidences(copyState)
    }

    const onDeleteImage = (index) => {
        const copyState = [...evidence];
        copyState[index].previewEvidence = '';
        copyState[index].imageEvidence = '';
        setEvidences(copyState)
    }

    const updateTypeMaintance = async () => {

        if (reparation.trim() === '') {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Selecciona un tipo de reparación'
            })
        } else {
            await updateRepair({ tipo_reparacion: reparation }, tanque.id)
            setTimeout(() => {
                updateRepairs()
            }, 1000)
        }
    }

    const sendMaintance = async () => {

        const dataMaintance = {
            proforma: rows,
            repairs: evidence
        }

        const data = JSON.stringify(dataMaintance);

        await updateRepair({ status: 'proceso', data: data }, tanque.id)
        setTimeout(() => {
            selectItem(false)
            updateRepairs()
        }, 1000)

    }

    const completeMaintance = async() => {

        const dataMaintance = {
            proforma: rows,
            repairs: evidence,
            materiales: rowsMaterials
        }

        await completeRepair(dataMaintance, tanque.id)

    }

    useEffect(() => {
        if (typeRepair === 'proceso') {
            const dataJson = JSON.parse(tanque.data)
            setEvidences(questionWhitRepairsImages)
            setRows([...dataJson.proforma])
        }
    }, [typeRepair, loading])


    return (
        <>
            <Paper sx={{marginTop:'20px'}} elevation={4}>
                <ContainerScroll height={'85vh'}>

                    {(typeRepair === 'pendiente') &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px', paddingRight: '20px', gap: '10px', width: '80vw', maxWidth: '1000px' }}>
                            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Typography variant='h6'>
                                    Reparación del tanque {tanque.numero_tanque}
                                </Typography>

                                <IconButton
                                    onClick={() => selectItem(false)}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Stack>

                            <Stack gap={'5px'}>
                                <Typography variant='caption'>Evidencias recopiladas en EIR</Typography>
                                <Paper>
                                    <Stack padding={'15px'} gap={'15px'} flexDirection={'row'} alignItems={'center'}>
                                        {questionWhitEvidence.map((question) => (
                                            <ImageDinamic
                                                key={question.question}
                                                question={question}
                                                state={evidence}
                                                toggleItem={toggleImage}
                                            />
                                        ))}

                                        {(loading && !error) &&
                                            <Fade in={loading}>
                                                <Stack padding={'15px'} gap={'15px'} flexDirection={'row'} alignItems={'center'}>
                                                    <Skeleton variant='rounded' width={'150px'} height={'150px'} />
                                                    <Skeleton variant='rounded' width={'150px'} height={'150px'} />
                                                    <Skeleton variant='rounded' width={'150px'} height={'150px'} />
                                                </Stack>
                                            </Fade>
                                        }

                                        {(!loading && error) &&
                                            <Alert severity='error'>{error.message}</Alert>
                                        }
                                    </Stack>
                                </Paper>
                            </Stack>

                            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <SelectSimple
                                    width={'300px'}
                                    title={'Tipo de reparación'}
                                    options={['interna', 'externa']}
                                    value={reparation}
                                    onChange={(e) => setReparation(e.target.value)}
                                />

                                <Button
                                    onClick={updateTypeMaintance}
                                    size='small'
                                    variant="contained"
                                    color="primary"
                                >
                                    Guardar cambio
                                </Button>
                            </Stack>

                            <ContainerScroll background={'white'} height={'300px'}>
                                <Typography variant='caption'>
                                    Proforma
                                </Typography>
                                <DataGridRepairs
                                    rows={rows}
                                    setRows={setRows}
                                    rowModesModel={rowModesModel}
                                    setRowModesModel={setRowModesModel}
                                />
                            </ContainerScroll>

                            <Stack gap={'5px'}>
                                <Typography variant='caption'>Evidencias agregadas al documento</Typography>
                                <Paper>
                                    <Stack padding={'15px'} gap={'15px'} flexDirection={'row'} alignItems={'center'}>
                                        {evidence.map((question) => (
                                            <ImageDinamic
                                                key={question.question}
                                                question={question}
                                                state={evidence}
                                                toggleItem={toggleImage}
                                            />
                                        ))}

                                        {(evidence.length === 0) &&
                                            <Alert severity='info' >Sin evidencias agregadas</Alert>
                                        }
                                    </Stack>
                                </Paper>
                            </Stack>

                            <Button
                                onClick={sendMaintance}
                                variant="contained"
                                color="primary"
                            >
                                Iniciar reparación
                            </Button>
                        </Box>}

                    {(typeRepair === 'proceso') &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px', paddingRight: '20px', gap: '10px', width: '95vw', maxWidth: '1000px' }}>
                            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Typography variant='h6'>
                                    Completar reparación del tanque {tanque.numero_tanque}
                                </Typography>

                                <IconButton
                                    onClick={() => selectItem(false)}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Stack>

                            <ContainerScroll background={'whitesmoke'} height={'300px'}>
                                <Stack gap={'10px'}>
                                    <Typography variant="subtitle2">Anexa evidencias a las reparaciones para completar el documento</Typography>
                                    {evidence.map((question, index) => (
                                        <ImageEvidence
                                            key={question.question}
                                            index={index}
                                            question={question}
                                            onChangueImage={onChangueImage}
                                            onDeleteImage={onDeleteImage}
                                        />
                                    ))}
                                </Stack>
                            </ContainerScroll>

                            <ContainerScroll background={'white'} height={'300px'}>
                                <Typography variant='caption'>
                                    Proforma
                                </Typography>
                                <DataGridRepairs
                                    rows={rows}
                                    setRows={setRows}
                                    rowModesModel={rowModesModel}
                                    setRowModesModel={setRowModesModel}
                                />
                            </ContainerScroll>

                            <ContainerScroll background={'white'} height={'300px'}>
                                <Typography variant='caption'>
                                    Materiales de reparación
                                </Typography>
                                <DataGridMaterials
                                    rows={rowsMaterials}
                                    setRows={setRowMaterials}
                                    rowModesModel={rowModesMaterials}
                                    setRowModesModel={setRowModesMaterials}
                                />
                            </ContainerScroll>

                            <Button
                                onClick={completeMaintance}
                                variant="contained"
                                color="primary"
                            >
                                terminar reparación
                            </Button>

                        </Box>}

                </ContainerScroll>
            </Paper>

        </>
    );
}

export { ModalRepair };

export function ImageDinamic({ question, state, toggleItem }) {

    const [modal, setModal] = useState(false);

    return (
        <>
            <Card sx={{ width: '150px', height: '150px' }}>

                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="100px"
                        width="100px"
                        image={question.image}
                        alt={question.question}
                    />
                    <CardContent sx={{ width: '100%', height: '60px', position: 'relative', top: '-10px', bgcolor: 'whitesmoke' }}>
                        <Stack sx={{ position: 'relative', top: '-5px' }}>
                            <Typography variant='subtitle2' textTransform={'lowercase'}>
                                {question.question}
                            </Typography>
                            <Typography variant='caption' >
                                {question.value}
                            </Typography>
                        </Stack>
                    </CardContent>
                    <CardActions
                        sx={{
                            width: '100%',
                            height: '40px',
                            position: 'absolute',
                            padding: '0px',
                            top: '0px',
                        }}>
                        <Paper sx={{ width: '100%', height: '100%', bgcolor: 'whitesmoke' }}>
                            <IconButton
                                onClick={() => toggleItem(question)}
                                size='small'
                                color="info"
                            >
                                <AddIcon />
                            </IconButton>

                            <IconButton
                                onClick={() => setModal(!modal)}
                                size='small'
                                color="info"
                            >
                                <PanoramaIcon />
                            </IconButton>
                        </Paper>

                    </CardActions>
                </CardActionArea>
            </Card>

            <Modal open={modal}>
                <Fade in={modal} onClick={() => setModal(!modal)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', paddingTop: '10%', alignItems: 'center' }}>
                        <Card sx={{ width: '100%', height: '100%', maxWidth: '80vw', maxHeight: '80vh', padding: '10px' }}>
                            <CardMedia
                                component="img"
                                height="100%"
                                width="auto"
                                image={question.image}
                                alt={question.question}
                            />
                        </Card>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export function ImageEvidence({ question, index, onChangueImage, onDeleteImage }) {

    return (
        <Paper sx={{ padding: '10px' }}>
            <Stack flexDirection={'row'} alignItems={'center'} gap={'20px'}>
                <Card sx={{ width: '150px', height: '150px' }}>

                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="150px"
                            width="150px"
                            image={question.image}
                            alt={question.question}
                        />
                    </CardActionArea>
                </Card>

                <Card sx={{ width: '150px', height: '150px' }}>

                    <CardActionArea>

                        {(question.previewEvidence != '') &&
                            <CardMedia
                                component="img"
                                height="150px"
                                width="150px"
                                image={question.previewEvidence}
                                alt={question.question}
                            />}

                        {(question.previewEvidence != '') &&
                            <CardContent>
                                <CardActions
                                    sx={{
                                        width: '100%',
                                        height: '40px',
                                        position: 'absolute',
                                        padding: '0px',
                                        top: '0px',
                                        right: '-110px',
                                    }}>
                                    <Paper sx={{ width: 'auto', height: 'auto', bgcolor: 'whitesmoke', zIndex: '2' }}>
                                        <IconButton
                                            onClick={() => onDeleteImage(index)}
                                            size='small'
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Paper>

                                </CardActions>
                            </CardContent>}
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            id={`image-${question.question}-input`}
                            onChange={(e) => onChangueImage(e, index)}
                        />

                        <label htmlFor={`image-${question.question}-input`}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    height: '150px',
                                }}>
                                <Button
                                    disabled
                                    endIcon={<AttachFileIcon />}
                                    component="span"
                                    size="small"
                                    color="primary"
                                >
                                    evidencia
                                </Button>
                            </Box>
                        </label>

                    </CardActionArea>
                </Card>
            </Stack>
        </Paper>
    )
}