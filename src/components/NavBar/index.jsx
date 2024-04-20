import './../../main.css'
import { useState, useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext/"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { TankContainerLogo } from '../../resourcesLinks';
//icons
import MenuIcon from '@mui/icons-material/Menu';
import { IoMdNotifications } from "react-icons/io";
//customComponents
import { OrdenesNotificaciones } from '../OrdenesNotificaciones';


function NavBar() {

    const { logIn, logOut, getAuth, setLoading, key, loading } = useContext(AuthContext);

    const finishSession = async () => {
        const error = await logOut()
    }

    const session = JSON.parse(sessionStorage.getItem('tankUser'));

    const { user_metadata } = session || {};

    const routes = {

        admin: [
            { to: '/vigilancia/entradas', text: 'Vigilancia' },
            { to: '/maniobras', text: 'Maniobras' },
            { to: '/programacion', text: 'Programación' },
            { to: '/reparaciones', text: 'Reparación' },
            { to: '/prelavado', text: 'Prelavado' },
            { to: '/lavado', text: 'Lavado' },
            { to: '/calidad/prelavados/pendientes', text: 'Calidad' },
            { to: '/ubicaciones', text: 'Ubicaciones' },
        ],
        developer: [
            { to: '/importaciones', text: 'Importaciones' },
            { to: '/transportista', text: 'Transportista' },
            { to: '/vigilancia/entradas', text: 'Vigilancia' },
            { to: '/maniobras', text: 'Maniobras' },
            { to: '/programacion', text: 'Programación' },
            { to: '/reparaciones', text: 'Reparación' },
            { to: '/prelavado', text: 'Prelavado' },
            { to: '/lavado', text: 'Lavado' },
            { to: '/calidad/prelavados/pendientes', text: 'Calidad' },
            { to: '/ubicaciones', text: 'Ubicaciones' },
        ],
        vigilante: [
            { to: '/vigilancia/entradas', text: 'Vigilancia' },
        ],
        maniobrista: [
            { to: '/vigilancia/entradas', text: 'Vigilancia' },
            { to: '/maniobras', text: 'Maniobras' },
            { to: '/programacion', text: 'Programación' },
            { to: '/reparaciones', text: 'Reparación' },
            { to: '/prelavado', text: 'Prelavado' },
            { to: '/lavado', text: 'Lavado' },
            { to: '/calidad/prelavados/pendientes', text: 'Calidad' },
            { to: '/ubicaciones', text: 'Ubicaciones' },
        ],
        'gestor de calidad': [
            { to: '/maniobras', text: 'Maniobras' },
            { to: '/programacion', text: 'Programación' },
            { to: '/reparaciones', text: 'Reparación' },
            { to: '/prelavado', text: 'Prelavado' },
            { to: '/lavado', text: 'Lavado' },
            { to: '/calidad/prelavados/pendientes', text: 'Calidad' },
            { to: '/ubicaciones', text: 'Ubicaciones' },
        ],
    }

    const pagesRol = routes[user_metadata?.rol]

    const pages = [
        { to: '/importaciones', text: 'Importaciones' },
        { to: '/transportista', text: 'Transportista' },
        { to: '/vigilancia', text: 'Vigilancia' },
        { to: '/maniobras', text: 'Maniobras' },
        { to: '/programacion/almacenados', text: 'Programación' },
        { to: '/reparaciones', text: 'Reparación' },
        { to: '/prelavado', text: 'Prelavado' },
        { to: '/lavado', text: 'Lavado' },
        { to: '/calidad', text: 'Calidad' },
        { to: '/ubicaciones', text: 'Ubicaciones' },

    ];

    const settings = [
        { to: '/admin', text: 'Admin', type: 'link' },
        { to: '/perfil', text: 'Perfil', type: 'link' },
        { to: '/', text: 'Cerrar Sesión', type: 'action', onClick: finishSession },
    ];

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

                    {/* / LOGOTIPO / */}
                    <Box
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'none', lg: 'flex', },
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
                            src={TankContainerLogo}
                            alt='logo' />
                    </Box>

                    {/* / ICONO DE MENU / */}
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'flex', lg: 'none', },
                            flexGrow: 1,
                        }}>
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
                         {/* / MENU RESPONSIVO / */}
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
                                display: { xs: 'block', md: 'flex' },
                            }}
                        >
                            {pagesRol.map((page) => (
                                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                                    <NavLink
                                        className='link'
                                        style={({ isActive }) => ({
                                            textDecoration: 'none',
                                            marginLeft: '25px',
                                            marginRigth: '25px',
                                            color: isActive ? "#025E73" : "#0092ba",
                                            fontWeight: isActive ? 600 : 400,
                                            fontSize: isActive ? '18px' : '16px'
                                        })}
                                        to={page.to}
                                    >
                                        {page.text}
                                    </NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* / ICONO DE MENU / */}
                    <Box
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'flex' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none', lg: 'flex', } }}>
                        {pagesRol.map((page) => (
                            <NavLink
                                key={page.text}
                                className='link'
                                style={({ isActive }) => ({
                                    textDecoration: 'none',
                                    marginLeft: '25px',
                                    marginRigth: '25px',
                                    color: isActive ? "#025E73" : "white",
                                    fontWeight: isActive ? 600 : 400,
                                    fontSize: isActive ? '18px' : '16px'
                                })}
                                to={page.to}

                            >
                                {page.text}
                            </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex', flexDirection:'row', gap: '20px', alignItems:'center' }}>
                        <OrdenesNotificaciones />
                        <Tooltip title="Ajustes de usuario">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="user" />
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
                                    <>
                                        {setting.type === 'link' && (
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
                                        )}

                                        {setting.type === 'action' && (
                                            <Button
                                                onClick={setting.onClick}
                                                color='error'>
                                                {setting.text}
                                            </Button>
                                        )}

                                    </>
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