import { Container } from "@mui/material";

function ContainerScroll({ children, height, background, colorBar, maxHeight }) {
  const Heigth = height ? height : "60vh";
  return (
    <Container
      sx={{
        display: "flex",
        backgroundColor: background ? background : 'whitesmoke',
        borderRadius: '4px',
        flexDirection: "column",
        overflowY: "scroll",
        overflowX: "hidden",
        height: Heigth,
        maxHeight: maxHeight ? maxHeight : null,
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft:'5px',
        paddingRight:'5gmailpx'

      }}
    >
      {children}
    </Container>
  );
}

export { ContainerScroll };