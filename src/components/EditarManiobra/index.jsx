import { useState } from "react";
//componentes
import { Stack, Typography, Paper, IconButton, TextField, Select, MenuItem, FormControl, InputLabel, Modal, Container } from "@mui/material";
//icons
import CloseIcon from '@mui/icons-material/Close';
//hooks
import { useNavigate, useParams } from "react-router-dom";
//icons
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContainerScroll } from "../ContainerScroll";
//libraries
import { toast } from "sonner";
//services
import { updateRegistroWhitId, deleteRegisterWhitId } from "../../services/maniobras";

export function EditarManiobra() {

    const { items } = useParams();
    const navigate = useNavigate();

    const jsonItems = JSON.parse(decodeURI(items));

    const { items: listItems } = jsonItems || {};

    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate('/maniobras')}>

                <Container sx={{ paddingTop: '2%', width: 'fit-content' }} >
                    <Paper sx={{ padding: '15px', width: 'fit-content' }} >
                        <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                            <Typography> Edicion del registro </Typography>
                            <IconButton onClick={() => navigate('/maniobras')} >
                                <CloseIcon color="error" />
                            </IconButton>
                        </Stack>


                        <Stack>

                            <ContainerScroll height={'300px'}>
                                <Stack gap='10px'>
                                    {listItems?.map((item, index) => (
                                        <ItemEditable
                                            key={item.id}
                                            item={item}
                                            detallesLength={listItems?.length}
                                        />
                                    ))}
                                </Stack>
                            </ContainerScroll>
                        </Stack>

                    </Paper>
                </Container>
            </Modal>
        </>
    );
}


function ItemEditable({ item, detallesLength }) {

    const { tipo, numero_tanque, numero_pipa, id, carga, especificacion } = item || {};
    const espectOptions = ['NFC', 'FCOJ', 'OR-OIL', 'DLIMONENE', 'TEQUILA', 'NFC/FCOJ']

    const [editable, setEditable] = useState(true);
    const [tanque, setTanque] = useState({ tipo: tipo, numero_tanque: numero_tanque, numero_pipa: numero_pipa, especificacion: especificacion })

    const onChange = (value) => {
        if (carga === 'tanque') {
            setTanque({ ...tanque, numero_tanque: value })
        }

        if (carga === 'pipa') {
            setTanque({ ...tanque, numero_pipa: value })
        }
    }

    async function saveChangueDetail() {

        try {

            const { error } = await updateRegistroWhitId(id, { ...tanque })

            if (error) {
                throw new Error(error)
            } else {
                toast.success(`tanque ${tanque.numero_tanque} actualizado`)
                setEditable(true)
            }

        } catch (error) {
            toast.error(error)
        }
    }

    async function deleteValue() {

        try {

            const { error } = await deleteRegisterWhitId(id)

            if (error) {
                throw new Error(error)
            } else {
                toast.success(`tanque ${tanque.numero_tanque} eliminado`)
            }


        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <Stack flexDirection='row' alignItems='center' flexWrap='wrap' spacing='4px' gap='4px' >

                <FormControl
                    fullWidth
                    sx={{
                        minWidth: '200px',
                        maxWidth: '200px',
                    }}
                >
                    <InputLabel>Tipo</InputLabel>
                    <Select
                        label='Tipo'
                        disabled={editable}
                        value={tanque.tipo}
                        onChange={(e) => setTanque({ ...tanque, tipo: e.target.value })}
                    >
                        <MenuItem value='AGMU'>AGMU</MenuItem>
                        <MenuItem value='AFIU'>AFIU</MenuItem>
                        <MenuItem value='DYOU'>DYOU</MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    fullWidth
                    sx={{
                        minWidth: '200px',
                        maxWidth: '200px',
                    }}
                >
                    <InputLabel>Especificación</InputLabel>
                    <Select
                        label='Especificación'
                        disabled={editable}
                        value={tanque.especificacion}
                        onChange={(e) => setTanque({ ...tanque, especificacion: e.target.value })}
                    >
                        {espectOptions.map((es) => (
                            <MenuItem key={es} value={es}>{es}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    sx={{
                        minWidth: '200px',
                        maxWidth: '200px',
                    }}
                    label='numero de tanque'
                    disabled={editable}
                    value={tanque.numero_tanque || tanque.numero_pipa}
                    onChange={(e) => onChange(e.target.value)} />


                <Stack flexDirection='row' alignItems='center'>

                    <IconButton
                        color='info'
                        disabled={editable}
                        onClick={saveChangueDetail}
                    >
                        <SaveIcon />
                    </IconButton>

                    <IconButton
                        onClick={() => setEditable(!editable)}
                    >
                        <EditIcon color="info" />
                    </IconButton>

                    <IconButton
                        disabled={detallesLength === 1 ? true : false}
                        onClick={deleteValue}
                    >
                        <DeleteIcon color={detallesLength === 1 ? "default" : "error"} />
                    </IconButton>
                </Stack>
            </Stack>
        </>
    )
}
