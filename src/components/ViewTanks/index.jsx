import { Paper, Button, Stack, Typography, IconButton, Divider, Fade, Box } from "@mui/material";
import { TextGeneral } from "../TextGeneral";
import { ContainerScroll } from "../ContainerScroll";
import { ViewAndSelectTanks } from "../ViewAndSelectTanks";
//icons
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePostRegister } from "../../Hooks/Maniobras/usePostRegister";
import { useAddOutputManiobra } from "../../Hooks/Maniobras/useAddOutputManiobra";
import { useSelectManiobras } from "../../Hooks/Maniobras/useSelectManiobras";
import { useGetTanks } from "../../Hooks/tanksManagment/useGetTanks";
import { ItemTank } from "../ViewAndSelectTanks";
//helpers
import { useEffect } from "react";

function ViewTanks({ register, toggle, details, detailManiobras, changueTypeManiobra }) {

    const IsSmall = useMediaQuery("(max-width:900px)");
    const IsMovile = useMediaQuery("(max-width:500px)");

    useEffect(() => {
        getTanksReadyToOutput();
    }, [])

    const { tracto, operadores, placas, numero_economico, operador_id} = register
    const { carga,  transportistas, clientes, transportista_id, entrada_id } = details[0] || {};
    const { nombre, contacto } = operadores || {};
    const { name: linea, } = transportistas || {};
    const { cliente, id:clienteId } = clientes || {};

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

        await addOutputRegisterForManiobra(entrada_id, registers, placas, tracto, numero_economico, operador_id, transportista_id, clienteId)
        setTimeout(() => {
            changueTypeManiobra('pendiente')
            toggle(false)
        }, 1200)
    }

    return (
        <>
            <Box sx={{ width: '90vw', maxWidth: '700px' }}>

                <Paper
                    spacing={1}
                    sx={{
                        padding: '20px'
                    }}
                >

                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='subtitle1'>Nuevo registro de salida</Typography>
                        <IconButton onClick={() => toggle(false)}>
                            <ClearIcon color="error" />
                        </IconButton>
                    </Stack>

                    <ContainerScroll background={'white'} height={'250px'} >
                        <Paper sx={{ display: 'flex', padding: '10px', flexDirection: 'column', gap: '10px' }}>
                            <Stack flexDirection='row' gap='20px' alignItems='center' bgcolor='whitesmoke' padding="10px">
                                <Typography variant="subtitle2">
                                    Cliente
                                </Typography>
                                <Typography>
                                    {cliente}
                                </Typography>
                            </Stack>

                            <Stack
                                gap="10px"
                                padding="10px"
                                width={'100%'}
                                bgcolor='whitesmoke'
                                alignItems={IsSmall ? "start" : "center"}
                                flexDirection={IsSmall ? "column" : "row"}
                                justifyContent={IsSmall ? "flex-start" : "space-around"}
                            >

                                <TextGeneral width={'200px'} text={linea} label="Linea" />
                                <Divider
                                    orientation={IsSmall ? "horizontal" : "vertical"}
                                    flexItem
                                />
                                <TextGeneral width={'100px'} label="Tracto" text={tracto} />
                                <Divider
                                    orientation={IsSmall ? "horizontal" : "vertical"}
                                    flexItem
                                />

                                <TextGeneral width={'100px'} label="Tipo de carga" text={carga} />

                                <Divider
                                    orientation={IsSmall ? "horizontal" : "vertical"}
                                    flexItem
                                />

                                <TextGeneral
                                    width={'100px'}
                                    label="Operador"
                                    text={`${nombre?.split(" ").slice(0, 2)[0]} ${nombre?.split(" ").slice(0, 2)[1]} `} />

                            </Stack>
                        </Paper>

                        <Stack
                            flexDirection={'row'}
                            justifyContent={'space-between'}
                            paddingTop={'10px'}
                        >
                            <Typography
                                variant='subtitle2'
                            >{`Tanques cargados`}
                            </Typography>
                            <Typography
                                variant='caption'
                            >{`${copyTanksManiobras?.length} / 4`}
                            </Typography>
                        </Stack>

                        <Stack spacing={'5px'} marginTop={'10px'}>
                            {copyTanksManiobras?.map((tanque) => (
                                <ItemTank
                                    key={tanque.tanque}
                                    tanque={tanque}
                                    onClick={deletTanksChargue}
                                    colorTank={colorItemTank}
                                    typeItem={'delete'}
                                />
                            ))}
                        </Stack>
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
                            onClick={() => toggle(false)}
                            size="small"
                            color="error"
                            variant="contained"
                        >cancelar
                        </Button>

                    </Stack>

                </Paper>
            </Box>
        </>
    );
}

export { ViewTanks };


