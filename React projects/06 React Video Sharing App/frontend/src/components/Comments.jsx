import Comment from "./Comment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";


const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const currentComment = useRef();

  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(`/api/v1/comments/${videoId}`);
      console.log("comments: ", res.data);
      setComments(res.data.data);
    };
    getComments();
  }, [videoId]);

  const handleComments = async () => {
    console.log("handleComments triggered!!!");
    const commentDetails = {
      desc: currentComment.current.value,
      videoId,
    };
    console.log("current comment: ", commentDetails);
    const res = await axios.post("/api/v1/comments/", commentDetails);
    console.log("comment posted response: ", res.data);
  };
  


  return (
    <div>
      <div className="flex items-center gap-[10px]">
        <img className="w-[50px] h-[50px] rounded-full bg-gray-300" src={currentUser?.user.profileImg} alt="" />
        <input className={` w-full border-b-[1px] border-[${({ theme }) => theme.soft}] bg-transparent p-[5px] outline-0`} type="text" placeholder="Add a comment..."
          ref={currentComment}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleComments();
            }
          }} />
      </div>
      {comments.map((comment) => {
        return <Comment key={comment?._id} comment={comment} />;
      })}
    </div>
  );
};

Comments.propTypes = {
  videoId: PropTypes.string.isRequired,
};
export default Comments;
