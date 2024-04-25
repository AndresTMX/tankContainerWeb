import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Modal, Container, Box, Paper, TextField, Typography, Stack, Button, IconButton, Chip } from "@mui/material";
//custom components
import { ContainerScroll } from "../../ContainerScroll";
//icons
import ClearIcon from '@mui/icons-material/Clear';
//libraries
import { toast, Toaster } from "sonner";
//services
import { updateWashing } from "../../../services/lavados";


export function SellarTanque() {

    const movile = useMediaQuery('(max-width:800px)');

    const navigate = useNavigate();
    const { idLavado } = useParams();

    const [step, setStep] = useState(1);
    const [sellos, setSellos] = useState([
        {
            sello: '',
            tipo: 'domo'
        },
        {
            sello: '',
            tipo: 'domo'
        },
        {
            sello: '',
            tipo: 'domo'
        },
        {
            sello: '',
            tipo: 'domo'
        },
        {
            sello: '',
            tipo: 'domo'
        },
        {
            sello: '',
            tipo: 'superior'
        },
        {
            sello: '',
            tipo: 'superior'
        },
        {
            sello: '',
            tipo: 'superior'
        },
        {
            sello: '',
            tipo: 'superior'
        },
        {
            sello: '',
            tipo: 'superior'
        },
    ])

    function handleSeal(index, changue) {
        try {

            let copySeals = [...sellos]

            copySeals[index]['sello'] = changue

            setSellos(copySeals)

        } catch (error) {
            console.error(error)
        }
    }

    function nextStep() {
        try {

            let notEmptySeals = sellos.filter((i) => i.sello != '');

            if (!notEmptySeals.length) {
                throw new Error('asigne al menos 1 sello')
            }

            setStep(step + 1)

        } catch (error) {
            toast.error(error?.message)
        }
    }

    async function SendSeals() {
        try {

            let notEmptyValues = sellos.filter((seal) => seal.sello != '');

            const { error } = await updateWashing({ sellos: notEmptyValues, status: 'liberado' }, idLavado)

            if (error) {
                throw new Error(error)
            } else {
                toast.success('registro actualizado')
                navigate('/lavado/pendientes')
            }


        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <>
            <Toaster richColors position="top-center" />
            <Modal
                open={true}
                onClose={() => navigate('/lavado/pendientes')}

            >
                <Container sx={{ display: 'flex', justifyContent: 'center', paddingTop: '3%', width: 'fit-content' }}>


                    <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>

                        <Stack flexDirection='row' alignItems='center' justifyContent='space-between' width='100%' paddingX='20px'>
                            <Typography>Asignación de sellos</Typography>

                            <IconButton
                                onClick={() => navigate('/lavado/pendientes')}
                                color="error">
                                <ClearIcon />
                            </IconButton>
                        </Stack>

                        {(step === 1) &&
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>

                                <ContainerScroll height='400px'>
                                    <Stack gap='10px' width='300px'>

                                        <Typography>Sellos en domo</Typography>

                                        {sellos.map((element, index) => (
                                            <TextField
                                                key={index}
                                                fullWidth
                                                label={`sello ${element.tipo} ${index + 1}`}
                                                id={`sello_${element.tipo}_${index}`}
                                                value={sellos[index]['sello']}
                                                onChange={(e) => handleSeal(index, e.target.value)}
                                            />
                                        ))}



                                    </Stack>
                                </ContainerScroll>

                                <Button
                                    onClick={nextStep}
                                    variant="contained"
                                    color='primary'>
                                    asignar sellos
                                </Button>
                            </Box>
                        }

                        {(step === 2) &&
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>

                                <Stack padding='10px' width='300px' >
                                    <Typography padding='5px' variant="subtitle2">Sellos asignados</Typography>
                                    <Stack flexDirection='row' alignItems='center' flexWrap='wrap' gap='10px' padding='15px' bgcolor='whitesmoke'>
                                        {sellos.filter((i) => i.sello != '').map((obj, index) => (
                                            <Stack>
                                                <Typography variant='caption' >{`sello ${obj.tipo}`}</Typography>
                                                <Chip key={index} label={`${obj.sello} `} color='info' />
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Stack>

                                <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                                    <Button
                                        variant="contained"
                                        color='warning'
                                        onClick={() => setStep(1)}
                                        size="small"
                                    >
                                        anterior
                                    </Button>

                                    <Button
                                        onClick={SendSeals}
                                        variant="contained"
                                        size="small"
                                    >
                                        Enviar
                                    </Button>
                                </Stack>

                            </Box>
                        }

                    </Paper>
                </Container>
            </Modal>
        </>
    )
}