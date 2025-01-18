import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import {
    Container,
    Grid,
    Typography,
    CircularProgress,
    Button,
} from "@mui/material";

const App = () => {
    const [videoStreams, setVideoStreams] = useState<string[]>([]); // State to hold stream URLs
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [isMuted, setIsMuted] = useState<boolean>(true); // State to manage mute/unmute status
    const playerRefs = useRef<(ReactPlayer | null)[]>([]); // Store refs for all players
    const fetchRef = useRef(false); // Ref to track if fetch is already done

    // Fetch stream URLs from your API when the component mounts
    useEffect(() => {
        const fetchStreamUrls = async () => {
            if (fetchRef.current) return; // If fetch has already been called, skip
            fetchRef.current = true; // Mark that fetch has been called

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

    // Handle mute/unmute toggle for all players
    const handleMuteUnmuteAll = () => {
        setIsMuted((prevMuted) => !prevMuted); // Toggle the mute state

        // Apply the new mute status to all players
        playerRefs.current.forEach((player) => {
            if (player) {
                player.seekTo(0); // Reset video to start
                player.getInternalPlayer().muted = !isMuted; // Mute or unmute
            }
        });
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
        <Container>
            <Typography variant="h4" gutterBottom>
                Video Stream Player Grid
            </Typography>

            {/* Mute/Unmute Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleMuteUnmuteAll}
                style={{ marginBottom: "20px" }}
            >
                {isMuted ? "Unmute All" : "Mute All"}
            </Button>

            <Grid container spacing={2} justifyContent="center">
                {videoStreams.map((url, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={2.4} // Approximates 5 columns in a 12-column grid
                        style={{ maxWidth: "20%" }} // Forces 5 items per row
                        key={index}
                    >
                        <ReactPlayer
                            ref={(el) => (playerRefs.current[index] = el)} // Assign the player ref
                            url={url}
                            playing={true} // Autoplay each video
                            muted={isMuted} // Mute or unmute based on the state
                            controls={true} // Show controls (play/pause, volume, etc.)
                            loop={true} // Loop video playback
                            width="100%" // Full-width player
                            height="auto" // Auto-adjust height
                            volume={0.1} // Set initial volume to 10%
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default App;
