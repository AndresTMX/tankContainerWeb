import { useState } from "react";
import { toast, Toaster } from "sonner";
import { Box, Paper, Stack, Button, IconButton, Typography, Card, CardMedia, CardActionArea, CardContent, CardActions, Modal, Fade, Alert, Skeleton, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { DataGridRepairs } from "../DataGridRepairs";
import { DataGridMaterials } from "../DataGridMaterials";
//hooks
import { useGetCheckList } from "../../Hooks/Reparaciones/useGetChecklist";
import { useUpdateRepair } from "../../Hooks/Reparaciones/useUpdateRepair";
import { useDataRepair } from "../../Hooks/Reparaciones/useDataRepair";
//icons
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PanoramaIcon from '@mui/icons-material/Panorama';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
//components
import { ButtonDowloandProforma } from "../../PDFs/components/ButtonDowloand";
import { Proforma } from "../../PDFs/plantillas/proforma";
import { ContainerScroll } from "../ContainerScroll";
import { PDFViewer } from "@react-pdf/renderer";
import { dateInText } from "../../Helpers/date";

function ModalRepair({ tanque, selectItem, updateRepairs, typeRepair, changueTypeRepair }) {

    const { checklist, dataJson, loading, error } = useGetCheckList(tanque.registros_detalles_entradas.id);

    const { updateRepair, completeRepair } = useUpdateRepair();

    const [reparation, setReparation] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [viewPDF, setViewPDF] = useState(false);

    //hook de manejo de datos 
    const { states, actions } = useDataRepair(typeRepair, tanque, dataJson, loading);
    const { evidences, checklist: checklistState, rows, rowModesModel, rowsMaterials, rowModesMaterials } = states;
    const { toggleImage, onChangueImage, onDeleteImage, setRows, setRowModesModel, setRowMaterials, setRowModesMaterials, upLoadImage } = actions;

    //informacion recopilada en checklist
    const { folio, ingreso, clientes } = checklist[0] || {};
    const { cliente } = clientes || {};
    //fecha de finalizacion del mantenimiento
    const { checkOut, numero_tanque, } = tanque

    const updateTypeMaintance = async () => {

        if (reparation.trim() === '') {
            toast.warning('Selecciona un tipo de reparación')
        } else {
            await updateRepair({ tipo_reparacion: reparation }, tanque.id)
            setTimeout(() => {
                updateRepairs()
            }, 1000)
        }
    }

    const initRepairButton = async () => {

        const questionsWhitImageRepair = evidences.map((question) => ({
            ...question,
            previewEvidence: '',
            imageEvidence: '',
        }));

        if (rows.length >= 1 && questionsWhitImageRepair.length >= 1) {

            const dataMaintance = {
                proforma: rows,
                repairs: questionsWhitImageRepair
            }

            const questionsForUpdate = []

            for (const question of questionsWhitImageRepair) {
                if (typeof question.image != 'string') {
                    questionsForUpdate.push(question)
                }
            }

            console.log(questionsForUpdate)

            await updateRepair(questionsForUpdate, dataMaintance, tanque.id)
            setTimeout(() => {
                selectItem(false)
                updateRepairs()
                changueTypeRepair('proceso')
            }, 1000)

        } else {
            toast.warning('Agrega evidencias y conceptos para iniciar la reparación')
        }

    }

    const completeRepairButton = async () => {

        const validationEvidences = evidences.filter((question) => question.imageEvidence === '');

        if (validationEvidences.length > 0 || rowsMaterials.length === 0 && newStatus === '') {
            toast.warning('Anexa evidencias, materiales y estatus para completar la reparación')
        } else {
            const dataMaintance = {
                proforma: rows,
                repairs: evidences,
                materiales: rowsMaterials,
                status: newStatus,
            }

            await completeRepair(dataMaintance, tanque.id, tanque.registros_detalles_entradas.id);
            setTimeout(() => {
                selectItem(false)
                updateRepairs()
                changueTypeRepair('completado')
            }, 1000)
        }
    }

    return (
        <>

            <Toaster richColors position='top-center' />

            <Box sx={{ bgcolor: 'whitesmoke', display: 'flex', flexDirection: 'column', width: '100vw', alignItems: 'center', minHeight: '100vh' }}>

                <Stack
                    width={'100%'}
                    position={'fixed'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    bgcolor={'whitesmoke'}
                    padding={'20px'}
                    zIndex={4}
                    sx={{
                        top: '50px',
                    }}
                >
                    <Typography variant='h6'>
                        Reparación del tanque {tanque.numero_tanque}
                    </Typography>

                    <IconButton
                        onClick={() => selectItem(false)}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Stack>

                <Box sx={{ padding: '15px', maxWidth: '1200px' }} elevation={4}>

                    {(typeRepair === 'pendiente') &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '90vw', marginTop: '50px' }}>

                            <Paper sx={{ padding: '20px' }}>
                                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'}>

                                    <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                                        <Typography variant="subtitle2">Cliente :</Typography>
                                        <Typography>{cliente}</Typography>
                                    </Stack>

                                    <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                                        <Typography variant="subtitle2">Folio EIR :</Typography>
                                        <Typography>{folio}</Typography>
                                    </Stack>

                                    <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                                        <Typography variant="subtitle2">Fecha de ingreso :</Typography>
                                        <Typography>{dateInText(ingreso)}</Typography>
                                    </Stack>

                                </Stack>
                            </Paper>

                            <Stack gap={'5px'}>
                                <Typography variant='caption'>Evidencias recopiladas en EIR</Typography>
                                <Paper>
                                    <Stack
                                        gap={'15px'}
                                        padding={'15px'}
                                        alignItems={'center'}
                                        flexDirection={'row'}
                                        sx={{ overflowX: 'auto' }}
                                    >
                                        {!loading && checklistState.length > 0 &&
                                            checklistState.map((question, index) => (
                                                <ImageDinamic
                                                    key={question.question}
                                                    index={index}
                                                    toggleItem={toggleImage}
                                                    typeRepair={typeRepair}
                                                    question={question}
                                                    upLoadImage={upLoadImage}
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
                                
                                <FormControl>
                                    <InputLabel>Tipo de reparación</InputLabel>
                                    <Select
                                        label="Tipo de reparación"
                                        value={reparation}
                                        onChange={(e) => setReparation(e.target.value)}
                                    >
                                        <MenuItem value='interna' >interna</MenuItem>
                                        <MenuItem value='externa' >externa</MenuItem>
                                    </Select>
                                </FormControl>

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
                                    typeRepair={typeRepair}
                                    rowModesModel={rowModesModel}
                                    setRowModesModel={setRowModesModel}
                                />
                            </ContainerScroll>

                            <Stack gap={'5px'}>
                                <Typography variant='caption'>Evidencias agregadas al documento</Typography>
                                <Paper>
                                    <Stack padding={'15px'} gap={'15px'} flexDirection={'row'} alignItems={'center'}>
                                        {evidences.map((question, index) => (
                                            <ImageDinamic
                                                key={question.question}
                                                index={index}
                                                question={question}
                                                toggleItem={toggleImage}
                                                typeRepair={typeRepair}
                                                upLoadImage={upLoadImage}
                                            />
                                        ))}

                                        {(evidences.length === 0) &&
                                            <Alert severity='info'>Sin evidencias agregadas</Alert>
                                        }
                                    </Stack>
                                </Paper>
                            </Stack>

                            <Button
                                onClick={initRepairButton}
                                variant="contained"
                                color="primary"
                            >
                                Iniciar reparación
                            </Button>
                        </Box>}

                    {(typeRepair === 'proceso') &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '90vw', marginTop: '50px' }}>

                            <Paper sx={{ padding: '20px' }}>
                                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'}>

                                    <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                                        <Typography variant="subtitle2">Cliente :</Typography>
                                        <Typography>{cliente}</Typography>
                                    </Stack>

                                    <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                                        <Typography variant="subtitle2">Folio EIR:</Typography>
                                        <Typography>{folio}</Typography>
                                    </Stack>

                                    <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                                        <Typography variant="subtitle2">Fecha de ingreso :</Typography>
                                        <Typography>{dateInText(ingreso)}</Typography>
                                    </Stack>

                                </Stack>
                            </Paper>

                            <Paper sx={{ padding: '20px' }}>
                                <FormControl fullWidth>
                                    <InputLabel>Siguiente estatus</InputLabel>
                                    <Select
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        label='Siguiente estatus'
                                    >
                                        <MenuItem value="almacenado">Almacenado</MenuItem>
                                    </Select>
                                    <FormHelperText>Este estatus definirá si el tanque se almacena para programar un lavado en el futuro o se le deja de dar seguimiento</FormHelperText>
                                </FormControl>
                            </Paper>

                            <ContainerScroll background={'whitesmoke'} height={'300px'}>
                                <Stack gap={'10px'}>
                                    <Typography variant="subtitle2">Anexa evidencias a las reparaciones para completar el documento</Typography>
                                    {evidences.map((question, index) => (
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
                                    typeRepair={typeRepair}
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
                                    typeRepair={typeRepair}
                                    setRows={setRowMaterials}
                                    rowModesModel={rowModesMaterials}
                                    setRowModesModel={setRowModesMaterials}
                                />
                            </ContainerScroll>

                            <Button
                                onClick={completeRepairButton}
                                variant="contained"
                                color="primary"
                            >
                                terminar reparación
                            </Button>

                        </Box>}

                    {(typeRepair === 'completado') &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '90vw', marginTop: '50px' }}>

                            <Paper sx={{ padding: '20px' }}>
                                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'}>

                                    <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                                        <Typography variant="subtitle2">Cliente :</Typography>
                                        <Typography>{cliente}</Typography>
                                    </Stack>

                                    <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                                        <Typography variant="subtitle2">Folio EIR:</Typography>
                                        <Typography>{folio}</Typography>
                                    </Stack>

                                    <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                                        <Typography variant="subtitle2">Fecha de ingreso :</Typography>
                                        <Typography>{dateInText(ingreso)}</Typography>
                                    </Stack>

                                </Stack>
                            </Paper>

                            <ContainerScroll background={'whitesmoke'} height={'300px'}>
                                <Stack gap={'10px'}>
                                    <Typography variant="subtitle2">Evidencias de reparaciones</Typography>
                                    {evidences.map((question) => (
                                        <ImageDinamic
                                            key={question.question}
                                            typeRepair={typeRepair}
                                            question={question}
                                        />
                                    ))}
                                </Stack>
                            </ContainerScroll>

                            <ContainerScroll background={'white'} height={'300px'}>
                                <Typography variant='caption'>
                                    Proforma
                                </Typography>
                                <DataGridRepairs
                                    setRows={setRows}
                                    typeRepair={typeRepair}
                                    rows={rows}
                                    rowModesModel={rowModesModel}
                                    setRowModesModel={setRowModesModel}
                                />
                            </ContainerScroll>

                            <ContainerScroll background={'white'} height={'300px'}>
                                <Typography variant='caption'>
                                    Materiales de reparación
                                </Typography>
                                <DataGridMaterials
                                    typeRepair={typeRepair}
                                    setRows={setRowMaterials}
                                    rowModesModel={rowModesMaterials}
                                    rows={rowsMaterials}
                                    setRowModesModel={setRowModesMaterials}
                                />
                            </ContainerScroll>

                            <Stack flexDirection={'row'} justifyContent={'flex-end'} gap={'10px'}>
                                <Button
                                    onClick={() => setViewPDF('sencillo')}
                                    variant="contained"
                                    color="primary"
                                >
                                    forma sencilla
                                </Button>
                                <Button
                                    onClick={() => setViewPDF('detallado')}
                                    variant="contained"
                                    color="secondary"
                                >
                                    forma detallada
                                </Button>
                            </Stack>

                        </Box>}

                </Box>

            </Box>

            <Modal open={viewPDF}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', height: '100vh', width: '100vw' }}>
                    <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '90%', minWidth: '90%' }}>
                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'flex-end'}
                            width={'100%'}
                            padding={'15px'}
                            gap={'20px'}
                        >
                            <ButtonDowloandProforma
                                dataHeader={{ folio, ingreso, cliente, checkOut, numero_tanque }}
                                typeProforma={viewPDF}
                                arrayEvidences={evidences}
                                arrayConcepts={rows}
                                tanque={tanque.numero_tanque}
                            />
                            <Button variant="contained" color="error" onClick={() => setViewPDF(false)}>Close</Button>
                        </Stack>
                        <PDFViewer style={{ width: '100%', height: '90%', }}>
                            <Proforma
                                dataHeader={{ folio, ingreso, cliente, checkOut, numero_tanque }}
                                typeProforma={viewPDF}
                                arrayEvidences={evidences}
                                tanque={tanque.numero_tanque}
                                arrayConcepts={rows}
                            />
                        </PDFViewer>
                    </Paper>
                </Box>
            </Modal>
        </>
    );
}

export { ModalRepair };

export function ImageDinamic({ question, toggleItem, typeRepair, index, upLoadImage }) {

    const [modal, setModal] = useState(false);
    const [imageModal, setImageModal] = useState('')

    const toggleModal = (image) => {
        setModal(!modal)
        setImageModal(image)
    }

    const image = typeof question.image != 'string' ? question.preview : question.image;

    return (
        <>

            {(typeRepair === 'pendiente') &&
                <Card sx={{ width: '150px', height: '150px', minWidth: '150px', minHeight: '150px' }}>

                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="100px"
                            width="100px"
                            image={image}
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
                                    onClick={() => toggleModal(question.preview)}
                                    size='small'
                                    color="info"
                                >
                                    <PanoramaIcon />
                                </IconButton>

                                <input
                                    type="file"
                                    accept="image/*"
                                    id={`image-${index}input`}
                                    style={{ display: "none" }}
                                    onChange={(e) => upLoadImage(index, e)}

                                />

                                <label htmlFor={`image-${index}input`}>
                                    <IconButton
                                        size='small'
                                        color="info"
                                        component="span"
                                    >
                                        <FileUploadIcon />
                                    </IconButton>
                                </label>

                            </Paper>

                        </CardActions>
                    </CardActionArea>
                </Card>
            }

            {(typeRepair === 'completado') &&
                <Paper sx={{ padding: '15px' }}>
                    <Stack flexDirection={'row'} alignItems={'center'} gap={'10px'}>
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
                                            onClick={() => toggleModal(question.image)}
                                            size='small'
                                            color="info"
                                        >
                                            <PanoramaIcon />
                                        </IconButton>
                                    </Paper>

                                </CardActions>
                            </CardActionArea>
                        </Card>

                        <Card sx={{ width: '150px', height: '150px' }}>

                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="150px"
                                    width="150px"
                                    image={question.imageEvidence}
                                    alt={question.question}
                                />
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
                                            onClick={() => toggleModal(question.imageEvidence)}
                                            size='small'
                                            color="info"
                                        >
                                            <PanoramaIcon />
                                        </IconButton>
                                    </Paper>

                                </CardActions>
                            </CardActionArea>
                        </Card>
                    </Stack>
                </Paper>
            }

            <Modal open={modal}>
                <Fade in={modal} onClick={() => setModal(!modal)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', paddingTop: '30px', alignItems: 'center' }}>
                        <Card sx={{ width: '100%', height: '100%', maxWidth: '80vw', maxHeight: '80vh', padding: '10px' }}>
                            <CardMedia
                                component="img"
                                height="100%"
                                width="auto"
                                image={imageModal}
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
