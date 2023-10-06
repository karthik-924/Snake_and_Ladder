const { MongoClient,ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://username:password@storage.cxvqsth.mongodb.net/?retryWrites=true&w=majority'; 
// const client = new MongoClient(uri);

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  async function getRoomData(roomCode) {
    try {
      await run();
      console.log("Connected correctly to server");
      const db = client.db("admin");
      const collection = db.collection("storage");
  
      const query = { roomCode };
      const roomData = await collection.findOne(query);
      
      return roomData;
    } catch (error) {
      console.error('Error getting room data from MongoDB:', error);
      return null;
    } finally {
      client.close();
    }
}
  
async function setRoomData(roomCode, data) {
    try {
      await run();
      console.log("Connected correctly to server");
      const db = client.db("admin");
      const collection = db.collection("storage");
  
      const query = { roomCode };
      const existingRoomData = await collection.findOne(query);
  
      if (existingRoomData) {
        // Update the existing data with the new data
        const updatedRoomData = { ...existingRoomData, ...data };
        await collection.updateOne(query, { $set: updatedRoomData });
      } else {
        // Insert a new document if the room data doesn't exist
        await collection.insertOne({ ...data, roomCode });
      }
    } catch (error) {
      console.error('Error setting/updating room data in MongoDB:', error);
    } finally {
      client.close();
    }
  }
  

module.exports = { getRoomData, setRoomData };
