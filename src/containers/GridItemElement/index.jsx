import { useNavigate } from "react-router-dom";
import { Grid, Paper, Button, Stack, Chip, IconButton, Typography, Tooltip } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import InfoIcon from '@mui/icons-material/Info';
import { dateInText } from "../../Helpers/date"
import AddIcon from '@mui/icons-material/Add';
import { GoContainer } from "react-icons/go";

export function GridItemElement({ sizeItem, item, tipos }) {

    const empty = item.numero_tanque ? false : true;
    const desktop = useMediaQuery('(min-width:1070px)')
    const tablet = useMediaQuery('(max-width:1070px)')
    const movile = useMediaQuery('(max-width:700px)')

    const navigate = useNavigate()

    const serializado = JSON.stringify({ ...item, tipos })

    const MoreInfo = () => {
        navigate(`/ubicaciones/layout/info/${encodeURIComponent(serializado)}`)
    }

    const assignBox = () => {
        navigate(`/ubicaciones/layout/asignacion/${encodeURIComponent(serializado)}`)
    }

    return (
        <>
            <Grid item xs={sizeItem}>

                {(!empty && desktop) && <Paper
                    elevation={3}
                    sx={{
                        height: '100%',
                        maxWidth: '170px',
                        width: '100%',
                        background: '#0288d1',
                        padding: '10px',
                        border: 1,
                        borderColor: '#e5e7eb',
                        borderStyle: 'solid',
                        color: 'white'
                    }}>

                    <Stack flexDirection='column' alignItems='start' gap='5px'>
                        <Typography
                            fontSize={tablet ? '12px' : '14px'}
                            fontWeight='700'
                        >
                            {item.tipo + ' ' + item.numero_tanque}
                        </Typography>


                        <Typography
                            variant='caption'
                            fontSize='12px'
                        >
                            {dateInText(item.created_at)}
                        </Typography>

                    </Stack>


                    <Stack flexDirection='row' alignItems='center' justifyContent='space-between' gap='5px'>
                        <Chip sx={{ fontSize: '10px' }} color="warning" size="small" label={item.especificacion} />

                        <IconButton
                            size='small'
                            sx={{ color: 'white' }}
                            onClick={MoreInfo}
                        >
                            <InfoIcon />
                        </IconButton>

                    </Stack>
                </Paper>}

                {(tablet && !movile) &&
                    <GridItemMedium
                        empty={empty}
                        item={item}
                        assignBox={assignBox}
                        MoreInfo={MoreInfo} />
                }

                {(movile) &&
                    <GridItemSmall
                        empty={empty}
                        item={item}
                        assignBox={assignBox}
                        MoreInfo={MoreInfo} />
                }

                {(empty && desktop) && <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        height: '100%',
                        minHeight: !tablet ? '101px' : !movile ? '74px' : '55px',
                        maxWidth: '170px',
                        width: '100%',
                        background: 'white',
                        padding: '10px',
                        border: 1,
                        borderColor: '#e5e7eb',
                        borderStyle: 'solid',
                        gap: '5px'
                    }}>

                    <Typography
                        color='gray'
                        fontSize={tablet ? '11px' : '14px'}
                        fontWeight='700'
                    >
                        Espacio disponible
                    </Typography>

                    <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ fontSize: '11px' }}
                        onClick={assignBox}
                        endIcon={<AddIcon />}
                    >
                        Asignar
                    </Button>


                </Paper>}

            </Grid>

        </>
    )
}


function GridItemMedium({ empty, item, assignBox, MoreInfo }) {
    return (
        <>

            {!empty &&
                <Paper
                    elevation={3}
                    sx={{
                        height: '100%',
                        maxWidth: '170px',
                        width: '100%',
                        background: '#0288d1',
                        padding: '10px',
                        border: 1,
                        borderColor: '#e5e7eb',
                        borderStyle: 'solid',
                        color: 'white'
                    }}>

                    <Stack
                        justifyContent='space-between'
                        flexDirection='row'
                        alignItems='center'
                        gap='5px'
                    >

                        <Typography
                            fontSize='12px'
                            fontWeight='700'
                        >
                            {item.numero_tanque}
                        </Typography>


                        <IconButton
                            size='small'
                            sx={{ color: 'white' }}
                            onClick={MoreInfo}
                        >
                            <InfoIcon />
                        </IconButton>

                    </Stack>
                </Paper>
            }

            {empty &&
                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        height: '56px',
                        maxWidth: '170px',
                        width: '100%',
                        padding: '10px',
                        border: 1,
                        borderColor: '#e5e7eb',
                        borderStyle: 'solid',
                        color: 'white',
                        alignItems: 'center'
                    }}>

                    <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ fontSize: '11px' }}
                        onClick={assignBox}
                        endIcon={<AddIcon />}
                    >
                        Asignar
                    </Button>
                </Paper>
            }

        </>
    )
}

function GridItemSmall({ empty, item, assignBox, MoreInfo }) {
    return (
        <>

            {!empty &&
                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        background: '#0288d1',
                        padding: '5px',
                        color: 'white',
                        '&:hover': {
                            transform: 'scale(1.2)'
                        },
                    }}>


                    <Tooltip title={item.numero_tanque} placement="top">
                        <IconButton
                            size='small'
                            sx={{ color: 'white' }}
                            onClick={MoreInfo}
                        >
                            <GoContainer />
                        </IconButton>
                    </Tooltip>

                </Paper>
            }

            {empty &&
                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        padding: '5px',
                        width: '100%',
                        color: 'white',
                        '&:hover': {
                            transform: 'scale(1.2)'
                        },
                    }}>

                    <IconButton
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={assignBox}
                    >
                        <GoContainer />
                    </IconButton>
                </Paper>
            }

        </>
    )
}