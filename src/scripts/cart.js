document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');

    function loadCartItems() {
        let cart = JSON.parse(localStorage.getItem("addedCard")) || [];

        cartItemsContainer.innerHTML = '';

        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            const cartItem = document.createElement('div');
            cartItem.classList.add('grid', 'grid-cols-5', 'items-center', 'text-center', 'gap-4', 'mb-4');

            cartItem.innerHTML = `
                <div class="flex items-center space-x-4">
                    <img src="${item.cart.image}" alt="${item.cart.titre}" class="w-16 h-16 rounded-lg bg-gray-200">
                    <p class="text-xs font-medium itemtitle">${item.cart.titre}</p>
                </div>
                <p class="text-sm text-gray-600 itemprice">$${item.cart.price.toFixed(2)}</p>
                <input type="number" min="1" value="${item.count}" class="w-16 border border-gray-300 rounded-lg p-1 text-center">
                <p class="font-semibold subtotal">$${(item.cart.price * item.count).toFixed(2)}</p>
                <button class="text-red-500 font-semibold hover:text-red-700">Delete</button>
            `;

            cartItemsContainer.appendChild(cartItem);

            
            const quantityInput = cartItem.querySelector('input[type="number"]');
            quantityInput.addEventListener('input', function() {
                updateSubtotal(cartItem, item,);
            });

            
            const deleteButton = cartItem.querySelector('button');
            deleteButton.addEventListener('click', function() {
                deleteItem(cartItem, i);
            });
        }

        updateOrderSummary();
    }

    function updateSubtotal(cartItem, item,) {
        const quantity = parseInt(cartItem.querySelector('input[type="number"]').value);
        item.count = quantity;
        saveCart();

        const subtotalElement = cartItem.querySelector('p.subtotal');
        const newSubtotal = item.cart.price * quantity;
        subtotalElement.textContent = `$${newSubtotal.toFixed(2)}`;

        updateOrderSummary();
    }

    function updateOrderSummary() {
        const cart = JSON.parse(localStorage.getItem("addedCard")) || [];
        let subtotal = 0;

        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            subtotal += item.cart.price * item.count;
        }

        const tax = subtotal * 0.20;
        const total = subtotal + tax;

        document.querySelector('.order-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.order-tax').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.order-total').textContent = `$${total.toFixed(2)}`;
    }

    function deleteItem(cartItem, index) {
        let cart = JSON.parse(localStorage.getItem("addedCard")) || [];
        cart.splice(index, 1);

        localStorage.setItem("addedCard", JSON.stringify(cart));
        cartItem.remove();
        updateOrderSummary();
    }

    function saveCart() {
        const cart = [];
        const cartItems = cartItemsContainer.querySelectorAll('.grid');

        for (let i = 0; i < cartItems.length; i++) {
            const cartItem = cartItems[i];
            const titre = cartItem.querySelector('p.itemtitle').textContent;
            const price = parseFloat(cartItem.querySelector('p.itemprice').textContent.replace('$', ''));
            const quantity = parseInt(cartItem.querySelector('input[type="number"]').value);
            const image = cartItem.querySelector('img').src;

            cart.push({
                count: quantity,
                cart: { titre, price, image }
            });
        }

        localStorage.setItem('addedCard', JSON.stringify(cart));
    }

    loadCartItems();
});