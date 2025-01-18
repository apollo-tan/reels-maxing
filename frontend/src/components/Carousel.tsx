import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { VideoPlayer } from "./VideoPlayer"; // Import your VideoPlayer component
import { DUMMY_VIDEO } from "../dummy";

const Carousel: React.FC = () => {
  const [items, setItems] = useState<number[]>(
    Array.from({ length: 5 }, (_, i) => i + 1)
  );
  const [loading, setLoading] = useState<boolean>(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setItems((prev) => [
          ...prev,
          ...Array.from({ length: 5 }, (_, i) => prev.length + i + 1),
        ]);
      }, 1000); // Simulating fetch delay
    }
  }, [inView, loading]);

  return (
    <Box
      sx={{
        height: "100%", // Full viewport height
        width: "100%",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        flexDirection: "column",
        position: "relative",
        // Hide scrollbar
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Chrome, Safari
        },
      }}
    >
      {items.map((item) => (
        <Box
          key={item}
          sx={{
            height: "100%", // Full viewport height for each box
            display: "flex",
            padding: "1%",
            margin: "1%",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start",
            // Removed the red background and black border
          }}
        >
          <VideoPlayer streamUrl={DUMMY_VIDEO} /> {/* Replace with your video source */}
        </Box>
      ))}
    </Box>
  );
};

export default Carousel;
