const cors = require('cors');
const dbConnect = require('./routes/dbConnect');
const express = require('express');
const User = require('./model/user.schema');
const app = express();


dbConnect()

app.use(cors());
app.use(express.json());

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
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        console.log(error)
    }
})
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
