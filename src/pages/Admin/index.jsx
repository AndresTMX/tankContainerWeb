import { useState, useRef } from "react";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { Container, Box, Paper, Button, Typography, Stack, IconButton, Divider, Chip, Modal, Tab, Tabs, TextField, } from "@mui/material";
//icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
//hooks
import { useRealtime } from "../../Hooks/FetchData"
//helpers
import { dateMXFormat } from "../../Helpers/date";
//services
import { getAllClientes, createNewCliente, updateCliente, deleteCliente } from "../../services/clientes";
import { getAllOperadores, createOperador, updateOperador, deleteOperador } from "../../services/operadores";
import { getAllTransportistas, createTransportista, updateTransportista, deleteTransportista } from "../../services/transportistas";
import { getAllDestinos, createDestino, updateDestino } from "../../services/destinos";
//libreries
import { toast, Toaster } from "sonner";

function PageAdmin() {

    const { loading: loadingClientes, error: errorClientes, data: clientes } = useRealtime(getAllClientes, 'clientes', 'clientes')
    const { loading: loadingOperadores, error: errorOperadores, data: operadores } = useRealtime(getAllOperadores, 'operadores', 'operadores')
    const { loading: loadingTransportistas, error: errorTransportistas, data: transportistas } = useRealtime(getAllTransportistas, 'transportistas', 'transportistas')
    const { loading: loadingDestino, error: errorDestino, data: destinos } = useRealtime(getAllDestinos, 'destinos', 'destinos')


    const [tab, setTab] = useState(0)

    const handleChange = (event, newValue) => {
        setTab(newValue)
    }

    async function addNewTransportista() {
        try {
            const { error } = await createTransportista('Nueva linea transportista')

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Transportista agregado')
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function addNewCliente() {
        try {
            const { error } = await createNewCliente({ cliente: 'nuevo cliente' })

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Nuevo cliente agregado')
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function addNewOperador() {
        try {
            const { error } = await createOperador({ nombre: 'nuevo operador' })

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Nuevo operador agregado')
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function addNewDestino() {
        try {
            const { error } = await createDestino({ destino: 'nuevo destino', duracion:'60' })

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Nuevo destino agregado')
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <Toaster richColors position="top-center" />

            <Container sx={{ paddingTop: '10px', height: '90vh', }}>
                <Box >
                    <Tabs
                        orientation="orizontal"
                        variant="scrollable"
                        value={tab}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Transportistas" />
                        <Tab label="Operadores" />
                        <Tab label="Clientes" />
                        <Tab label="Destino" />
                    </Tabs>

                    <CustomTabPanel value={tab} index={0}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', bgcolor: 'whitesmoke', padding: '10px' }}>
                            <Stack flexDirection='row' justifyContent='flex-end'>
                                <IconButton
                                    color="primary"
                                    onClick={async () => await addNewTransportista()}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                            <Stack gap='10px' padding='10px' maxHeight='70vh' overflow='auto'>
                                {transportistas.map((transport) => (
                                    <ItemTransportista key={transport.id} transport={transport} />
                                ))}
                            </Stack>
                        </Box>
                    </CustomTabPanel>

                    <CustomTabPanel value={tab} index={1}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', bgcolor: 'whitesmoke', padding: '10px' }}>
                            <Stack flexDirection='row' justifyContent='flex-end'>
                                <IconButton
                                    color="primary"
                                    onClick={async () => await addNewOperador()}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                            <Stack gap='10px' padding='10px' maxHeight='70vh' overflow='auto'>
                                {operadores.map((op) => (
                                    <ItemOperator key={op.id} operador={op} />
                                ))}
                            </Stack>
                        </Box>
                    </CustomTabPanel>

                    <CustomTabPanel value={tab} index={2}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', bgcolor: 'whitesmoke', padding: '10px' }}>
                            <Stack flexDirection='row' justifyContent='flex-end'>
                                <IconButton
                                    color="primary"
                                    onClick={async () => await addNewCliente()}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                            <Stack gap='10px' padding='10px' maxHeight='70vh' overflow='auto'>
                                {clientes.map((client) => (
                                    <ItemCliente key={client.id} cliente={client} />
                                ))}
                            </Stack>
                        </Box>
                    </CustomTabPanel>

                    <CustomTabPanel value={tab} index={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', bgcolor: 'whitesmoke', padding: '10px' }}>
                            <Stack flexDirection='row' justifyContent='flex-end'>
                                <IconButton
                                    color="primary"
                                    onClick={async () => await addNewDestino()}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                            <Stack gap='10px' padding='10px' maxHeight='70vh' overflow='auto'>
                                {destinos.map((destino) => (
                                    <ItemDestino key={destino.id} destino={destino} />
                                ))}
                            </Stack>
                        </Box>
                    </CustomTabPanel>

                </Box>
            </Container>
        </>
    );
}

export { PageAdmin };

function ItemTransportista({ transport }) {

    const [edit, setEdit] = useState(false)

    const transportista = useRef()

    async function saveChangues() {
        try {
            const { error } = await updateTransportista(transport.id, transportista.current.value)

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Transportista actualizado')
                setEdit(!edit)
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function deleteTransport() {
        toast.custom((t) => (
            <Paper elevation={3} sx={{ padding: '10px' }}>
                <p>¿Seguro que deseas elimnar esta linea transportista?</p>
                <Stack flexDirection='row' gap='20px' alignItems='center' >

                    <Button
                        variant="contained"
                        size='small'
                        onClick={() => toast.dismiss(t)}
                    >
                        cancelar
                    </Button>

                    <Button
                        onClick={async () => {
                            await deleteTransportista(transport.id)
                            toast.dismiss(t)
                        }
                        }
                        variant="contained"
                        size="small"
                        color="error">
                        eliminar
                    </Button>

                </Stack>
            </Paper>
        ))
    }

    return (
        <>
            <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '5px' }} >

                <Stack flexDirection='row' justifyContent='flex-end' >
                    <IconButton
                        size='small'
                        onClick={() => setEdit(!edit)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color={edit ? "primary" : "default"}
                        disabled={!edit}
                        onClick={saveChangues}
                    >
                        <SaveIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color='error'
                        onClick={deleteTransport}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>

                <Stack gap='10px' flexDirection='row'>
                    <TextField fullWidth disabled={!edit} label={'Linea transportista'} inputRef={transportista} defaultValue={transport.name} />
                </Stack>
            </Paper>
        </>
    )
}

function ItemOperator({ operador }) {

    const [edit, setEdit] = useState(false)

    const nombre = useRef();
    const contacto = useRef();

    async function saveChangues() {
        try {
            const changues = {
                nombre: nombre.current.value,
                contacto: contacto.current.value
            }

            const { error } = await updateOperador(operador.id, changues);

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Operador actualizado')
                setEdit(!edit)
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function deleteOperadorForId() {
        toast.custom((t) => (
            <Paper elevation={3} sx={{ padding: '10px' }}>
                <p>¿Seguro que deseas elimnar este operador?</p>
                <Stack flexDirection='row' gap='20px' alignItems='center' >

                    <Button
                        variant="contained"
                        size='small'
                        onClick={() => toast.dismiss(t)}
                    >
                        cancelar
                    </Button>

                    <Button
                        onClick={async () => {
                            await deleteOperador(operador.id)
                            toast.dismiss(t)
                        }
                        }
                        variant="contained"
                        size="small"
                        color="error">
                        eliminar
                    </Button>

                </Stack>
            </Paper>
        ))
    }

    return (
        <>
            <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '5px' }} >

                <Stack flexDirection='row' justifyContent='flex-end' >
                    <IconButton
                        size='small'
                        onClick={() => setEdit(!edit)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color={edit ? "primary" : "default"}
                        disabled={!edit}
                        onClick={saveChangues}
                    >
                        <SaveIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color='error'
                        onClick={deleteOperadorForId}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>

                <Stack gap='10px' flexDirection='row'>
                    <TextField fullWidth disabled={!edit} label={'Operador'} inputRef={nombre} defaultValue={operador.nombre} />
                    <TextField sx={{ width: '200px' }} disabled={!edit} inputRef={contacto} defaultValue={operador.contacto} />
                </Stack>
            </Paper>
        </>
    )
}

function ItemCliente({ cliente }) {

    const [edit, setEdit] = useState(false)

    const clienteRef = useRef()

    async function saveChangues() {
        try {

            const { error } = await updateCliente(cliente.id, { cliente: clienteRef.current.value })

            if (error) {
                toast.error(`Error al actualizar cliente, error: ${error.message}`)
            } else {
                toast.success(`Cliente actualizado`)
                setEdit(!edit)
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function deleteClientForID() {
        toast.custom((t) => (
            <Paper elevation={3} sx={{ padding: '10px' }}>
                <p>¿Seguro que deseas elimnar este cliente?</p>
                <Stack flexDirection='row' gap='20px' alignItems='center' >

                    <Button
                        variant="contained"
                        size='small'
                        onClick={() => toast.dismiss(t)}
                    >
                        cancelar
                    </Button>

                    <Button
                        onClick={async () => {
                            await deleteCliente(cliente.id)
                            toast.dismiss(t)
                        }
                        }
                        variant="contained"
                        size="small"
                        color="error">
                        eliminar
                    </Button>

                </Stack>
            </Paper>
        ))
    }

    return (
        <>
            <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '5px' }} >

                <Stack flexDirection='row' justifyContent='flex-end' >
                    <IconButton
                        size='small'
                        onClick={() => setEdit(!edit)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color={edit ? "primary" : "default"}
                        disabled={!edit}
                        onClick={saveChangues}
                    >
                        <SaveIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color='error'
                        onClick={deleteClientForID}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>

                <Stack gap='10px' flexDirection='row'>
                    <TextField fullWidth disabled={!edit} label={'Cliente'} inputRef={clienteRef} defaultValue={cliente.cliente} />
                </Stack>
            </Paper>
        </>
    )
}

function ItemDestino({ destino }) {

    const [edit, setEdit] = useState(false)

    const destinoRef = useRef();
    const duracionRef = useRef();

    async function saveChangues() {
        try {

            const { error } = await updateDestino(destino.id, { destino: destinoRef.current.value, duracion: duracionRef.current.value })

            if (error) {
                toast.error(`Error al actualizar cliente, error: ${error.message}`)
            } else {
                toast.success(`Cliente actualizado`)
                setEdit(!edit)
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '5px' }} >

                <Stack flexDirection='row' justifyContent='flex-end' >
                    <IconButton
                        size='small'
                        onClick={() => setEdit(!edit)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color={edit ? "primary" : "default"}
                        disabled={!edit}
                        onClick={saveChangues}
                    >
                        <SaveIcon />
                    </IconButton>

                </Stack>

                <Stack gap='10px' flexDirection='row'>
                    <TextField fullWidth disabled={!edit} label={'Destino'} inputRef={destinoRef} defaultValue={destino.destino} />
                    <TextField disabled={!edit} label={'Tiempo de viaje en minutos'} inputRef={duracionRef} defaultValue={destino.duracion} />
                </Stack>
            </Paper>

        </>
    )

}

