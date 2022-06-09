// server/index.js

const express = require("express");
const banners = require('./banners/index.get.json');
const categories = require('./categories/index.get.json');
const products = require('./products/index.get.json');
const addToCart = require('./banners/index.get.json');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
app.use("/static", express.static('static'));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.get("/banners", (req, res) => {
    res.json({"banners": banners});
});
app.get("/categories", (req, res) => {
    res.json({'categories': categories});
});
app.get('/products', (req, res) => {
    res.json({"products": products});
});
app.get('/addToCart', (req, res) => {
    res.json({"addtocart": addToCart});
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});