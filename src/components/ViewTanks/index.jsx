import { Paper, Button, Stack, Typography, IconButton, Divider, Fade } from "@mui/material";
import { TextGeneral } from "../TextGeneral";
import { ContainerScroll } from "../ContainerScroll";
import { ViewAndSelectTanks } from "../ViewAndSelectTanks";
//icons
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePostRegister } from "../../Hooks/registersManagment/usePostRegister";
import { useAddOutputManiobra } from "../../Hooks/Maniobras/useAddOutputManiobra";
import { useViewAndSelectTanks } from "../../Hooks/Maniobras/useSelectManiobras";
//helpers
import { transformRegisters } from "../../Helpers/transformRegisters";

function ViewTanks({ typeView, toggle, data, changueTypeManiobra }) {

    const IsSmall = useMediaQuery("(max-width:900px)");
    const IsMovile = useMediaQuery("(max-width:500px)");

    const dataTanques = data.registros_detalles_entradas;
    const { addOutputRegisterForManiobra } = useAddOutputManiobra();
    const { colorItemTank, toggleTank, dataTank } = useViewAndSelectTanks();
    const { sendOutputRegisters } = usePostRegister();

    const {
        typeRegister,
        linea,
        tanques,
        tanquesManiobras,
        operador,
        tracto,
        numeroTanques,
        typeChargue,
        dayInput,
        dateInput,
        OperatorSliceName,
        shortNameOperator,
        dayCreat,
        dateCreate,
    } = transformRegisters(data);

    const addContainers = async () => {

        const registers = []

        dataTank.map((tanque) => {
            registers.push({
                carga: 'tanque',
                tracto: dataTanques[0].tracto,
                operador: dataTanques[0].operadores.id,
                numero_tanque: tanque,
                transportista: dataTanques[0].transportistas.id,
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

                        <Stack spacing={'5px'} marginTop={'10px'}>
                            {dataTank.map((tanque) => (
                                <Fade in={tanque}>
                                    <Paper elevation={1} sx={{ bgcolor: 'rgb(229 246 253)', padding: '5px' }}>
                                        <Typography>{tanque}</Typography>
                                    </Paper>
                                </Fade>
                            ))}
                        </Stack>
                    </ContainerScroll>

                    <ViewAndSelectTanks
                     dataTank={dataTank}
                     toggleTank={toggleTank}
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


