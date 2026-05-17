import { format } from "timeago.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const Comment = ({ comment }) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(`/api/v1/users/${comment?.userId._id}`);
      setUserDetails(res.data.data);
    };
    fetchDetails();
  }, [comment?.userId._id]);

  return (
    <div className="flex gap-[10px] my-[30px] mx-[0px] p-1 border">
      <img
        className="w-[50px] h-[50px] rounded-full bg-gray-300"
        src={userDetails.profileImg}
        alt=""
      />

      <div
        className={`flex flex-col gap-[10px] text-[${({ theme }) => theme.text};]`}
      >
        <span className="text-[13px] font-bold">
          {comment.userId.username}{" "}
          <span
            className={`text-[12px] font-semibold text-[ ${({ theme }) => theme.textSoft}] ml-[5px]`}
          >
            {format(comment.createdAt)}
          </span>
        </span>
        <span className="text-[14px]">{comment.desc}</span>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
