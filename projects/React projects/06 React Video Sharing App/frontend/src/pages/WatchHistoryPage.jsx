// src/pages/WatchHistoryPage.jsx
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
  Chip,
  Avatar,
  Skeleton,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HistoryIcon from "@mui/icons-material/History";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { format } from "timeago.js";

const WatchHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/watchHistory", {
        withCredentials: true,
      });
      setHistory(res.data.data.history);
    } catch (err) {
      console.error(err);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handlePlay = (video) => {
    navigate(`/video/${video._id}`);
  };

  const handleRemoveFromHistory = async (videoId) => {
    try {
      // adjust route/method according to your backend
      await axios.delete(`/api/v1/watchHistory/${videoId}`, {
        withCredentials: true,
      });
      setHistory((prev) => prev.filter((v) => v._id !== videoId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    try {
      // adjust route/method according to your backend\
      await axios.delete(`/api/v1/watchHistory/`, { withCredentials: true });
      setHistory([]);
    } catch (err) {
      console.error(err);
    }
  };

  const renderSkeleton = () => (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={i}
          className="flex flex-col bg-gray-900/60 border border-gray-800"
        >
          <Skeleton variant="rectangular" height={180} />
          <CardContent>
            <Skeleton width="80%" />
            <Skeleton width="60%" />
            <div className="mt-2 flex gap-2">
              <Skeleton width={40} height={24} />
              <Skeleton width={40} height={24} />
            </div>
          </CardContent>
          <CardActions className="flex justify-between">
            <Skeleton width={80} />
            <Skeleton width={80} />
          </CardActions>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen  text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600/80">
              <HistoryIcon className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold sm:text-2xl">
                Watch History
              </h1>
              <p className="text-sm text-slate-400">
                Continue watching your recently viewed videos.
              </p>
            </div>
          </div>

          {history.length > 0 && (
            <div className="flex items-center gap-2">
              <Tooltip title="Refresh">
                <IconButton
                  size="small"
                  onClick={fetchHistory}
                  className="!text-slate-300 hover:!text-sky-400"
                >
                  <ReplayIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <button
                onClick={handleClearAll}
                className="rounded-full border border-red-500/60 px-3 py-1 text-xs font-medium text-red-400 hover:border-red-400 hover:bg-red-500/10"
              >
                Clear all
              </button>
            </div>
          )}
        </header>

        {/* Empty state */}
        {!loading && history.length === 0 && (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <Avatar className="mb-4 h-16 w-16 bg-slate-800">
              <HistoryIcon />
            </Avatar>
            <p className="text-lg font-medium">No watch history yet</p>
            <p className="mt-1 max-w-md text-sm text-slate-400">
              Start watching videos and they will appear here so you can easily
              continue where you left off.
            </p>
            <NavLink to={"/"}>
              <button className="mt-4 rounded-full bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-500 cursor-pointer">
                Browse videos
              </button>
            </NavLink>
          </div>
        )}

        {/* List */}
        {loading
          ? renderSkeleton()
          : history.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {history.map((item) => (
                  <Card
                    key={item._id}
                    className=" w-[23vw] flex flex-col bg-gray-900/70 border border-gray-800 hover:border-sky-700/70 hover:shadow-lg hover:shadow-sky-900/40 transition-all"
                  >
                    <div
                      className="relative cursor-pointer"
                      onClick={() => handlePlay(item.video)}
                    >
                      <CardMedia
                        component="img"
                        height="80"
                        image={item.video.imgUrl}
                        alt={item.video.title}
                        className="object-cover h-[30vh]"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-medium text-white">
                          <PlayArrowIcon fontSize="small" />
                          Play again
                        </div>
                      </div>
                    </div>

                    <CardContent className="flex flex-1 flex-col gap-1 ">
                      <div className="flex items-center justify-between">
                        <Typography
                          variant="subtitle1"
                          className=" font-semibold text-slate-500 "
                        >
                          {item.video.title}
                        </Typography>
                        <Tooltip title="Remove from history">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleRemoveFromHistory(item.video._id)
                            }
                            className="!text-slate-400 hover:!text-red-400"
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>

                      <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                        <span>{item.video.views} views</span>
                        {/* If you store createdAt, you can show time here */}
                        <span>{format(item?.lastWatchedAt)}</span>
                      </div>

                      {item.video.tags && item.video.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.video.tags.slice(0, 3).map((tag, idx) => (
                            <Chip
                              key={idx}
                              label={`#${tag}`}
                              size="small"
                              className="!bg-slate-800 !text-slate-200 !text-[11px]"
                            />
                          ))}
                          {item.video.tags.length > 3 && (
                            <span className="text-[11px] text-slate-500">
                              +{item.video.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
      </div>
    </div>
  );
};

export default WatchHistoryPage;
