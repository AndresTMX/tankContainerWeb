import { useState } from "react";
import { Container, Box, Paper, Typography, Chip, Stack, Button, Alert, Modal, Tab, Tabs, IconButton, Card, CardMedia, CardActions, } from "@mui/material";
import { dateMXFormat, datetimeMXFormat } from "../../Helpers/date";
import { ContainerScroll } from "../ContainerScroll";
import { NotConexionState } from "../NotConectionState";
import { HistoryItemLoading } from "../HistoryItem";
import { CustomTabPanel } from "../CustomTabPanel";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import HistoryIcon from '@mui/icons-material/History';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ClearIcon from '@mui/icons-material/Clear';
import { dividirArrayPorPropiedad } from "../../Helpers/transformRegisters";
import { CheckListCalidadPrelavado } from "../../sections/CheckListCalidadPrelavado";

function ListPrelavadosPending({ prelavados, loading, error, cache, updateList }) {

    const renderPrelavados = prelavados?.length >= 1 ? true : false;

    const renderCache = cache?.length >= 1 ? true : false;

    return (
        <>
            <ContainerScroll height={'60vh'}>

                <Stack width={'100%'} gap={'5px'} alignItems={'center'}>

                    {(!loading && error) && <NotConexionState />}

                    {(!loading && !error && !renderPrelavados) &&
                        <Alert severity="info">
                            ¡Sin inspecciones pendientes!
                        </Alert>}


                    {(loading && !error) &&
                        <Stack width={'100%'} gap={'5px'} alignItems={'center'}>
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                        </Stack>
                    }


                    {(!loading && !error && renderPrelavados) &&
                        prelavados.map((prelavado) => (
                            <ItemPrelavadoChecklist
                                key={prelavado.id}
                                prelavado={prelavado}
                            />
                        ))}

                    {(!loading && error && renderCache) &&
                        cache.map((prelavado) => (
                            <ItemPrelavadoChecklist
                                key={prelavado.id}
                                prelavado={prelavado}
                            />
                        ))}

                </Stack>


            </ContainerScroll>

        </>
    );
}

export { ListPrelavadosPending };


export function ItemPrelavadoChecklist({ prelavado }) {

    const {
        data,
        status,
        user_id,
        created_at,
        iteraciones,
        numero_pipa,
        numero_tanque,
        registro_detalle_entrada_id,
    } = prelavado;

    const prelavadosInJson = JSON.parse(data);

    const [viewPrelavados, setViewPrelavados] = useState(false);
    const [viewChecklist, setViewChecklist] = useState(false);

    const togglePrelavados = () => setViewPrelavados(!viewPrelavados);
    const toggleChecklist = () => setViewChecklist(!viewChecklist);

    return (

        <>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Paper elevation={4} sx={{ padding: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>

                        <Stack flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>
                            <Chip size='small' color='warning' label={status} />
                            <Chip size='small' color='info' label={`Retornos : ${iteraciones}`} />
                        </Stack>

                        <Stack flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>
                            <Chip
                                size='small'
                                color='info'
                                icon={<CalendarTodayIcon />}
                                label={dateMXFormat(created_at)} />
                            <Chip
                                size='small'
                                color='info'
                                icon={<ScheduleIcon />}
                                label={datetimeMXFormat(created_at)} />
                        </Stack>

                    </Stack>

                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>

                        <Stack flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>
                            <Typography variant='button'>
                                {numero_tanque != null ? 'Tanque' : 'Pipa'}
                                {numero_tanque != null ? numero_tanque : numero_pipa}
                            </Typography>
                        </Stack>

                        <Stack flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>
                            <Button
                                onClick={togglePrelavados}
                                endIcon={<HistoryIcon />}
                                size='small'
                                variant='outlined'
                                color='primary'
                            >prelavados</Button>

                            <Button
                                onClick={toggleChecklist}
                                endIcon={<ManageSearchIcon />}
                                size='small'
                                variant='contained'
                                color='primary'
                            >inspeccionar</Button>
                        </Stack>

                    </Stack>

                </Paper>
            </Box>

            <ModalVisualizePrelavados
                modal={viewPrelavados}
                toggleModal={togglePrelavados}
                prelavados={prelavadosInJson}
            />

            <CheckListCalidadPrelavado
            modal={viewChecklist}
            toggleModal={toggleChecklist}
            />



        </>

    )
}

export function ModalVisualizePrelavados({ modal, toggleModal, prelavados, }) {

    const IsSmall = useMediaQuery('(max-width:900px)');
    const [tab, setTab] = useState(0);
    const ToggleTab = (event, newValue) => {
        setTab(newValue)
    }

    const totalQuestions = prelavados.flat();
    const allChecklist = dividirArrayPorPropiedad(totalQuestions, 'cubierta')

    return (
        <>
            <Modal open={modal}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '700px' }}>
                        <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '20px', }}>
                            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Typography variant='button'>Checklists de prelavado</Typography>

                                <IconButton
                                    color='error'
                                    variant='outlined'
                                    onClick={toggleModal}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </Stack>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <Tabs
                                    value={tab}
                                    onChange={ToggleTab}
                                    variant={IsSmall ? "scrollable" : ''}
                                    scrollButtons="auto"
                                >
                                    {allChecklist.map((prelavado, index) => (
                                        <Tab key={index} label={`Prelavado ${index + 1}`} />
                                    ))}
                                </Tabs>
                            </Box>

                            {prelavados.length >= 1 &&
                                allChecklist.map((prelavado, index) => (
                                    <CustomTabPanel key={`panel_${index}`} index={index} value={tab} >
                                        <ContainerScroll height={'400px'} >
                                            <Stack width={'100%'} gap={'8px'} alignItems={'center'}>
                                                {prelavado.map((question, index) => (
                                                    <CheckListInspect
                                                        key={`checklist_${index}`}
                                                        question={question}
                                                    />
                                                ))}
                                            </Stack>
                                        </ContainerScroll>
                                    </CustomTabPanel>
                                ))}

                        </Paper>
                    </Box>
                </Container>
            </Modal>
        </>
    )
}

function CheckListInspect({ question }) {

    const [image, viewImage] = useState(false)

    return (
        <>
            <Paper sx={{ padding: '20px', width: '100%' }}>
                <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>

                    <Stack display='flex' flexDirection='column' gap='5px'>
                        {(question?.cubierta) &&
                            <Typography variant='subtitle2'>Tipo de cubierta</Typography>}
                        <Typography variant='subtitle2'>{question.question}</Typography>
                        <Typography variant='caption'>{question?.value ? question.value : question.cubierta}</Typography>
                    </Stack>

                    <Stack display='flex' flexDirection='column' gap='5px'>
                        <IconButton
                            onClick={() => viewImage(!image)}
                            disabled={question?.image ? false : true}
                            color={question?.image ? 'info' : 'default'}
                        >
                            <InsertPhotoIcon />
                        </IconButton>
                    </Stack>


                </Stack>
            </Paper>

            <Modal open={image}>
                <Container
                    onClick={() => viewImage(!image)}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10%' }}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="400px"
                            image={question.image}
                            alt={question?.value ? question.value : question.cubierta}
                        />
                    </Card>
                </Container>
            </Modal>
        </>
    )
}