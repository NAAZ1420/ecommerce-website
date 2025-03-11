async function fetchProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-md-4');
        productDiv.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-success" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

document.addEventListener('DOMContentLoaded', fetchProducts);

function addToCart(product, price) {
    alert(product + " added to cart for $" + price);
}

// server.js (Node.js + Express + MongoDB)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String
});

const Product = mongoose.model('Product', productSchema);

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
