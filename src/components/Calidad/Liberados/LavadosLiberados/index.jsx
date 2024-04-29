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
import { dateInTextEn, datetimeMXFormat, timepoParaX, currentDate, dateExpiration } from "../../../../Helpers/date";
//icons
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LaunchIcon from '@mui/icons-material/Launch';
//libraries
import dayjs from "dayjs";
import { updateWashing } from "../../../../services/lavados";
import { toast, Toaster } from "sonner";


export function LavadosLiberados() {

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
            <Toaster position="top-center" richColors />
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
                            <ItemLiberado key={lavado.id} lavado={lavado} />
                        ))
                    }


                </Stack>
            </ContainerScroll>
            <Pagination variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />

            <Outlet />
        </Stack>
    )
}


function ItemLiberado({ lavado }) {

    const movile = useMediaQuery('(max-width:880px)');
    const navigate = useNavigate();

    const { registros_detalles_entradas, id_detalle_entrada, fecha_recoleccion, ordenes_lavado, bahia, tipos_lavado, condiciones_lavado, status, URL, dateEnd, dateInit, id: idLavado } = lavado || {};

    const { carga, clientes, numero_pipa, numero_tanque, tipo, especificacion } = registros_detalles_entradas || {};

    const { duration, num: numLavado, lavado: tipoLavado } = tipos_lavado || {};

    const { cliente } = clientes || {};

    const { destinos } = ordenes_lavado || {}

    async function Rejected() {
        try {

            const { error } = await updateWashing({ status: 'rechazado' }, idLavado)

            if (error) {
                throw new Error(error)
            } else {
                toast.success('registro actualizado')
            }

        } catch (error) {
            toast.error(error?.message)
        }
    }


    return (
        <>
            <Paper sx={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px', gap: '10px' }}>

                <Stack flexDirection='row' justifyContent='space-between' alignItems='center' gap='10px' flexWrap='wrap'>

                    <Stack flexDirection='row' gap='10px' >
                        <Chip
                            size='small'
                            color='info'
                            label={'Fecha de entrega: ' + dateInTextEn(fecha_recoleccion)}
                        />

                        <Chip
                            size='small'
                            color='info'
                            label={status}
                        />
                    </Stack>

                    <CopyPaste text={idLavado} />

                </Stack>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', }}>

                    <Stack width='100%' paddingX='10px' >
                        <Typography variant='caption'>Destino</Typography>
                        <Typography textTransform='uppercase' >{destinos?.destino}</Typography>
                    </Stack>

                    <Divider flexItem orientation="horizontal" />

                    <Stack flexDirection={movile ? 'column' : 'row'} justifyContent='space-around' width='100%' gap='10px' paddingX='10px'>

                        <Box >
                            <Typography variant='caption' >{carga}</Typography>
                            <Typography>{tipo || ''} {numero_tanque || numero_pipa} </Typography>
                        </Box>

                        <Divider flexItem orientation="horizontal" />

                        <Box >
                            <Typography variant='caption'>Especificacion</Typography>
                            <Typography>{especificacion}</Typography>
                        </Box>

                        <Divider flexItem orientation="horizontal" />

                        <Box >
                            <Typography variant='caption'>Cliente</Typography>
                            <Typography textTransform='uppercase' >{cliente}</Typography>
                        </Box>

                        <Divider flexItem orientation="horizontal" />

                        <Box >
                            <Typography variant='caption'>Lavado asignado</Typography>
                            <Typography>{tipoLavado}</Typography>
                        </Box>

                        <Divider flexItem orientation="horizontal" />

                        <Box >
                            <Typography variant='caption'>Caducidad de lavado</Typography>
                            <Typography>{dateExpiration(dateInit)}</Typography>
                        </Box>

                    </Stack>

                    <Stack flexDirection='row' alignItems='center' justifyContent='flex-end' flexWrap='wrap' width='100%' gap='10px' >

                        <Button
                            fullWidth={movile}
                            variant="contained"
                            color='info'
                            size="small"
                            onClick={() => navigate(`prueba-url/${encodeURIComponent(JSON.stringify(URL))}`)}
                        >
                            URL
                        </Button>

                        <Button
                            fullWidth={movile}
                            variant="contained"
                            size="small"
                            onClick={() => navigate(`certificado/${idLavado}/${numero_tanque}`)}
                        >
                            Generar certificado
                        </Button>

                        <Button
                            onClick={Rejected}
                            fullWidth={movile}
                            variant="contained"
                            color="error"
                            size="small">
                            Marcar como rechazado
                        </Button>
                    </Stack>

                </Box>

            </Paper>

        </>
    )
}