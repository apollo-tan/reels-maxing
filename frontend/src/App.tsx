import React, { useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import Carousel from "./components/Carousel";

const App = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

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
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: 10,
          overflowY: "scroll",
          scrollSnapType: "y mandatory", // Enable scroll snapping vertically
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari, and newer versions of Edge
          },
          scrollbarWidth: "none", // Firefox
        }}
        onScroll={handleScroll}
      >
        <Box
          sx={{
            height: "200vh", // Content taller than the container to make scrolling possible
            display: "flex",
            flexDirection: "column",
            scrollSnapAlign: "start", // Snap to the start of each item
          }}
        ></Box>
      </Box>

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
            xs={6}
            sm={6}
            md={2.4}
            style={{
              height: "calc(50% - 16px)",
            }}
            key={index}
          >
            <Carousel scrollTop={scrollTop} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
