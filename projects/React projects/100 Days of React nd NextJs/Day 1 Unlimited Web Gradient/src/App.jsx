import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [retry, setRetry] = useState(false);
  const [gradients, setGradients] = useState([]);
  const [userChoice, setUserChoice] = useState("");

  const generateHexCode = () => {
    const rgb = 255 ** 3;
    const int = Math.floor(Math.random() * rgb);
    const hexCode = int.toString(16);
    const colorCode = hexCode.padStart(6, "0");
    return `#${colorCode}`;
  };

  const generateGradient = useCallback(() => {
    let colors = [];
    for (let i = 0; i < num; i++) {
      const color1 = generateHexCode();
      const color2 = generateHexCode();
      const degree = `${Math.floor(Math.random() * 360)}deg`;
      colors.push({
        id: i,
        gradient: `linear-gradient(${degree}, ${color1}, ${color2})`,
        css: `background: "linear-gradient(${degree}, ${color1}, ${color2})"`,
      });
    }

    setGradients(colors);
  }, [num]);

  const generateRadialGradient = useCallback(() => {
    let colors = [];
    for (let i = 0; i < num; i++) {
      const color1 = generateHexCode();
      const color2 = generateHexCode();
      const color3 = generateHexCode();

      colors.push({
        id: i,
        gradient: `radial-gradient(circle, ${color1}, ${color2} 50%, ${color3} 75%)`,
        css: `background: "radial-gradient(circle, ${color1} 0%, ${color2} 50%, ${color3} 100%)"`,
      });
    }
    setGradients(colors);
  }, [num]);

  useEffect(() => {
    if (type === "linear") {
      generateGradient();
    } else if (type === "radial") {
      generateRadialGradient();
    }
  }, [num, type, retry, generateGradient, generateRadialGradient]);

  const handleCopy = async (item) => {
    await navigator.clipboard.writeText(item.css);
    console.log(item.gradient);
    setUserChoice(item.gradient);
    toast.success("Gradient code copied !", { position: "top-right" });
  };
  return (
    <div
      className="min-h-screen py-12"
      style={{
        background: `${userChoice}` || "linear-gradient(225deg, #0ab967, #ac8dbe)",
      }}
    >
      <div className="w-[75vw] mx-auto space-y-8">
        <div className="flex flex-col items-center justify-between gap-3">
          <div>
            <h1 className="text-7xl font-bold">Gradient Generator</h1>
          </div>
          <div className="flex gap-2">
            <input
              className="p-2 w-[100px] rounded-lg bg-slate-200"
              type="number"
              placeholder="12"
              value={num}
              onChange={(e) => setNum(Number(e.target.value))}
            />
            <select
              className="p-2 w-[100px] rounded-lg bg-slate-200 "
              name=""
              id=""
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button
              className="p-2 w-[100px] rounded-lg bg-slate-200 cursor-pointer"
              onClick={() => setRetry(!retry)}
            >
              Generate
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 ">
          {gradients.map((item) => {
            return (
              <div
                key={item.id}
                className=" w-[17vw] h-[12vw] relative rounded-lg  "
                style={{
                  background: item.gradient,
                }}
                onClick={() => setUserChoice(item.gradient)}
              >
                <button
                  className="bg-black/50 hover:bg-black p-1 text-[10px] cursor-pointer text-white rounded absolute bottom-3 right-3"
                  onClick={() => handleCopy(item)}
                >
                  Copy
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
