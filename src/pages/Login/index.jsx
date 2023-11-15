import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import '../../main.css'
import { useState, useEffect } from "react";
import { Container, Box, Paper, Button, Typography, Fade } from "@mui/material";
import { InputText } from "../../components/InputText";
import { NavLink } from 'react-router-dom';

function Login() {
    
    const [user, setUser] = useState({ email: '', password: '' })
    const [animate, setAnimate] = useState(false)
    const { logIn, logOut } = useContext(AuthContext);


    useEffect(() => {
        setTimeout(() => {
            setAnimate(true)
        },400)
    }, [])


    const submit = (e) => {
        e.preventDefault()
        logIn(user.email, user.password)
        console.log(user.email, user.password)

    }

    return (
        <>
            <Container
            maxWidth='xxl'
            sx={{
                backgroundImage:'url(https://i.postimg.cc/xdTy9LHV/caja-contenedores-industriales-negocios-logisticos-importacion-exportacion.jpg)',
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
                        src="src/assets/TankContainer.png" 
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

                            <NavLink 
                            to='/vigilancia'
                            style={{width:'100%'}}
                            >
                                 <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                            >
                                Iniciar Sesión
                            </Button>
                            </NavLink>
                           
                        </Paper>
                    </form>
                    </Fade>
                </Box>
            </Container>
        </>
    );
}

export { Login };