"use client";
import Link from "next/link";
import { useState } from "react";

const Shorten = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");


  const generate = async () => {
    if (!url || !shortUrl) {
      alert("Please fill all fields");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shorturl: shortUrl,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        alert(result.message)
        setUrl("");
        setShortUrl("");
        setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shortUrl}`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="bg-purple-200 mx-auto max-w-1/3 flex flex-col gap-2 items-center my-16 rounded-xl">
      <h1 className="font-bold text-2xl my-2">Generate your short URLs</h1>
      <div className="flex flex-col gap-3 w-2/3 py-2 items-center">
        <input
          type="text"
          placeholder="Enter the url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-white w-full p-1 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          placeholder="Enter your preferred short URL text"
          className="bg-white w-full p-1 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
        />
        <button
          onClick={generate}
          className="bg-purple-500 text-white w-1/3 p-1 px-2 rounded-xl cursor-pointer"
        >
          Shorten
        </button>
      </div>
      <div className=" w-full px-3 my-4">
        <p className="font-bold text-xl">Your Link:</p>
        {generated && (<code><Link target="_blank" href={generated}>{generated}</Link></code> )}
      </div>
    </div>
  );
};

export default Shorten;
