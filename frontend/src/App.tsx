import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, CircularProgress } from "@mui/material";

// Video player component for a video stream
const VideoPlayer = ({ streamUrl }: { streamUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     // Set volume to 50% when the video is ready
  //     videoRef.current.volume = 0.5;
  //   }
  // }, []);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        width="100%"
        height="315"
        autoPlay
        muted // Ensure it's not muted
        playsInline
        loop
        src={streamUrl}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Main App component displaying multiple video streams using MUI Grid
const App = () => {
    const [videoStreams, setVideoStreams] = useState<string[]>([]); // State to hold stream URLs
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    // Fetch stream URLs from the Flask API when the component mounts
    useEffect(() => {
        const fetchStreamUrls = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:5000/api/shorts?query=funny"
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
        <Container>
            <Typography variant="h4" gutterBottom>
                Video Stream Player Grid
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {videoStreams.map((stream, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={2.4} // Approximates 5 columns in a 12-column grid
                        style={{ maxWidth: "20%" }} // Forces 5 items per row
                        key={index}
                    >
                        <VideoPlayer streamUrl={stream} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default App;
