import { Paper, Button, Chip, Stack, Modal, Container } from "@mui/material";
//icons
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams, useNavigate } from "react-router-dom";
//customComponents
import { CheckListPrelavado } from "../../sections/CheckListPrelavado";

export function ModalChecklistPrelavado() {

    const { lavado } = useParams();
    const navigate = useNavigate();
    const movile = useMediaQuery('(max-width:650px)');


    const JsonLavado = JSON.parse(decodeURI(lavado));

    const { status: statusLavado, registros_detalles_entradas, fecha_recoleccion, ordenes_lavado } = JsonLavado || {};

    const { carga, numero_pipa, numero_tanque, tipo, especificacion, status: statusTanque } = registros_detalles_entradas || {};

    const { clientes, destinos } = ordenes_lavado || {};

    const { cliente } = clientes || {};


    return (
        <>
            <Modal
                open={true}
                sx={{
                    paddingTop: movile ? '5px' : '3%',
                }}
            >
                <Container
                    sx={{
                        width: movile ? '100vw' : 'auto',
                        padding: movile ? '5px' : '10px',
                    }}>

                    <Paper
                        elevation={4}
                        sx={{
                            padding: '15px',
                            width: '100%'
                        }}>

                        <Paper
                            elevation={3}
                            sx={{ display: 'flex', flexDirection: 'row', gap: '10px', padding: '15px', justifyContent: 'space-between', alignItems: 'center' }}>

                            <Stack flexDirection='row' gap='10px' justifyContent='flex-start' flexWrap='wrap'>
                                {!movile && <Chip color="info" label={cliente} />}
                                <Chip color="info" size={movile ? 'small' : 'medium'} label={`${carga != 'pipa' ? tipo : ''}  ${numero_tanque || numero_pipa}`} />
                            </Stack>

                            <Button
                                size={movile ? 'small' : 'medium'}
                                endIcon={<DoDisturbIcon />}
                                onClick={() => navigate('/prelavado')}
                                variant='contained'
                                color="error"
                            >
                                Cancelar
                            </Button>

                        </Paper>


                        <CheckListPrelavado lavado={JsonLavado} />
                    </Paper>

                </Container>
            </Modal>
        </>
    )
}