import "remixicon/fonts/remixicon.css";
import "animate.css";
import { avatarStyles, urlObj } from "./lib/data";
import { useCallback, useEffect, useState } from "react";
import { downloadAvatar } from "./lib/downloadAvatar";

function App() {
  const [src, setSrc] = useState("");
  const [option, setOption] = useState("men");

  const generate = useCallback(() => {
    if (option === "men" || option === "women") {
      const randomValue = Math.floor(Math.random() * 100) + 1;
      const url = `${urlObj.randomUser}/${option}/${randomValue}.jpg`;
      setSrc(url);
    } else {
      const uniqueValue = Date.now();
      const url = `${urlObj.dicebar}/${option}/svg?seed=${uniqueValue}&backgroundColor=b6e3f4`;
      setSrc(url);
    }
  }, [option]);

  const handleDownload = () => {
    if (src) {
      downloadAvatar(src, option);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(src);
    alert('Copied to clipboard')
  };

  useEffect(() => {
    (() => {
      generate();
    })();
  }, [option, generate]);
  console.log(src);
  return (
    <div className="animate__animated animate__fadeIn overflow-hidden w-full min-h-screen bg-linear-to-br from-slate-900 via-slate-600 to-slate-900 flex items-center justify-center text-white">
      <div className="animate__animated animate__backInUp w-full max-w-md rounded-xl shadow-2xl backdrop-blur-md px-6 py-8 flex flex-col items-center gap-6">
        <img
          src={src || "src/assets/avt.jpg"}
          alt="avatar"
          className="w-25 h-25 rounded-full object-cover"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold tracking-wider text-center">
            Avatar Generator
          </p>
          <p className="text-xs font-bold tracking-wider text-center text-gray-400">
            Generate unlimited avatars for your website
          </p>
        </div>
        <div className="w-full space-y-3">
          <select
            name="category"
            id="category"
            className="w-full bg-slate-800/60 rounded-xl p-2 focus:outline-0"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          >
            {avatarStyles.map(
              (item: { label: string; value: string }, index: number) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ),
            )}
          </select>
          <div className="w-full bg-slate-800/60 rounded-xl p-2 focus:outline-0">
            {src}
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-3">
          <button
            onClick={generate}
            className="flex-1 bg-linear-to-r from-rose-500 to-orange-600 font-medium rounded-lg p-2 hover:scale-105 transition-transform"
          >
            <i className="ri-arrow-right-up-line mr-1"></i>
            Change
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 bg-linear-to-r from-green-500 to-cyan-600 font-medium rounded-lg p-2 hover:scale-105 transition-transform"
          >
            <i className="ri-download-line mr-1"></i>
            Download
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 bg-linear-to-r from-orange-500 to-amber-600 font-medium rounded-lg p-2 hover:scale-105 transition-transform"
          >
            <i className="ri-file-copy-line mr-1"></i>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
