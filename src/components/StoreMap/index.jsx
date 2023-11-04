import { Box, Stack, Container, IconButton, Paper, Grid } from "@mui/material";
import { StoreMapItemContainer } from "../StoreMapItemContainer";

function StoreMap({ dataContainers }) {

    const arrayItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12];

    /*/
    Traer de una tabla o documento exclusivo que tenga un numero limitado de registros vacios solo con 
    los apartados de block y position llenos para conservar su lugar estatico y que representen
    los contenedores totales que pueden ser guardados en el almacen.
    un backend hecho con firebase . 

    #opcion 2 filtrar el arreglo principal de N cantidad de elementos, siempre habra N cantidad de registros
    vacios en la base de datos que se actualizaran con los datos de los contenedores cuando etren en almacen
    despues se volveran actualizar a objetos vacios cuando salgan de almacen.

    const sectionA = dataContainer? dataContainer.filter((container) => container.location?.block === 'A') : [];

    const sectionB = dataContainer? dataContainer.filter((container) => container.location?.block === 'B') : [];

    const sectionC = dataContainer? dataContainer.filter((container) => container.location?.block === 'B') : [];
    /*/

    const sectionA = dataContainers? dataContainers.filter((container) => container.location?.block === 'A') : [];

    const sectionB = dataContainers? dataContainers.filter((container) => container.location?.block === 'B') : [];

    const sectionC = dataContainers? dataContainers.filter((container) => container.location?.block === 'C') : [];


    return (
        <>
            {/* contenedor del mapa */}
            <Box
            sx={{
                display:'flex',
                flexDirection:'row',
                padding:'20px',
                gap:'30px',
            }}
            >
                <Box
                sx={{
                    display:'flex',
                    width:'100%',
                    flexDirection:'column',
                    justifyContent:'space-between',
                    gap:'50px'
                }}
                >
                     {/* parte 1 del mapa */}
                <Box sx={{width:'350px'}}>
                    <Grid justifyContent='center' container spacing={1}>
                        {dataContainers.map((container) => (
                            <Grid item direction="row" xs={2}>
                                <StoreMapItemContainer key={container.id} infoContainer={container}/>
                            </Grid>
                        ))}

                    </Grid>
                </Box>

                {/* parte 2 del mapa */}
                <Box sx={{width:'350px'}}>
                    <Grid justifyContent='center' container spacing={1}>
                    {arrayItems.map((item) => (
                            <Grid item direction="row" xs={2}>
                                <Paper 
                                elevation="2" 
                                sx={{
                                    width:'50px',
                                    height:'25px',
                                    padding:'2px'
                                    }}>
                                {item}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                </Box>

                <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    width:'150px',
                }}
                >
                    {/* parte 3 del mapa */}
                    <Box 
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        height:'100%',
                        justifyContent:'center'
                    }}
                    >
                        <Grid container spacing={1}>
                            {arrayItems.map((item) => (
                                <Grid item direction="column" xs={6}>
                                    <Paper 
                                    elevation="2" 
                                    sx={{
                                        width:'50px',
                                        height:'25px',
                                        padding:'2px'
                                        }}
                                    >{item}</Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>


            </Box>

        </>
    );
}

export { StoreMap };