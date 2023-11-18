import { IconButton, Paper, InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Searcher() {
    return ( 
        <>
        <Paper 
        sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            width:'100%',
            maxWidth:'400px'
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