import { useState } from "react";
import { Box, Stack, Paper, Chip, TextField, IconButton, Menu, MenuItem } from "@mui/material";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContextProgramacion } from "../../Context/ProgramacionContext";
//router
import { Outlet, useLocation, useNavigate } from "react-router-dom";
//icons
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TuneIcon from '@mui/icons-material/Tune';
//libraries
import { Toaster } from "sonner";

function Programacion() {

    const movile = useMediaQuery('(max-width:540px)')
    const small = useMediaQuery('(max-width:760px)')

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { states, actions } = useContextProgramacion();

    const { handleKeyPress, onChangeClear, setRegisters, handleAssending, handleStatus } = actions;
    const { searchValue, statusField, asscending } = states;

    const [menuFilter, setMenuFilter] = useState(false);
    const [menuOrder, setMenuOrder] = useState(false);


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
                                label='solicitudes'
                                color={pathname === '/programacion/solicitudes' ? 'warning' : 'default'}
                                onClick={() => {
                                    setRegisters([])
                                    navigate('solicitudes')
                                }} />
                            <Chip
                                label='programados'
                                color={pathname === '/programacion/programados' ? 'info' : 'default'}
                                onClick={() => {
                                    setRegisters([])
                                    navigate('programados')
                                }} />

                            {pathname.includes('solicitudes') && <div>
                                <IconButton
                                    id="basic-button"
                                    aria-controls={menuFilter ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={menuFilter ? 'true' : undefined}
                                    onClick={(e) => setMenuFilter(e.currentTarget)}
                                >
                                    <FilterAltIcon />
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={menuFilter}
                                    open={menuFilter}
                                    onClose={() => setMenuFilter(false)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem
                                        style={{ color: `${statusField === 'por confirmar' ? '#0092ba' : ''}`, fontWeight: `${statusField === 'por confirmar' ? 500 : ''}` }}
                                        onClick={() => handleStatus('por confirmar', () => setMenuFilter(false))}>
                                        por confirmar
                                    </MenuItem>
                                    <MenuItem
                                        style={{ color: `${statusField != 'por confirmar' ? '#0092ba' : ''}`, fontWeight: `${statusField != 'por confirmar' ? 500 : ''}` }}
                                        onClick={() => handleStatus('confirmada', () => setMenuFilter(false))}>
                                        confirmadas
                                    </MenuItem>
                                </Menu>
                                {!small && <span style={{ fontSize: '12px', fontWeight: '500' }} >{statusField != 'confirmada' ? 'por confirmar' : 'confirmadas'}</span>}
                            </div>}

                            <div>
                                <IconButton
                                    id="tune-button"
                                    aria-controls={menuOrder ? 'tune-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={menuOrder ? 'true' : undefined}
                                    onClick={(e) => setMenuOrder(e.currentTarget)}
                                >
                                    <TuneIcon />
                                </IconButton>
                                <Menu
                                    id="tune-menu"
                                    anchorEl={menuOrder}
                                    open={menuOrder}
                                    onClose={() => setMenuOrder(false)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem
                                        style={{ color: `${asscending ? '#0092ba' : ''}`, fontWeight: `${asscending ? 500 : ''}` }}
                                        onClick={() => handleAssending(() => setMenuOrder(false))}>
                                        ascendente
                                    </MenuItem>
                                    <MenuItem
                                        style={{ color: `${!asscending ? '#0092ba' : ''}`, fontWeight: `${!asscending ? 500 : ''}` }}
                                        onClick={() => handleAssending(() => setMenuOrder(false))}>
                                        descendente
                                    </MenuItem>
                                </Menu>
                                {!small && <span style={{ fontSize: '12px', fontWeight: '500' }} >{asscending ? 'ascendente' : 'descendente'}</span>}
                            </div>


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

export { Programacion };
