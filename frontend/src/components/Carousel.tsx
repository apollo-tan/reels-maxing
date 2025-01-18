import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { VideoPlayer } from "./VideoPlayer"; // Import your VideoPlayer component
import { DUMMY_VIDEO } from "../dummy";

interface CarouselProps {
  scrollTop: number;
}

const Carousel: React.FC<CarouselProps> = ({ scrollTop }) => {
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
      {Array.from({ length: 5 }).map((_, index) => (
        <Box
          key={index}
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
          <VideoPlayer streamUrl={DUMMY_VIDEO} />
        </Box>
      ))}
    </Box>
  );
};

export default Carousel;
