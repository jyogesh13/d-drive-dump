import {
  AddTask,
  Reply,
  ThumbDown,
  ThumbDownOffAlt,
  ThumbUp,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import Comments from "./Comments";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import {
  dislike,
  fetchStart,
  fetchSuccess,
  like,
} from "../redux/video/videoSlice";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { subscription } from "../redux/user/userSlice";
import VideoPlayer from "./VideoPlayer";

const IndividualVideoContent = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [channel, setChannel] = useState({});
  const dispatch = useDispatch();
  const playerRef = useRef(null)

  const path = useLocation().pathname.split("/")[2];


  useEffect(() => {
    const fetchVideo = async () => {
      dispatch(fetchStart());
      try {
        const videoRes = await axios.get(`/api/v1/videos/find/${path}`);
        const channelRes = await axios.get(
          `/api/v1/users/${videoRes.data.data.userId}`
        );
        setChannel(channelRes.data.data);
        dispatch(fetchSuccess(videoRes.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [path, dispatch]);

  const handleLikes = async () => {
    await axios.put(`/api/v1/users/like/${currentVideo._id}`);
    dispatch(like(currentUser?.user._id));
  };

  const handleDislikes = async () => {
    await axios.put(`/api/v1/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser?.user._id));
  };

  const handleSubscribe = async () => {
    try {
      currentUser.user.subscribedUsers.includes(channel?._id)
        ? await axios.post(`/api/v1/users/unsubscribe/${channel?._id}`)
        : await axios.post(`/api/v1/users/subscribe/${channel?._id}`);
      dispatch(subscription(channel?._id));
    } catch (error) {
      console.log(error);
    }
  };
  
  const videoJsOptions = {
    autoplay: false,
    muted:true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: currentVideo?.videoUrl,
      type: 'application/x-mpegURL'
    }],
    poster: currentVideo?.imgUrl
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };


  return (
    <div className="flex gap-[24px] px-4 py-2 overflow-auto webkit-scrollbar:hidden">
      <div className="flex-5">
        {/* content */}
        <div className="border-1 rounded-2xl p-2">
          {/* video container */}
          <VideoPlayer   options={videoJsOptions} onReady={handlePlayerReady}/>
        </div>
        <h1
          className={`text-[18px] font-normal mt-[20px] mb-[10px] text-${({
            theme,
          }) => theme.text}  `}
        >
          {currentVideo?.title}
        </h1>
        <div className="flex items-center justify-between">
          {/* details of video */}
          <span className={`text-${({ theme }) => theme.textSoft}`}>
            {currentVideo?.views} views . {format(currentVideo?.createdAt)}
          </span>
          <div className={`flex gap-[20px] text-${({ theme }) => theme.text}`}>
            <div>
              <button
                className="border py-1 px-3 rounded-3xl flex items-center gap-[5px] cursor-pointer"
                onClick={handleLikes}
              >
                {" "}
                {currentVideo?.likes?.includes(currentUser?.user._id) ? (
                  <ThumbUp />
                ) : (
                  <ThumbUpOffAlt />
                )}{" "}
                {currentVideo?.likes.length}{" "}
              </button>
            </div>
            <div>
              <button
                className="border py-1 px-3 rounded-3xl flex items-center gap-[5px] cursor-pointer"
                onClick={handleDislikes}
              >
                {" "}
                {currentVideo?.dislikes?.includes(currentUser?.user._id) ? (
                  <ThumbDown />
                ) : (
                  <ThumbDownOffAlt />
                )}{" "}
                {currentVideo?.dislikes.length}{" "}
              </button>
            </div>
            <div>
              <button className="border py-1 px-3 rounded-3xl flex items-center gap-[5px] cursor-pointer">
                {" "}
                <Reply /> Share{" "}
              </button>
            </div>
            <div>
              <button className="border py-1 px-3 rounded-3xl flex items-center gap-[5px] cursor-pointer">
                {" "}
                <AddTask /> Save{" "}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`my-[15px] mx-0 border-t-[1px] border-[${({ theme }) =>
            theme.soft}] `}
        ></div>
        <div className="flex justify-between">
          <div className="flex gap-[20px]">
            <img
              className="w-[50px] h-[50px] rounded-full bg-gray-400"
              src=""
              alt=""
            />
            <div
              className={`flex flex-col text-[${({ theme }) => theme.text}] `}
            >
              <span className="font-medium text-[16px]">
                {channel?.username}
              </span>
              <span
                className={`mt-[5px] mb-[20px] text-[${({ theme }) =>
                  theme.textSoft}] text-xs`}
              >
                {channel?.subscribers} subscribers
              </span>
              <p className="text-sm ">{currentVideo?.desc}</p>
            </div>
          </div>
          <div>
            <button
              className={`bg-[#cc1a00] font-medium text-white border-0 rounded-xl py-[10px] px-[20px] cursor-pointer`}
              onClick={handleSubscribe}
            >
              {currentUser?.user.subscribedUsers?.includes(channel._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </button>
          </div>
        </div>
        <div
          className={`my-[15px] mx-0 border-t-[1px] border-[${({ theme }) =>
            theme.soft}] `}
        ></div>
        <Comments videoId={currentVideo?._id} />
      </div>
      <div className="flex-2">
        {/* recommendation */}
        <VideoCard type="sm" video={currentVideo} />
      </div>
    </div>
  );
};

export default IndividualVideoContent;
