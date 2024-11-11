let categoryListContainer = document.querySelector('.container-categorie');

async function AfficherCategories() {
    let categoriesResponse = await fetch('../scripts/categories.json');
    let categories = await categoriesResponse.json();

    let productsResponse = await fetch('../scripts/products.json');
    let products = await productsResponse.json();

    let selectCategory = document.getElementById("select-category");

    categories.forEach(category => {
        selectCategory.innerHTML += `<option value="${category.name}">${category.name}</option>`;
    });

    for (let i = 0; i < categories.length; i++) {
        categoryListContainer.innerHTML += `
        <h2 id="${categories[i].name}" class="text-2xl font-semibold text-gray-700">${categories[i].name}</h2>
        <div class="products-container flex  flex-wrap   gap-6 mt-4" id="category-${categories[i].id}">
        </div>
    `;
        let productsContainer = document.querySelector(`#category-${categories[i].id}`);
        for (let j = 0; j < products.array.length; j++) {
            if (products.array[j].type.includes(categories[i].name)) {
                productsContainer.innerHTML += `
                <div class="w-64  p-4 border rounded-lg shadow-sm">
                    <img src="${products.array[j].image}" alt="${products.array[j].titre}" class="rounded-lg">
                    <div class="h-[7em] flex flex-col justify-between mt-6">
                        <h3 class="font-bold text-lg">${products.array[j].titre}</h3>
                        <p class="text-gray-600 font-medium">${products.array[j].price}</p>
                        <p class="text-gray-500">${products.array[j].type}</p>
                    </div>
                    <button class="buttonss px-5 py-2 rounded-lg font-bold text-sm bg-gray-200 hover:bg-gray-300 transition duration-300">Add to cart</button>
                </div>
            `;
            }
        }
    }

    selectCategory.addEventListener("change", () => {
        choisirCategorie(selectCategory.value, categories);
    });
}

function choisirCategorie(selectedCategory, categories) {

    categories.forEach(category => {
        document.getElementById(`${category.name}`).style.display = 'none';
        document.getElementById(`category-${category.id}`).style.display = 'none';
    });
     
    if (selectedCategory === "All Caterory") {
        categories.forEach(category => {
            document.getElementById(`${category.name}`).style.display = 'block';
            document.getElementById(`category-${category.id}`).style.display = 'flex';
        });
    } else {
        let selected = categories.find( function(category){
            return category.name  === selectedCategory;
        })
        if (selected) {
            document.getElementById(`${selected.name}`).style.display = 'block';
            document.getElementById(`category-${selected.id}`).style.display = 'flex';
        }
    }
}
AfficherCategories();



