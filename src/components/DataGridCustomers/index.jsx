import { useState } from "react";
import { Box, Button, IconButton, Stack, Modal, Paper, TextField, Typography } from "@mui/material";
import {ContainerScroll} from "../../components/ContainerScroll"
import { DataGrid } from "@mui/x-data-grid";
import { useCustomers } from "../../Hooks/Customers/useCustomers";
//icons
import AddIcon from '@mui/icons-material/Add';

function DataGridCustomers() {

    const { customers, rowsCustomers, loading, error, updateCustomers, createCustomer, deleteCustomer, updateCustomer } = useCustomers();
    const [rowsModel, setRowsModel] = useState([])
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
        updateCustomers();
        toggleCreate();
    }

    const deleteSubmit = () => {
        deleteCustomer(rowsModel);
        toggleDelet();
        updateCustomers();
    }

    const updateSubmit = () => {
        updateCustomer(customer)
    }

    const customersSelected = customers.filter((item) => rowsModel.includes(item.id));

    return (
        <>
            <Box >
                <DataGrid
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
                                width: '350px',
                                maxWidth: '90vw',
                                padding: '20px'
                            }}
                        >
                            <Stack
                                flexDirection={'column'}
                                alignItems={'center'}
                                gap={'15px'}
                            >

                                <ContainerScroll height={'200px'}>

                                    {customersSelected.map((item, index) => (
                                        <ItemEditCustomer
                                        key={item.id}
                                        index={index}
                                        customer={item}

                                        />
                                    ))}

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

function ItemEditCustomer({ customer, index, }) {
    return (
        <Stack
            flexDirection={'column'}
            alignItems={'center'}
            gap={'15px'}
        >

            <TextField
                fullWidth
                required={true}
                label={'RFC'}
                value={customer.rfc}
                // onChange={(e) => setCustomer({ ...customer, rfc: e.target.value })}
            />

            <TextField
                fullWidth
                label={'Email'}
                value={customer.email}
                // onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            />

            <TextField
                fullWidth
                label={'Telefono'}
                value={customer.phone}
                // onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            />

        </Stack>
    )
}