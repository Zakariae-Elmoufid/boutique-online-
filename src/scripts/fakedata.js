// fakedata.js

// Fake cart data
const fakeCartItems = [
    {
        id: 1,
        name: 'Product 1',
        price: 19.99,
        quantity: 2,
        subtotal: 19.99 * 2
    },
    {
        id: 2,
        name: 'Product 2',
        price: 9.99,
        quantity: 1,
        subtotal: 9.99 * 1
    },
    {
        id: 3,
        name: 'Product 3',
        price: 14.99,
        quantity: 3,
        subtotal: 14.99 * 3
    }
];

// Store the fake data in localStorage
localStorage.setItem('cart', JSON.stringify(fakeCartItems));
