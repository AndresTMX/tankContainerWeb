import { Box, IconButton, TextField, FormControl , Paper, InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Searcher() {
    return ( 
        <>
        <Paper 
        sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            width:'300px'
        }}
        >
            <InputBase 
            sx={{ ml: 1, flex: 1 }}
            placeholder="Busca registros"
            />
            <IconButton>
                <SearchIcon/>
            </IconButton>
        </Paper>
        </>
     );
}

export {Searcher};