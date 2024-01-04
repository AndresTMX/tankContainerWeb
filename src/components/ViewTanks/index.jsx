import { Paper, Button, Stack, Typography, IconButton, Divider, Fade } from "@mui/material";
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
import { transformRegisters } from "../../Helpers/transformRegisters";
import { useEffect } from "react";

function ViewTanks({ typeView, toggle, data, changueTypeManiobra }) {

    const IsSmall = useMediaQuery("(max-width:900px)");
    const IsMovile = useMediaQuery("(max-width:500px)");

    useEffect(() => {
        getTanks();
    }, [data])

    const {
        typeRegister,
        linea,
        tanques,
        tanquesManiobras,
        transportista,
        operador,
        tracto,
        numeroTanques,
        typeChargue,
        shortNameOperator,
    } = transformRegisters(data);

    const { addOutputRegisterForManiobra } = useAddOutputManiobra();
    const { sendOutputRegisters } = usePostRegister();
    const { tanksReady, tankLoading, tankError, getTanks } = useGetTanks();
    const { copyTanksFree, copyTanksManiobras, toggleTank, deletTanksChargue, dataTank, colorItemTank } = useSelectManiobras(tanquesManiobras, tanksReady, tankLoading);

    const addContainers = async () => {

        const registers = []

        copyTanksManiobras.map((tanque) => {
            registers.push({
                carga: 'tanque',
                tracto: tracto,
                operador: operador.id,
                numero_tanque: tanque.tanque,
                transportista: transportista.id,
            })
        })

        await addOutputRegisterForManiobra(data.id, registers)
        setTimeout(() => {
            changueTypeManiobra('pendiente')
            toggle(false)
        }, 1200)
    }

    return (
        <>
            <Paper sx={{ padding: '20px', width: '90vw', maxWidth: '700px' }}>



                <Stack spacing={1}>

                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='subtitle1'>Nuevo registro de salida</Typography>
                        <IconButton onClick={() => toggle(false)}>
                            <ClearIcon color="error" />
                        </IconButton>
                    </Stack>

                    <ContainerScroll background={'white'} height={'250px'}>
                        <Paper sx={{ bgcolor: 'whitesmoke' }}>
                            <Stack
                                padding={'10px'}
                                width={'100%'}
                                flexDirection={IsSmall ? "column" : "row"}
                                justifyContent={IsSmall ? "flex-start" : "space-around"}
                                alignItems={IsSmall ? "start" : "center"}
                                gap="10px"
                            >

                                <TextGeneral width={'200px'} text={linea} label="Linea" />
                                <Divider
                                    orientation={IsSmall ? "horizontal" : "vertical"}
                                    flexItem
                                />
                                <TextGeneral width={'50px'} label="Tracto" text={tracto} />
                                <Divider
                                    orientation={IsSmall ? "horizontal" : "vertical"}
                                    flexItem
                                />

                                <TextGeneral width={'100px'} label="Tipo de carga" text={typeChargue} />

                                <Divider
                                    orientation={IsSmall ? "horizontal" : "vertical"}
                                    flexItem
                                />

                                <TextGeneral width={'100px'} label="Operador" text={shortNameOperator} />

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
                            >{`${copyTanksManiobras.length} / 4`}
                            </Typography>
                        </Stack>

                        <Stack spacing={'5px'} marginTop={'10px'}>
                            {copyTanksManiobras.map((tanque) => (
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

                    <Stack flexDirection={IsMovile ? 'column' : 'row'} gap={'10px'} justifyContent={'space-between'}>
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

                </Stack>
            </Paper>
        </>
    );
}

export { ViewTanks };


