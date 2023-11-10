import { Container } from "@mui/material";
import { NavBar } from "../components/NavBar";

function UI({children}) {
    return ( 
        <>
        <NavBar/>
        <Container
        sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            paddingBottom:'50px',
            overflow:'hidden',
            "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "lightgray",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "gray",
              },
        }}
        >
            {children}
        </Container>
        </>
     );
}

export {UI};