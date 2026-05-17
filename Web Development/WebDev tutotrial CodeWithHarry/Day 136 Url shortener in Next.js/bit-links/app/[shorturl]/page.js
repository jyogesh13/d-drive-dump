import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { shorturl } = await params;

  const client = await clientPromise;
  const db = client.db("bitLinksDB");
  const collection = db.collection("url");

  const doc = await collection.findOne({ shorturl: shorturl });
  if (doc) {
    // Redirect to the original URL
    if (doc.expiresAt && new Date() > doc.expiresAt) {
        try{
            await collection.deleteOne({shorturl: shorturl});
        }catch(err){
            console.error("Error deleting expired link:", err);
        }
        return <div>Link has expired.</div>
    }
    else{
        redirect(doc.url);
    }
  } else {
    redirect(`${process.env.NEXT_PUBLIC_HOST}`);
  }
}
