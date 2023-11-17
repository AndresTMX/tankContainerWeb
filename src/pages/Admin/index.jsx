import { Container, Box, Paper, Button, Typography, Stack, IconButton, Divider, Chip } from "@mui/material";
import { DetailsUser } from "../../components/DetailsUser";
import { LoadingState } from '../../components/LoadingState'
import { Notification } from "../../components/Notification";
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
//helpers
import { dateMXFormat } from "../../Helpers/date";

function PageAdmin() {

    const { dataUser, setDataUser, createUser, toggleForm, modal } = useCreateUser();
    const { transporter, setTransporter, addTransporter, transporterModal, toggleFormTransporter } = useFormTransporter();
    const { transporters, updateAllTransports } = useGetTransporters();
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
                <Box>

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

                    <Box>
                        {users.map((user) => (
                            <DetailsUser key={user.first_name} user={user} />
                        ))}
                    </Box>
                </Box>

                {/* vista de todas las lineas transportistas */}
                <Box>
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


                    
                    <Stack spacing='5px'>
                        {transporters.map((item) => (
                            <Paper 
                            elevation={2}
                            sx={{padding:'5px'}}
                            key={item.id}>
                                <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                                    <Typography variant="subtitle2">{item.name}</Typography>

                                   <div>
                                   <Chip 
                                    size="small"
                                    onClick={()=> {}}
                                    color='info' 
                                    icon={<EventAvailableIcon/>}
                                    label={`${dateMXFormat(item.created_at)}`} 
                                    />
                                    <IconButton
                                    color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                   </div>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>

                </Box>

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