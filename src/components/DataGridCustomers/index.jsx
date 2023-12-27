import { useState } from "react";
import { Box, Button, Stack, Modal, Paper, TextField, Typography, Chip } from "@mui/material";
import { ContainerScroll } from "../../components/ContainerScroll"
import { DataGrid } from "@mui/x-data-grid";
import { useCustomers } from "../../Hooks/Customers/useCustomers";
//icons
import AddIcon from '@mui/icons-material/Add';

function DataGridCustomers() {

    const { customers, rowsCustomers, loading, error, updateCustomers, createCustomer, deleteCustomer, updateCustomer } = useCustomers();
    const [customersEdit, setCustomersEdit] = useState([]);
    const [rowsModel, setRowsModel] = useState([]);
    const columns = [
        { field: 'col1', headerName: 'Cliente', width: 250 },
        { field: 'col2', headerName: 'RFC', width: 200 },
        { field: 'col3', headerName: 'Email', width: 250 },
        { field: 'col4', headerName: 'Telefono', width: 200 },
    ];

    const [customer, setCustomer] = useState({ cliente: '', rfc: '', email: '', phone: '' })
    //modals
    const [createModal, setCreateModal] = useState(false);
    const [deleteModal, setDeletModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    const toggleCreate = () => {
        setCreateModal(!createModal)
        setCustomer({ cliente: '', rfc: '', email: '', phone: '' })
    }

    const toggleDelet = () => {
        setDeletModal(!deleteModal)
    }

    const toggleUpdate = () => {
        setUpdateModal(!updateModal)
    }

    const createSubmit = (e) => {
        e.preventDefault();
        createCustomer(customer)
        toggleCreate();
        setTimeout(() => {
            updateCustomers();
        }, 1000)
    }

    const deleteSubmit = () => {
        deleteCustomer(rowsModel);
        toggleDelet();
        setTimeout(() => {
            updateCustomers();
        }, 1000)
    }

    const updateSubmit = () => {
        updateCustomer(customersEdit);
        toggleUpdate();
        setTimeout(() => {
            updateCustomers();
        }, 1000)
    }

    const onChangueEditCustomer = (type, index, e) => {

        const newState = [...customersSelected];

        const routeEdit = {
            rfc: () => newState[index].rfc = e.target.value,
            email: () => newState[index].email = e.target.value,
            phone: () => newState[index].phone = e.target.value,
        }

        if (routeEdit[type]) {
            routeEdit[type]()
        }

        setCustomersEdit(newState);

    }

    const customersSelected = customers.filter((item) => rowsModel.includes(item.id));

    return (
        <>
            <Box sx={{ bgcolor: 'whitesmoke', padding: '20px', borderRadius: '4px' }}>
                <DataGrid
                    sx={{ bgcolor: 'white' }}
                    rows={rowsCustomers}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                    onRowSelectionModelChange={(rowModesModel) => setRowsModel(rowModesModel)}
                    slots={{
                        toolbar: HeaderTable
                    }}
                    slotProps={{
                        toolbar: { toggleCreate, toggleDelet, toggleUpdate }
                    }}
                />
            </Box>

            <Modal open={createModal}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '100vh',
                        width: '100vw',
                        paddingTop: '10%'

                    }}>
                    <form onSubmit={(e) => createSubmit(e)}>
                        <Paper
                            sx={{
                                width: '350px',
                                maxWidth: '90vw',
                                padding: '20px'
                            }}
                        >
                            <Stack
                                flexDirection={'column'}
                                alignItems={'center'}
                                flexWrap={'wrap'}
                                gap={'15px'}
                            >

                                <TextField
                                    fullWidth
                                    required={true}
                                    label={'Cliente'}
                                    value={customer.cliente}
                                    onChange={(e) => setCustomer({ ...customer, cliente: e.target.value })}
                                />

                                <TextField
                                    fullWidth
                                    required={true}
                                    label={'RFC'}
                                    value={customer.rfc}
                                    onChange={(e) => setCustomer({ ...customer, rfc: e.target.value })}
                                />

                                <TextField
                                    fullWidth
                                    label={'Email'}
                                    value={customer.email}
                                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                />

                                <TextField
                                    fullWidth
                                    label={'Telefono'}
                                    value={customer.phone}
                                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Registrar
                                </Button>

                                <Button
                                    onClick={toggleCreate}
                                    fullWidth
                                    variant="contained"
                                    color="error"
                                >
                                    Cancelar
                                </Button>

                            </Stack>

                        </Paper>
                    </form>
                </Box>
            </Modal>

            <Modal open={deleteModal}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '100vh',
                        width: '100vw',
                        paddingTop: '10%'

                    }}>
                    <form onSubmit={deleteSubmit}>
                        <Paper
                            sx={{
                                width: '350px',
                                maxWidth: '90vw',
                                padding: '20px'
                            }}
                        >
                            <Stack
                                flexDirection={'column'}
                                alignItems={'center'}
                                flexWrap={'wrap'}
                                gap={'15px'}
                            >

                                <Typography>
                                    ¿Estas a punto de eliminar {rowsModel.length >= 1 ? rowsModel.length : '0'} clientes, quieres continuar?
                                </Typography>

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="error"
                                >
                                    Eliminar
                                </Button>

                                <Button
                                    fullWidth
                                    onClick={toggleDelet}
                                    variant="outlined"
                                    color="error"
                                >
                                    Cancelar
                                </Button>

                            </Stack>

                        </Paper>
                    </form>
                </Box>
            </Modal>

            <Modal open={updateModal}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '100vh',
                        width: '100vw',
                        paddingTop: '10%'

                    }}>
                    <form onSubmit={updateSubmit}>
                        <Paper
                            sx={{
                                width: '400px',
                                maxWidth: '90vw',
                                padding: '20px'
                            }}
                        >
                            <Stack
                                flexDirection={'column'}
                                alignItems={'center'}
                                gap={'15px'}
                            >

                                <ContainerScroll height={'280px'}>
                                    <Stack gap={'20px'}>
                                        {customersSelected.map((item, index) => (
                                            <ItemEditCustomer
                                                key={item.id}
                                                index={index}
                                                customer={item}
                                                onChange={onChangueEditCustomer}

                                            />
                                        ))}

                                    </Stack>
                                </ContainerScroll>

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    actualizar
                                </Button>

                                <Button
                                    fullWidth
                                    onClick={toggleUpdate}
                                    variant="contained"
                                    color="error"
                                >
                                    Cancelar
                                </Button>

                            </Stack>

                        </Paper>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export { DataGridCustomers };

function HeaderTable({ toggleCreate, toggleDelet, toggleUpdate }) {
    return (
        <Box>
            <Stack
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'flex-end'}
                gap={'15px'}
                padding={'15px 15px 0px'}
            >
                <Button
                    onClick={toggleCreate}
                    color="primary"
                    size="small"
                    variant="contained"
                    endIcon={<AddIcon />}
                >
                    Nuevo cliente
                </Button>

                <Button
                    onClick={toggleUpdate}
                    color="info"
                    size="small"
                    variant="contained"
                >
                    Actualizar
                </Button>

                <Button
                    onClick={toggleDelet}
                    color="error"
                    size="small"
                    variant="contained"
                >
                    Eliminar
                </Button>
            </Stack>
        </Box>
    )
}

function ItemEditCustomer({ customer, index, onChange }) {
    return (
        <Paper sx={{ padding: '10px' }}>
            <Stack
                flexDirection={'column'}
                alignItems={'start'}
                gap={'15px'}
            >

                <Chip label={customer.cliente} color={'info'} />

                <TextField
                    fullWidth
                    required={true}
                    label={'RFC'}
                    value={customer.rfc}
                    onChange={(e) => onChange('rfc', index, e)}
                />

                <TextField
                    fullWidth
                    label={'Email'}
                    value={customer.email}
                    onChange={(e) => onChange('email', index, e)}
                />

                <TextField
                    fullWidth
                    label={'Telefono'}
                    value={customer.phone}
                    onChange={(e) => onChange('phone', index, e)}
                />

            </Stack>
        </Paper>
    )
}

export function ModalAddCustomer({ modal, toggleModal, createCustomer, updateCustomers }) {

    const [customer, setCustomer] = useState({ cliente: '', rfc: '', email: '', phone: '' });

    const createSubmit = (e) => {
        e.preventDefault();
        createCustomer(customer)
        toggleModal();
        setTimeout(() => {
            updateCustomers();
            setCustomer({ cliente: '', rfc: '', email: '', phone: '' });
        }, 1000)
    }

    return (
        <Modal open={modal}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                    width: '100vw',
                    paddingTop: '10%'

                }}>
                <form onSubmit={(e) => createSubmit(e)}>
                    <Paper
                        sx={{
                            width: '350px',
                            maxWidth: '90vw',
                            padding: '20px'
                        }}
                    >
                        <Stack
                            flexDirection={'column'}
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            gap={'15px'}
                        >

                            <TextField
                                fullWidth
                                required={true}
                                label={'Cliente'}
                                value={customer.cliente}
                                onChange={(e) => setCustomer({ ...customer, cliente: e.target.value })}
                            />

                            <TextField
                                fullWidth
                                required={true}
                                label={'RFC'}
                                value={customer.rfc}
                                onChange={(e) => setCustomer({ ...customer, rfc: e.target.value })}
                            />

                            <TextField
                                fullWidth
                                label={'Email'}
                                value={customer.email}
                                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                            />

                            <TextField
                                fullWidth
                                label={'Telefono'}
                                value={customer.phone}
                                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Registrar
                            </Button>

                            <Button
                                onClick={toggleModal}
                                fullWidth
                                variant="contained"
                                color="error"
                            >
                                Cancelar
                            </Button>

                        </Stack>

                    </Paper>
                </form>
            </Box>
        </Modal>
    )
}