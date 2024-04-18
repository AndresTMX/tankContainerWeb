import '../../main.css'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../Context/AuthContext';
import { Container, Box, Paper, Button, Typography, Fade, TextField } from "@mui/material";
import { TankContainerLogo, ImageContainersDecoration } from '../../resourcesLinks';
import { Toaster, toast } from 'sonner';

function Login() {

    const { logIn: initSession, logOut } = useContext(AuthContext);
    const [user, setUser] = useState({ email: '', password: '' })


    const submit = async (e) => {
        try {
            e.preventDefault()
            const { error } = await initSession(user.email, user.password);

            if (error) {
                throw new Error(error)
            }

        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <>

            <Toaster richColors position='top-center' />
            <Container
                maxWidth='xxl'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundImage: `url(${ImageContainersDecoration})`,
                    backgroundColor: '#025E73',
                    backgroundSize: 'cover',
                    objectFit: 'cover',
                    backgroundBlendMode: 'screen',
                    height: '100vh',
                    paddingTop: '5%'

                }}>


                <form
                    onSubmit={submit}>
                    <img
                        height='120px'
                        width='auto'
                        src={`${TankContainerLogo}`}
                        alt='logo' />
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '15px',
                            backgroundColor: 'withesmoke',
                            padding: '20px',
                            maxWidth: '350px',
                        }}
                        elevation={4}
                    >
                        <Typography variant="h6">
                            Inicio de sesion
                        </Typography>

                        <TextField
                            fullWidth
                            label='email'
                            width='250px'
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />

                        <TextField
                            fullWidth
                            type='password'
                            label='password'
                            width='250px'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />


                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                        >
                            Iniciar Sesión
                        </Button>

                    </Paper>
                </form>
            </Container>
        </>
    );
}

export { Login };