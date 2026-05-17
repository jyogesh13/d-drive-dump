import { useState } from "react";
import axios from "axios"
import { NavLink, useNavigate } from "react-router";
import { Close } from "@mui/icons-material";

const Create = ({ setOpen }) => {
  const [thumbnail, setThumbnail] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [inputs, setInputs] = useState({})
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleTags = (e)=>{
    setTags(e.target.value.split(","))
  }

  const handleChange = (e)=>{
    setInputs((prev)=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleUpload = async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", inputs.title)
    formData.append("desc", inputs.desc)
    formData.append("thumbnail",thumbnail)
    formData.append("video",video)
    formData.append("tags",tags)
    const res = await axios.post("/api/v1/videos", formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
    setOpen(false)
    res.data.statusCode == 200 && navigate(`/video/{${res.data.data._id}} `)
  }

  return (
    <div className="w-full absolute top-20 left-0  flex items-center justify-center z-10">
      <div
        className={` w-[40vw] h-[42vw] dark:bg-slate-800 text-[${({ theme }) =>
          theme.text}] relative rounded-3xl border`}
      >
        <div className="absolute top-2 right-4 cursor-pointer text-2xl font-bold  p-1">
          <NavLink to={"/"}>
              <p><Close/></p>
          </NavLink>
        </div>
        <div className="flex flex-col items-center gap-10 w-full h-full rounded-3xl px-4 py-2">
          <h1 className="text-4xl">Upload a New Video</h1>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center gap-3">
              <label htmlFor="videoFile">Video:</label>
              <input
                className="py-2 border w-full border-gray-600 rounded-2xl px-2"
                id="videoFile"
                type="file"
                accept="video/*"
                onChange={(e)=>setVideo(e.target.files[0])}
              />
            </div>
            <input
              className="py-2 border  border-gray-600 rounded-2xl px-2 outline-0"
              type="text"
              name="title"
              id=""
              placeholder="Title.."
              onChange={handleChange}
            />
            <textarea
              className="py-2 border  border-gray-600 rounded-2xl px-2 outline-0"
              name="desc"
              id=""
              rows={8}
              placeholder="Description"
              onChange={handleChange}
            />
            <input
              className="py-2 border border-gray-600 rounded-2xl px-2 outline-0 "
              type="text"
              placeholder="Separate the tags with commas"
              onChange={handleTags}
            />
            <div className="flex items-center gap-3">
              <label htmlFor="thumbnailImg">Thumbnail:</label>
              <input
                className="py-2 border w-full border-gray-600 rounded-2xl px-2"
                type="file"
                name=""
                id="thumbnailImg"
                accept="image/*"
                placeholder="Thumbnail.."
                onChange={(e)=>setThumbnail(e.target.files[0])}
              />
            </div>
            <button className="border py-2 rounded-2xl border-gray-600 cursor-pointer dark:hover:bg-gray-800 " onClick={handleUpload}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
