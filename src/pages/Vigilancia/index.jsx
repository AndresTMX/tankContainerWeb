import { useState } from "react";
//imports materialui
import { Container, Box, Paper, Chip, Stack, } from "@mui/material";
//components
import { Searcher } from "../../components/Searcher";
import { Notification } from "../../components/Notification";
import { RegistersVigilancia } from "../../components/RegistersVigilancia";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetRegisters } from "../../Hooks/Vigilancia/useGetRegisters";
import { useSearcherVigilancia } from "../../Hooks/Vigilancia/useSaearcherVigilancia";

function Vigilancia() {

    const IsSmall = useMediaQuery('(max-width:900px)');
    const isMovile = useMediaQuery("(max-width:640px)");

    const [typeRegister, setTypeRegister] = useState("entrada")
    const { data, loading, error } = useGetRegisters(typeRegister);

    const { states, functions } = useSearcherVigilancia(data);
    const { searching, onChangueSearch, searchingKey } = functions;

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '20px',
                    alignItems: IsSmall ? '' : 'center',
                    minHeight: '100%',
                    gap: '10px'
                }}
            >
                <Paper sx={{ backgroundColor: 'whitesmoke' }} elevation={4}>
                    <Stack sx={{ padding: '20px', borderRadius: '4px', width: '90vw', maxWidth: '700px' }}
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
                                onClick={() => setTypeRegister("entrada")}
                                color={typeRegister === "entrada" ? "success" : "default"}
                                label="entradas"
                            />
                            <Chip
                                onClick={() => setTypeRegister("salida")}
                                color={typeRegister === "salida" ? "info" : "default"}
                                label="salidas"
                            />

                        </Stack>

                        <Stack width={isMovile ? "100%" : "auto"}>
                            <Searcher
                                search={states.search}
                                onChangueSearch={onChangueSearch}
                                searchingKey={searchingKey}
                                searching={searching}
                                placeholder={'Busca entre tus registros pendientes'}
                            />
                        </Stack>

                    </Stack>
                </Paper>

                <Box>
                    <RegistersVigilancia
                        data={data}
                        error={error}
                        loading={loading}
                        search={states.search}
                        errorSearch={states.error}
                        loadingSearch={states.loading}
                        resultsSearch={states.results}
                    />
                </Box>

            </Container>

            <Notification />
        </>
    );
}

export { Vigilancia };