import { Stack, Alert, Pagination, Box, Chip, Paper, Typography, Divider, Button } from "@mui/material";
//custom components
import { ContainerScroll } from "../../../ContainerScroll";
import { ItemLoadingState } from "../../../ItemLoadingState";
import { CopyPaste } from "../../../CopyPaste";
//hooks
import { useState, useMemo } from "react";
import { Outlet, useNavigate, } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCalidadContext } from "../../../../Context/CalidadContext";
//icons
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
//helpers
import { dateInTextEn, datetimeMXFormat,  } from "../../../../Helpers/date";


export function PrelavadosRealizados() {

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

    const movile = useMediaQuery('(max-width:820px)');

    return (
        <Stack gap='10px' width='100%' alignItems='center'>
            <ContainerScroll height='calc(100vh - 250px)' background='whitesmoke'>

                <Stack gap='10px' padding='0px' >

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
                        items.map((revision) => (
                            <ItemRevisado key={revision.id} revision={revision} />
                        ))
                    }


                </Stack>
            </ContainerScroll>
            <Pagination variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />

            <Outlet />
        </Stack>
    );
}

function ItemRevisado({ revision }) {

    const { created_at, data, id, lavado_id, lavados, status, } = revision || {};

    const { registros_detalles_entradas, ordenes_lavado, tipos_lavado, } = lavados || {};

    const { carga, tipo, numero_pipa, numero_tanque, especificacion } = registros_detalles_entradas || {};

    const navigate = useNavigate();
    const IsSmall = useMediaQuery('(max-width:880px)');

    return (
        <>

            <Paper
                elevation={4}
                sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>

                <Stack flexDirection='row' justifyContent='space-between' alignItems='center' gap='10px' flexWrap='wrap' spacing='10px' >
                    <Stack flexDirection='row' gap='10px' flexWrap='wrap' alignItems='center' >

                        <Chip
                            label={status}
                            color="info"
                            size="small"
                        />

                        <Chip
                            icon={<CalendarTodayIcon />}
                            label={` realizado ${dateInTextEn(created_at)}`}
                            color='info'
                            size="small"
                        />

                        <Chip
                            icon={<AccessTimeIcon />}
                            label={`${datetimeMXFormat(created_at)}`}
                            color='info'
                            size="small"
                        />

                    </Stack>
                    <CopyPaste text={lavado_id} />
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

                </Stack>

                <Button
                    sx={{
                        justifyContent: 'space-between'
                    }}
                    fullWidth
                    onClick={() => navigate(`/calidad/prelavados/realizados/detalles/${encodeURIComponent(data)}`)}
                    endIcon={<InfoIcon />}
                    size='small'
                    variant='outlined'
                    color='primary'
                >
                    ver revision
                </Button>


            </Paper>
        </>
    )
}
