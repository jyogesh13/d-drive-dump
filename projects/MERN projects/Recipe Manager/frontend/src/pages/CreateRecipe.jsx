import { Add } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [photo, setPhoto] = useState(null);

  const handleTags = () => {
    console.log(tagInput);
    setTags([...tags, tagInput]);
    setTagInput(" ");
  };

  const handleTagRemoval = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("ingredients", ingredients);
      data.append("steps", steps);
      data.append("tags", JSON.stringify(tags));
      data.append("photo", photo);
       
      const res = await axios.post("/api/v1/recipes/", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-3 justify-center mt-20 mx-2">
      {photo && (
        <img
          className="w-[50vw] h-[70vh] rounded-lg  object-cover"
          src={URL.createObjectURL(photo)}
          alt=""
        />
      )}
      <form className="flex flex-col gap-4 justify-center  relative py-2 w-[50vw]">
        
          <div className="flex justify-start items-center px-2 gap-3 ">
            <label
              htmlFor="fileInput"
              className="w-[25px] h-[25px] rounded-full flex justify-center items-center border border-gray-300 cursor-pointer"
            >
              <Add />
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Title"
              className="w-full h-10 px-1 text-2xl focus:outline-0"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="px-5">
            <textarea
              name=""
              id=""
              placeholder="Describe your recipe..."
              className="w-full text-2xl h-[10vh] focus:outline-0 bg-gray-300 rounded-2xl p-2"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="px-5">
            <textarea
              name=""
              id=""
              placeholder="Mention the Ingredients..."
              className="w-full text-2xl h-[10vh] focus:outline-0 bg-gray-300 rounded-2xl p-2"
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <div className="px-5">
            <textarea
              name=""
              id=""
              placeholder="Describe the steps...."
              className="w-full text-2xl h-[10vh] focus:outline-0 bg-gray-300 rounded-2xl p-2"
              onChange={(e) => setSteps(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full text-2xl px-5 focus:outline-0  rounded-2xl p-2">
            {tags.map((tag) => {
              return (
                <span
                  key={tags.indexOf(tag)}
                  className="inline-flex items-center bg-success-soft border border-success-subtle text-fg-success-strong text-xs font-medium ps-1.5 pe-0.5 py-2 px-3 rounded gap-1 "
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    className="inline-flex items-center p-0.5 text-sm bg-transparent rounded-xs hover:bg-success-medium"
                    aria-label="Remove"
                    onClick={() => handleTagRemoval(tag)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                    <span className="sr-only">Remove badge</span>
                  </button>
                </span>
              );
            })}
          </div>
          <div className="px-5">
            <input
              name="tags"
              id="tags"
              type="text"
              placeholder="Tags..."
              className="w-full text-2xl h-[10vh] focus:outline-0 bg-gray-300 rounded-2xl p-2"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTags();
                }
              }}
            />
          </div>
          <button
            className="w-[46vw] text-2xl border p-2 mx-auto rounded-xl bg-teal-600 text-white cursor-pointer"
            onClick={handleSubmit}
          >
            Publish
          </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
