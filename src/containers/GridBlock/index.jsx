import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLayout } from "../../Hooks/Layout";
import { GridItemColumn } from "../GridItemColumn";
import { Stack, Chip, Grid, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

function GridBlock({ tipos, simulateState, bloque, levels }) {

    const [level, setLevel] = useState(levels[0]);
    const toggleLevel = (level) => setLevel(level)

    const movile = useMediaQuery('(max-width:700px)')

    const { stateLayout } = useLayout(tipos, level, simulateState, bloque);

    const [columns, setColumns] = useState([])

    useEffect(() => {
        // Extraer columnas únicas
        const columnasUnicas = stateLayout.reduce((columnas, objeto) => {
            if (!columnas.includes(objeto.columna)) {
                columnas.push(objeto.columna);
            }
            return columnas;
        }, []);
        setColumns(columnasUnicas)
    }, [stateLayout])

    return (
        <Stack gap='15px' alignItems='center'>

            <Stack flexDirection='row' width='50%' alignItems='center' justifyContent='flex-end' gap='10px' >
                {levels.map((levelItem) => (
                    <Chip key={levelItem} onClick={() => toggleLevel(levelItem)} color={level === levelItem ? 'primary' : 'default'} label={`nivel ${levelItem}`} />
                ))}
            </Stack>

            <Outlet />

            <Grid
                container
                spacing={1}
                direction='row'
                justifyContent='center'
                sx={{
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    height: '100%',
                    minWidth: movile ? 'auto' : '700px',
                    maxWidth: '1200px',
                    bgcolor: 'whitesmoke',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    maxHeight: '80vh',
                }}>

                {columns.map((columna) => (
                    <GridItemColumn
                        key={columna}
                        stateLayout={stateLayout}
                        column={columna}
                        level={level}
                        tipos={tipos}
                        bloque={bloque}
                    />
                ))}

            </Grid>

        </Stack>
    );
}

export { GridBlock }