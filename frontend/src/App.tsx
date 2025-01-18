import { Container, Grid } from "@mui/material";
import Carousel from "./components/Carousel";

const App = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{
        background: "#d1c4e9",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        style={{
          padding: "1px",
          height: "100%",
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Grid
            item
            xs={6} // Two items per row
            sm={6}
            md={2.4} // Not valid: Consider 2 or 3 based on design requirements
            style={{
              height: "calc(50% - 16px)", // Half of parent height minus spacing
            }}
            key={index}
          >
            <Carousel />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
