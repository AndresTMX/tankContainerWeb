import { useState, useMemo, useEffect } from "react";
import { Box, Paper, Typography, Chip, Stack, Button, Alert, Pagination, Divider } from "@mui/material";
import { ItemLoadingState } from "../../../ItemLoadingState";
import { ContainerScroll } from "../../../ContainerScroll";
import { CopyPaste } from "../../../CopyPaste";
//icons
import HistoryIcon from '@mui/icons-material/History';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
//helpers
import { dateInTextEn, datetimeMXFormat, currentDate, timepoParaX } from "../../../../Helpers/date";
//hooks
import { Outlet, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetCheckListPrelavado } from "../../../../Hooks/Prelavado/useGetChecklists";
//context
import { useCalidadContext } from "../../../../Context/CalidadContext";
//libraries
import dayjs from "dayjs";

export function PrelavadosPendientes() {

    const movile = useMediaQuery('(max-width:880px)');

    const { loading, error, dataDinamic, searchValue, mode } = useCalidadContext();

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
        <Stack gap='10px' width='100%' alignItems='center' >
            <ContainerScroll height='calc(100vh - 250px)' background='whitesmoke'>

                <Stack gap='10px' padding='0px'  >

                    {(loading && !error && !dataDinamic?.length) &&
                        <>
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                        </>
                    }

                    {(!loading && !error && !dataDinamic.length && mode === 'data') &&
                        <Alert severity='info'>Sin registros añadidos</Alert>
                    }

                    {(!error && !loading && dataDinamic.length && mode === 'search') &&
                        <Alert severity='info'>Resultados de busqueda {searchValue.current?.value} </Alert>
                    }

                    {(!error && !loading && !dataDinamic.length && mode === 'search') &&
                        <Alert severity='warning'>No se encontraron coincidencias para tu busqueda, {searchValue.current?.value}</Alert>
                    }


                    {
                        items.map((prelavado) => (
                            <ItemPendiente key={prelavado.id} prelavado={prelavado} />
                        ))
                    }


                </Stack>
            </ContainerScroll>
            <Pagination variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />

            <Outlet />
        </Stack>
    );
}

function ItemPendiente({ prelavado }) {

    const navigate = useNavigate();
    const IsSmall = useMediaQuery('(max-width:880px)');

    const { registros_detalles_entradas, id_detalle_entrada, fecha_recoleccion, ordenes_lavado } = prelavado || {};

    const { carga, clientes, numero_pipa, numero_tanque, tipo, especificacion } = registros_detalles_entradas || {};

    const { cliente } = clientes || {};

    const { destinos } = ordenes_lavado || {}

    const { checklist, error, loading } = useGetCheckListPrelavado(id_detalle_entrada)

    const isMovile = useMediaQuery('(max-width:500px)')

    const retornos = !loading ? checklist.length - 1 : '...cargando';

    const [vencimiento, setVencimiento] = useState(false);

    const entregaTentativa = dayjs(fecha_recoleccion);

    useEffect(() => {
        if (entregaTentativa.isBefore(currentDate)) {
            setVencimiento(true)
        } else {
            setVencimiento(false)
        }
    }, [prelavado])

    return (
        <>

            <Paper
                elevation={4}
                sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>

                <Stack flexDirection='row' justifyContent='space-between' alignItems='center' gap='10px' flexWrap='wrap' spacing='10px' >
                    <Stack flexDirection='row' gap='10px' flexWrap='wrap' alignItems='center' >

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
                    <CopyPaste text={prelavado.id} />
                </Stack>

                <Stack flexDirection={IsSmall ? 'column' : 'row'} gap={IsSmall ? '8px' : '30px'} justifyContent='flex-start'>

                    <Box>
                        <Typography variant="subtitle2">{`N° ${carga}`}</Typography>
                        <Typography>{tipo}  {numero_tanque || numero_pipa}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography variant="subtitle2">Especificacion</Typography>
                        <Typography>{especificacion}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography variant="subtitle2">Cliente</Typography>
                        <Typography>{cliente}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography variant="subtitle2">Destino</Typography>
                        <Typography>{destinos?.destino}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                        <Typography variant="subtitle2">Retornos</Typography>
                        <Typography>{retornos}</Typography>
                    </Box>

                </Stack>


                <Stack flexDirection='row' alignItems='center' justifyContent='flex-end' flexWrap='wrap' gap='10px'>

                    <Button
                        fullWidth={IsSmall}
                        onClick={() => navigate(`/calidad/prelavados/pendientes/historial-prelavado/${ encodeURIComponent(JSON.stringify(checklist)) }`)}
                        endIcon={<HistoryIcon />}
                        size='small'
                        variant='outlined'
                        color='primary'
                    >
                        prelavados
                    </Button>

                    <Button
                        fullWidth={IsSmall}
                        onClick={() => navigate(`/calidad/prelavados/pendientes/revision-prelavado/${ encodeURIComponent(JSON.stringify(prelavado)) }`)}
                        endIcon={<ManageSearchIcon />}
                        size='small'
                        variant='contained'
                        color='primary'
                    >
                        inspeccionar
                    </Button>
                </Stack>

            </Paper>

        </>
    )
}
