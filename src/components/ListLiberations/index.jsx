import { Box, Paper, Chip, Stack, TextField, Typography, Alert, Button, Modal, IconButton, Card, CardMedia, CardContent } from "@mui/material";
import { NotConexionState } from "../NotConectionState";
import { ItemLoadingState } from "../ItemLoadingState";
import { ContainerScroll } from "../ContainerScroll";
import { LoadingState } from "../LoadingState";
//hooks
import { useGetLiberations } from "../../Hooks/Calidad/useGetLiberations";
import { useGetPreviusChargue } from "../../Hooks/Calidad/useGetPreviusChargue";
//helpers
import { dateTextShort } from "../../Helpers/date";
import { useState } from "react";
import { ClearIcon } from "@mui/x-date-pickers";
//pdfAssets
import { ViewerDocument } from "../../PDFs/components/Viewer";
import { Certificado } from "../../PDFs/plantillas/Certificado";

function ListLiberations() {

    const { data: washing, error, loading, typeRegister, cache, setTypeRegister, updaterList } = useGetLiberations();

    const renderWashing = washing?.length >= 1 ? true : false;
    const renderCache = cache?.length >= 1 ? true : false;

    return (
        <>
            <Stack gap='10px'>

                <Paper sx={{ padding: '20px', bgcolor: 'whitesmoke' }}>
                    <Stack flexDirection={'row'} gap={'10px'}>
                        <Chip
                            color={typeRegister === 'liberado' ? 'warning' : 'default'}
                            onClick={() => setTypeRegister('liberado')}
                            label={'liberados'} />

                        <Chip
                            color={typeRegister === 'rechazado' ? 'error' : 'default'}
                            onClick={() => setTypeRegister('rechazado')}
                            label={'rechazados'} />
                    </Stack>
                </Paper>

                <ContainerScroll height={'70vh'}>

                    <Stack width={'100%'} gap={'5px'} alignItems={'center'}>

                        {(!loading && error) && <NotConexionState />}

                        {(!loading && !error && !renderWashing) &&
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


                        {(!loading && !error && renderWashing) &&
                            washing.map((lavado) => (
                                <ItemLiberation
                                    key={lavado.id}
                                    lavado={lavado}
                                    updaterList={updaterList}
                                />
                            ))}

                        {(!loading && error && renderCache) &&
                            cache.map((lavado) => (
                                <ItemLiberation
                                    key={lavado.id}
                                    lavado={lavado}
                                    updaterList={updaterList}

                                />
                            ))}

                    </Stack>


                </ContainerScroll>

            </Stack>
        </>
    );
}

export { ListLiberations };

function ItemLiberation({ lavado, updaterList }) {

    const { status } = lavado || {};

    return (
        <>

            {(status === 'sellado') &&
                <ItemLiberado lavado={lavado} updaterList={updaterList} />
            }

            {(status === 'rejected') &&
                <Typography>Item {status}</Typography>
            }

        </>
    )
}

function ItemLiberado({ lavado, updaterList }) {

    const { status, URL, dateInit, dateEnd, concentracion, program_date, registros_detalles_entradas, sellos, tentativeEnd, tipos_lavado, folio } = lavado || {};

    const { carga, numero_tanque, numero_pipa, tipo, transportistas, registros } = registros_detalles_entradas || {};

    const { cliente } = registros_detalles_entradas.clientes || {};

    const { name: transportista } = transportistas || {};

    const { checkIn, checkOut } = registros || {};

    const { lavado: tipoLavado, num: numLavado, temperature, duration } = tipos_lavado || {};

    //cargas previas
    const { loading, error, info: cargas_previas } = useGetPreviusChargue(numero_tanque || numero_pipa);

    //url
    const [modalUrl, setModalUrl] = useState(false);
    const toggleUrl = () => setModalUrl(!modalUrl);

    // certificado
    const [modalCert, setModalCert] = useState(false);
    const toggleCert = () => setModalCert(!modalCert);

    const urlString = JSON.parse(URL);
    //sellos
    const sellosJson = JSON.parse(sellos);
    const sellosDomo = sellosJson.length >= 1 ? sellosJson.filter((item) => Object.keys(item)[0].includes('domo')) : [];
    const sellosValvule = sellosJson.length >= 1 ? sellosJson.filter((item) => Object.keys(item)[0].includes('superior')) : [];
    const valoresFiltradosDomo = sellosDomo.map(objeto => Object.values(objeto)[0])||[]
    const valoresFiltradosValvule = sellosValvule.map(objeto => Object.values(objeto)[0])||[]


    //informacion para el certificado
    const dataCert = { dateInit, dateEnd, cliente, numero_tanque, numero_pipa, tipo, transportista, cargas_previas, folio, numLavado, temperature, urlString, checkIn, checkOut, duration, valoresFiltradosDomo, valoresFiltradosValvule }

    return (
        <>
            <Paper sx={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px', gap: '10px' }}>

                <Stack flexDirection='row' alignItems='center' gap='10px' flexWrap='wrap'>
                    <Chip
                        size='small'
                        color='info'
                        label={status}
                    />
                    <Chip
                        size='small'
                        color='info'
                        label={'Fecha de entrega: ' + dateTextShort(tentativeEnd)}
                    />
                </Stack>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>

                    <Stack flexDirection='row' alignItems='center' gap='20px' flexWrap='wrap'>
                        <Box>
                            <Typography variant='caption' >{carga}</Typography>
                            <Typography>{tipo || ''} {numero_tanque || numero_pipa} </Typography>
                        </Box>

                        <Box>
                            <Typography variant='caption'>Lavado asignado</Typography>
                            <Typography>{tipoLavado}</Typography>
                        </Box>
                    </Stack>

                    <Stack flexDirection='row' alignItems='center' gap='10px'>

                        <Button variant="outlined" size="small" onClick={toggleUrl}>URL</Button>

                        <Button variant="contained" size="small" onClick={toggleCert}>Generar certificado</Button>

                    </Stack>

                </Box>

            </Paper>

            <ModalViewURL modal={modalUrl} toggleModal={toggleUrl} url={URL} />

            <ViewerDocument stateModal={modalCert} ToggleModal={toggleCert}>
                <Certificado dataCert={dataCert} />
            </ViewerDocument>


        </>
    )
}

function ModalViewURL({ modal, toggleModal, url }) {

    const jsonURL = JSON.parse(url);

    const { coments } = jsonURL || {};

    const urlDome = jsonURL[0];
    const urlValvule = jsonURL[1];

    return (
        <>
            <Modal open={modal}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        alignItems: 'center',
                        width: '100%',
                        paddingTop: '3%',
                    }}>
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '15px',
                            width: 'auto',
                            maxWidth: '95vw',
                            gap: '10px',
                        }}>
                        <Stack flexDirection='row' alignItems='center' justifyContent='space-between' width='100%'>
                            <Typography>
                                Evidencias de URL
                            </Typography>
                            <IconButton
                                color='error'
                                onClick={toggleModal}>
                                <ClearIcon />
                            </IconButton>
                        </Stack>

                        <Card sx={{ bgcolor: 'whitesmoke' }}>
                            <Stack>
                                {urlDome.image != '' &&
                                    <CardMedia
                                        component='img'
                                        height="194"
                                        src={urlDome?.image}
                                        alt={`tanque`}

                                    />}

                                {urlValvule?.image != '' &&
                                    <CardMedia
                                        component='img'
                                        height="194"
                                        src={urlValvule?.image}
                                        alt={`tanque`}

                                    />}


                            </Stack>
                            <CardContent>

                                {(urlDome?.value != '') &&
                                    <Typography variant="subtitle2">
                                        Valores de url en domo: {urlDome?.value}
                                    </Typography>}

                                {(urlValvule?.value != '') &&
                                    <Typography variant="subtitle2">
                                        Valores de url en valvula: {urlValvule?.value}
                                    </Typography>}


                                <Typography>Comentarios</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {coments != '' ? coments : 'Sin comentarios'}
                                </Typography>
                            </CardContent>
                        </Card>

                    </Paper>
                </Box>
            </Modal>
        </>
    )
}
