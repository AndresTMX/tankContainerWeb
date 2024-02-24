import { useState } from "react";
import { Toaster } from "sonner";
import { useNavigate, Outlet } from "react-router-dom";
import { Box, Tab, Tabs, Grid, Stack, Paper, Container, Button } from "@mui/material";
import { CustomTabPanel } from "../../components/CustomTabPanel";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
//components
import { GridBlock } from "../../containers/GridBlock";
//dataGrid
import { typesBloqueA, BloqueA, typesBloqueB, BloqueB, typesBloqueC, BloqueC, typesBloqueD, BloqueD, typesBloqueE, BloqueE } from "../../layoutData";

function Layout() {

    const movile = useMediaQuery('(max-width:850px)')
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigate = useNavigate()

    const bloque = 'a'

    const modal = true;

    return (
        <>

            <Toaster richColors position="top-center" />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'whitesmoke',
                    padding: '20px',
                    height:'100vh'
                }}>

                <Paper
                    elevation={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '10px',
                        gap: '50px',
                        border: 1,
                        borderColor: 'whitesmoke'

                    }}
                >

                    {/* CAJON SUPERIOR NFC/FCOJ */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '70px',
                                width: '250px',
                                backgroundColor: 'orange',
                                color: 'white'
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => navigate(`/ubicaciones/layout/${bloque}/${modal}`)}>
                                NFC / FCOJ
                            </Button>
                        </Box>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '5px' }}
                    >

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '220px',
                                width: '150px',
                                backgroundColor: 'gray',
                                color: 'white'
                            }}
                        >
                            {/* <strong>Relleno</strong> */}
                        </Box>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '40px',
                                        width: '80%',
                                        backgroundColor: 'orange',
                                        color: 'white',
                                        marginBottom: '1px'
                                    }}
                                >
                                    <strong>FCOJ / DYOU</strong>
                                </Box>

                                <div style={{ display: 'flex', flexDirection: 'row', }}>

                                    <div style={{ display: 'flex', flexDirection: 'column', width: '40px', gap: '3px' }}>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '40px',
                                                width: '100%',
                                                backgroundColor: 'gray',
                                                borderRight: '1',
                                                borderRightStyle: 'solid',
                                                borderColor: 'white',
                                                color: 'white',
                                            }}
                                        >
                                            <strong>2</strong>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '40px',
                                                width: '100%',
                                                backgroundColor: 'gray',
                                                borderRight: '1',
                                                borderRightStyle: 'solid',
                                                borderColor: 'white',
                                                color: 'white',
                                            }}
                                        >
                                            <strong>1</strong>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '40px',
                                                width: '100%',
                                                backgroundColor: 'gray',
                                                borderRight: '1',
                                                borderRightStyle: 'solid',
                                                borderColor: 'white',
                                                color: 'white',
                                            }}
                                        >
                                            {/* de */}
                                        </Box>

                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', width: '130px', gap: '3px' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '40px',
                                                width: '100%',
                                                backgroundColor: 'orange',
                                                color: 'white'
                                            }}
                                        >
                                            <strong>FCOJ / DYOU</strong>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '40px',
                                                width: '100%',
                                                backgroundColor: 'orange',
                                                color: 'white'
                                            }}
                                        >
                                            <strong>FCOJ / DYOU</strong>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '40px',
                                                width: '220px',
                                                backgroundColor: 'orange',
                                                color: 'white',
                                                borderBottom: '2px',
                                                borderColor: 'white',
                                                borderBottomStyle: 'solid'
                                            }}
                                        >
                                            <strong>tequila / aceite</strong>
                                        </Box>
                                    </div>

                                </div>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '150px',
                                        width: '170px',
                                        backgroundColor: 'gray',
                                        color: 'white'
                                    }}
                                >
                                    <strong style={{ transform: 'rotate(-90deg)' }}>BAHÍA-2</strong>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '150px',
                                        width: '170px',
                                        backgroundColor: 'gray',
                                        borderTop: '1',
                                        borderColor: 'whitesmoke',
                                        borderTopStyle: 'solid',
                                        color: 'white',
                                    }}
                                >
                                    <strong style={{ transform: 'rotate(-90deg)' }}>BAHÍA-1</strong>
                                </Box>
                            </div>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100px',
                                    width: '50px',
                                    backgroundColor: 'gray',
                                    color: 'white'
                                }}
                            >
                            </Box>
                        </div>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100px',
                                width: '50px',
                                backgroundColor: 'orange',
                                color: 'white'
                            }}
                        >
                            <strong style={{ transform: 'rotate(-90deg)' }}>Proceso</strong>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100px',
                                width: '50px',
                                backgroundColor: 'orange',
                                color: 'white'
                            }}
                        >
                            <strong style={{ transform: 'rotate(-90deg)' }}>Lavado</strong>
                        </Box>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '250px',
                                    width: '50px',
                                    backgroundColor: 'orange',
                                    color: 'white'
                                }}
                            >
                                <strong style={{ transform: 'rotate(-90deg)' }}>Tequila Aceite</strong>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '250px',
                                    width: '50px',
                                    backgroundColor: 'orange',
                                    color: 'white'
                                }}
                            >
                                <strong style={{ transform: 'rotate(-90deg)' }}>Prelavado</strong>
                            </Box>
                        </div>

                    </div>

                </Paper>
            </Box>

            <Outlet />

        </>
    );
}

export { Layout };

