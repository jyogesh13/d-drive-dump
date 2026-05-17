import "animate.css";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { downloadImage } from "./lib/downloadImage";

interface Photo {
  id: number;
  src: { original: string; medium: string };
  alt: string;
  photographer: string;
  photographer_url: string;
}

const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("people");

  const fetchPhotos = useCallback(async () => {
    const options = {
      headers: {
        Authorization: import.meta.env.VITE_PEXEL_API_KEY as string,
      },
    };
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`,
        options,
      );
      setPhotos([...photos, ...res.data.photos]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  }, [page, query]);

  const handleDownload = (src: string, id: number) => {
    if (src) {
      downloadImage(src, id);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const search = (e) => {
    e.preventDefault();
    setPhotos([]);
    setQuery(e.target[0].value.trim());
  };

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return (
    <div className=" bg-gray-100 min-h-screen flex flex-col items-center gap-12 p-4 animate__animated animate__fadeIn">
      <div className="w-full text-3xl  lg:text-4xl font-bold text-indigo-600 flex justify-center gap-2">
        <img src="src/assets/camera.png" alt="" className="w-12 h-10" /> Image
        Generator
      </div>
      <form
        className="w-full text-center flex justify-center items-center "
        onSubmit={search}
      >
        <input
          type="text"
          className="w-full lg:w-120 bg-gray-200 py-2 px-3 rounded-l-lg focus:outline-violet-400"
          placeholder="Search..."
        />
        <button className=" py-2 px-4 rounded-r-lg bg-linear-to-br from-indigo-600 via-violet-500 to-indigo-600 text-white cursor-pointer hover:scale-105 transition-transform">
          Search
        </button>
      </form>
      {photos.length === 0 && (
        <h1 className="text-lg font-bold text-center">
          Search result not found
        </h1>
      )}
      <div className="w-[70%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-x-10 px-4">
        {photos.map(
          ({
            id,
            src,
            alt,
            photographer,
            photographer_url,
          }: {
            id: number;
            src: { original: string; medium: string };
            alt: string;
            photographer: string;
            photographer_url: string;
          }) => (
            <div
              className="bg-gray-100 w-full md:w-60  rounded-xl flex flex-col mb-3"
              key={id}
            >
              <img
                src={src.medium}
                alt={alt}
                className="w-full h-45 object-cover rounded-t-lg hover:scale-110 transition-transform duration-300 "
              />
              <div className="p-2 space-y-2">
                <h1 className="">
                  Author:{" "}
                  <a
                    href={photographer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-gray-600 capitalize text-ellipsis font-medium"
                  >
                    {photographer}
                  </a>
                </h1>
                <button
                  className="w-full h-10 py-2 px-4 rounded-lg bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br text-white cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    handleDownload(src.original, id);
                  }}
                >
                  Download
                </button>
              </div>
            </div>
          ),
        )}
      </div>
      {loading && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {photos.length > 0 && (
        <button
          className="bg-rose-500 rounded-lg py-3 px-5 hover:scale-110 transition-transform duration-300 text-white"
          onClick={loadMore}
        >
          Load more
        </button>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
