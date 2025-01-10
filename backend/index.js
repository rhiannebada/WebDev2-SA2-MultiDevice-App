require('dotenv').config();
const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');


app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
  }));

// Database connection with MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// API creation

app.get("/", (req, res) => {
    res.send("Express App is running");
})

// Cloudinary configuration
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Multer configuration for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload endpoint
app.post("/upload", upload.single('product'), async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "products" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(req.file.buffer);
        });

        res.json({
            success: 1,
            image_url: result.secure_url,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: 0,
            message: "Error uploading image",
        });
    }
});


// Schema for products
const Product = mongoose.model('Product',{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    await product.save();
    res.json({ 
      success: true, 
      name: req.body.name,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding product",
    });
  }
})

// Creating API for deleting a product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Product removed");
    res.json({ 
        success: true,
        name:req.body.name,
    });
})

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

// Schema for User model
const Users = mongoose.model('Users',{
    name:
    {
        type: String,
    },
    email:
    {
        type: String,
        unique: true,
    },
    password:
    {
        type: String,
    },
    cartData:
    {
        type: Object,
    },
    date:
    {
        type: Date,
        default: Date.now,
    }
})

// Crating endpoint for registering new users
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({email: req.body.email});
        if (check) {
            return res.status(400).json({success: false, errors: "Email already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
        });
        await user.save();

        const data = {
            user: {
                id: user.id,
            }
        }
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({success: true, token})
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({success: false, errors: "Server error"});
    }
});

//Crate endpoint for user login
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).json({success: false, errors: "User not found"});
        }
        
        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({success: true, token})
        } else {
            res.status(400).json({success: false, errors: "Incorrect password"});
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({success: false, errors: "Server error"});
    }
});


//Creating endpoint for newcollection data
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-6);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

//Creating endpoint for popular in merch section
app.get('/popularmerch', async (req, res) => {
    let products = await Product.find({category: "merch"});
    let popularmerch = products.slice(0, 3);
    console.log("Popular Merch Fetched");
    res.send(popularmerch);
})

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({errors: 'Please authenticate using a valid token'});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({errors: 'Please authenticate using a valid token'});
    }
}

//creating endpoint for adding product to cart data
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

//creating endpoint for removing product from cart data
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("Removed", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0)  
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

//creating endpoint for getting cart data
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})


app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port", port);
    } else {
        console.log("Error starting server:", error);
    }
});