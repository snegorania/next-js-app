import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      const client = await MongoClient.connect(
        "mongodb://mongouser:mongosecretepassword@localhost:27017/meetups?authSource=admin"
      );
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(data);
      res.status(201).json({ message: "meetup inserted" });
    } catch (err) {
      console.log(err.message);
    }
  }
}

export default handler;
