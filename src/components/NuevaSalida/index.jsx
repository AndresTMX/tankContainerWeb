import { Paper, Button, Stack, Typography, IconButton, Divider, Fade, Box, Modal, TextField, Chip, Collapse } from "@mui/material";
import { TextGeneral } from "../TextGeneral";
import { ContainerScroll } from "../ContainerScroll";
import { ViewAndSelectTanks } from "../ViewAndSelectTanks";
//icons
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { GrFormViewHide } from "react-icons/gr";
import { GrFormView } from "react-icons/gr";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useParams, } from "react-router-dom";
import { useAddOutputManiobra } from "../../Hooks/Maniobras/useAddOutputManiobra";
import { useSelectManiobras } from "../../Hooks/Maniobras/useSelectManiobras";
import { useGetTanks } from "../../Hooks/tanksManagment/useGetTanks";
import { ItemTank } from "../ViewAndSelectTanks";
//helpers
import { useEffect, useState } from "react";

export function NuevaSalida() {

    const IsMovile = useMediaQuery("(max-width:750px)");

    const navigate = useNavigate();
    const { registro } = useParams();

    const jsonRegister = JSON.parse(decodeURI(registro));

    const { register, details } = jsonRegister || {};
    const { operadores, numero_economico, operador_id, numero_economico: tracto } = register || {};
    const { carga, transportistas, clientes, transportista_id, entrada_id } = details[0] || {};
    const { nombre, contacto } = operadores || {};
    const { name: linea, } = transportistas || {};
    const { cliente, id: clienteId } = clientes || {};

    const detailManiobras = details?.filter((i) => i.status === 'maniobras')

    const [info, setInfo] = useState(true);

    function toggleInfo() {
        setInfo(!info)
    }

    useEffect(() => {
        getTanksReadyToOutput();
    }, [])

    const { addOutputRegisterForManiobra } = useAddOutputManiobra();
    const { tanks, tankLoading, tankError, getTanksReadyToOutput } = useGetTanks();

    const { copyTanksFree, copyTanksManiobras, toggleTank, deletTanksChargue, dataTank, colorItemTank } = useSelectManiobras(detailManiobras, tanks, tankLoading);

    const addContainers = async () => {

        const registers = []

        copyTanksManiobras.map((tanque) => {
            registers.push({
                carga: 'tanque',
                tracto: tracto,
                numero_tanque: tanque.numero_tanque,
                tipo: tanque.tipo,
                idLavado: tanque.id
            })
        })

        console.log(registers)

        await addOutputRegisterForManiobra(entrada_id, registers, tracto, numero_economico, operador_id, transportista_id, clienteId)

    }


    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate('/maniobras')}
                sx={{
                    display: 'flex',
                    paddingTop: '3%',
                    justifyContent: 'center',
                }}
            >
                <Paper
                    elevation={4}
                    spacing={1}
                    sx={{
                        width: IsMovile ? '95vw' : 'fit-content',
                        height: 'fit-content',
                        padding: '20px',
                        maxWidth: '95vw',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        justifyContent: 'space-between',
                        overflow: 'auto'
                    }}
                >

                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='subtitle2'>Nuevo registro de salida</Typography>
                        <IconButton onClick={() => navigate('/maniobras')}>
                            <ClearIcon color="error" />
                        </IconButton>
                    </Stack>

                    <Box>
                        <Collapse in={info} orientation='vertical' >
                            <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column' }}>

                                <Stack flexDirection='row' justifyContent='space-between' paddingX='15px' paddingTop='10px' alignItems='center' >
                                    <Chip sx={{ fontWeight: '500', textTransform: 'uppercase', width: 'fit-content' }} size="small" color="info" label={cliente} />

                                    <IconButton onClick={toggleInfo} >
                                        <GrFormView />
                                    </IconButton>
                                </Stack>

                                <Stack padding='20px' gap='10px' flexDirection='row' flexWrap='wrap' justifyContent='flex-start' >

                                    <TextField fullWidth={IsMovile} label='linea transportista' value={linea} disabled />

                                    <TextField fullWidth={IsMovile} label='numero de tractocamion' value={tracto} disabled />

                                    <TextField fullWidth={IsMovile} label='tipo de carga' value={carga} disabled />

                                    <TextField fullWidth={IsMovile} label='operador' value={nombre} disabled />

                                </Stack>

                            </Paper>
                        </Collapse>

                        <Collapse in={!info} orientation='vertical' >
                            <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '10px', paddingX: '15px', paddingY: '5px' }}>
                                <Chip sx={{ fontWeight: '500', textTransform: 'uppercase', width: 'fit-content' }} size="small" color="info" label={cliente} />

                                <IconButton onClick={toggleInfo}>
                                    <GrFormViewHide />
                                </IconButton>
                            </Paper>
                        </Collapse>
                    </Box>

                    <Stack flexDirection='row' justifyContent='space-between' >
                        <Typography variant='subtitle2'>Tanques cargados</Typography>
                        <Typography variant='caption'>{`${copyTanksManiobras?.length} / 4`}</Typography>
                    </Stack>

                    <ContainerScroll background={'white'} height={'200px'} >
                        {copyTanksManiobras?.map((tanque) => (
                            <ItemTank
                                key={tanque.tanque}
                                tanque={tanque}
                                onClick={deletTanksChargue}
                                colorTank={colorItemTank}
                                typeItem={'delete'}
                            />
                        ))}
                    </ContainerScroll>

                    <ViewAndSelectTanks
                        dataTank={dataTank}
                        tankError={tankError}
                        toggleTank={toggleTank}
                        tanksReady={copyTanksFree}
                        tankLoading={tankLoading}
                        colorItemTank={colorItemTank}
                    />

                    <Stack
                        gap='5px'
                        padding='10px'
                        flexDirection={IsMovile ? 'column' : 'row'}
                        justifyContent={'space-between'}
                    >
                        <Button
                            onClick={addContainers}
                            size="small"
                            color="primary"
                            variant="contained"
                        >Crear salida
                        </Button>

                        <Button
                            size="small"
                            color="error"
                            variant="contained"
                        >cancelar
                        </Button>

                    </Stack>

                </Paper>
            </Modal>
        </>
    );
}


