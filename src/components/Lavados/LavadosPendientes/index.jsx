import { useState, useMemo, useEffect } from "react";
import { Paper, Stack, Chip, Typography, Button, Alert, Pagination } from "@mui/material";
//estados genericos
import { NotConexionState } from "../../NotConectionState";
import { ItemLoadingState } from "../../ItemLoadingState";
//custom components
import { ContainerScroll } from "../../ContainerScroll";
// import { SealItem } from "../IniciarLavado";
import { CopyPaste } from "../../CopyPaste";
//helpers
import { datetimeMXFormat, timepoParaX, dateTextShort, dateInTextEn, currentDate } from "../../../Helpers/date";
//icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
//context
import { useLavadoContext } from "../../../Context/LavadosContext";
//libraries
import dayjs from "dayjs";
//hooks
import { Outlet, useNavigate } from "react-router-dom";

export function LavadosPendientes() {

    const { loading, error, dataDinamic, mode, searchValue, handleKeyPress, onChangeClear } = useLavadoContext();

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const rowsPerPage = 10;

    const pages = Math.ceil(dataDinamic?.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return dataDinamic?.slice(start, end);
    }, [page, dataDinamic]);

    return (
        <>
            <Stack width='100%' alignItems='center' height='80vh' gap='10px' >
                <ContainerScroll height='78vh'>

                    {(!loading && !error && !dataDinamic.length && mode === 'data') &&
                        <Alert severity='info'>Sin registros añadidos</Alert>
                    }

                    {(!error && !loading && dataDinamic.length && mode === 'search') &&
                        <Alert severity='info'>Resultados de busqueda {searchValue.current?.value} </Alert>
                    }

                    {(!error && !loading && !dataDinamic.length && mode === 'search') &&
                        <Alert severity='warning'>No se encontraron coincidencias para tu busqueda, {searchValue.current?.value}</Alert>
                    }


                    {(error) &&
                        <NotConexionState />
                    }

                    <Stack gap='10px' >
                        {(!loading && !error && dataDinamic.length >= 1) &&
                            items.map((item) => (
                                <LavadoPendiente
                                    key={item.id}
                                    lavado={item} />
                            ))}
                    </Stack>

                    {(loading && !error) &&
                        <Stack gap='10px' >
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                        </Stack>
                    }

                </ContainerScroll>
                <Pagination variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />
            </Stack>
            <Outlet />
        </>
    );
}


function LavadoPendiente({ lavado }) {

    const navigate = useNavigate();

    const { created_at, data, status, tipos_lavado, registros_detalles_entradas, fecha_recoleccion } = lavado || {};

    const { carga, numero_pipa, numero_tanque, tracto } = registros_detalles_entradas || {};

    const { lavado: lavado_asignado } = tipos_lavado || {};

    const tanqueColorStatus = {
        'descartado': 'error',
        'programado': 'info'
    }

    const [vencimiento, setVencimiento] = useState(false);

    const entregaTentativa = dayjs(fecha_recoleccion);

    useEffect(() => {
        if (entregaTentativa.isBefore(currentDate)) {
            setVencimiento(true)
        } else {
            setVencimiento(false)
        }
    }, [data])

    return (
        <>
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '15px', gap: '10px' }}>

                <Stack flexDirection='row' justifyContent='space-between' alignItems='center' gap='10px' flexWrap='wrap' spacing='10px' >
                    <Stack flexDirection='row' gap='10px' flexWrap='wrap' >

                        <Chip
                            icon={<CalendarTodayIcon />}
                            label={` Entregar el ${dateInTextEn(fecha_recoleccion)}`}
                            color='info'
                            size="small"
                        />

                        <Chip
                            icon={<AccessTimeIcon />}
                            label={`${datetimeMXFormat(fecha_recoleccion)}`}
                            color='info'
                            size="small"
                        />

                        {!vencimiento && <Chip
                            icon={<AccessTimeIcon />}
                            label={`${timepoParaX(fecha_recoleccion)} para entrega`}
                            color='info'
                            size="small"
                        />}

                        {vencimiento && <Chip
                            icon={<AccessTimeIcon />}
                            label={`${timepoParaX(fecha_recoleccion)} de retraso`}
                            color='error'
                            size="small"
                        />}

                    </Stack>
                    <CopyPaste text={lavado.id} />
                </Stack>


                <Stack gap='20px' flexDirection='row' alignItems='center' >
                    <Stack>
                        <Typography variant='caption'>{numero_tanque ? 'Tanque' : 'Pipa'}</Typography>
                        <Typography textTransform='uppercase' variant='body2'>{numero_tanque || numero_pipa}</Typography>
                    </Stack>

                    <Stack>
                        <Typography variant='caption'>Lavado asignado</Typography>
                        <Typography variant='body2'>{lavado_asignado ?? 'pendiente'}</Typography>
                    </Stack>
                </Stack>

                <Button
                    onClick={() => navigate(`/lavado/pendientes/iniciar-lavado/${encodeURIComponent(JSON.stringify(lavado))}`)}
                    size='small'
                    color='primary'
                    variant='contained'
                    disabled={!tipos_lavado}
                    endIcon={<ManageSearchIcon />}
                >
                    Iniciar lavado
                </Button>

            </Paper>

        </>
    )
}


function ItemForSealed({ lavado, updateList }) {

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
                        label={'por sellar'}
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
                            asignar sellos
                        </Button>

                    </Stack>


                </Stack>
            </Paper>

            <SealItem
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