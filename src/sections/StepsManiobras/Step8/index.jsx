import { useState, useContext } from "react";
//context
import { actionTypes } from "../../../Reducers/PrelavadoReducer";
import { PrelavadoContext } from "../../../Context/PrelavadoContext";
//components
import { Box, Stack, Button, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useChecklistPrelavado } from "../../../Hooks/Prelavado/useChecklistPrelavado";

function Step8({ setStep, updater }) {

    const [status, setStatus] = useState('')

    const { completeChecklist } = useChecklistPrelavado();

    const [state, dispatch] = useContext(PrelavadoContext)
    const { checklist, selectCheck } = state;

    const { id_detalle_entrada, id:idLavado } = selectCheck || {};
    const { numero_pipa, numero_tanque } = selectCheck.registros_detalles_entradas || {};

    const Submit = async (e) => {
        e.preventDefault();

        const arrrayObjects = Object.values(checklist)

        const arrayColection = arrrayObjects.map((item, index) => {
            let array = [];

            const data = Object.values(item).flat()

            for (let element of data) {

                if (typeof element === 'string') {
                    element = {
                        question: 'Tipo de cubierta',
                        value: item.type,
                        preview: ''
                    }
                }

                array.push(element)
            }

            return array
        });

        const questionsFlat = arrayColection.flat();

        const dataChecklist = {
            registro_detalle_entrada_id: id_detalle_entrada,
            numero_tanque: numero_tanque,
            numero_pipa: numero_pipa,
            data: questionsFlat,
        }

        await completeChecklist(id_detalle_entrada, idLavado, dataChecklist, status);
        setStep(1);
        dispatch({ type: actionTypes.setSelectCheck, payload: false });
        dispatch({ type: actionTypes.setCheckList, payload: { cuviertaValvula: { type: '' } } });
        updater()

    }

    return (
        <>
            <Paper
                elevation={4}
                sx={{
                    display: 'flex',
                    padding: '20px',
                    flexDirection: 'column',
                    gap: '20px',
                }}>

                <form onSubmit={Submit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                        <Typography>Siguiente paso</Typography>

                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                required
                                label='Status'
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value='lavado'>Lavado</MenuItem>
                                <MenuItem value='almacenado'>Almacenado</MenuItem>
                                <MenuItem value='interna'>Reparacion interna</MenuItem>
                                <MenuItem value='externa'>Reparación externa</MenuItem>
                            </Select>
                        </FormControl>

                        <Stack flexDirection='row' justifyContent='space-between'>

                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => setStep(7)}
                            >
                                regresar
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Completar checklist
                            </Button>
                        </Stack>
                    </Box>
                </form>

            </Paper>
        </>
    );
}

export { Step8 };