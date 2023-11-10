import { Container } from "@mui/material";

function ContainerScroll({ children, height, background, colorBar }) {
    const Heigth =  height? height : "60vh";
    return ( 
        <Container
        sx={{
          display: "flex",
          backgroundColor: background? background:'whitesmoke',
          borderRadius:'4px',
          flexDirection: "column",
          overflowY: "scroll",
          overflowX:"hidden",
          height: Heigth,
          paddingTop:'20px',
          paddingBottom:'20px',
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colorBar? colorBar: "lightgray",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "gray",
          },
        }}
      >
        {children}
      </Container>
     );
}

export {ContainerScroll};