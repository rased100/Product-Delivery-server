const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i4mso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

// products

// async function run() {
//     try {
//         await client.connect();
//         const database = client.db('current_delivery');
//         const products_deliveryCollection = database.collection('products');

//         // get products api
//         app.get('/products', async (req, res) => {
//             const cursor = products_deliveryCollection.find({});
//             const products = await cursor.toArray();
//             res.send(products);
//         })
//     }
//     finally {
//         // await client.close()
//     }
// }


// services
async function run() {
    try {
        await client.connect();
        const database = client.db('current_delivery');
        const serviceCollection = database.collection('services');

        // post api
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit post', service);

            const result = await serviceCollection.insertOne(service);
            console.log(result);
            res.json(result)
        });

        // get products api
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Delivery Server is running');
});

app.listen(port, () => {
    console.log('server running at port', port)
})