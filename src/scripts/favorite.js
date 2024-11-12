document.addEventListener('DOMContentLoaded', () => {
  const favoritesContainer = document.getElementById('favorites-container');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
      favoritesContainer.innerHTML = `
          <div class="empty-favorites col-span-full">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No favorites yet</h3>
              <p class="mt-1 text-sm text-gray-500">Start adding some items to your favorites!</p>
              <div class="mt-6">
                  <a href="index.html" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                      Browse Products
                  </a>
              </div>
          </div>
      `;
      return;
  }

  favorites.forEach((product, index) => {
      const productCard = document.createElement('div');
      productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden fade-in';
      productCard.innerHTML = `
          <div class="p-4">
              <div class="aspect-w-3 aspect-h-2">
                  <img src="${product.image}" alt="${product.titre}" 
                      class="w-full h-48 object-cover rounded-lg">
              </div>
              <div class="mt-4">
                  <h2 class="text-lg font-bold text-gray-900">${product.titre}</h2>
                  <p class="mt-1 text-gray-500">${product.type}</p>
                  <div class="mt-2 flex justify-between items-center">
                      <span class="text-purple-600 font-bold">$${product.price}</span>
                      <button onclick="removeFromFavorites(${index})" 
                          class="text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                      </button>
                  </div>
              </div>
          </div>
      `;
      favoritesContainer.appendChild(productCard);
  });
});

function removeFromFavorites(index) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.splice(index, 1);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  showNotification('Item removed from favorites');

  setTimeout(() => {
      location.reload();
  }, 500);
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
  
  setTimeout(() => {
      notification.remove();
  }, 3000);
}
