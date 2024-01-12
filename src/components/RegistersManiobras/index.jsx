import { useState } from "react";
//components
import { Searcher } from "../Searcher";
import { HistoryItemLoading } from "../HistoryItem";
import { ContainerScroll } from "../ContainerScroll";
import { NotConexionState } from "../NotConectionState";
import { ItemManiobras } from "../ItemManiobras";
import { Box, Stack, Chip, Typography, Paper, Button, Fade, Alert, } from "@mui/material";
//helpers
import { filterSearchVigilancia } from "../../Helpers/searcher";
//hooks
import { useGetManiobrasType } from "../../Hooks/Maniobras/useGetManiobrasType";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearcher } from "../../Hooks/useSearcher";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
//icons
import AddIcon from '@mui/icons-material/Add';

function RegistersManiobras() {

    const isMovile = useMediaQuery("(max-width:750px)");
    const isSmall = useMediaQuery("(max-width:455px)");
    //capturo parametro del registro
    const { parametro } = useParams();

    const [typeManiobra, setTypeManiobra] = useState(parametro || 'confirmado')
    const { loadingManiobra, errorManiobra, maniobras, forceUpdate } = useGetManiobrasType(typeManiobra);

    const { states, functions } = useSearcher(filterSearchVigilancia, maniobras);
    const { search, results, loading, error } = states;
    const { searching, onChangueSearch, searchingKey } = functions;

    const changueTypeManiobra = (newType) => setTypeManiobra(newType);

    //navigate form create maniobra
    const navigate = useNavigate();

    return (
        <>
            <Stack gap='10px'>

                <Paper sx={{ backgroundColor: 'whitesmoke' }} elevation={4}>
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
                                fullWidth={isSmall ? true : false}
                                onClick={() => navigate('/create_maniobra')}
                                endIcon={<AddIcon />}
                            >
                                Nueva maniobra
                            </Button>

                        </Stack>

                        <Stack width={isMovile ? "100%" : "auto"} alignItems={isMovile ? 'center' : 'flex-end'}>
                            <Searcher
                                onChangueSearch={onChangueSearch}
                                searchingKey={searchingKey}
                                searching={searching}
                                search={search}
                            />
                        </Stack>

                    </Stack>
                </Paper>

                <ContainerScroll height={isMovile ? "60vh " : "68vh"}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", width: '100%' }}>

                        {(!errorManiobra && !loadingManiobra && maniobras?.length === 0) &&
                            <Fade in={!loadingManiobra}>
                                <Alert severity="info">
                                    {`Parece que no hay maniobras aún`}
                                </Alert>
                            </Fade>
                        }

                        {errorManiobra && (
                            <NotConexionState />
                        )}

                        {(error && !loading) && (
                            <Typography variant="subtitle">
                                Sin resultados
                            </Typography>
                        )}

                        {(!loadingManiobra && results.length === 0 && !error) && (
                            <Stack gap="20px">
                                {maniobras.map((element) => (
                                    <ItemManiobras
                                        key={element.id}
                                        register={element}
                                        updaterRegisters={forceUpdate}
                                        changueTypeManiobra={changueTypeManiobra}
                                    />
                                ))}
                            </Stack>
                        )}

                        {(loadingManiobra || loading) &&
                            <Stack spacing={1}>
                                <HistoryItemLoading />
                            </Stack>
                        }

                    </Box>
                </ContainerScroll>
            </Stack>

        </>
    );
}

export { RegistersManiobras };
