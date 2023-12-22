import '../../main.css'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../Context/AuthContext';
import { Container, Box, Paper, Button, Typography, Fade } from "@mui/material";
import { InputText } from "../../components/InputText";
import { TankContainerLogo, ImageContainersDecoration } from '../../resourcesLinks';

function Login() {
    
    const { logIn:initSession, logOut } = useContext(AuthContext);
    const [user, setUser] = useState({ email: '', password: '' })
    const [animate, setAnimate] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setAnimate(true)
        },400)
    }, [])


    const submit = async(e) => {
        e.preventDefault()
        const {data, error} = await initSession(user.email, user.password)
    }

    return (
        <>
            <Container
            maxWidth='xxl'
            sx={{
                backgroundImage:`url(${ImageContainersDecoration})`,
                backgroundColor:'#025E73',
                backgroundSize: 'cover',
                objectFit:'cover',
                backgroundBlendMode:'screen'
            }}
            >
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent:'center',
                    alignItems:'center',
                    minHeight:'100vh',
                }}
                >
                    <Fade 
                    in={animate}
                    timeout={500}
                    >
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
                                alignItems:'center',
                                gap: '15px',
                                backgroundColor: 'withesmoke',
                                padding:'20px',
                                maxWidth:'350px',
                            }}
                            elevation={4}
                        >
                            <Typography variant="h6">
                                Inicio de sesion
                            </Typography>

                            <InputText
                                label='email'
                                width='250px'
                                value={user.email}
                                onChangue={(e)=> setUser({...user, email: e.target.value})}
                            />

                            <InputText
                                type='password'
                                label='password'
                                width='250px'
                                value={user.password}
                                onChangue={(e)=> setUser({...user, password: e.target.value})}
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
                    </Fade>
                </Box>
            </Container>
        </>
    );
}

export { Login };