
import { Stack, Paper, Alert, Pagination, Paper, Box,  } from "@mui/material";
import { ItemLoadingState } from "../../../ItemLoadingState";
import { ContainerScroll } from "../../../ContainerScroll";
//hooks
import { useState, useMemo,  } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCalidadContext } from "../../../../Context/CalidadContext";
//helpers
import { dateTextShort } from "../../Helpers/date";
//icons
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import ClearIcon from '@mui/icons-material/Clear';


export function LavadosPendientes() {
    const movile = useMediaQuery('(max-width:880px)');

    const { loading, error, dataDinamic, searchValue, mode } = useCalidadContext();

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


    return (
        <Stack gap='10px' width='100%' alignItems='center' >
            <ContainerScroll height='calc(100vh - 250px)' background='whitesmoke'>

                <Stack gap='10px' padding='0px'  >

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


                    {
                        items.map((prelavado) => (
                            <ItemPendiente key={prelavado.id} prelavado={prelavado} />
                        ))
                    }


                </Stack>
            </ContainerScroll>
            <Pagination variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />

            <Outlet />
        </Stack>
    )
}