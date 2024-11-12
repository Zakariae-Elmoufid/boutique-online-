let cardsContainer = document.querySelector('.cards-container');

// Initialize favorites array from localStorage or create empty array if none exists
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

async function getData() {
    let respons = await fetch('../scripts/products.json')
    let data = await respons.json()
    
    for (let i = 0; i <= 5; i++) {
        // Check if product is in favorites to determine initial heart color
        const isFavorite = favorites.some(fav => fav.titre === data.array[i].titre);
        const heartColor = isFavorite ? '#4928CF' : '#000000';
        
        cardsContainer.innerHTML += `
            <div class="container w-[300px]">
                <div>
                    <img src="${data.array[i].image}" alt="" class="rounded-lg">
                </div>
                <div class="flex flex-col justify-between mt-6 gap-1">
                    <h2 class="font-bold text-[1.3em]">${data.array[i].titre}</h2>
                    <p class="text-[#0a0a0aa2] font-bold">${data.array[i].price}</p>
                    <p class="text-[#0a0a0aa2] font-bold">${data.array[i].type}</p>
                </div>
                <div class="flex justify-between items-center gap-1">
                    <button class="buttonss px-5 py-4 rounded-lg mt-1 font-bold text-[1.1em] hover:bg-[#4928CF] hover:text-white duration-300 bg-gray-100 boder-0">
                        Add to cart
                    </button>
                    <button onclick="addToFavorite(${i})" class="favorite-btn" data-index="${i}">
                        <svg width="39" height="39" viewBox="0 0 24 24" fill="${heartColor}" stroke="${heartColor}" stroke-width="2">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `
    }
}

getData()

async function addToFavorite(i) {
    let respons = await fetch('../scripts/products.json')
    let data = await respons.json()
    const product = data.array[i];
    
    const favoriteBtn = document.querySelector(`[data-index="${i}"]`);
    const heartIcon = favoriteBtn.querySelector('svg');
    
    const existingIndex = favorites.findIndex(fav => fav.titre === product.titre);
    
    if (existingIndex === -1) {
        favorites.push(product);
        heartIcon.setAttribute('fill', '#4928CF');
        heartIcon.setAttribute('stroke', '#4928CF');
        // showNotification('Product added to favorites!');
    } else {
        favorites.splice(existingIndex, 1);
        heartIcon.setAttribute('fill', '#000000');
        heartIcon.setAttribute('stroke', '#000000');
        // showNotification('Product removed from favorites!');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4928CF;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
        z-index: 1000;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}