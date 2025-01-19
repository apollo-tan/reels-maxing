import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import VideoPlayer from "./VideoPlayer"; // Import your VideoPlayer component

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

  // Calculate the number of boxes needed for the current carousel
  const renderVideoStreams = videoStreams.slice(index * 15, (index + 1) * 15);

  // Lazy load state: an array to track which video streams are in view
  const [inView, setInView] = useState<boolean[]>(
    new Array(renderVideoStreams.length).fill(false)
  );

  // Intersection Observer callback to handle visibility
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry, idx) => {
      console.log(`Video ${idx} is intersecting: ${entry.isIntersecting}`);
      if (entry.isIntersecting) {
        setInView(prevInView => {
          const newInView = [...prevInView];
          newInView[idx] = true; // Mark this video as in view
          return newInView;
        });
      } else {
        setInView(prevInView => {
          const newInView = [...prevInView];
          newInView[idx] = false; // Mark this video as out of view
          return newInView;
        });
      }
    });
  };

  // Setup IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: carouselRef.current,
      rootMargin: "0px", // This margin ensures the observer triggers when the video is within the carousel container
      threshold: 0.5, // Trigger when 50% of the element is in view
    });

    const elements = document.querySelectorAll(".video-container");
    elements.forEach(element => {
      observer.observe(element);
    });

    // Cleanup observer on component unmount
    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [renderVideoStreams]);

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
          className="video-container" // Marking the video container for IntersectionObserver
          sx={{
            height: "100%", // Full viewport height for each box
            display: "flex",
            padding: "1%",
            margin: "1%",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start",
          }}
        >
          {/* Only render the VideoPlayer if it's in view */}
          {inView[idx] && <VideoPlayer streamUrl={stream} isMuted={isMuted} />}
        </Box>
      ))}
    </Box>
  );
};

export default Carousel;
