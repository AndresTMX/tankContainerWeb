import { Container, Box, Paper, Button, Typography, Stack, IconButton, Divider, Chip } from "@mui/material";
import { DetailsUser } from "../../components/DetailsUser";
import { LoadingState } from '../../components/LoadingState'
import { Notification } from "../../components/Notification";
import { DataGridCustomers } from "../../components/DataGridCustomers";
import { ContainerScroll } from "../../components/ContainerScroll";
//forms
import { FormAddUser } from "../../components/FormAddUser";
import { FormAddTransporters } from "../../components/FormAddTransporters";
//icons
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
//hooks
import { useCreateUser } from "../../Hooks/usersManagment/useCreateUser";
import { useGetUsers } from "../../Hooks/usersManagment/useGetUsers";
import { useFormTransporter } from "../../Hooks/useFormTransporter";
import { useGetTransporters } from "../../Hooks/transportersManagment/useGetTransporters";
import { useDeleteTransporter } from "../../Hooks/transportersManagment/useDeleteTransporter";
//helpers
import { dateMXFormat } from "../../Helpers/date";

function PageAdmin() {

    const { dataUser, setDataUser, createUser, toggleForm, modal } = useCreateUser();
    const { transporter, setTransporter, addTransporter, transporterModal, toggleFormTransporter } = useFormTransporter();
    const { transporters, updateAllTransports } = useGetTransporters();
    const { deleteTransporter } = useDeleteTransporter();
    const { users, updateUsers } = useGetUsers();

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    paddingTop: '50px',
                    paddingBottom: '50px'
                }}>

                {/* vista de todos los usuraios */}
                <Box sx={{ bgcolor: 'whitesmoke', padding: '20px', borderRadius: '4px' }}>

                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="subtitle2">Usuarios registrados</Typography>
                        <Stack flexDirection='row' gap='10px'>
                            <IconButton onClick={toggleForm}>
                                <AddIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={updateUsers}>
                                <UpdateIcon color="primary" />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Divider flexItem orientation="horizontal" />

                    <ContainerScroll height={'250px'}>
                        <Stack gap={'10px'}>
                            {users.map((user) => (
                                <DetailsUser key={user.first_name} user={user} />
                            ))}
                        </Stack>
                    </ContainerScroll>
                </Box>

                {/* vista de todas las lineas transportistas */}
                <Box sx={{ bgcolor: 'whitesmoke', padding: '20px', borderRadius: '4px' }}>
                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="subtitle2">Lineas transportistas</Typography>
                        <Stack flexDirection='row' gap='10px'>
                            <IconButton onClick={toggleFormTransporter}>
                                <AddIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={updateAllTransports}>
                                <UpdateIcon color="primary" />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Divider flexItem orientation="horizontal" />



                    <ContainerScroll height={'200px'}>
                        <Stack gap='10px'>
                            {transporters.map((item) => (
                                <Paper
                                    sx={{ padding: '5px' }}
                                    key={item.id}>
                                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                                        <Typography variant="subtitle2">{item.name}</Typography>

                                        <div>
                                            <Chip
                                                size="small"
                                                color='info'
                                                icon={<EventAvailableIcon />}
                                                label={`${dateMXFormat(item.created_at)}`}
                                            />
                                            <IconButton
                                                color="error"
                                                onClick={() => deleteTransporter(item.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                    </ContainerScroll>

                </Box>

                <DataGridCustomers />

            </Container>

            <FormAddUser
                dataUser={dataUser}
                setDataUser={setDataUser}
                createUser={createUser}
                toggleForm={toggleForm}
                modal={modal}
            />

            <FormAddTransporters
                transporter={transporter}
                setTransporter={setTransporter}
                addTransporter={addTransporter}
                transporterModal={transporterModal}
                toggleModal={toggleFormTransporter}
            />

            <Notification />

            <LoadingState duration={1000} />
        </>
    );
}

export { PageAdmin };