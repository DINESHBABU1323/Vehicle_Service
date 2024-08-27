const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');
const SerdataModel = require('./models/serdata');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/practice_mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                FormDataModel.create(req.body)
                    .then(log_reg_form => res.json(log_reg_form))
                    .catch(err => res.json(err));
            }
        });
});

app.post('/firststep', (req, res) => {
    const { emailid, fullname } = req.body;
    SerdataModel.findOne({ emailid: emailid })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                SerdataModel.create(req.body)
                    .then(log_ser_form => res.json(log_ser_form))
                    .catch(err => res.json(err));
            }
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Wrong password");
                }
            } else {
                res.json("No records found!");
            }
        });
});

// Define a schema and model for products
const ProductSchema = new mongoose.Schema({
    fullname: String,
    emailid: String,
    model: String,
    service: Number,
});

const Product = mongoose.model('Product', ProductSchema);

// API endpoint to get products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on http://127.0.0.1:3001");
});
