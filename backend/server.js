import express  from "express"
import { MongoClient } from 'mongodb'
import bodyParser from "body-parser"
import cors from "cors"
const app = express()
app.use(cors())
import 'dotenv/config'
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'securox';
app.use(bodyParser.json())

const port = 4000
client.connect();


app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('credentials');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save Password
app.post('/', async(req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('credentials');
    const findResult = await collection.insertOne(password)
    res.send({success:true,result:findResult})
})

// Delete password
app.delete('/', async(req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('credentials');
    const findResult = await collection.deleteOne(password)
    res.send({success:true,result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
