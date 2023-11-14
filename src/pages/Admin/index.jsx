import { Container, Box, Paper, Button, Typography, Stack, IconButton, Divider } from "@mui/material";
import { SelectSimple } from '../../components/SelectSimple';
import { InputText } from "../../components/InputText";
import { DetailsUser } from "../../components/DetailsUser";
import { LoadingState } from '../../components/LoadingState'
import { Notification } from "../../components/Notification";
//icons
import UpdateIcon from '@mui/icons-material/Update';
//hooks
import { useCreateUser } from "../../Hooks/usersManagment/useCreateUser";
import { useGetUsers } from "../../Hooks/usersManagment/useGetUsers";

function PageAdmin() {

    const { dataUser, setDataUser, createUser } = useCreateUser();
    const { users, updateUsers } = useGetUsers()

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>

                {/* vista de crear un usuario */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        gap: '10px'
                    }}

                >
                    <Stack gap='10px'>
                        <Typography variant="subtitle2">Crear nuevo usuario</Typography>
                        <Divider flexItem orientation="horizontal" />
                    </Stack>


                    <form onSubmit={createUser}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                gap: '10px',
                            }}
                        >
                            <Stack gap='10px'>
                                <Stack flexDirection='column' gap='10px' alignItems='center'>
                                    <SelectSimple
                                        title={'Rol'}
                                        value={dataUser.rol}
                                        options={['admin', 'developer', 'vigilante', 'Maniobrista', 'Reparador', 'Lavador', 'Gestor de calidad']}
                                        required={true}
                                        onChange={(e) => setDataUser({ ...dataUser, rol: e.target.value })}
                                    />

                                    <InputText
                                        label="puesto"
                                        value={dataUser.position}
                                        required={true}
                                        onChangue={(e) => setDataUser({ ...dataUser, position: e.target.value })}
                                    />
                                </Stack>

                                <Stack flexDirection='column' gap='10px' alignItems='center'>
                                    <InputText
                                        label="nombres"
                                        value={dataUser.first_name}
                                        required={true}
                                        onChangue={(e) => setDataUser({ ...dataUser, first_name: e.target.value })}
                                    />

                                    <InputText
                                        label="apellidos"
                                        value={dataUser.last_name}
                                        required={true}
                                        onChangue={(e) => setDataUser({ ...dataUser, last_name: e.target.value })}
                                    />
                                </Stack>
                            </Stack>

                            <Stack gap='10px'>
                                <Stack flexDirection='column' gap='10px' alignItems='center'>
                                    <InputText label="correo"
                                        value={dataUser.email}
                                        required={true}
                                        onChangue={(e) => setDataUser({ ...dataUser, email: e.target.value })}
                                    />

                                    <InputText
                                        label="celular"
                                        value={dataUser.phone}
                                        required={true}
                                        onChangue={(e) => setDataUser({ ...dataUser, phone: e.target.value })}
                                    />

                                </Stack>

                                <Stack flexDirection='column' gap='10px' alignItems='center'>

                                    <InputText type='password' label="contraseña"
                                        value={dataUser.password}
                                        required={true}
                                        onChangue={(e) => setDataUser({ ...dataUser, password: e.target.value })}
                                    />

                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained">
                                        Registrar</Button>

                                </Stack>

                            </Stack>

                        </Box>
                    </form>
                </Box>

                {/* vista de todos los usuraios */}
                <Box>

                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="subtitle2">Usuarios registrados</Typography>
                        <IconButton onClick={updateUsers}>
                            <UpdateIcon color="primary" />
                        </IconButton>
                    </Stack>
                    <Divider flexItem orientation="horizontal" />

                    <Box>
                        {users.map((user) => (
                            <DetailsUser user={user} />
                        ))}
                    </Box>
                </Box>


            </Container>

            <Notification />

            <LoadingState duration={1000} />
        </>
    );
}

export { PageAdmin };