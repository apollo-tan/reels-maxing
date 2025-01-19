import { Box } from "@mui/material";

export const VideoPlayer = ({
    streamUrl,
    isMuted,
}: {
    streamUrl: string;
    isMuted: boolean;
}) => {
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
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Ensure the video fits without cropping
                }}
                autoPlay
                muted={false} // Use the isMuted prop to control mute state
                playsInline
                loop
                src={streamUrl}
            >
                Your browser does not support the video tag.
            </video>
        </Box>
    );
};
