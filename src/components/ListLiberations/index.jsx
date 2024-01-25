import { Box, Paper, Chip, Stack, TextField, Typography, Alert, Button, Modal, IconButton, Card, CardMedia, CardContent } from "@mui/material";
import { NotConexionState } from "../NotConectionState";
import { ItemLoadingState } from "../ItemLoadingState";
import { ContainerScroll } from "../ContainerScroll";
import { LoadingState } from "../LoadingState";
//hooks
import { useGetLiberations } from "../../Hooks/Calidad/useGetLiberations";
//helpers
import { dateTextShort } from "../../Helpers/date";
import { useState } from "react";
import { ClearIcon } from "@mui/x-date-pickers";

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

    const { status, URL, concentracion, program_date, registros_detalles_entradas, sellos, tentativeEnd, tipos_lavado } = lavado || {};

    const { carga, numero_tanque, numero_pipa, tipo, } = registros_detalles_entradas || {};

    const { lavado: tipoLavado } = tipos_lavado || {};

    //url
    const [modalUrl, setModalUrl] = useState(false);
    const toggleUrl = () => setModalUrl(!modalUrl);

    // certificado
    const [modalCert, setModalCert] = useState(false);
    const toggleCert = () => setModalCert(!modalCert);

    return (
        <>
            <Paper sx={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px', gap: '10px' }}>

                <Stack flexDirection='row' alignItems='center' gap='10px' flexWrap='wrap'>
                    <Chip
                        color='info'
                        label={status}
                    />
                    <Chip
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
        </>
    )
}

function ModalViewURL({ modal, toggleModal, url }) {

    const jsonURL = JSON.parse(url);

    const { value, image, coments } = jsonURL || {};

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
                            <CardMedia
                                component='img'
                                height="194"
                                src={image}
                                alt={`tanque`}

                            />

                            <CardContent>

                                <Typography variant="subtitle2">Valores de referencia: {value}</Typography>

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
