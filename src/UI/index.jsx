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
        }}
      >
        {children}
      </Container>
    </>
  );
}

export { UI };