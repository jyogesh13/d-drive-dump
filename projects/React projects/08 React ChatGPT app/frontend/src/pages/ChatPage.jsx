import React from "react";
import NewPrompt from "../components/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Markdown from "react-markdown";
import { Image } from "@imagekit/react";

const ChatPage = () => {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["individualChats", id],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/chats/conversation/${id}/messages`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if(data) console.log(data)

  return (
    <div className=" h-full flex flex-col items-center relative">
      <div className="flex-1 w-full overflow-auto custom-scrollbar flex justify-center">
        <div className="w-[50%] flex flex-col p-5 ">
          {data?.history?.map((message, i) => {
            return (
              <>
                {message.img && (
                  <Image
                    urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
                    src={message.img}
                    width={380}
                    height={380}
                    alt="Picture of the author"
                    loading="lazy" // Use "eager" to load immediately. `lazy` is the default value
                    transformation={[{height: 300, width: 400 }]}
                  />
                )}
                <div
                  className={message.role === "user" ? "user mb-1 px-4 py-2"  : "px-4 py-2"}
                  key={i}
                >
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              </>
            );
          })}
          {data && <NewPrompt data={data}/>}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
