import React, { useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';

// Video player component
const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const videoId = videoUrl.split("/").pop(); // Extract video ID from the URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className="video-container">
      <iframe
        width="100%"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const keqingReels = [
  "https://www.youtube.com/shorts/jS0wzCmybRw",
  "https://www.youtube.com/shorts/Z6R6NFAdkQI",
  "https://www.youtube.com/shorts/DttUbAzX-ps",
  "https://www.youtube.com/shorts/WuSRPTJmA_c",
  "https://www.youtube.com/shorts/8-Qt_tkO24I",
  "https://www.youtube.com/shorts/69cktCqTvnM",
  "https://www.youtube.com/shorts/tiE0vYSFNto",
  "https://www.youtube.com/shorts/V9Ac7iggZos",
  "https://www.youtube.com/shorts/UUoriVZcros",
  "https://www.youtube.com/shorts/KyULXThmvjE",
];

// Main App component displaying multiple videos using MUI Grid
const App = () => {
  const [videoUrls, setVideoUrls] = useState(keqingReels);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Multiple Video Reels
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {videoUrls.map((videoUrl, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={2.4} // Approximates 5 columns in a 12-column grid
            style={{ maxWidth: "20%" }} // Forces 5 items per row
            key={index}
          >
            <VideoPlayer videoUrl={videoUrl} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
