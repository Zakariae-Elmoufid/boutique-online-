let favoritesContainer = document.querySelector('.favorites-container');

function loadFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = '<p>No favorites yet. Add some products!</p>';
    return;
  }

  favoritesContainer.innerHTML = ''; // Clear the container before adding favorites

  favorites.forEach(favorite => {
    favoritesContainer.innerHTML += `
      <div class="favorite-card w-[300px] border-2 rounded-lg p-6 bg-white">
        <img src="${favorite.image}" alt="${favorite.title}" class="w-full h-[200px] object-cover mb-4 rounded-lg">
        <h3 class="font-bold text-[1.2em]">${favorite.title}</h3>
        <p class="text-[#0a0a0aa2] font-bold">${favorite.price}</p>
        <p class="text-[#0a0a0aa2] font-bold">${favorite.type}</p>
      </div>
    `;
  });
}

// Call the loadFavorites function when the page loads
loadFavorites();
