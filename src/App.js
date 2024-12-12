import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState(''); // Store the identifier entered by the user
  const [tempvideoUrl, setTempVideoUrl] = useState(''); // Store the identifier entered by the user temporarily
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // Track if video is loaded
  const videoRef = useRef(null); // Reference for the video element

  // Handle input field change (user enters the identifier)
  const handleInputChange = (event) => {
    setTempVideoUrl(event.target.value); // Update the temp video URL state
  };

  // Handle the video load logic when the user clicks "Load Video"
  const handleLoadVideo = () => {
    // Update the actual video URL only when "Load Video" is clicked
    setVideoUrl(tempvideoUrl);

    if (tempvideoUrl) {
      // Reset the video and reload with the new identifier
      setIsVideoLoaded(false); // Temporarily set to false to force re-render

      // After a brief delay, set to true to reload the video with the new source
      setTimeout(() => {
        setIsVideoLoaded(true); // Trigger re-render to load the video
      }, 100);

      // Optionally, enter fullscreen after a short delay
      setTimeout(() => {
        if (videoRef.current) {
          enterFullscreen(videoRef.current);
        }
      }, 200); // Small delay to ensure video has loaded before attempting fullscreen
    }
  };

  // Function to request fullscreen mode for the video
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
          <p>Enter a valid video code and click "Load Video" to start watching in fullscreen mode.</p>
        </footer>

        {/* URL Input and Buttons aligned side by side */}
        <div className="input-button-container">
          <input
            type="text"
            placeholder="Enter Video Identifier"
            value={tempvideoUrl} // Bind input field to tempvideoUrl state
            onChange={handleInputChange} // Update tempvideoUrl state on change
            className="video-input"
          />
          <button
            className="load-button"
            onClick={handleLoadVideo} // Load video when clicked
          >
            Load Video
          </button>

          {/* Fullscreen Button */}
          {isVideoLoaded && (
            <button
              className="fullscreen-button"
              onClick={() => enterFullscreen(videoRef.current)} // Enter fullscreen on click
            >
              Full Screen
            </button>
          )}
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
              // Construct the full URL dynamically, using the identifier
              src={`https://shorturl.at/${videoUrl}`} 
              className="video-player"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
