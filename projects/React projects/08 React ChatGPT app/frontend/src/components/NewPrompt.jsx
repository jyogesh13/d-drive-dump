import { useState, useEffect, useRef, useCallback } from "react";
import Upload from "./Upload";
import { Image } from "@imagekit/react";
import Markdown from "react-markdown";


const NewPrompt = ({ data }) => {
  const [userQuestion, setUserQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const endRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, userQuestion, aiResponse, img.dbData]);


  const streamChat = useCallback(
    async (isInitial, text, conversationId) => {
      if (!isInitial) setUserQuestion(text);
      setAiResponse("");

      const contents = Object.entries(img?.aiData).length
        ? [img.aiData, text]
        : text;

      try {
        const res = await fetch("/api/v1/chats/stream", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ conversationId, contents }),
        });

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let aiMessage = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data:")) {
              const payload = JSON.parse(line.replace("data:", "").trim());
              aiMessage += payload.text;
              setAiResponse((prev) => [...prev.slice(0, -1), aiMessage]);
            }
          }
        }
        
      } catch (error) {
        console.error(error);
        setAiResponse("Error generating response.");
      }
    },
    [img.aiData],
  );



  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    streamChat(text, false, data._id);
  };

  // during production we dont need it'
  const hasRun = useRef();

  useEffect(() => {
  if (!data?.history?.length) return;
  if (hasRun.current) return;

  hasRun.current = true;

  queueMicrotask(() => {
    streamChat({
      text: data.history[0].parts[0].text,
      isInitial: true,
      conversationId: data._id,
    });
  });
}, [data._id, data.history, streamChat]);

  return (
    <>
      {img.isLoading && <div>Loading...</div>}
      {img.dbData?.filePath && (
        <Image
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
          src={img.dbData?.filePath}
          width={380}
          height={380}
          alt="Picture of the author"
          loading="lazy" // Use "eager" to load immediately. `lazy` is the default value
          transformation={[{ width: 380 }]}
        />
      )}
      {userQuestion && <div className="user p-3">{userQuestion}</div>}
      {aiResponse && (
        <div className="p-3">
          <Markdown>{aiResponse}</Markdown>
        </div>
      )}
      <div className="pb-24" ref={endRef}></div>
      <form
        className="mt-10 w-[50%] absolute bottom-0 bg-[#2c2937] rounded-2xl flex items-center justify-between gap-2 px-5 py-1 "
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Upload setImg={setImg} />
        <input type="file" name="file" id="file" className="hidden" />
        <input
          className="flex-1 px-1 py-3 bg-transparent border-none outline-none text-[#ececec]"
          name="text"
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="bg-[#605e68] rounded-full border-none cursor-pointer p-2.5 flex items-center justify-center mr-4"
        >
          <img className="w-4 h-4" src="src/assets/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
