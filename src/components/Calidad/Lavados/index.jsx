import { Box, Stack, Paper, Chip, TextField, Menu, MenuItem, IconButton, Typography, } from "@mui/material";
//hooks
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

//context
import { useCalidadContext } from "../../../Context/CalidadContext";

export function Lavados() {

    const { pathname, searchValue, handleKeyPress, onChangeClear } = useCalidadContext();
    const IsSmall = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate();

    const [filter, setFilter] = useState('pendientes');
    const [menu, setMenu] = useState(false);

    const handleFilter = (newFilter) => {
        setMenu(false)
        setFilter(newFilter)
        navigate(newFilter)
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
            <Stack alignItems='center' width='100%' gap='10px' maxWidth='900px' >

                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: 'whitesmoke',
                        border: '1px',
                        borderColor: '#E4E4E7',
                        borderStyle: 'solid',
                        maxWidth: '900px',
                        padding: '15px',
                        width: '96vw',
                        gap: '5px',
                    }}
                >

                    <Stack flexDirection='row' alignItems='center' gap='2px' >
                        <IconButton
                            id="group-button"
                            aria-controls={menu ? 'group-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={menu ? 'true' : undefined}
                            onClick={(e) => setMenu(e.currentTarget)}
                        >
                            <FilterAltIcon />
                        </IconButton>
                        <Menu
                            id='group-menu'
                            anchorEl={menu}
                            open={menu}
                            onClose={() => setMenu(false)}
                            MenuListProps={{
                                'aria-labelledby': 'group-menu',
                            }}
                        >
                            <MenuItem onClick={() => handleFilter('pendientes')}>pendientes</MenuItem>
                            <MenuItem onClick={() => handleFilter('realizados')}>realizados</MenuItem>

                        </Menu>
                        {!IsSmall && <Typography variant='caption' >{filter}</Typography>}
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