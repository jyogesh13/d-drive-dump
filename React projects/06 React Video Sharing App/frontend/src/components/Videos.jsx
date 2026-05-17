import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { NavLink } from "react-router-dom";
import axios from "axios";


const Videos = ({type}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/v1/videos/${type}`);
      setVideos(res.data.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <div className="flex flex-wrap gap-[10px] p-[10px]">
      {videos.map((video) => {
        return <NavLink key={video._id} to={`/video/${video._id}`} style={{ "text-decoration": "none" }}>
          <VideoCard video={video} />
        </NavLink>;
      })}
      
    </div>
  );
};

export default Videos;
