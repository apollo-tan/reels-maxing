import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { VideoPlayer } from "./VideoPlayer"; // Import your VideoPlayer component

interface CarouselProps {
    scrollTop: number;
    videoStreams: string[];
    index: number;
    isMuted: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
    scrollTop,
    videoStreams,
    index,
    isMuted,
}) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    // Scroll the carousel to the new scrollTop position smoothly
    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({
                top: scrollTop,
                behavior: "smooth", // Smooth scroll behavior
            });
        }
    }, [scrollTop]);
    console.log("hi");
    console.log(videoStreams.length);
    // Calculate the number of boxes needed for the current carousel
    const renderVideoStreams = videoStreams.slice(index * 15, (index + 1) * 15);
    console.log(renderVideoStreams.length)

    return (
        <Box
            ref={carouselRef}
            sx={{
                height: "100%",
                width: "100%",
                overflowY: "scroll",
                scrollSnapType: "y mandatory",
                flexDirection: "column",
                position: "relative",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                    display: "none", // Chrome, Safari
                },
            }}
        >
            {/* Render items inside the carousel */}
            {renderVideoStreams.map((stream, idx) => (
                <Box
                    key={idx}
                    sx={{
                        height: "100%", // Full viewport height for each box
                        display: "flex",
                        padding: "1% ",
                        margin: "1%",
                        alignItems: "center",
                        justifyContent: "center",
                        scrollSnapAlign: "start",
                    }}
                >
                    <VideoPlayer streamUrl={stream} isMuted={isMuted} />
                </Box>
            ))}
        </Box>
    );
};

export default Carousel;
