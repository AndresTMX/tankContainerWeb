import { Modal, Container, Paper, Box, Stack, Button, CircularProgress, Typography, IconButton, InputLabel, FormControl, Select, MenuItem } from "@mui/material"
//icons
import ClearIcon from '@mui/icons-material/Clear';
//pdfAssets
import { ViewerDocument } from "../../../../PDFs/components/Viewer"
import { Certificado } from "../../../../PDFs/plantillas/Certificado"
import { PDFViewer } from "@react-pdf/renderer";
//resources web
import { LogoKosher, LogoJuiceProducts } from "../../../../resourcesLinks";
//services
import { getOneWashingFullDetail, updateWashing, getCargasPrevias } from "../../../../services/lavados";
//hooks
import { useState } from "react";
import { useFetchData, useRealtime } from "../../../../Hooks/FetchData"
import { useNavigate, useParams } from "react-router-dom"
//libraries
import { toast } from "sonner";

export function CertificadoCalidad() {

    const { id: idLavado, numero_tanque } = useParams();
    const navigate = useNavigate();

    const [config, setConfig] = useState({
        tipo_lavado: '',
        tipo_logo: ''
    });

    async function getData() {
        const { data, error } = await getOneWashingFullDetail(idLavado);
        return { data, error }
    }

    async function getCargas() {
        const { error, data } = await getCargasPrevias(numero_tanque)
        return { error, data }
    }

    const { loading, error, data } = useRealtime(getData, false, 'lavados', [idLavado]);

    const { data: cargas, loading: loadingCargas } = useFetchData(getCargas, false)

    const { configuracion_certificado, sellos, tipos_lavado, folio, registros_detalles_entradas, URL, dateEnd } = data[0] || {};

    const { clientes, numero_pipa, tipo, registros, transportistas } = registros_detalles_entradas || {};

    const { cliente } = clientes || {};

    const { tipo_lavado, tipo_logo } = configuracion_certificado || {};

    const { checkIn, checkOut } = registros || {};

    const { name: transportista } = transportistas || {};

    const { num: numLavado, lavado: tipoLavado, temperature, duration, } = tipos_lavado || {};

    const cargas_previas = cargas.length ? JSON.parse(cargas[0].cargas_previas) : {};

    let dataCert = {
        tipoLavado,
        numLavado,
        temperature,
        numero_tanque,
        numero_pipa,
        tipo_lavado,
        tipo_logo,
        checkIn,
        dateEnd,
        sellos,
        checkOut,
        tipo,
        cliente,
        duration,
        transportista,
        cargas_previas,
        folio,
        URL,

    };


    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate('/calidad/liberados/listos')}
            >

                <Container sx={{ display: 'flex', justifyContent: 'center', paddingTop: '3%' }} >

                    {loading && <CircularProgress color='info' size='large' />}

                    {(!loading && !loadingCargas && !configuracion_certificado) &&
                        <ConfigDocument config={config} setConfig={setConfig} idLavado={idLavado} />
                    }

                    {(configuracion_certificado && !loading && !loadingCargas) &&
                        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90vw', height: '90vh', padding: '10px' }}>
                            <Stack flexDirection='row' justifyContent='flex-end' alignItems='center' width='100%'>
                                <IconButton color="error" onClick={() => navigate('/calidad/liberados/listos')} >
                                    <ClearIcon />
                                </IconButton>
                            </Stack>
                            <PDFViewer style={{ width: '100%', height: '90%', }}>
                                <Certificado dataCert={dataCert} />
                            </PDFViewer>
                        </Paper>
                    }

                </Container>

            </Modal>
        </>
    )
}

function ConfigDocument({ config, setConfig, idLavado }) {

    const navigate = useNavigate();

    async function saveConfig() {
        try {

            if (config.tipo_lavado === '' || config.tipo_logo === '') {
                throw new Error(`Complete la configuración para continuar`);
            }

            const { error } = await updateWashing({ configuracion_certificado: config }, idLavado);

            if (error) {
                throw new Error(error)
            } else {
                toast.success('configuración guardada')
            }

        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <>
            <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', width: 'fit-content' }}>

                <Stack flexDirection='row' justifyContent='space-between' alignItems='center' width='100%'>
                    <Typography variant="subtitle2" >Configuración del documento</Typography>
                    <IconButton color='error' onClick={() => navigate('/calidad/liberados/listos')}>
                        <ClearIcon />
                    </IconButton>
                </Stack>

                <Typography>Selecciona el logotipo deseado</Typography>

                <Stack flexDirection='row' gap='10px' width='100%' flexWrap='wrap' justifyContent='center' >

                    <Box onClick={() => setConfig({ ...config, tipo_logo: 'kosher' })}
                        sx={{ display: 'flex', width: '40%', position: 'relative', minWidth: '200px', height: '200px', alignItems: 'center', justifyContent: 'center', zIndex: 1, cursor: 'pointer' }}>
                        <Box sx={{
                            display: 'flex', zIndex: 2, position: 'absolute', height: '200px', width: '200px', transition: 'background-color 0.2s ease',
                            border: config.tipo_logo === 'kosher' ? 'solid' : 'none',
                            borderColor: config.tipo_logo === 'kosher' ? '#0288d1' : 'transparent',
                            borderRadius: '4px',
                            '&:hover': { background: '#80808061', animation: 'ease-in' },
                        }} />
                        <img height='100%' width='auto' src={LogoKosher} alt="logo-kosher" />
                    </Box>

                    <Box
                        onClick={() => setConfig({ ...config, tipo_logo: 'juice' })}
                        sx={{ display: 'flex', width: '40%', position: 'relative', minWidth: '200px', height: '200px', alignItems: 'center', justifyContent: 'center', zIndex: 1, cursor: 'pointer' }}>
                        <Box sx={{
                            display: 'flex', zIndex: 2, position: 'absolute', height: '200px', width: '200px', transition: 'background-color 0.2s ease',
                            border: config.tipo_logo === 'juice' ? 'solid' : 'none',
                            borderColor: config.tipo_logo === 'juice' ? '#0288d1' : 'transparent',
                            borderRadius: '4px',
                            '&:hover': { background: '#80808061', animation: 'ease-in' },
                        }} />
                        <img height='100%' width='auto' src={LogoJuiceProducts} alt="logo-juice" />
                    </Box>

                </Stack>

                <Stack>
                    <InputLabel>Selecciona el tipo de lavado</InputLabel>
                    <FormControl>
                        <Select
                            required
                            fullWidth
                            defaultValue="dry"
                            value={config.tipo_lavado}
                            onChange={(e) => setConfig({ ...config, tipo_lavado: e.target.value })}
                        >
                            <MenuItem value={"dry"}>Dry</MenuItem>
                            <MenuItem value={"wt"}>Wet</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={saveConfig}
                >
                    Guardar configuración
                </Button>

            </Paper>
        </>
    )
}