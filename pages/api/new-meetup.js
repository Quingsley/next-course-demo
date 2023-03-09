import { MongoClient } from "mongodb";
const handler = async (request, response) => {
  if (request.method === "POST") {
    const data = request.body;
    // const { title, description, image, address } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://quingsley:3ceHwlZoNfB6sbUG@cluster0.hkxyhxj.mongodb.net/meetups?retryWrites=true"
    );

    const db = client.db();
    if (db) {
      console.log("Connected successfully");
    }
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    if (result) {
      response.status(201).json({ message: "Resource inserted" });
    }
  }
};
export default handler;
