import { Toaster } from "sonner";
import { useNavigate, Outlet } from "react-router-dom";
import { Box, Paper,} from "@mui/material";
//dataGrid
import { typesBloqueA, BloqueA, typesBloqueB, BloqueB, typesBloqueC, BloqueC, typesBloqueD, BloqueD, typesBloqueE, BloqueE } from "../../layoutData";

function Layout() {

    const navigate = useNavigate()
    const modal = true;

    return (
        <>

            <Toaster richColors position="top-center" />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent:'center',
                    backgroundColor: 'whitesmoke',
                    padding: '20px',
                    height: '93vh'
                }}>

                <Paper
                    elevation={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '10px',
                        border: 1,
                        borderColor: 'whitesmoke',

                    }}
                >

                    {/* CAJON SUPERIOR NFC/FCOJ */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Box
                            onClick={() => navigate(`/ubicaciones/layout/${BloqueA[0].bloque}/${modal}`)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '70px',
                                width: '250px',
                                backgroundColor: 'orange',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >

                            <strong style={{ fontSize: '15px' }} > NFC / FCOJ</strong>

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
                                    onClick={() => navigate(`/ubicaciones/layout/${BloqueB[0].bloque}/${modal}`)}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '40px',
                                        width: '80%',
                                        backgroundColor: '#c23092',
                                        color: 'white',
                                        marginBottom: '1px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <strong style={{ fontSize: '10px' }} >FCOJ / DYOU (NFC/FCO)</strong>

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
                                            onClick={() => navigate(`/ubicaciones/layout/${BloqueB[0].bloque}/${modal}`)}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '40px',
                                                width: '100%',
                                                backgroundColor: '#c23092',
                                                color: 'white',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <strong style={{ fontSize: '10px' }} >FCOJ / DYOU (NFC/FCO)</strong>
                                        </Box>

                                        <Box
                                            onClick={() => navigate(`/ubicaciones/layout/${BloqueB[0].bloque}/${modal}`)}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '40px',
                                                width: '100%',
                                                backgroundColor: '#c23092',
                                                color: 'white',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <strong style={{ fontSize: '10px' }} >FCOJ / DYOU (NFC/FCO)</strong>
                                        </Box>

                                        <Box
                                            onClick={() => navigate(`/ubicaciones/layout/${BloqueC[0].bloque}/${modal}`)}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '40px',
                                                width: '220px',
                                                backgroundColor: '#39a028',
                                                color: 'white',
                                                borderBottom: '2px',
                                                borderColor: 'white',
                                                borderBottomStyle: 'solid',
                                                cursor: 'pointer'
                                            }}
                                        >

                                            <strong>TEQUILA / ACEITE</strong>
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
                            onClick={() => navigate(`/ubicaciones/layout/${BloqueE[0].bloque}/${modal}`)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100px',
                                width: '50px',
                                backgroundColor: '#ffc71a',
                                color: 'white',
                                cursor:'pointer'
                            }}
                        >
                            <strong style={{ transform: 'rotate(-90deg)', fontSize: '15px', textAlign: 'center' }}>PROCESO</strong>
                        </Box>

                        <Box
                            onClick={() => navigate(`/ubicaciones/layout/${BloqueD[0].bloque}/${modal}`)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100px',
                                width: '50px',
                                backgroundColor: '#3788d8',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            <strong style={{ transform: 'rotate(-90deg)', fontSize: '11px', textAlign: 'center' }}>PRELAVADO / LAVADO</strong>

                        </Box>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', }}>
                            <Box
                                onClick={() => navigate(`/ubicaciones/layout/${BloqueC[0].bloque}/${modal}`)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '250px',
                                    width: '50px',
                                    backgroundColor: '#39a028',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >

                                <strong style={{ transform: 'rotate(-90deg)', fontSize: '15px', textAlign: 'center', width: '150px' }}>TEQUILA / ACEITE</strong>

                            </Box>

                            <Box
                                onClick={() => navigate(`/ubicaciones/layout/${BloqueD[0].bloque}/${modal}`)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '250px',
                                    width: '50px',
                                    backgroundColor: '#3788d8',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <strong style={{ transform: 'rotate(-90deg)', fontSize: '15px', textAlign: 'center', width: '160px' }}>PRELAVADO / LAVADO</strong>
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

