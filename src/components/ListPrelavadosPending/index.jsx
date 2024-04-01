import { useState } from "react";
import { Container, Box, Paper, Typography, Chip, Stack, Button, Alert, Modal, Tab, Tabs, IconButton, Card, CardMedia, } from "@mui/material";
import { CheckListCalidadPrelavado } from "../../sections/CheckListCalidadPrelavado";
import { NotConexionState } from "../NotConectionState";
import { ItemLoadingState } from "../ItemLoadingState";
import { ContainerScroll } from "../ContainerScroll";
import { CustomTabPanel } from "../CustomTabPanel";
//icons
import HistoryIcon from '@mui/icons-material/History';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ClearIcon from '@mui/icons-material/Clear';
//helpers
import { dateMXFormat, datetimeMXFormat, tiempoTranscurrido } from "../../Helpers/date";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePreWashingInspect } from "../../Hooks/Calidad/usePrewashingInspect";
import { useGetCheckListPrelavado } from "../../Hooks/Prelavado/useGetChecklists";

function ListPrelavadosPending() {

    const [typeInspect, setTypeInspect] = useState('pendiente')
    const { inspect: prelavados, loading, error, updater, cache } = usePreWashingInspect(typeInspect)

    const renderPrelavados = prelavados?.length >= 1 ? true : false;

    const renderCache = cache?.length >= 1 ? true : false;

    return (
        <Stack gap='10px'>

            <Paper sx={{ padding: '20px', bgcolor: 'whitesmoke' }}>
                <Stack flexDirection={'row'} gap={'10px'}>
                    <Chip
                        color={typeInspect === 'pendiente' ? 'warning' : 'default'}
                        onClick={() => setTypeInspect('pendiente')}
                        label={'pendientes'} />

                    <Chip
                        color={typeInspect === 'revisado' ? 'success' : 'default'}
                        onClick={() => setTypeInspect('revisado')}
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
                        prelavados.map((prelavado) => (
                            <ItemPrelavadoChecklist
                                key={prelavado.id}
                                prelavado={prelavado}
                                updater={updater}
                                type={typeInspect}
                            />
                        ))}

                    {(!loading && error && renderCache) &&
                        cache.map((prelavado) => (
                            <ItemPrelavadoChecklist
                                key={prelavado.id}
                                prelavado={prelavado}
                                updater={updater}
                                type={typeInspect}

                            />
                        ))}

                </Stack>


            </ContainerScroll>

        </Stack>
    );
}

export { ListPrelavadosPending };


export function ItemPrelavadoChecklist({ prelavado, updater, type }) {

    return (

        <>

            {type === 'pendiente' && <ItemPendiente prelavado={prelavado} updater={updater} />}

            {type === 'revisado' && <ItemRevisado prelavado={prelavado} updater={updater} />}


        </>

    )
}

function ItemPendiente({ prelavado, updater }) {

    const { registros_detalles_entradas, id_detalle_entrada } = prelavado || {};

    const { carga, clientes, numero_pipa, numero_tanque, status, lavado, created_at } = registros_detalles_entradas || {};

    const { cliente } = clientes || {};

    const { checklist, error, loading } = useGetCheckListPrelavado(id_detalle_entrada)

    const [viewPrelavados, setViewPrelavados] = useState(false);
    const [viewChecklist, setViewChecklist] = useState(false);

    const togglePrelavados = () => setViewPrelavados(!viewPrelavados);
    const toggleChecklist = () => setViewChecklist(!viewChecklist);

    const isMovile = useMediaQuery('(max-width:500px)')

    const retornos = !loading ? checklist.length - 1 : '...cargando';

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Paper
                    elevation={4} sx={{ padding: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>

                        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={isMovile ? 'space-around' : 'flex-start'} gap={'10px'} flexWrap={'wrap'}>
                            <Chip
                                size='small'
                                color='warning'
                                label={status}
                                sx={{ width: isMovile ? '40%' : 'auto' }}
                            />
                            <Chip
                                size='small'
                                color='info'
                                label={`Retornos : ${retornos} `}
                                sx={{ width: isMovile ? '40%' : 'auto' }}
                            />
                            {isMovile &&
                                <Chip
                                    size='small'
                                    color='info'
                                    icon={<CalendarTodayIcon />}
                                    label={dateMXFormat(created_at)}
                                    sx={{ width: isMovile ? '40%' : 'auto' }}
                                />}
                            {isMovile &&
                                <Chip
                                    size='small'
                                    color='info'
                                    icon={<ScheduleIcon />}
                                    label={datetimeMXFormat(created_at)}
                                    sx={{ width: isMovile ? '40%' : 'auto' }}
                                />}
                        </Stack>

                        {!isMovile &&
                            <Stack flexDirection={'row'} alignItems={'center'} gap={'10px'}>
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
                            </Stack>}

                    </Stack>

                    <Stack
                        flexDirection={isMovile ? 'column' : 'row'}
                        justifyContent={isMovile ? 'flex-start' : 'space-between'}
                        alignItems={'center'}
                        gap={'10px'}>

                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            gap={'10px'}
                            width={isMovile ? '100%' : 'auto'}
                        >
                            <Stack>
                                <Typography textTransform='capitalize' variant='caption'>
                                    {carga}
                                </Typography>
                                <Typography textTransform='uppercase' variant='button'>
                                    {numero_tanque || numero_pipa}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack
                            flexDirection={isMovile ? 'column' : 'row'}
                            width={isMovile ? '100%' : 'auto'}
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            gap={'10px'}
                        >
                            <Button
                                fullWidth={isMovile}
                                onClick={togglePrelavados}
                                endIcon={<HistoryIcon />}
                                size='small'
                                variant='outlined'
                                color='primary'
                            >prelavados</Button>

                            <Button
                                fullWidth={isMovile}
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
                prelavados={checklist}
            />

            <CheckListCalidadPrelavado
                modal={viewChecklist}
                toggleModal={toggleChecklist}
                prelavado={prelavado}
                updater={updater}
            />

        </>
    )
}

function ItemRevisado({ prelavado, updater }) {

    const {
        data,
        created_at,
        registro_detalle_entrada_id,
        registros_detalles_entradas,
        tipo_lavado,
    } = prelavado;

    const { carga, numero_pipa, numero_tanque, status, } =
        registros_detalles_entradas ? registros_detalles_entradas : {};

    // const prelavadosInJson = data? JSON.parse(data): {};

    const [modal, setModal] = useState(false)

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

                            <Chip
                                size='small'
                                color='info'
                                icon={<ScheduleIcon />}
                                label={tiempoTranscurrido(created_at)} />
                        </Stack>

                    </Stack>

                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>

                        <Stack flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} gap={'20px'}>

                            <Stack>
                                <Typography variant='caption'>
                                    {numero_tanque != null ? 'Tanque ' : 'Pipa '}
                                </Typography>
                                <Typography variant='button'>
                                    {numero_tanque != null ? numero_tanque : numero_pipa}
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography variant='caption'>
                                    Tipo de lavado
                                </Typography>
                                <Typography variant='button'>
                                    {tipo_lavado}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>

                            <Button
                                onClick={() => setModal(true)}
                                endIcon={<ManageSearchIcon />}
                                size='small'
                                variant='contained'
                                color='primary'
                            >checklist</Button>
                        </Stack>

                    </Stack>

                </Paper>
            </Box>
{/* 
            <Modal open={modal}>
                <Container sx={{ display: 'flex', flexDirection: 'column', paddingTop: '5%', minHeight: '100vh', width: '100vw', alignItems: 'center' }}>
                    <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '90vw', maxWidth: '700px' }}>
                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                        >
                            <Typography variant="button">
                                inspección de calidad
                            </Typography>

                            <IconButton
                                onClick={() => setModal(!modal)}
                            >
                                <ClearIcon color='error' />
                            </IconButton>
                        </Stack>

                        <ContainerScroll height={'400px'}>
                            <Stack gap='8px'>
                                {prelavadosInJson.map((question) => (
                                    <Paper elevation={2} sx={{ padding: '15px' }} key={question.question}>
                                        <Stack gap={'5px'}>
                                            <Typography variant='body2'>
                                                {question.question}
                                            </Typography>

                                            <Typography variant='caption'>
                                                {question.value}
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                ))}
                            </Stack>
                        </ContainerScroll>


                    </Paper>
                </Container>
            </Modal> */}

        </>
    )
}

export function ModalVisualizePrelavados({ modal, toggleModal, prelavados, }) {

    const IsSmall = useMediaQuery('(max-width:900px)');
    const [tab, setTab] = useState(0);
    const ToggleTab = (event, newValue) => {
        setTab(newValue)
    }

    const allCheckListInJson = prelavados.map((prelavado) => ({ ...prelavado, data: JSON.parse(prelavado.data) }))

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
                                    {allCheckListInJson.map((prelavado, index) => (
                                        <Tab key={prelavado.id} label={`Prelavado ${index + 1}`} />
                                    ))}
                                </Tabs>
                            </Box>

                            {allCheckListInJson.length >= 1 &&
                                allCheckListInJson.map((prelavado, index) => (
                                    <CustomTabPanel key={`panel_${index}`} index={index} value={tab} >
                                        <ContainerScroll height={'400px'} >
                                            <Stack width={'100%'} gap={'8px'} alignItems={'center'}>
                                                {prelavado.data.map((question, index) => (
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

