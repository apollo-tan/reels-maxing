import React, { useRef, useEffect, useState } from "react";
import { Grid, Container, Typography, CircularProgress, Box } from "@mui/material";
import Carousel from "./components/Carousel";

// Main App component displaying multiple video streams using MUI Grid
const App = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  const [videoStreams, setVideoStreams] = useState<string[]>([]); // State to hold stream URLs
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch stream URLs from the Flask API when the component mounts
  useEffect(() => {
    const fetchStreamUrls = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/shorts?query=keqing"
        );
        const data = await response.json();

        if (data.stream_urls) {
          setVideoStreams(data.stream_urls); // Set stream URLs to state
        }
      } catch (error) {
        console.error("Error fetching stream URLs:", error);
      } finally {
        setLoading(false); // Stop loading after request is done
      }
    };

    fetchStreamUrls();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Video Stream Player Grid
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

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
            <Carousel scrollTop={scrollTop} videoStream={videoStreams[index]} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
