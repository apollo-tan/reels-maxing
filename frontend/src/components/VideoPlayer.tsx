import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

export const VideoPlayer = ({
    streamUrl,
    isMuted,
}: {
    streamUrl: string;
    isMuted: boolean;
}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Effect to update video volume and mute state
    useEffect(() => {
        if (videoRef.current) {
            // Set volume to 10% (0.1)
            videoRef.current.volume = 0.1;

            // Apply mute state based on the isMuted prop
        }
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <video
                ref={videoRef}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Ensure the video fits without cropping
                }}
                autoPlay
                playsInline
                loop
                src={streamUrl}
                muted={false}
            >
                Your browser does not support the video tag.
            </video>
        </Box>
    );
};
