// Function to retrieve cart items from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function to save cart updated items to localStorage
function saveCartItems(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Function to render cart items dynamically in the cart page
function renderCartItems() {
    const cartItems = getCartItems();
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear any existing content

    cartItems.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('grid', 'grid-cols-5', 'gap-4', 'mb-4', 'items-center');

        // Dynamically inserting cart item details, including delete button
        cartItemDiv.innerHTML = `
            <!-- Product Name -->
            <div class="flex items-center">
                <img src="https://via.placeholder.com/150" alt="${item.name}" class="w-16 h-16 rounded-lg bg-gray-200">
                <span class="ml-4">${item.name}</span>
            </div>
            <!-- Price -->
            <div class="flex items-center justify-center">
                <span>$${item.price.toFixed(2)}</span>
            </div>
            <!-- Quantity -->
            <div class="flex items-center justify-center">
                <input type="number" min="1" value="${item.quantity}" class="w-16 border border-gray-300 rounded-lg p-1 text-center">
            </div>
            <!-- Subtotal -->
            <div class="flex items-center justify-center">
                <span>$${item.subtotal.toFixed(2)}</span>
            </div>
            <!-- Delete Button -->
            <button class="text-red-500 font-semibold hover:text-red-700 delete-btn">Delete</button>
        `;

        // Attach delete functionality
        cartItemDiv.querySelector('.delete-btn').addEventListener('click', () => {
            deleteCartItem(index);
        });

        cartItemsContainer.appendChild(cartItemDiv);
    });
}

function deleteCartItem(index)
{
    let cartItems = getCartItems();
    let updatecartItems = [];
    for(let i = 0; i < cartItems.length; i++)
    {
        if (i !== index)
        {
            updatecartItems.push(cartItems[i])
        }
    }
    saveCartItems(updatecartItems);
    renderCartItems();
}
document.addEventListener('DOMContentLoaded', renderCartItems);



