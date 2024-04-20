import { Box, Stack, Paper, Chip, TextField, } from "@mui/material";
//hooks
import { useNavigate, Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import SearchIcon from '@mui/icons-material/Search';
//context
import { useCalidadContext } from "../../../Context/CalidadContext";

export function Prelavados() {

    const { pathname, searchValue, handleKeyPress, onChangeClear } = useCalidadContext();
    const IsSmall = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
            <Stack alignItems='center' width='100%' gap='10px' maxWidth='900px' >

                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: IsSmall ? 'column' : 'row',
                        flexFlow: IsSmall ? 'column-reverse' : '',
                        justifyContent: 'space-between',
                        alignItems: IsSmall ? 'start' : 'center',
                        bgcolor: 'whitesmoke',
                        border: '1px',
                        borderColor: '#E4E4E7',
                        borderStyle: 'solid',
                        maxWidth: '900px',
                        padding: '15px',
                        width: '96vw',
                        gap: '10px',
                    }}
                >
                    <Stack flexDirection='row' gap='10px' width={IsSmall ? '100%' : 'auto'}>
                        <Chip
                            label={'pendientes'}
                            color={pathname.includes('pendientes') ? 'warning' : 'default'}
                            onClick={() => navigate('pendientes')}
                        />

                        <Chip
                            label={'realizados'}
                            color={pathname.includes('realizados') ? 'success' : 'default'}
                            onClick={() => navigate('realizados')}
                        />
                    </Stack>

                    <TextField
                        sx={{ width: IsSmall ? '80vw' : 'auto' }}
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

            </Stack>
        </Box>
    )
}