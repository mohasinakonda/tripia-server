const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv/config");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send({ massage: "success" });
});

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@cluster0.fxqw3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
//========================collections===========================
async function run() {
  try {
    await client.connect();
    const hotelsCollections = client.db("tripia").collection("hotels");
    app.get("/hotels", async (req, res) => {
      const hotels = await hotelsCollections.find().toArray();
      console.log(hotels);
      res.send(hotels);
    });

    app.get('/hotels/:city',async(req,res)=>{
      const data=req.params.city
      
      const filter={location:data}
      const hotel=await hotelsCollections.find(filter).toArray()
      res.send(hotel)
    })
  } finally {
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log("server is runnig on port", port);
});
