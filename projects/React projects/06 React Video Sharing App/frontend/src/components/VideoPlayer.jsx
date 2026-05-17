import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ options, onReady }) => {
  const { currentVideo } = useSelector((state) => state.video);
  const [lastSent, setLastSent] = useState(0);
  const playerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const addToWatchHistory = async () => {
      const current = Math.floor(el.currentTime);
      console.log("current time in video: ", current)
      try {
        if (current - lastSent >= 0) {
          setLastSent(current);
          await axios.post(
            `/api/v1/watchHistory/`,
            { videoId: currentVideo?._id, lastWatchedAtSeconds: current },
            { withCredentials: true },
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    el.addEventListener("timeupdate", addToWatchHistory);
    return () => el.removeEventListener("timeupdate", addToWatchHistory);
  }, [currentVideo?._id, lastSent]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered", "video-js");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
      console.log("videojs player: ", player);

      //ABS configuration
    }
  }, [options, onReady]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
