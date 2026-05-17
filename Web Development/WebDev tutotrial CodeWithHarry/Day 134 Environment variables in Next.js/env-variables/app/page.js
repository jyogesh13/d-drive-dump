import Image from "next/image";

export default function Home() {
  // Accessing environment variables
  const id = process.env.ID;
  const secret = process.env.SECRET;

  console.log('ID:', id);
  console.log('Secret:', secret);
  
  return (
    <div>

    </div>
  );
}
