import './../../main.css'
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { NavLink } from 'react-router-dom';

const pages = [
    { to: '/vigilancia', text: 'Vigilancia' },
    { to: '/maniobras', text: 'Maniobras' },
    { to: '/reparaciones', text: 'Reparación' },
    { to: '/prelavado', text: 'Prelavado' },
    { to: '/calidad', text: 'Calidad' },
    { to: '/lavado', text: 'Lavado' },
];
const settings = [
    {to:'/perfil', text:'Perfil'},
    {to:'/login', text:'Cerrar Sesión'},
];

function NavBar() {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    return (
        <AppBar 
        position="sticky"
        >
            <Container maxWidth='xxl'>
                <Toolbar disableGutters>
                    <Box
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                    >
                       <img 
                       height='50px'
                       width='auto'
                       src='src/assets/TankContainer.png'
                       alt='logo'/>
                    </Box>
            
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <NavLink
                                        className='link'
                                        style={({ isActive }) => ({
                                            textDecoration:'none',
                                            marginLeft:'25px',
                                            marginRigth:'25px',
                                            color: isActive ? "#025E73" : "#0092ba",
                                            fontWeight: isActive? 600 : 400,
                                            fontSize:isActive? '18px' : '16px'
                                        })}
                                        to={page.to}
                                        key={index}
                                    >
                                        {page.text}
                                    </NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                     sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                    >
                       <img 
                       height='50px'
                       width='auto'
                       src='src/assets/TankContainer.png'
                       alt='logo'/>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <NavLink
                            className='link'
                            style={({ isActive }) => ({
                                textDecoration:'none',
                                marginLeft:'25px',
                                marginRigth:'25px',
                                color: isActive ? "#025E73" : "white",
                                fontWeight: isActive? 600 : 400,
                                fontSize:isActive? '18px' : '16px'
                            })}
                            to={page.to}
                            key={page.text}
                        >
                            {page.text}
                        </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                                    <NavLink
                                        className='link'
                                        style={({ isActive }) => ({
                                            textDecoration: 'none',
                                            marginLeft: '25px',
                                            marginRigth: '25px',
                                            color: isActive ? "#025E73" : "gray",
                                            fontWeight: isActive ? 600 : 400,
                                            fontSize: isActive ? '18px' : '16px'
                                        })}
                                        to={setting.to}
                                    >
                                        {setting.text}
                                    </NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export { NavBar };