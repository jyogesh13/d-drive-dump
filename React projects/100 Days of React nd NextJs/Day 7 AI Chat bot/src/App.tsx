import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { aiResponse } from "./lib/aiResponse";
import Markdown from "react-markdown";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<
    { id: string; role: "user" | "ai"; content: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to the bottom reference
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateChat = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = prompt;
    setPrompt(""); // Clear input

    // 1. Add User message and an empty AI placeholder to the UI
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: userMessage },
      { id: crypto.randomUUID(), role: "ai", content: "" },
    ]);

    setIsTyping(true);

    try {
      // 2. Call the streaming function (ensure you renamed it to aiResponseStream in lib)
      await aiResponse(userMessage, (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          // Append chunk to the last message (the AI placeholder)
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: updated[lastIndex].content + chunk,
          };
          return updated;
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to get response");
      }
    } finally {
      setIsTyping(false);
    }
  };

  // Trigger scroll every time 'messages' state updates
  useEffect(() => {
    scrollToBottom();
  }, [prompt]);
  return (
    <div className="bg-[#0a0a0f] h-screen text-white flex flex-col   ">
      <div className="w-9/12 mx-auto h-screen overflow-y-auto no-scrollbar ">
        <div className="flex-1 p-10 space-y-3  ">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`w-70 md:w-1/2 xl:w-[65%] flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "ai" && (
                  <p className="p-2 rounded-xl bg-[#1a1a24] w-15 h-10 text-center text-xl text-gray-400">
                    Ai
                  </p>
                )}

                <p className="bg-[#1e1d30] p-3 rounded-xl rounded-tr-sm text-[16px] font-medium wrap-break-word whitespace-pre-wrap">
                  {(msg.role === "ai" ? (
                    <Markdown>{msg.content}</Markdown>
                  ) : (
                    msg.content
                  )) ||
                    (isTyping && index === messages.length - 1 ? "..." : "")}
                </p>

                {msg.role === "user" && (
                  <p className="p-2 rounded-xl bg-[#1a1a24] w-15 h-10 text-center text-xl text-gray-400">
                    M
                  </p>
                )}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="w-60 sm:w-5/10 xl:w-6/10 mx-auto bg-[#111118] focus:border focus:shadow-blue-200 rounded-xl px-2 mb-3">
        <form
          className=" flex items-center justify-center gap-3"
          onSubmit={generateChat}
        >
          <input
            type="text"
            placeholder="Type prompt here..."
            className="w-full p-6  rounded outline-none text-sm text-gray-400 "
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="bg-[#1a1a23] p-2 mr-3 rounded-xl hover:scale-105 transition-transform duration-300 hover:bg-[#3a3a43]">
            <Send />
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
