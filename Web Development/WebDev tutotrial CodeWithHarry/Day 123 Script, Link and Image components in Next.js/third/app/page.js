import Image from "next/image";

export default function Home() {
  return (
    <div className="container bg-red-300 size-90 mx-2 py-10 my-1 relative">
      <Image
      src="https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg"
      alt="Picture of the author"
      fill={true}
      objectFit="contain"
      />
      I am homepage
    </div>
  );
}
