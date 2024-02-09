import { useState } from "react";
import { Box, Stack, Paper, Chip, IconButton, TextField, } from "@mui/material";
//hooks
import { useRegistersProgramer } from "../../Hooks/Programacion/useRegisters";
import useMediaQuery from "@mui/material/useMediaQuery";
//custom components
import { Notification } from "../../components/Notification";
import { LoadingState } from "../../components/LoadingState";
import SearchIcon from '@mui/icons-material/Search';
//searcher
import { useSearcherProgram } from "../../Hooks/Programacion/useSearcherProgram";
import { ProgramList } from "../../components/ProgramList";

function Programacion({ }) {

    const [search, setSearch] = useState('');

    const OnSubmit = (e) => {

        e.preventDefault()

        const target = e.target;

        const form = new FormData(target);

        const formValues = {}

        for (const [name, value] of form.entries()) {
            formValues[name] = value;
        }

        const { searchProgram } = formValues || {};

        setSearch(searchProgram)
        Searcher(searchProgram)
    }

    const movile = useMediaQuery('(max-width:540px)')
    
    const { registers, loading: Requestloading, error: RequestError, typeRegister, changueTypeRegister } = useRegistersProgramer();
    const { Functions, States } = useSearcherProgram(registers, typeRegister, search, setSearch);

    const { Searcher, OnKeySearch } = Functions || {};
    const { results, error: errorSearch, loading: loadingSearch } = States || {};

    return (
        <>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
                <Stack alignItems='center' width='100%' gap='20px' maxWidth='900px'>
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            flexDirection: movile? 'column' : 'row',
                            flexFlow: movile? 'column-reverse' : '' ,
                            justifyContent: 'space-between',
                            alignItems: movile? 'start' : 'center',
                            bgcolor: 'whitesmoke',
                            maxWidth: '900px',
                            padding: '15px',
                            width: '96vw',
                            gap: '10px',
                        }}>
                        <Stack flexDirection='row' gap='10px' width={movile? '100%' :'auto'}>
                            <Chip
                                label='almacenados'
                                color={typeRegister === 'almacenado' ? 'warning' : 'default'}
                                onClick={() => changueTypeRegister('almacenado')} />
                            <Chip
                                label='programados'
                                color={typeRegister != 'almacenado' ? 'info' : 'default'}
                                onClick={() => changueTypeRegister('programado')} />
                        </Stack>

                        <form onSubmit={OnSubmit}>
                            <Stack flexDirection='row' gap='5px'  >
                                <TextField 
                                sx={{width: movile? '80vw':'auto'}} 
                                size='small' 
                                variant='outlined' 
                                name="searchProgram" 
                                onKeyUp={OnKeySearch}
                                 />
                                <IconButton type='submit' >
                                    <SearchIcon />
                                </IconButton>
                            </Stack>
                        </form>
                    </Paper>

                    <ProgramList
                        search={search}
                        results={results}
                        registers={registers}
                        OnKeySearch={OnKeySearch}
                        errorSearch={errorSearch}
                        RequestError={RequestError}
                        typeRegister={typeRegister}
                        loadingSearch={loadingSearch}
                        Requestloading={Requestloading}
                        changueTypeRegister={changueTypeRegister}
                    />

                </Stack>
            </Box>

            <Notification />

            <LoadingState duration={1000} />

        </>
    );
}

export { Programacion };
