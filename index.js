const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ui8slz3.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async()=>{
    try{
        const db = client.db("moontech")
        // const productCollection = db.collection('product')
        const productsCollection = db.collection('products')

        app.get('/products', async(req,res)=>{
            const cursor = productsCollection.find({});
            const product = await cursor.toArray()

            res.send({status : true, data : product});
        })

        app.post('/product', async(req,res) =>{
            const product = req.body;
            const result = await productsCollection.insertOne(product)
            res.send(result)

        })

        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;

            const result = await productsCollection.deleteOne({_id: ObjectId(id)});
            res.send(result);
        })
    }
    finally{

    }
}

run().catch((err) => console.log(err))

app.get('/', (req, res)=> {
    res.send('this is moon tech server')
})

app.listen(port, () =>{
    console.log(`moon tech server is running on port ${port}`)
})