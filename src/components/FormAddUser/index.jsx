import { Modal, Container, Box, Paper, Stack, Button, Fade, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { InputText } from "../InputText";
import { SelectSimple } from "../SelectSimple";

function FormAddUser({ dataUser, setDataUser, createUser, toggleForm, modal }) {

    const IsSmall = useMediaQuery('(max-width:550px)');

    return (
        <>
            <Modal open={modal.form}>
                <Fade in={modal.form}>
                    <Container
                        sx={{
                            display: 'flex',
                            placeContent: 'center',
                            placeItems: 'center',
                            padding:'20px'
                        }}
                    >
                        <Paper
                            elevation='4'
                            sx={{
                                padding: '20px'
                            }}
                        >
                            <form onSubmit={createUser}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: IsSmall? 'column' : 'row',
                                        justifyContent: 'center',
                                        gap: '10px',
                                    }}
                                >
                                    <Stack gap='10px' width={IsSmall? '100%': null}>
                                        <Stack flexDirection='column' alignItems='center'>
                                            <SelectSimple
                                                width={IsSmall? '100%': ''}
                                                title={'Rol'}
                                                value={dataUser.rol}
                                                options={['admin', 'developer', 'vigilante', 'maniobrista', 'reparador', 'lavador', 'gestor de calidad']}
                                                required={true}
                                                onChange={(e) => setDataUser({ ...dataUser, rol: e.target.value })}
                                            />

                                            <InputText
                                                width={IsSmall? '100%': ''}
                                                label="puesto"
                                                value={dataUser.position}
                                                required={true}
                                                onChangue={(e) => setDataUser({ ...dataUser, position: e.target.value })}
                                            />
                                        </Stack>

                                        <Stack 
                                         width={IsSmall? '100%': null}
                                        flexDirection='column' 
                                        gap='10px' 
                                        alignItems='center'>
                                            <InputText
                                                width={IsSmall? '100%': ''}
                                                label="nombres"
                                                value={dataUser.first_name}
                                                required={true}
                                                onChangue={(e) => setDataUser({ ...dataUser, first_name: e.target.value })}
                                            />

                                            <InputText
                                                width={IsSmall? '100%': ''}
                                                label="apellidos"
                                                value={dataUser.last_name}
                                                required={true}
                                                onChangue={(e) => setDataUser({ ...dataUser, last_name: e.target.value })}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Stack gap='10px' width={IsSmall? '100%': null} alignItems='center' sx={{ paddingTop:'10px'}}>
                                            <InputText
                                                width={IsSmall? '100%': ''}
                                               label="correo"
                                                value={dataUser.email}
                                                required={true}
                                                onChangue={(e) => setDataUser({ ...dataUser, email: e.target.value })}
                                            />

                                            <InputText
                                                width={IsSmall? '100%': ''}
                                                label="celular"
                                                value={dataUser.phone}
                                                required={true}
                                                onChangue={(e) => setDataUser({ ...dataUser, phone: e.target.value })}
                                            />

                                            <InputText 
                                                width={IsSmall? '100%': ''}
                                                type='password' 
                                                label="contraseña"
                                                value={dataUser.password}
                                                required={true}
                                                onChangue={(e) => setDataUser({ ...dataUser, password: e.target.value })}
                                            />

                                    </Stack>

                                </Box>

                                <Stack  gap='10px' marginTop='10px'>
                                    <Button
                                        onClick={toggleForm}
                                        fullWidth
                                        color="error"
                                        variant="contained">
                                        Cancelar
                                    </Button>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained">
                                        Registrar
                                    </Button>
                                </Stack>
                            </form>
                        </Paper>
                    </Container>
                </Fade>
            </Modal>
        </>
    );
}

export { FormAddUser };