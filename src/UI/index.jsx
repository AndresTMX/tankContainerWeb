import { Container } from "@mui/material";
import { NavBar } from "../components/NavBar";

function UI({ children }) {
  return (
    <>
      <NavBar />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingBottom: '50px',
        }}
      >
        {children}
      </Container>
    </>
  );
}

export { UI };