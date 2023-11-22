import { IconButton, Paper, InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Searcher({onChangueSearch, searchingKey, search, searching}) {

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
            onChange={onChangueSearch}
            onKeyUp={searchingKey}
            value={search}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Busca registros"
            />
            <IconButton 
             onClick={searching}
            >
                <SearchIcon/>
            </IconButton>
        </Paper>
        </>
     );
}

export {Searcher};