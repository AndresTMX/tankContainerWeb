import { useState } from "react";
//components
import { Searcher } from "../Searcher";
import { HistoryItem } from "../HistoryItem";
import { HistoryItemLoading } from "../HistoryItem";
import { ContainerScroll } from "../ContainerScroll";
import { FormRegisterManiobras } from "../FormRegisterManiobras";
import { NotConexionState } from "../NotConectionState";
import { Box, Stack, Chip, Typography, Paper, Button, Modal, Fade, Container, Alert } from "@mui/material";
//helpers
import { filterSearchVigilancia } from "../../Helpers/searcher";
//hooks
import { useGetManiobrasType } from "../../Hooks/Maniobras/useGetManiobrasType";
import { useSearcher } from "../../Hooks/useSearcher";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import AddIcon from '@mui/icons-material/Add';
import { AddNewTanks } from "../AddNewTanks";


function RegistersManiobras() {

    const isMovile = useMediaQuery("(max-width:750px)");
    const isSmall = useMediaQuery("(max-width:455px)")

    const [typeManiobra, setTypeManiobra] = useState('confirmado')
    const { loadingManiobra, errorManiobra, maniobras, forceUpdate } = useGetManiobrasType(typeManiobra);

    const { states, functions } = useSearcher(filterSearchVigilancia, maniobras);
    const { search, results, loading, error } = states;
    const { searching, onChangueSearch, searchingKey } = functions;

    const [maniobraModal, setManiobraModal] = useState(false);
    const toggleModalManiobras = () => setManiobraModal(!maniobraModal);

    const changueTypeManiobra = (newType) => setTypeManiobra(newType);

    const [modalTank, setModalTank] = useState(false);


    const toggleModalAddTanks = () => {
        setManiobraModal(!maniobraModal)
        setModalTank(!modalTank)
    }

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
                                color={typeManiobra === "pendiente" ? "info" : "default"}
                                label="pendientes"
                            />

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                fullWidth={isSmall ? true : false}
                                onClick={() => setManiobraModal(!maniobraModal)}
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
                                {maniobras.map((item) => (
                                    <HistoryItem
                                        type="maniobras"
                                        data={item}
                                        key={item.id}
                                        updater={forceUpdate}
                                        typeManiobra={typeManiobra}
                                        changueTypeManiobra={changueTypeManiobra}
                                    />
                                ))}
                            </Stack>
                        )}

                        {(loadingManiobra || loading) &&
                            <Stack spacing={1}>
                                <HistoryItemLoading />
                                <HistoryItemLoading />
                                <HistoryItemLoading />
                            </Stack>
                        }


                    </Box>
                </ContainerScroll>
            </Stack>

            <Modal open={maniobraModal}>
                <Fade in={maniobraModal}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5%', width: '100%', height: 'auto' }}>
                        <FormRegisterManiobras
                            toggleModal={toggleModalManiobras}
                            setTypeManiobra={setTypeManiobra}
                            forceUpdate={forceUpdate}
                            toggleModalAddTanks={toggleModalAddTanks}
                        />
                    </Box>
                </Fade>
            </Modal>

            <Modal open={modalTank}>
                <Fade in={modalTank}>
                    <Container>
                        <AddNewTanks toggleModal={toggleModalAddTanks} />
                    </Container>
                </Fade>
            </Modal>
        </>
    );
}

export { RegistersManiobras };