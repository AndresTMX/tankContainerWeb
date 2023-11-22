import { IconButton, Paper, InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useSearcher } from "../../Hooks/useSearcher";

function Searcher({functionSearch}) {

    const { states, functions  } = useSearcher(functionSearch, typeRegister);

    const {search, results, loading, error } = states;

    const {searching, onChangueSearch, clearResults} = functions ;

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
            value={search}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Busca registros"
            />
            <IconButton 
             onClick={searching}
             onKeyUp={(e) => e.key === "Enter"? searching: () => {} }
            >
                <SearchIcon/>
            </IconButton>
        </Paper>
        </>
     );
}

export {Searcher};