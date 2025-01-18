import React, { useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';

// Video player component
const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const videoId = videoUrl.split("/").pop(); // Extract video ID from the URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-container">
      <iframe
        width="315"
        height="560"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

// Main App component displaying multiple videos using MUI Grid
const App = () => {
  const [videoUrls, setVideoUrls] = useState([
    "https://www.youtube.com/shorts/xmBkyEOw-Nk",
    "https://www.youtube.com/shorts/yxJok8yu9SE",
    "https://www.youtube.com/shorts/BXnRBZtvxKA",
    "https://www.youtube.com/shorts/6WUqU4K_-MQ",
    "https://www.youtube.com/shorts/LcVI3AOiPto"
  ]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Multiple Video Reels
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {videoUrls.map((videoUrl, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <VideoPlayer videoUrl={videoUrl} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
