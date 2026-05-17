import { useState } from "react";
import getYouTubeID from "get-youtube-id";
import { downloadImage } from "./lib/downloadImage";
import { data } from "./lib/data";

interface thumbnailType {
  url: string;
  width: number;
  height: number;
  fileName: string;
}

const App = () => {
  const [url, setUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<thumbnailType[]>([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const videoId = getYouTubeID(url);
    if (videoId) {
      const model = data.map((item) => {
        return {
          ...item,
          url: `https://i.ytimg.com/vi/${videoId}/${item.fileName}`,
        };
      });

      setThumbnails(model);
    }
  };

  const handleDownload = (url: string, name: string) => {
    if (url) {
      downloadImage(url, name);
    }
  };

  return (
    <div className="bg-gray-400 min-h-screen">
      <div className="text-center text-3xl font-bold pt-8">
        Youtube Thumbnail Download
      </div>
      <form className="space-x-3 text-center mt-8" onSubmit={handleSearch}>
        <input
          type="url"
          className="w-120 max-w-md bg-white rounded-xl p-3"
          placeholder="Enter url..."
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="py-3 px-5 rounded-xl text-white bg-indigo-600">
          Search
        </button>
      </form>
      <div className="grid grid-cols-3 gap-y-5 gap-x-10 w-10/12 mx-auto mt-5">
        {thumbnails &&
          thumbnails.length > 0 &&
          thumbnails.map((thumbnail) => (
            <div className="bg-white rounded-2xl w-90 p-1">
              <img
                src={thumbnail.url}
                alt={thumbnail.fileName}
                className="w-full h-50 rounded-2xl"
              />
              <div className="p-2">
                <h1 className="text-xl font-medium">
                  {thumbnail.width}X{thumbnail.height}
                </h1>
                <button
                  className="py-2 px-5 mt-1 rounded-xl text-white bg-green-600"
                  onClick={() =>
                    handleDownload(thumbnail.url, thumbnail.fileName)
                  }
                >
                  Download
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
