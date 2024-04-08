import { useState, useRef, useMemo } from "react";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { Container, Box, Paper, Button, Stack, IconButton, Divider, Modal, Tab, Tabs, TextField, FormControl, InputLabel, Select, MenuItem, Menu, } from "@mui/material";
//icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
//hooks
import { useRealtime } from "../../Hooks/FetchData"
import useMediaQuery from "@mui/material/useMediaQuery";
//helpers
import { dateMXFormat } from "../../Helpers/date";
//services
import { getAllClientes, createNewCliente, updateCliente, deleteCliente } from "../../services/clientes";
import { getAllOperadores, createOperador, updateOperador, deleteOperador } from "../../services/operadores";
import { getAllTransportistas, createTransportista, updateTransportista, deleteTransportista } from "../../services/transportistas";
import { getAllDestinos, createDestino, updateDestino } from "../../services/destinos";
import { getAllUsers, createUser } from "../../services/usuarios";
//libreries
import { toast, Toaster } from "sonner";

function PageAdmin() {

    const { loading: loadingClientes, error: errorClientes, data: clientes } = useRealtime(getAllClientes, 'clientes', 'clientes')
    const { loading: loadingOperadores, error: errorOperadores, data: operadores } = useRealtime(getAllOperadores, 'operadores', 'operadores')
    const { loading: loadingTransportistas, error: errorTransportistas, data: transportistas } = useRealtime(getAllTransportistas, 'transportistas', 'transportistas')
    const { loading: loadingDestino, error: errorDestino, data: destinos } = useRealtime(getAllDestinos, 'destinos', 'destinos')
    const { loading: loadingUsers, error: errorUsers, data: usuarios } = useRealtime(getAllUsers, 'usuarios', 'users_data')


    const [tab, setTab] = useState(0)
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const [filter, setFilter] = useState('todos');
    const [userRol, setUserRol] = useState('admin');

    //referencias de usuario
    const nameRef = useRef();
    const clienteRef = useRef();
    const apellidoRef = useRef();
    const correoRef = useRef();
    const passRef = useRef();


    const roles = ['admin', 'developer', 'vigilante', 'maniobrista', 'reparador', 'gestor de calidad', 'cliente']

    const groupUsers = useMemo(() => {

        try {
            const filters = {
                todos: usuarios,
                usuarios: usuarios.filter((u) => u.rol != 'cliente'),
                clientes: usuarios.filter((u) => u.rol === 'cliente')
            }

            return filters[filter]
        } catch (error) {
            return usuarios
        }

    }, [filter, usuarios])

    const handleChange = (event, newValue) => {
        setTab(newValue)
    }

    const handleFilter = (newValue) => {
        setFilter(newValue)
        setMenu(false)
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
            const { error } = await createDestino({ destino: 'nuevo destino', duracion: '60' })

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Nuevo destino agregado')
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function addNewUser() {
        try {

            const name = nameRef.current.value;
            const apellido = apellidoRef.current.value;
            const cliente = clienteRef.current?.value;
            const correo = correoRef.current.value;
            const pass = passRef.current.value;

            if (name === '' || apellido === '' || correo === '' || pass === '') {
                throw new Error('llena todos los campos')
            }

            if (name.length < 3 || apellido.length < 3 || correo.length < 14 || pass.length < 6) {
                throw new Error('campos invalidos')
            }

            if (userRol === 'cliente' && cliente === undefined) {
                throw new Error('selecciona el cliente')
            }

            let appdata

            if (userRol === 'cliente') {
                appdata = { first_name: name, last_name: apellido, cliente_id: cliente, rol: userRol, email: correo, }

            } else {
                appdata = { first_name: name, last_name: apellido, apellido, rol: userRol, email: correo, }
            }

            const { error } = await createUser(correo, pass, appdata);

            if (error) {
                throw new Error(error?.message)
            } else {
                toast.success('Nuevo usuario creado')
                setModal(false)
            }

        } catch (error) {
            toast.error(error?.message)
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
                        <Tab label="Usuarios" />
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

                    <CustomTabPanel value={tab} index={4}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', bgcolor: 'whitesmoke', padding: '10px' }}>
                            <Stack flexDirection='row' justifyContent='space-between' >

                                <Stack flexDirection='row' alignItems='center' gap='5px'>
                                    <IconButton
                                        id="basic-button"
                                        aria-controls={menu ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={menu ? 'true' : undefined}
                                        onClick={(e) => setMenu(e.currentTarget)}
                                    >
                                        <FilterAltIcon />
                                    </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={menu}
                                        open={menu}
                                        onClose={() => setMenu(false)}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => handleFilter('todos')}>todos</MenuItem>
                                        <MenuItem onClick={() => handleFilter('usuarios')}>usuarios</MenuItem>
                                        <MenuItem onClick={() => handleFilter('clientes')}>clientes</MenuItem>
                                    </Menu>
                                    <span>{filter}</span>
                                </Stack>

                                <IconButton
                                    color="primary"
                                    onClick={() => setModal(true)}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                            <Stack gap='10px' padding='10px' maxHeight='70vh' overflow='auto'>
                                {groupUsers.map((usuario) => (
                                    <ItemCuenta key={usuario.id} usuario={usuario} />
                                ))}
                            </Stack>
                        </Box>
                    </CustomTabPanel>

                </Box>
            </Container>

            <Modal
                open={modal}
                onClose={() => setModal(false)}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '400px',
                        padding: '20px',
                        gap: '15px',
                        marginTop: '20px'
                    }}>

                    <TextField
                        fullWidth
                        label="Nombre"
                        inputRef={nameRef}
                    />

                    <TextField
                        fullWidth
                        label="Apellido"
                        inputRef={apellidoRef}
                    />

                    <TextField
                        fullWidth
                        label="Correo"
                        inputRef={correoRef}
                    />

                    <TextField
                        fullWidth
                        label="Contraseña"
                        inputRef={passRef}
                    />

                    <FormControl>
                        <InputLabel>Rol</InputLabel>
                        <Select
                            label='Rol'
                            value={userRol}
                            onChange={(e) => setUserRol(e.target.value)}
                        >
                            {roles.map((r) => (
                                <MenuItem key={r} value={r}>{r}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {userRol === 'cliente' && <FormControl>
                        <InputLabel>Cliente</InputLabel>
                        <Select
                            label='Cliente'
                            inputRef={clienteRef}
                        >
                            {clientes.map((cliente) => (
                                <MenuItem key={cliente.id} value={cliente.id}>{cliente.cliente}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>}

                    <Button
                        variant="contained"
                        onClick={addNewUser}
                    >
                        crear usuario
                    </Button>

                </Paper>

            </Modal>
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
                    <TextField sx={{ width: '200px' }} label={'Contacto'} disabled={!edit} inputRef={contacto} defaultValue={operador.contacto} />
                </Stack>
            </Paper>
        </>
    )
}

function ItemCliente({ cliente }) {

    const [edit, setEdit] = useState(false)

    const clienteRef = useRef();

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

                <Stack gap='10px' flexDirection='row' sx={{ marginBottom: '10px' }}>
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
    const clienteIdRef = useRef();

    const defaultCliente = destino.cliente_id ? destino.cliente_id : "no asignado"

    async function saveChangues() {
        try {

            const { error } = await updateDestino(destino.id,
                {
                    destino: destinoRef.current.value,
                    duracion: duracionRef.current.value,
                    cliente_id: clienteIdRef.current.value
                })

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

    const small = useMediaQuery('(max-width:900px)');


    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');

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

                <Stack gap='10px' flexDirection={small ? 'column' : 'row'}>

                    <TextField
                        fullWidth
                        disabled={!edit}
                        label={'Destino'}
                        inputRef={destinoRef}
                        defaultValue={destino.destino}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Cliente</InputLabel>
                        <Select
                            disabled={!edit}
                            label={'Cliente'}
                            inputRef={clienteIdRef}
                            defaultValue={defaultCliente}
                        >
                            <MenuItem disabled value="no asignado">no asignado</MenuItem>
                            {clientes.map((cliente) => (
                                <MenuItem key={cliente.id} value={cliente.id}>{cliente.cliente}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        disabled={!edit}
                        inputRef={duracionRef}
                        defaultValue={destino.duracion}
                        label={'Tiempo de viaje en minutos'}
                    />
                </Stack>
            </Paper>

        </>
    )

}

function ItemCuenta({ usuario }) {

    const small = useMediaQuery('(max-width:900px)');
    const [edit, setEdit] = useState(false);
    const [rol, setRol] = useState(usuario.rol)

    const clienteRef = useRef();
    const emailRef = useRef();

    const roles = ['admin', 'developer', 'vigilante', 'maniobrista', 'reparador', 'gestor de calidad', 'cliente']

    function saveChangues() {

    }

    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');

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

                <Stack gap='20px' flexDirection={small ? 'column' : 'row'}>

                    <TextField
                        fullWidth
                        disabled={!edit}
                        label={'Correo'}
                        inputRef={emailRef}
                        defaultValue={usuario.email}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Rol</InputLabel>
                        <Select
                            disabled={!edit}
                            label={'Rol'}
                            value={rol}
                            defaultValue={""}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            {roles.map((r) => (
                                <MenuItem key={r} value={r}>{r}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {rol === 'cliente' &&
                        <FormControl fullWidth>
                            <InputLabel>Cliente</InputLabel>
                            <Select
                                disabled={!edit}
                                label={'Cliente'}
                                inputRef={clienteRef}
                                defaultValue={usuario.cliente_id}
                            >
                                <MenuItem disabled value="no asignado">no asignado</MenuItem>
                                {clientes.map((cliente) => (
                                    <MenuItem key={cliente.id} value={cliente.id}>{cliente.cliente}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>}

                </Stack>
            </Paper>

        </>
    )
}

