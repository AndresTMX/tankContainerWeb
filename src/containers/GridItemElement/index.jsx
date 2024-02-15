import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Button, Stack, Chip, IconButton, Typography,  } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import InfoIcon from '@mui/icons-material/Info';
import { dateInText } from "../../Helpers/date"
import AddIcon from '@mui/icons-material/Add';

export function GridItemElement({ sizeItem, item, tipos }) {

    const empty = item.numero_tanque ? false : true;
    const tablet = useMediaQuery('(max-width:980px)')
    const movile = useMediaQuery('(max-width:770px)')
    const navigate = useNavigate()

    const serializado = JSON.stringify({...item, tipos})

    const MoreInfo = () => {
        navigate(`${encodeURIComponent(serializado)}`)
    }

    const assignBox = () => {
        navigate(`/ubicaciones/asignacion/${encodeURIComponent(serializado)}`)
    }

    return (
        <>
            <Grid item xs={sizeItem} >

                {!empty && <Paper
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
                        {!movile && <Typography
                            fontSize={tablet ? '12px' : '14px'}
                            fontWeight='700'
                        >
                            {item.tipo + ' ' + item.numero_tanque}
                        </Typography>}


                        {!tablet && <Typography
                            variant='caption'
                            fontSize='12px'
                        >
                            {dateInText(item.created_at)}
                        </Typography>}
                    </Stack>


                    <Stack flexDirection='row' alignItems='center' justifyContent='space-between' gap='5px'>
                        {!movile && <Chip sx={{ fontSize: '10px' }} color="warning" size="small" label={item.especificacion} />}
                        {movile && <Typography
                            fontSize='12px'
                            fontWeight='700'
                        >
                            {item.numero_tanque}
                        </Typography>}

                        <IconButton
                            size='small'
                            sx={{ color: 'white' }}
                            onClick={MoreInfo}
                        >
                            <InfoIcon />
                        </IconButton>
                    </Stack>
                </Paper>}

                {empty && <Paper
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

                    {!movile && <Typography
                        color='gray'
                        fontSize={tablet ? '11px' : '14px'}
                        fontWeight='700'
                    >
                        Espacio disponible
                    </Typography>}

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