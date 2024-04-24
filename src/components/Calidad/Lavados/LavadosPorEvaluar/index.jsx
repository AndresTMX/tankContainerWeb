import { Stack, Paper, Alert, Pagination, Box, Chip, Button, Typography, Divider, } from "@mui/material";
import { ItemLoadingState } from "../../../ItemLoadingState";
import { ContainerScroll } from "../../../ContainerScroll";
import { CopyPaste } from "../../../CopyPaste";
//hooks
import { useState, useMemo, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
//context
import { useCalidadContext } from "../../../../Context/CalidadContext";
//helpers
import { dateInTextEn, datetimeMXFormat, timepoParaX, currentDate } from "../../../../Helpers/date";
//icons
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LaunchIcon from '@mui/icons-material/Launch';
//libraries
import dayjs from "dayjs";


export function LavadosPorEvaluar() {

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
                        items.map((lavado) => (
                            <LavadoPendiente key={lavado.id} lavado={lavado} />
                        ))
                    }


                </Stack>
            </ContainerScroll>
            <Pagination variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />

            <Outlet />
        </Stack>
    )
}

function LavadoPendiente({ lavado }) {

    const navigate = useNavigate();

    const IsSmall = useMediaQuery('(max-width:880px)');

    const { registros_detalles_entradas, id_detalle_entrada, fecha_recoleccion, ordenes_lavado, bahia, tipos_lavado, condiciones_lavado } = lavado || {};

    const { carga, clientes, numero_pipa, numero_tanque, tipo, especificacion } = registros_detalles_entradas || {};

    const { duration, num: numLavado, lavado: tipoLavado } = tipos_lavado || {};

    const { cliente } = clientes || {};

    const { destinos } = ordenes_lavado || {}

    const [vencimiento, setVencimiento] = useState(false);

    const entregaTentativa = dayjs(fecha_recoleccion);

    useEffect(() => {
        if (entregaTentativa.isBefore(currentDate)) {
            setVencimiento(true)
        } else {
            setVencimiento(false)
        }
    }, [lavado])


    return (
        <>
            <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', width: '100%' }}>

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
                    <CopyPaste text={lavado.id} />
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
                        <Typography variant="subtitle2">Bahia</Typography>
                        <Typography>{bahia}</Typography>
                    </Box>


                </Stack>


                <Stack flexDirection='row' alignItems='center' justifyContent='flex-end' flexWrap='wrap' gap='10px'>

                    <Button
                        fullWidth={IsSmall}
                        onClick={() => navigate(`condiciones-lavado/${condiciones_lavado}/${numLavado}`)}
                        size="small"
                        variant="outlined"
                        endIcon={<LaunchIcon />}
                    >
                        condiciones de lavado
                    </Button>

                    <Button
                        fullWidth={IsSmall}
                        onClick={() => navigate(`evaluacion-lavado/${encodeURIComponent(JSON.stringify(lavado))}`)}
                        endIcon={<PlaylistAddCheckIcon />}
                        size='small'
                        variant="contained">
                        Evaluar lavado
                    </Button>

                </Stack>

            </Paper>

            {/* <WashingTest
                idLavado={idLavado}
                idRegistro={idRegistro}
                updaterList={updaterList}
                modal={modalTest}
                toggleModal={toggleTest} /> */}
        </>
    )
}