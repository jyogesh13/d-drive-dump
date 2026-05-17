import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";

const VideoCard = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/v1/users/${video?.userId}`);
      setChannel(res.data.data);
    };
    fetchVideos();
  }, [video?.userId]);

  return (
    <>
      <div
        className={`flex ${type === "sm" ? "w-[23vw]" : "w-[25vw] flex-col"} gap-2 mb-5`}
      >
        {/* Video thumbnail image */}
        <img
          className={`${type === "sm" ? "w-[200px] h-[110px]" : "h-[250px]"} bg-[#999] rounded-xl`}
          src={video?.imgUrl}
          alt=""
        />
        <div
          className={`flex items-start gap-[12px] ${type === "sm" ? "w-40" : "mt-[16px]"} px-[5px] py-0`}
        >
          {/* profile pic */}
          <img
            className={`w-[36px] h-[36px] rounded-full ${type === "sm" ? "hidden" : ""}`}
            src={channel?.img}
            alt=""
          />
          {/* Video Info */}
          <div className="flex flex-col gap-1 min-w-0">
            {/* title */}
            <h1
              className={`${type === "sm" ? "text-[14px]" : "text-[16px]"} font-semibold text-[${({ theme }) => theme.text}] text-ellipsis line-clamp-2`}
            >
              {video?.title}
            </h1>
            {/* channel name */}
            <h2
              className={`${type === "sm" ? "text-[14px]" : "text-[16px]"} text-[${({ theme }) => theme.textSoft}]  `}
            >
              {channel.username}
            </h2>
            {/* video info */}
            <p
              className={`${type === "sm" ? "text-[14px]" : "text-[16px]"} text-[${({ theme }) => theme.textSoft}]`}
            >
              {video?.views} views . {format(video?.createdAt)}
            </p>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default VideoCard;
