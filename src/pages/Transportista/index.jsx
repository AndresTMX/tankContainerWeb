import { useEffect, useState, useMemo } from "react"
import { Box, Menu, MenuItem, IconButton, Stack, Paper, Typography, Chip, Checkbox, Accordion, AccordionSummary, AccordionDetails, Pagination, TextField } from "@mui/material"
//hooks
import { useRealtime } from "../../Hooks/FetchData"
//icons
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { TbFilters } from "react-icons/tb";
//services
import { getAllRegistersForStatus } from "../../services/puerto";
//helpers
import { dateInText } from "../../Helpers/date";
//context
import { useTransportistasContext } from "../../Context/TransportistaContext";

export function Transportista() {

    const { context } = useTransportistasContext();
    const { selectTanks, toggleGroup } = context || {};

    const [filter, setFilter] = useState('puerto');
    const [menu, setMenu] = useState(false);

    const [group, setGroup] = useState('created_at');
    const [groupMenu, setGroupMenu] = useState(false);

    const handleFilter = (newFilter) => {
        setMenu(false)
        setFilter(newFilter)
    }

    const handleGroup = (newGroup) => {
        setGroupMenu(false)
        setGroup(newGroup);
    }

    async function getDataFilter() {
        try {
            const { error, data } = await getAllRegistersForStatus(filter);
            return { error, data }
        } catch (error) {
            console.error(error)
        }
    }

    function groupObjectsByValueKey(array, key) {
        return array.reduce((result, currentItem) => {
            const value = currentItem[key];
            if (!result[value]) {
                result[value] = [];
            }
            result[value].push(currentItem);
            return result;
        }, {});
    }

    const [dataGroup, setDataGroup] = useState({})
    const { loading, error, data: tanques } = useRealtime(getDataFilter, 'puerto', 'puerto', [filter])

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const rowsPerPage = 10;

    const pages = Math.ceil(tanques.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return tanques.slice(start, end);
    }, [page, dataGroup]);

    useEffect(() => {
        const newData = groupObjectsByValueKey(items, group);
        setDataGroup(newData)
    }, [page, group, tanques])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', }}>

                <Stack flexDirection='row' justifyContent='flex-start' alignItems='center' padding='10px' gap='20px' >
                    <div>
                        <IconButton
                            id="basic-button"
                            aria-controls={menu ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={menu ? 'true' : undefined}
                            onClick={(e) => setMenu(e.currentTarget)}
                        >
                            <FilterAltIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={menu}
                            open={menu}
                            onClose={() => setMenu(false)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => handleFilter('puerto')}>puerto</MenuItem>
                            <MenuItem onClick={() => handleFilter('descartado')}>descartado</MenuItem>
                            <MenuItem onClick={() => handleFilter('transportista')}>transportista</MenuItem>
                        </Menu>
                    </div>

                    <Typography>
                        Tanques status:  <Chip size="small" color='primary' label={filter} />
                    </Typography>

                    <div>
                        <IconButton
                            id="group-button"
                            aria-controls={groupMenu ? 'group-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={groupMenu ? 'true' : undefined}
                            onClick={(e) => setGroupMenu(e.currentTarget)}
                        >
                            <TbFilters />
                        </IconButton>
                        <Menu
                            id='group-menu'
                            anchorEl={groupMenu}
                            open={groupMenu}
                            onClose={() => setGroupMenu(false)}
                            MenuListProps={{
                                'aria-labelledby': 'group-menu',
                            }}
                        >
                            <MenuItem onClick={() => handleGroup('created_at')}>fecha</MenuItem>
                            <MenuItem onClick={() => handleGroup('tipo')}>tipo</MenuItem>
                            <MenuItem onClick={() => handleGroup('especificacion')}>especificacion</MenuItem>
                            <MenuItem onClick={() => handleGroup('status')}>status</MenuItem>
                        </Menu>
                    </div>

                    <Typography>
                        Tanques grupo:  <Chip size="small" color='primary' label={group === 'created_at' ? 'fecha' : group} />
                    </Typography>

                    <Typography>
                        Tanques seleccionados:  <Chip size="small" color='primary' label={selectTanks.length} />
                    </Typography>

                </Stack>

                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: 'whitesmoke',
                        border: '1px solid #e7e6e6',
                        gap: '10px',
                        padding: '20px',
                        height: '76vh',
                        overflow: 'auto',
                    }}
                >

                    {Object.entries(dataGroup).map(([category, items], index) => (
                        <Accordion
                            key={index}
                            id={`panel-header-${index}`}
                            aria-controls={`panel-content-${index}`}
                            defaultExpanded={true}
                            variant='elevation'
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                {group === 'created_at' ?
                                    <Typography fontWeight='500' color='primary' >{dateInText(category)}</Typography> :
                                    <Typography fontWeight='500' color='primary' >{category}</Typography>}

                            </AccordionSummary>
                            <AccordionDetails>
                                <IconButton
                                    color="primary"
                                    onClick={() => toggleGroup(items)}
                                    sx={{ position: 'absolute', right: '5%', top: '10px' }}>
                                    <ChecklistRtlIcon />
                                </IconButton>
                                <Stack
                                    sx={{
                                        gap: '10px',
                                        display: 'flex',
                                        padding: '20px',
                                        bgcolor: 'whitesmoke',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {items.map(item => (
                                        <Item key={item.id} tanque={item} />
                                    ))}
                                </Stack>
                            </AccordionDetails>

                        </Accordion>
                    ))}

                </Stack>
                <Pagination sx={{ marginX: 'auto' }} variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />
            </Box >
        </>
    )
}

function Item({ tanque }) {

    const { context } = useTransportistasContext();

    const { toggleTank, selectTanks } = context || {};

    const checked = selectTanks.length > 0 ?
        selectTanks.find((item) => item.numero_tanque === tanque.numero_tanque) ? true : false
        : false;

    return (
        <>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    items: 'center',
                    padding: '10px',
                    justifyContent: 'space-between'
                }}
            >
                <Stack flexDirection='row' alignItems='center' gap='20px' padding='10px'>
                    <TextField
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#E0E3E7',
                                    border: 'hidden',
                                },
                            },
                        }}
                        disabled
                        size="small"
                        label='Numero de tanque'
                        
                        fontWeight='500'
                        value={tanque.numero_tanque}
                    />


                    <Typography>
                        {tanque.tipo}
                    </Typography>

                    <Typography>
                        {tanque.especificacion}
                    </Typography>
                </Stack>

                <Stack flexDirection='row' alignItems='center' gap='20px'>
                    <Checkbox
                        onChange={() => toggleTank(tanque)}
                        checked={checked}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
            </Paper>
        </>
    )
}