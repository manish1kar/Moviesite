import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null); // Reference for the video element

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleLoadVideo = () => {
    if (videoUrl) {
      setIsVideoLoaded(true);
      // Wait for the video element to be ready, then enter fullscreen mode
      setTimeout(() => {
        if (videoRef.current) {
          enterFullscreen(videoRef.current);
        }
      }, 100); // A short delay to ensure video is loaded before attempting fullscreen
    }
  };

  // Function to request fullscreen
  const enterFullscreen = (videoElement) => {
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) { // Firefox
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) { // IE/Edge
      videoElement.msRequestFullscreen();
    }
  };

  return (
    <div className="App">
      <div className="container">
      <div className="copyright">
        &copy; 2024 Manish Wankar
      </div>
        <h1 className="title">My Video Player</h1>
        <footer className="footer">
          <p>Enter a valid video URL and click "Load Video" to start watching in fullscreen mode.</p>
        </footer>

        {/* URL Input and Button aligned side by side */}
        <div className="input-button-container">
          <input
            type="text"
            placeholder="Enter Video URL"
            value={videoUrl}
            onChange={handleInputChange}
            className="video-input"
          />
          <button
            className="load-button"
            onClick={handleLoadVideo}
          >
            Load Video
          </button>
        </div>

        {/* Video Player */}
        {isVideoLoaded && videoUrl && (
          <div className="video-container">
            <video
              ref={videoRef} // Set reference to the video element
              width="100%"
              controls
              autoPlay
              loop
              src={videoUrl}
              className="video-player"
            />
          </div>
        )}


      </div>

    </div>
  );
}

export default App;
