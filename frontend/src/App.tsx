import React, { useRef, useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import Carousel from "./components/Carousel";

// Main App component displaying multiple video streams using MUI Grid
const App = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [videoStreams, setVideoStreams] = useState<string[]>([]); // State to hold stream URLs
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [capacity, setCapacity] = useState<number>(50);

  const boxRef = useRef<HTMLDivElement | null>(null); // Create a reference to the Box element

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollTop(scrollTop);

    console.log(`ScrollTop updated: ${scrollTop}`);

    // Calculate 60vh in pixels dynamically
    const thresholdInPixels = (60 / 100) * window.innerHeight;
    console.log(`Threshold in pixels (60vh): ${thresholdInPixels}`);

    const remainingCapacity = capacity - scrollTop / thresholdInPixels;
    console.log(`Remaining capacity: ${remainingCapacity}`);

    if (remainingCapacity < 50) {
      console.log(
        `Threshold met. Incrementing capacity and fetching more streams.`
      );

      // Increment capacity by 10 before fetching more streams
      setCapacity(prevCapacity => {
        const newCapacity = prevCapacity + 10;
        console.log(`Updated capacity: ${newCapacity}`);

        fetchMoreStreamUrls(); // Trigger fetching additional streams
        return newCapacity;
      });
    } else {
      console.log(`Threshold not met. No action taken.`);
    }
  };

  const fetchMoreStreamUrls = async () => {
    try {
      console.log("Fetching more stream URLs...");
      const searchQuery = "keqing"; // Replace with dynamic search query if needed
      const response = await fetch(
        "http://127.0.0.1:5000/api/shorts?query=mavuika"
      );
      if (!response.ok) {
        console.error("Failed to fetch more streams:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data.stream_urls)
      if (data.stream_urls) {
        setVideoStreams(prevStreams => [...prevStreams, ...data.stream_urls]); // Append new streams
        console.log(videoStreams.length);
      } else {
        console.warn("No additional streams found.");
      }
    } catch (error) {
      console.error("Error fetching additional stream URLs:", error);
    }
  };
  // Fetch stream URLs from the new cached endpoint when the component mounts
  useEffect(() => {
    console.log("useEffect called - Mounting");
    const fetchStreamUrls = async () => {
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

  // Debugging state change and re-render
  useEffect(() => {
    console.log("videoStreams state changed:", videoStreams);
  }, [videoStreams]);

  useEffect(() => {
    console.error(videoStreams.length);
  }, [videoStreams.length]);

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

  console.log(videoStreams.length * 6);

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
        ref={boxRef} // Assign the ref to the Box component
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
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
