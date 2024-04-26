import { Modal, Container, Paper, Box, Stack, Button, CircularProgress, Typography, IconButton, InputLabel, FormControl, Select, MenuItem } from "@mui/material"
//hooks
import { useNavigate, useParams } from "react-router-dom"
import ClearIcon from '@mui/icons-material/Clear';
//pdfAssets
import { ViewerDocument } from "../../../../PDFs/components/Viewer"
import { Certificado } from "../../../../PDFs/plantillas/Certificado";
//resources web
import { LogoKosher, LogoJuiceProducts } from "../../../../resourcesLinks";
import { useEffect, useState } from "react";
//services
import { getOneWashingFullDetail } from "../../../../services/lavados";

export function CertificadoCalidad() {

    const { id: idLavado } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    console.log("🚀 ~ CertificadoCalidad ~ data:", data)
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const [config, setConfig] = useState({
        tipo_lavado: '',
        tipo_logo: ''
    });



    useEffect(() => {

        async function getData() {
            setLoading(true)
            const { data: lavado, error } = await getOneWashingFullDetail(idLavado);

            if (!error) {
                setData(lavado)
            } else {
                setError(error)

            }
            setLoading(false)
        }

        getData();

    }, [idLavado])

    const { configuracion_certificado } = data || {};


    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate('/calidad/liberados/listos')}
            >

                <Container sx={{ display:'flex', justifyContent:'center', paddingTop: '3%' }} >

                    {loading && <CircularProgress color='info' size='large' />}

                    {(config.tipo_lavado === '' && config.tipo_logo === '') &&
                        <ConfigDocument config={config} setConfig={setConfig} />
                    }

                    {<ViewerDocument>
                        {/* <Certificado dataCert={{}} /> */}
                    </ViewerDocument>}

                </Container>

            </Modal>
        </>
    )
}

function ConfigDocument({ config, setConfig }) {

    const navigate = useNavigate()

    return (
        <>
            <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', width:'fit-content' }}>

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
                >
                    Guardar configuración
                </Button>

            </Paper>
        </>
    )
}