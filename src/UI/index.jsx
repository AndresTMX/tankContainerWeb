import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar";

function UI({ children }) {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '0px',
          paddingRight: '0px',
        }}
      >
        {children}
      </Box>
    </>
  );
}

export { UI };