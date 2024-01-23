import { useState, useContext } from "react";
//componentes
import { Box, Stack, Typography, Paper, IconButton, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
//icons
import CloseIcon from '@mui/icons-material/Close';
//hooks
import { useFormRegister } from "../../Hooks/Maniobras/useFormRegister";
import { useEditManiobra } from "../../Hooks/Maniobras/useEditManiobra";
import { GlobalContext } from "../../Context/GlobalContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useReadyToChargue } from "../../Hooks/tanksManagment/useReadyToChargue";
//icons
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContainerScroll } from "../ContainerScroll";

function FormEditManiobras({ register, detalles, toggleModal, updaterDetails, updaterRegisters }) {

    const { checkIn, created_at, numero_economico, operadores, placas, tracto, type: typeRegister, status: statusRegister, id: idRegister } = register || {};

    const { carga, transportistas, status, clientes } = detalles[0] || {};
    const { nombre, contacto, id: operadorId } = operadores || {};
    const { name: linea, id: transportistaId } = transportistas || {};
    const { cliente, id: idCliente } = clientes || {};

    const IsMovile = useMediaQuery("(max-width:700px)")
    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const { routerFetch, editRegisterGeneral, editRegisterCarga } = useEditManiobra(updaterRegisters);
    const { statesFormRegister, functionsFormRegister } = useFormRegister();

    const { typeChargue, dataTank, dataPipa, typePipa, typeTank } = statesFormRegister || {};

    const { setTypeChargue, setDataTank, setDataPipa, setTypeTank, setTypePipa } = functionsFormRegister || {};

    const cacheOperadores = JSON.parse(localStorage.getItem('operadores'));
    const cacheTransportistas = JSON.parse(localStorage.getItem('transportistas'));

    //controlador de datos de ingreso
    const [editableRegister, setEditableRegister] = useState(true);
    const [dataRegister, setDataRegister] = useState({
        operador_id: operadorId,
        numero_economico: numero_economico,
        placas: placas,
        tracto: tracto,
    })

    const saveChangueRegister = async () => {
        await editRegisterGeneral(idRegister, dataRegister)
        toggleModal()
        updaterRegisters()
    }

    return (
        <>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '90vw',
                    maxWidth: '700px',
                    padding: '20px',
                    gap: '8px',
                    height: 'fit-content'
                }}>
                <Stack
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Typography>
                        Edicion del registro
                    </Typography>
                    <IconButton onClick={() => toggleModal(false)}>
                        <CloseIcon color="error" />
                    </IconButton>
                </Stack>

                <Stack alignItems='center' width='100%' flexDirection='row' gap='10px' flexWrap='wrap'>

                    {/* //si el registro tiene carga vacia y es de tipo salida sin confirmar */}
                    {(carga === 'vacio' && typeRegister === 'salida') &&
                        <ChangueTypeManiobra />
                    }

                    {/* //si el registro es de tipo entrada y tiene tanques o pipas sin confirmar */}
                    {(carga === 'tanque' || carga === 'pipa' && typeRegister === 'entrada') &&
                        <Paper
                            elevation={1}
                            sx={{
                                bgcolor: 'whitesmoke',
                                padding: '10px',
                                width: '100%'
                            }}
                        >
                            <Stack width='100%' flexDirection='row' gap='10px' justifyContent='flex-end'>
                                <IconButton>
                                    <EditIcon
                                        color={!editableRegister ? 'error' : 'action'}
                                        onClick={() => setEditableRegister(!editableRegister)} />
                                </IconButton>

                                <IconButton>
                                    <SaveIcon
                                        color={!editableRegister ? 'info' : 'default'}
                                        onClick={saveChangueRegister} />
                                </IconButton>
                            </Stack>

                            <Stack flexDirection='row' flexWrap='wrap' gap='5px' width='100%'>


                                <FormControl
                                    sx={{ width: '200px' }}
                                >
                                    <InputLabel>Operador</InputLabel>
                                    <Select
                                        label='Operador'
                                        disabled={editableRegister}
                                        value={dataRegister.operador_id}
                                        onChange={(e) => setDataRegister({ ...dataRegister, operador_id: e.target.value })}
                                    >
                                        {cacheOperadores.map((operador) => (
                                            <MenuItem key={operador.id} value={operador.id}>{operador.nombre}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    value={dataRegister.tracto}
                                    variant='outlined'
                                    sx={{ width: '169px' }}
                                    disabled={editableRegister}
                                    helperText='N° de Tractocamión'
                                    onChange={(e) => setDataRegister({ ...dataRegister, tracto: e.target.value })}
                                />

                                <TextField
                                    value={dataRegister.placas}
                                    variant='outlined'
                                    helperText='Placas'
                                    disabled={editableRegister}
                                    onChange={(e) => setDataRegister({ ...dataRegister, placas: e.target.value })}

                                />

                                <TextField
                                    value={dataRegister.numero_economico}
                                    variant='outlined'
                                    sx={{ width: '169px' }}
                                    disabled={editableRegister}
                                    helperText='N° de económico'
                                    onChange={(e) => setDataRegister({ ...dataRegister, numero_economico: e.target.value })}
                                />

                            </Stack>

                        </Paper>}

                </Stack>

                {/* //si el registro es de tipo entrada y tiene tanques o pipas sin confirmar */}
                {(carga === 'tanque' || carga === 'pipa' && typeRegister === 'entrada') &&
                    <Paper
                        elevation={1}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            bgcolor: 'whitesmoke',
                            padding: '10px',
                            gap: '10px',
                            width: '100%'
                        }}
                    >

                        <ContainerScroll height={'150px'}>
                            <Stack gap='10px'>
                                {detalles.map((detalle, index) => (
                                    <ItemEditable
                                        key={index}
                                        detalle={detalle}
                                        updater={updaterDetails}
                                        typeRegister={typeRegister}
                                        detallesLength={detalles.length}
                                    />
                                ))}
                            </Stack>
                        </ContainerScroll>
                    </Paper>}


                {/* <Stack
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    gap={'10px'}>

                    <Button
                        onClick={SendChangues}
                        size='small'
                        variant='contained'
                        color='primary'
                    >Guardar
                    </Button>

                    <Button
                        onClick={() => toggleModal(false)}
                        size='small'
                        variant='contained'
                        color='error'
                    >descartar
                    </Button>
                </Stack> */}

            </Paper>
        </>
    );
}

export { FormEditManiobras };

function ItemEditable({ detalle, updater, typeRegister, detallesLength }) {

    const { tipo, numero_tanque, numero_pipa, id, carga } = detalle || {};

    const { editRegisterCarga, deleteRegisterCarga } = useEditManiobra(updater)

    const [editable, setEditable] = useState(true);
    const [details, setDetails] = useState({ tipo: tipo, numero_tanque: numero_tanque, numero_pipa: numero_pipa })

    const onChange = (value) => {
        if (carga === 'tanque') {
            setDetails({ ...details, numero_tanque: value })
        }

        if (carga === 'pipa') {
            setDetails({ ...details, numero_pipa: value })
        }
    }

    const saveChangueDetail = async () => {
        await editRegisterCarga(id, details)
        setEditable(!editable)
        updater()
    }

    const deleteValue = async () => {
        deleteRegisterCarga(id)
    }

    return (
        <>
            <Stack flexDirection='row' alignItems='center' >
                {carga === 'tanque' &&
                    <FormControl sx={{ width: '150px' }}>
                        <InputLabel>Tipo</InputLabel>
                        <Select
                            label='Tipo'
                            disabled={editable}
                            value={details.tipo}
                            onChange={(e) => setDetails({ ...details, tipo: e.target.value })}
                        >
                            <MenuItem value='AGMU'>AGMU</MenuItem>
                            <MenuItem value='AFIU'>AFIU</MenuItem>
                            <MenuItem value='DYOU'>DYOU</MenuItem>
                        </Select>
                    </FormControl>}
                <TextField
                    fullWidth
                    disabled={editable}
                    value={details.numero_tanque || details.numero_pipa}
                    onChange={(e) => onChange(e.target.value)} />
                <Stack flexDirection='row' alignItems='center'>

                    {!editable && <IconButton
                        onClick={saveChangueDetail}
                    >
                        <SaveIcon color='info' />
                    </IconButton>}

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

function ChangueTypeManiobra({ }) {


    const [typeChargue, setTypeChargue] = useState('');
    const [data, setData] = useState([]);

    const { loading, data: dataItems, error } = useReadyToChargue(typeChargue);
    console.log("🚀 ~ ChangueTypeManiobra ~ dataItems:", dataItems)


    return (
        <>
            <Box>

                <FormControl>
                    <InputLabel>Tipo de registro</InputLabel>
                    <Select
                        sx={{ width: '169px' }}
                        onChange={(e) => setTypeChargue(e.target.value)}
                        label='Tipo de registro'
                    >
                        <MenuItem value='tanque'>Tanque</MenuItem>
                        <MenuItem value='pipa'>Pipa</MenuItem>
                    </Select>
                </FormControl>



            </Box>
        </>
    )
}