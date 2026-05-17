import React from "react";

const Data = async () => {
  // let data = await fetch('https://api.vercel.app/blog') //Next.js by default caches data


  // let data = await fetch('https://api.vercel.app/blog' , { cache: 'force-cache' | 'no-store' })
  // force-cache: Next.js looks for a matching request in its Data Cache.
  // If there is a match and it is fresh, it will be returned from the cache.
  // If there is no match or a stale match, Next.js will fetch the resource from the remote server and update the cache with the downloaded resource.
    /*no-store: Next.js fetches the resource from the remote server on every request, even if Dynamic APIs are not detected on the route. */


  let data = await fetch("https://api.vercel.app/blog", {
    next: { revalidate: false | 0 | 3600 },
  }); //Cache the resource indefinitely. Semantically equivalent to revalidate: Infinity. The HTTP cache may evict older resources over time., 0 will Prevent the resource from being cached., n=3600 (in seconds) Specify the resource should have a cache lifetime of at most n seconds.

  let posts = await data.json();
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Data;
