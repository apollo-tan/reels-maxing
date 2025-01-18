import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { VideoPlayer } from "./VideoPlayer"; // Import your VideoPlayer component

interface CarouselProps {
  scrollTop: number;
  videoStreams: string[];
  index: number;
}

const Carousel: React.FC<CarouselProps> = ({ scrollTop, videoStreams, index }) => {
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

  // Calculate the number of boxes needed for the current carousel
  const renderVideoStreams = videoStreams.slice(index * 5, (index + 1) * 5);

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
          <VideoPlayer streamUrl={stream} />
        </Box>
      ))}
    </Box>
  );
};

export default Carousel;
