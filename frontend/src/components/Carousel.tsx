import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

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
        setItems(prev => [
          ...prev,
          ...Array.from({ length: 5 }, (_, i) => prev.length + i + 1),
        ]);
      }, 1000); // Simulating fetch delay
    }
  }, [inView, loading]);

  return (
    <Box
      sx={{
        height: "100vh", // Full viewport height
        width: "100vw",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        flexDirection: "column",
        position: "relative"
      }}
    >
      {items.map(item => (
        <Box
          key={item}
          sx={{
            height: "100vh", // Full viewport height for each box
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start",
            background: generateRandomColor(), // Random background color
            border: "1px solid black", // Optional: Add border for visibility
          }}
        >
          Box {item}
        </Box>
      ))}
    </Box>
  );
};

export default Carousel;
