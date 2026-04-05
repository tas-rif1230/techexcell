// script.js for techexcell repository

// Cart functionality
const cart = [];

function addToCart(item) {
    cart.push(item);
    console.log(`${item.name} added to cart`);
}

function removeFromCart(item) {
    const index = cart.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
        cart.splice(index, 1);
        console.log(`${item.name} removed from cart`);
    }
}

function viewCart() {
    console.log("Cart Contents:");
    cart.forEach(item => console.log(`${item.name} - $${item.price}`));
}

// Admin login functionality
const adminCredentials = {
    username: 'admin',
    password: 'password123'
};

function adminLogin(username, password) {
    if (username === adminCredentials.username && password === adminCredentials.password) {
        console.log('Admin login successful');
    } else {
        console.log('Invalid admin credentials');
    }
}

// Color selector functionality
const colorOptions = ['Red', 'Green', 'Blue', 'Yellow'];

function selectColor(color) {
    if (colorOptions.includes(color)) {
        console.log(`Color selected: ${color}`);
    } else {
        console.log('Invalid color selection');
    }
}

// Interactive features
function init() {
    console.log('Interactive features initialized.');
    // Add event listeners or initialize interfaces here.
}

// Init the interactive features on page load.
document.addEventListener('DOMContentLoaded', init);