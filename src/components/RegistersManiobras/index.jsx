import { useState, useRef, useMemo } from "react";
//components
import { ItemLoadingState } from "../ItemLoadingState";
import { ContainerScroll } from "../ContainerScroll";
import { ItemManiobras } from "../ItemManiobras";
import { Box, Stack, Chip, Typography, Paper, Button, Fade, Alert, Pagination, TextField } from "@mui/material";
//helpers
import { filterSearchVigilancia } from "../../Helpers/searcher";
//hooks
import { useGetManiobrasType } from "../../Hooks/Maniobras/useGetManiobrasType";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRealtime } from "../../Hooks/FetchData";
import { useNavigate } from "react-router-dom";
//icons
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
//services
import { getManiobrasConfirmadas, getManiobrasPendientes } from "../../services/registros";
//libraries
import { toast, Toaster } from "sonner";


function RegistersManiobras() {

    const isMovile = useMediaQuery("(max-width:750px)");
    const movile = useMediaQuery('(max-width:820px)');

    const searchValue = useRef();

    const [typeManiobra, setTypeManiobra] = useState('confirmado');

    const fetchFunction = typeManiobra === 'confirmado' ? getManiobrasConfirmadas : getManiobrasPendientes;

    async function get() {
        const { error, data } = await fetchFunction();
        return { error, data }
    }

    const { loading, error, data } = useRealtime(get, 'registros-maniobras', 'registros', [typeManiobra]);

    //searcher state
    const dataMode = 'data'
    const searchMode = 'search'
    const [mode, setMode] = useState(dataMode)
    const [dataSearch, setDataSearch] = useState([])
    const [item, selectItem] = useState({})

    //parametro de busqueda
    function extractKey(item) {
        try {

            let key

            let id = item['id'] || "";
            let operador = item['operadores']['nombre'].toLowerCase() || "";
            let economico = item['numero_economico']
            key = `${id}-${operador}-${economico}`

            return key
        } catch (error) {
            console.error(error)
        }
    }

    //array dinamico
    const dataDinamic = mode === dataMode ? data : dataSearch;

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const rowsPerPage = 10;

    const pages = Math.ceil(dataDinamic?.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return dataDinamic?.slice(start, end);
    }, [page, dataDinamic]);


    //functions searcher
    function SearchInData() {
        try {
            const newData = new Map();
            const resultados = []


            dataDinamic.forEach(element => {
                newData.set(extractKey(element), element)
            });

            for (const [clave, valor] of newData) {
                if (clave.includes(searchValue.current.value)) {
                    resultados.push(newData.get(clave))
                }
            }

            setDataSearch(resultados)
            setMode(searchMode)

        } catch (error) {
            toast.error('error en busqueda')
            console.error(error)
        }
    }

    function handleKeyPress(e) {
        try {
            if (e.key === 'Enter') {
                SearchInData()
            }

        } catch (error) {
            toast.error('error en busqueda')
        }
    }

    function onChangeClear() {
        try {
            searchValue.current.value?.length <= 1 ? setMode(dataMode) : ''
        } catch (error) {
            console.error(error)
        }
    }

    const changueTypeManiobra = (newType) => setTypeManiobra(newType);

    //navigate form create maniobra
    const navigate = useNavigate();

    return (
        <>

            <Toaster richColors position='top-center' />
            <Stack gap='10px' alignItems='center'>

                <Paper sx={{ backgroundColor: 'whitesmoke', maxWidth: '800px' }} elevation={4}>
                    <Stack
                        sx={{
                            padding: '20px',
                            borderRadius: '4px',
                            width: '90vw',
                            maxWidth: '100%'
                        }}
                        flexDirection="row"
                        justifyContent={isMovile ? "center" : "space-between"}
                        alignItems="center"
                        flexWrap="wrap"
                        gap="20px"
                    >
                        <Stack
                            flexDirection="row"
                            alignItems="center"
                            flexWrap="wrap"
                            gap="10px"
                        >
                            <Chip
                                onClick={() => setTypeManiobra('confirmado')}
                                color={typeManiobra === "confirmado" ? "success" : "default"}
                                label="confirmadas"
                            />
                            <Chip
                                onClick={() => setTypeManiobra('pendiente')}
                                color={typeManiobra === "pendiente" ? "warning" : "default"}
                                label="pendientes"
                            />

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                fullWidth={isMovile ? true : false}
                                onClick={() => navigate('/create_maniobra')}
                                endIcon={<AddIcon />}
                            >
                                Nueva
                            </Button>



                        </Stack>

                        <Stack width={isMovile ? "100%" : "auto"} alignItems={isMovile ? 'center' : 'flex-end'}>
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
                        </Stack>

                    </Stack>
                </Paper>

                <ContainerScroll height={'72vh'} background='whitesmoke'>

                    <Stack gap='10px' padding='0px' >

                        {(loading && !error && !dataDinamic?.length) &&
                            <>
                                <ItemLoadingState />
                                <ItemLoadingState />
                                <ItemLoadingState />
                                <ItemLoadingState />
                            </>
                        }

                        {(!loading && !error && !dataDinamic.length && mode === 'data') &&
                            <Alert severity='info'>Sin registros añadidos</Alert>
                        }

                        {(!error && !loading && dataDinamic.length && mode === 'search') &&
                            <Alert severity='info'>Resultados de busqueda {searchValue.current?.value} </Alert>
                        }

                        {(!error && !loading && !dataDinamic.length && mode === 'search') &&
                            <Alert severity='warning'>No se encontraron coincidencias para tu busqueda, {searchValue.current?.value}</Alert>
                        }


                        {items.map((element) => (
                            <ItemManiobras
                                key={element.id}
                                register={element}
                                changueTypeManiobra={changueTypeManiobra}
                            />
                        ))}


                    </Stack>
                </ContainerScroll>
                <Pagination variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />
            </Stack>

        </>
    );
}

export { RegistersManiobras };
