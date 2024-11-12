document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');

    function loadCartItems() {
        let cart = JSON.parse(localStorage.getItem("addedCard"));

        cart.forEach(function(item) {
            item.quantity = 1;
        });

        localStorage.setItem("addedCard", JSON.stringify(cart));
        cartItemsContainer.innerHTML = '';

        cart.forEach(function(item) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('grid', 'grid-cols-5', 'items-center', 'text-center', 'gap-4', 'mb-4');

            cartItem.innerHTML = `
                <div class="flex items-center space-x-4">
                    <img src="${item.image}" alt="${item.titre}" class="w-16 h-16 rounded-lg bg-gray-200">
                    <p class="text-xs font-medium">${item.titre}</p>
                </div>
                <p class="text-sm text-gray-600">$${item.price.toFixed(2)}</p>
                <input type="number" min="1" value="${item.quantity}" class="w-16 border border-gray-300 rounded-lg p-1 text-center">
                <p class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="text-red-500 font-semibold hover:text-red-700">Delete</button>
            `;

            cartItemsContainer.appendChild(cartItem);

            const quantityInput = cartItem.querySelector('input[type="number"]');
            quantityInput.addEventListener('input', function() {
                updateSubtotal(cartItem, item);
            });

            const deleteButton = cartItem.querySelector('button');
            deleteButton.addEventListener('click', function() {
                deleteItem(cartItem, item);
            });
        });

        updateOrderSummary();
    }

    function updateSubtotal(cartItem, item) {
        const quantity = parseInt(cartItem.querySelector('input[type="number"]').value);
        item.quantity = quantity;
        saveCart();

        const subtotalElement = cartItem.querySelector('p.font-semibold');
        const newSubtotal = item.price * quantity;
        subtotalElement.textContent = `$${newSubtotal.toFixed(2)}`;

        updateOrderSummary();
    }

    function updateOrderSummary() {
        const cart = JSON.parse(localStorage.getItem("addedCard")) || [];
        let subtotal = 0;

        cart.forEach(function(item) {
            subtotal += item.price * item.quantity;
        });

        const tax = subtotal * 0.08;
        const total = subtotal + tax;

        document.querySelector('.order-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.order-tax').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.order-total').textContent = `$${total.toFixed(2)}`;
    }

    function deleteItem(cartItem, item) {
        let cart = JSON.parse(localStorage.getItem("addedCard")) || [];
        cart = cart.filter(function(cartItem) {
            return cartItem.name !== item.name;
        });

        localStorage.setItem("addedCard", JSON.stringify(cart));
        cartItem.remove();
        updateOrderSummary();
    }

    function saveCart() {
        const cart = [];
        const cartItems = cartItemsContainer.querySelectorAll('.grid');

        cartItems.forEach(function(cartItem) {
            const name = cartItem.querySelector('p.text-lg').textContent;
            const price = parseFloat(cartItem.querySelector('p.text-sm').textContent.replace('$', ''));
            const quantity = parseInt(cartItem.querySelector('input[type="number"]').value);
            const image = cartItem.querySelector('img').src;

            cart.push({ name, price, quantity, image });
        });

        localStorage.setItem('addedCard', JSON.stringify(cart));
    }

    loadCartItems();
});

