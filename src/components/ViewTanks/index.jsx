import { useEffect, useState, useContext } from "react";
import { Box, Paper, Button, Stack, Typography, IconButton, Skeleton } from "@mui/material";
import { useGetTanks } from "../../Hooks/tanksManagment/useGetTanks";
import { ContainerScroll } from "../ContainerScroll";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { useAddContainer } from "../../Hooks/Maniobras/useAddContainer";
//icons
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

function ViewTanks({ typeView, toggle, data }) {

    useEffect(() => {
        getTanks()
    }, [])

    const [dataTank, setDataTank] = useState([])
    const dataTanques = data.registros_detalles_entradas;
    const { addContainerToManiobra } = useAddContainer();
    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const { tanks, tanksReady, tankLoading, tankError, getTanks } = useGetTanks();

    const colorItemTank = (tanque) => dataTank.find((item) => item === tanque) ? '#0288d1' : 'default';
    const colorItemText = (tanque) => dataTank.find((item) => item === tanque) ? 'white' : 'default';

    const toggleTank = (tank) => {

        const newState = dataTank.length >= 1 ? [...dataTank] : [];
        const index = dataTank.findIndex((item) => item === tank);
        const repeat = dataTank.find((item) => item === tank)

        if (index < 1 && repeat === undefined && validateNumTank()) {
            newState.push(tank);
        }

        if (index >= 0 && repeat) {
            newState.splice(index, 1);
        }

        setDataTank(newState)

    }

    const validateNumTank = () => {
        if ((dataTank.length + dataTanques.length) >= 4) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'No puedes agregar más de 4 tanques'
            })

            return false
        } else {
            return true
        }
    }

    const addContainers = async() => {

        const registers = []

        dataTank.map((tanque) => {
            registers.push({
                carga: 'tanque',
                tracto: dataTanques[0].tracto,
                operador: dataTanques[0].operadores.id,
                numero_tanque:tanque,
                transportista: dataTanques[0].transportistas.id,
                status: 'maniobras'
            })
        })

        await addContainerToManiobra(data.id, registers);
        toggle(false)
    }


    return (
        <>
            <Paper sx={{ padding: '20px' }}>
                <Stack spacing={1}>

                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='subtitle2'>Tanques disponibles</Typography>
                        <Typography variant='caption'>{`${(dataTank.length + dataTanques.length)}/4`}</Typography>
                        <IconButton onClick={() => toggle(false)}>
                            <ClearIcon color="error" />
                        </IconButton>
                    </Stack>

                    <ContainerScroll height='240px'>
                        <Stack spacing={1}>
                            {tanksReady.map((item) => (
                                <ItemTank
                                    key={item.tanque}
                                    onClick={toggleTank}
                                    tanque={item.tanque}
                                    colorTank={colorItemTank}
                                    colorItemText={colorItemText}
                                />
                            ))}

                            {tankLoading && (
                                <Stack spacing={1}>
                                    <Skeleton variant="rounded" width={'200px'} height={'60px'} />
                                    <Skeleton variant="rounded" width={'200px'} height={'60px'} />
                                    <Skeleton variant="rounded" width={'200px'} height={'60px'} />
                                </Stack>
                            )}
                        </Stack>
                    </ContainerScroll>
                    <Button 
                    onClick={addContainers}
                    color="primary" 
                    variant="contained"
                    >Agregar
                    </Button>
                </Stack>
            </Paper>
        </>
    );
}

export { ViewTanks };

export function ItemTank({ tanque, onClick, colorTank, colorItemText }) {
    return (
        <Paper sx={{ width: '200px', bgcolor: colorTank(tanque) }}>
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center' padding='10px' gap='20px'>
                <Typography sx={{ color: colorItemText(tanque) }}>
                    {tanque}
                </Typography>
                <IconButton onClick={() => onClick(tanque)}>
                    <AddIcon sx={{ color: colorItemText(tanque) }} />
                </IconButton>
            </Stack>
        </Paper>
    );
}

