import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // const mutation = useMutation({
  //   mutationFn: async (content) => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/v1/chats/stream`,
  //       {
  //         method: "POST",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ content }),
  //       },
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  //     }
  //     return response.json();
  //   },
  //   onSuccess: (data) => {
  //     // Invalidate and refetch
  //     console.log(data);
  //     queryClient.invalidateQueries({ queryKey: ["chatsList"] });
  //     // navigate(`/dashboard/chats/${convId}`);
  //   },
  //   onError: (error) => {
  //     console.error("Mutation failed:", error);
  //   },
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.text.value.trim();
    if (!content) return;
    e.target.text.value = "";
    // mutation.mutate(content);
    console.log("content: ", content);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/chats/stream`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      },
    );
    // let buffer = ""; // Store partial data here
    let convId = "";
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    // Read the stream chunk by chunk
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunk = decoder.decode(value);

      // Parse the SSE "data: ..." lines
      const lines = chunk.split("\n\n");

      lines.forEach((line) => {
        if (line.startsWith("data: ")) {
          const data = JSON.parse(line.replace("data: ", ""));
          if(data.convId){
            convId = data.convId
          }
          console.log()
        }
      });
    }

    navigate(`/dashboard/chats/${convId}`);
  };

  return (
    <div className="p-5 flex flex-col justify-center items-center w-[50%] h-full mx-auto ">
      <div className="flex flex-col gap-3 items-center mt-auto ">
        <div className="flex gap-2 justify-center items-center">
          <img
            className="w-13 h-13 opacity-30"
            src="src/assets/logo.png"
            alt=""
          />
          <h1 className="text-6xl font-bold opacity-30 bg-linear-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent ">
            LAMA AI
          </h1>
        </div>
        <div className="flex justify-between items-center  w-full mt-10 gap-10">
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-5 border border-[#555] rounded-2xl">
            <img
              className="w-10 h-10 object-cover"
              src="src/assets/chat.png"
              alt=""
            />
            <span>Create a New Chat</span>
          </div>
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-5 border border-[#555] rounded-2xl">
            <img
              className="w-10 h-10 object-cover"
              src="src/assets/image.png"
              alt=""
            />
            <span>Analyze images</span>
          </div>
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-4 border border-[#555] rounded-2xl">
            <img
              className="w-10 h-10 object-cover"
              src="src/assets/code.png"
              alt=""
            />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="mt-auto w-full bg-[#2c2937] rounded-2xl flex ">
        <form
          className="w-full h-full flex items-center justify-between gap-5 mb-2"
          onSubmit={handleSubmit}
        >
          <input
            className="flex-1 p-3 bg-transparent border-none outline-none text-[#ececec]"
            type="text"
            name="text"
            placeholder="Ask me anything..."
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSubmit;
              }
            }}
            // disabled={mutation.isPending}
          />
          <button
            className="bg-[#605e68] rounded-full border-none cursor-pointer p-2.5 flex items-center justify-center mr-5"
            type="submit"
            // disabled={mutation.isPending}
          >
            <img className="w-4 h-4" src="src/assets/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
