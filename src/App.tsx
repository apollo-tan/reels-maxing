import React, { useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';

// Video player component
const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div className="video-container">
      <video width="100%" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
