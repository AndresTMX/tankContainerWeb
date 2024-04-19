import { Box, Paper, Chip, Stack, TextField } from "@mui/material";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useVigilanciaContext } from "../../Context/VigilanciaContext";
//icons
import SearchIcon from '@mui/icons-material/Search';
//libraries
import { Toaster, toast } from "sonner";

export function Vigilancia() {

    const movile = useMediaQuery("(max-width:700px)");
    const navigate = useNavigate();

    const { searchValue, handleKeyPress, onChangeClear, pathname } = useVigilanciaContext();

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
                <Stack alignItems='center' width='100%' gap='10px' maxWidth='900px'>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: movile ? 'column' : 'row',
                            flexFlow: movile ? 'column-reverse' : '',
                            justifyContent: 'space-between',
                            alignItems: movile ? 'start' : 'center',
                            bgcolor: 'whitesmoke',
                            border: '1px',
                            borderColor: '#E4E4E7',
                            borderStyle: 'solid',
                            maxWidth: '900px',
                            padding: '15px',
                            width: '96vw',
                            gap: '10px',
                        }}>

                        <Stack flexDirection='row' gap='10px' alignItems='center' width={movile ? '100%' : 'auto'}>
                            <Chip
                                label='entradas'
                                color={pathname.includes('entradas') ? 'info' : 'default'}
                                onClick={() => navigate('entradas')}
                            />
                            <Chip
                                label='salidas'
                                color={pathname.includes('salidas') ? 'info' : 'default'}
                                onClick={() => navigate('salidas')}
                            />

                        </Stack>

                        <TextField
                            sx={{ width: movile ? '80vw' : 'auto' }}
                            size='small'
                            variant='outlined'
                            name="searchProgram"
                            onKeyDown={handleKeyPress}
                            onChange={onChangeClear}
                            inputRef={searchValue}
                            InputProps={{
                                endAdornment: <SearchIcon />
                            }}
                        />

                    </Paper>

                    <Outlet />

                </Stack >
            </Box >

            <Toaster richColors position='top-center' />
        </>
    );
}

