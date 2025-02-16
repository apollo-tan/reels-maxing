import ReactPlayer from "react-player";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";

import React, { useRef, useEffect, useState } from "react";
import Carousel from "./components/Carousel";

// Main App component displaying multiple video streams using MUI Grid
const App = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [videoStreams, setVideoStreams] = useState<string[]>([]); // State to hold stream URLs
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  const [isMuted, setIsMuted] = useState<boolean>(true); // State to manage mute/unmute status
  const playerRefs = useRef<(ReactPlayer | null)[]>([]); // Store refs for all players
  const fetchRef = useRef(false); // Ref to track if fetch is already done
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Button ref

  useEffect(() => {
    console.error(videoStreams.length);
  }, [videoStreams.length]);
  // Fetch stream URLs from the new cached endpoint when the component mounts
  useEffect(() => {
    console.log("useEffect called - Mounting");
    const fetchStreamUrls = async () => {
      if (fetchRef.current) return; // If fetch has already been called, skip
      fetchRef.current = true;
      try {
        console.log("Fetching cached stream URLs...");
        const response = await fetch(
          "http://127.0.0.1:5000/api/cached_streams" // New endpoint to fetch cached streams
        );
        const data = await response.json();
        console.log("Received cached stream URLs:", data);

        if (data.stream_urls) {
          setVideoStreams(data.stream_urls); // Set stream URLs to state
        }
      } catch (error) {
        console.error("Error fetching cached stream URLs:", error);
      } finally {
        setLoading(false); // Stop loading after request is done
        console.log("Loading complete");
      }
    };

    fetchStreamUrls();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Handle mute/unmute toggle for all players
  const handleMuteUnmuteAll = () => {
    setIsMuted(prevMuted => !prevMuted); // Toggle the mute state
  };

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
        background: "#d1c4e9", // Purple background
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}

      //      onMouseOver={handleMuteUnmuteAll}
    >
      {/* Mute/Unmute Button
      <Button
        ref={buttonRef}
        variant="contained"
        color="primary"
        onClick={handleMuteUnmuteAll}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 20,
        }}
      >
        {isMuted ? "Unmute All" : "Mute All"}
      </Button> */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: 10, // Keep this higher than the background to not block interaction
          overflowY: "scroll",
          scrollSnapType: "y mandatory", // Enable scroll snapping vertically
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        }}
        onScroll={handleScroll}
      >
        <Box
          sx={{
            height: `${videoStreams.length * 6}vh`, // Content taller than the container to make scrolling possible
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
            <Carousel
              scrollTop={scrollTop}
              videoStreams={videoStreams}
              index={index}
              isMuted={isMuted}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
