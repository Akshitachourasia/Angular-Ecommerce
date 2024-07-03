const cors = require('cors');
const dbConnect = require('./routes/dbConnect');
const express = require('express');
const User = require('./model/user.schema');
const Product = require('./model/products.schema');
const app = express();


dbConnect()

app.use(cors());
app.use(express.json());


app.post('/products', async (req, res) => {
    try {
        const products = new Product(req.body);
        await products.save();
        res.status(201).send(products);
    } catch (error) {
        console.log(error)
    }
})

app.get('/products', async (req, res) => {
    try {
        const { limit, q } = req.query;
        
        let filter = {};
        if (q) {
            filter.$or = [
                { name: { $regex: q, $options: 'i' } }, 
                { description: { $regex: q, $options: 'i' } }, 
                { category: { $regex: q, $options: 'i' } },
                { price: { $regex: q, $options: 'i' } },
                { color: { $regex: q, $options: 'i' } }
            ];
        }
        let query = Product.find(filter);
        if (limit) {
            const limitNumber = parseInt(limit, 10);
            if (!isNaN(limitNumber)) {
                query = query.limit(limitNumber);
            }
        }
        const products = await query.exec();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('An error occurred while fetching products.');
    }
});


app.put('/products/:_id', async (req, res) => {
    try {
        const products = await Product.findByIdAndUpdate(req.params._id, req.body);
        res.send(products);
    } catch (error) {
        console.log(error)
    }
})


app.get('/products/:_id', async (req, res) => {     
    
    try {       
        const products = await Product.findById(req.params._id);
        res.send(products);
    } catch (error) {
        console.log(error)
    }
})

app.delete('/products/:_id', async (req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params._id);
        res.send(products);
    } catch (error) {
        console.log(error)
    }
})

app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.log(error)
    }
})

app.get('/users', async (req, res) => {
    try {
        const { limit, email ,password } = req.query;
        
        let filter = {};
        if (email && password) {
            filter.$or = [
                { email: { $regex: email, $options: 'i' } }, 
                { password: { $regex: password, $options: 'i' } },

            ];
        }
        let query = User.find(filter);
        if (limit) {
            const limitNumber = parseInt(limit, 10);
            if (!isNaN(limitNumber)) {
                query = query.limit(limitNumber);
            }
        }
        const users = await query.exec();
        res.json(users);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('An error occurred while fetching products.');
    }
});

app.put('/users/:_id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params._id, req.body);
        res.send(user);
    } catch (error) {
        console.log(error)
    }
})
app.delete('/users/:_id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params._id);
        res.send(user);
    } catch (error) {
        console.log(error)
    }
})

app.listen(4545, () => {
    console.log("listening on port 4545");
})  
