const cors = require('cors');
const dbConnect = require('./routes/dbConnect');
const express = require('express');
const User = require('./model/user.schema');
const Product = require('./model/products.schema');
const Customer = require('./model/customer.schema');
const Cart = require('./model/cart.schema')
const Order = require('./model/order.schema')
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

app.get('/users/login', async (req, res) => {
    try {
        const { email, password } = req.query;
        const user = await User.findOne({ email, password });
        res.send(user);
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
        const { limit, email, password } = req.query;

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

app.post('/customers', async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).send(customer);
    } catch (error) {
        console.log(error)
    }
})

app.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.send(customers);
    } catch (error) {
        console.log(error)
    }
})
app.get('/customers/login', async (req, res) => {
    try {
        const { email, password } = req.query;
        const customer = await Customer.findOne({ email, password });
        res.send(customer);
    } catch (error) {
        console.log(error)
    }
})

app.post('/cart', async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
        console.log(error)
    }
})


app.get('/cart', async (req, res) => {

    try {
        const cart = await Cart.find();
        res.send(cart);
    } catch (error) {
        console.log(error)
    }
})

app.get('/cart/:userId', async (req, res) => {

    try {
        const userId = req.params.userId
        const cart = await Cart.find({ userId });
        res.send(cart);
    } catch (error) {
        console.log(error)
    }
})

app.delete('/cart/:_id', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params._id);
        res.send(cart);
    } catch (error) {
        console.log(error)
    }
})

app.post('/order', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        console.log(error)
    }
})

app.get('/order', async (req, res) => {

    try {
        const order = await Order.find();
        res.send(order);
    } catch (error) {
        console.log(error)
    }
})

app.get('/order/:userId', async (req, res) => {

    try {
        const userId = req.params.userId
        const order = await Order.find({ userId });
        res.send(order);
    } catch (error) {
        console.log(error)
    }
})
app.delete('/cart', async (req, res) => {
    try {
        await Cart.deleteMany({});
        res.status(200).json({ message: 'All cart data removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(4545, () => {
    console.log("listening on port 4545");
})  
