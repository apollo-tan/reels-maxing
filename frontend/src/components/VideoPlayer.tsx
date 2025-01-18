// Video player component for a video stream
export const VideoPlayer = ({ streamUrl }: { streamUrl: string }) => {
  return (
    <div className="video-container">
      <video
        // width="100%"
        height="100%"
        autoPlay
        muted
        playsInline
        loop
        src={streamUrl}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
