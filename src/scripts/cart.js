
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}


function saveCartItems(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}


function renderCartItems() {
    const cartItems = getCartItems();
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 

    cartItems.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('grid', 'grid-cols-5', 'gap-4', 'mb-4', 'items-center');

        
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
                <input type="number" min="1" value="${item.quantity}" class="w-16 border border-gray-300 rounded-lg p-1 text-center product-Q">
            </div>
            <!-- Subtotal -->
            <div class="flex items-center justify-center">
                <span>$${item.subtotal.toFixed(2)}</span>
            </div>
            <!-- Delete Button -->
            <button class="text-red-500 font-semibold hover:text-red-700 delete-btn">Delete</button>
        `;

        
        cartItemDiv.querySelector('.delete-btn').addEventListener('click', () => {
            deleteCartItem(index);
        });
        cartItemDiv.querySelector('.product-Q').addEventListener('input', (e) => 
            {
                updatequantity(index, e.target.value);
            });

        cartItemsContainer.appendChild(cartItemDiv);
    });
    updateSubtotal();
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


function updatequantity(index, newQ)
{
    let cartItems = getCartItems();
    cartItems[index].quantity = newQ;
    cartItems[index].subtotal = newQ * cartItems[index].price;
    saveCartItems(cartItems);
    renderCartItems(cartItems);
}

function updateSubtotal()
{
    let cartItems = getCartItems();
    let subTotal = 0;

    cartItems.forEach(item => 
    {
        subTotal += item.subtotal;

    }
    );
    let tax = subTotal * 0.2;
    let total = subTotal + tax;
    document.querySelector(".order-subtotal").textContent = `$${subTotal.toFixed(2)}`;
    document.querySelector(".order-tax").textContent = `$${tax.toFixed(2)}`;
    document.querySelector(".order-total").textContent = `$${total.toFixed(2)}`;
}
document.addEventListener('DOMContentLoaded', renderCartItems);