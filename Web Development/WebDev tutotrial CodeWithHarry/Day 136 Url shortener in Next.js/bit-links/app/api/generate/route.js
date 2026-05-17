import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  // Parse the request body
  const body = await request.json();

  const client = await clientPromise;
  const db = client.db("bitLinksDB");
  const collection = db.collection('url');

  // check if short url already exists
  const doc = await collection.findOne({ shorturl: body.shorturl});
  if(doc){
    return Response.json({success: false, message: "URL already exist", error: true})
  }

  const result = await collection.insertOne({
    url : body.url,
    shorturl: body.shorturl,
    cretedAt: new Date(),

    // generate code for expiresAt to 10 sec after creation
    expiresAt : new Date(Date.now() + 10 * 1000) // 10 seconds
  })

  return Response.json({success: true, message: "URL Generated Successfully", error: false})
}