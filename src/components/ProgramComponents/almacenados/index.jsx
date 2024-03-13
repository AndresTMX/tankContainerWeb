import { useState } from "react"
// custom components
import { ContainerScroll } from "../../ContainerScroll"
import { ItemLoadingState } from "../../ItemLoadingState"
// components
import { Stack, Alert, Chip, Button, Paper, Box, Divider, Typography, } from "@mui/material"
//hooks
import useMediaQuery from "@mui/material/useMediaQuery"
import { useContextProgramacion } from "../../../Hooks/Programacion/context"
//helpers
import { tiempoTranscurrido, dateInText, datetimeMXFormat } from "../../../Helpers/date"
import { useNavigate } from "react-router-dom"

export function TanquesAlmacenados() {

    const movile = useMediaQuery('(max-width:820px)');
    const { states, actions } = useContextProgramacion();

    const { searchValue, dataDinamic, loading, error, mode } = states;
    console.log("🚀 ~ TanquesAlmacenados ~ dataDinamic:", dataDinamic)

    return (
        <>
            <ContainerScroll height={movile ? '70vh' : '76vh'} background='whitesmoke'>

                <Stack gap='10px' padding='0px' >

                    {(loading && !error) &&
                        <>
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                        </>
                    }

                    {/* {(!loading && !error && !errorSearch && tanques.length === 0) &&
                        <Alert severity='info'>Sin registros añadidos</Alert>
                    }

                    {(!errorSearch && results.length >= 1) &&
                        <Alert severity='info'>Resultados de busqueda {search} </Alert>
                    }

                    {(errorSearch && !loadingSearch && results.length === 0) &&
                        <Alert severity='warning'>No se encontraron coincidencias para tu busqueda, {search}</Alert>
                    } */}


                    {/* Request del searcher */}

                    {
                        dataDinamic.map((tanque) => (
                            <TanqueAlmacenado
                                key={tanque.id}
                                tanque={tanque}
                            />
                        ))
                    }

                </Stack>
            </ContainerScroll>

        </>
    )
}

function TanqueAlmacenado({ tanque }) {

    const movile = useMediaQuery('(max-width:750px)')

    const { carga, created_at, numero_pipa, numero_tanque, status, tracto, transportistas, registros, clientes, especificacion, tipo } = tanque || {};
    const { name: linea } = transportistas || {};
    const { cliente } = clientes || {};
    const { checkIn } = registros || {};

    const [programModal, setProgramModal] = useState(false);
    const toggleModalProgram = () => setProgramModal(!programModal);

    const navigate = useNavigate();

    return (
        <>
            <Paper
                elevation={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '15px'
                }}
            >
                <Stack flexDirection='row' flexWrap='wrap' gap='10px'>
                    <Chip label={status} />
                    <Chip label={'hace ' + tiempoTranscurrido(checkIn)} />
                    <Chip label={'Ingreso el ' + dateInText(checkIn)} />
                    <Chip label={datetimeMXFormat(checkIn)} />
                </Stack>

                <Stack flexDirection={movile ? 'column' : 'row'} gap='20px' justifyContent='space-between'>

                    <Stack flexDirection={movile ? 'column' : 'row'} gap='20px'>
                        <Box>
                            <Typography variant="subtitle2">Cliente</Typography>
                            <Typography>{cliente}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant="subtitle2">{`N° ${carga}`}</Typography>
                            <Typography>{tipo}  {numero_tanque || numero_pipa}</Typography>
                        </Box>
                    </Stack>

                    <Stack flexDirection={movile ? 'column' : 'row'} gap='20px'>

                        <Divider />
                        <Box>
                            <Typography variant="subtitle2">Especificación</Typography>
                            <Typography>{especificacion}</Typography>
                        </Box>
                    </Stack>

                    <Stack flexDirection={movile ? 'column' : 'row'} gap='10px' justifyContent='space-between'>
                        <Button
                            onClick={() => navigate('/programacion/almacenados/programar')}
                            size="small"
                            variant="contained"
                        >
                            Programar lavado
                        </Button>
                    </Stack>
                </Stack>

            </Paper>

            {/* <ModalPrograming
                item={registro}
                modal={programModal}
                toggleModal={toggleModalProgram}
                changueTypeRegister={changueTypeRegister}
                action={'programar'}
            /> */}
        </>
    )
}