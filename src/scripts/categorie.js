const categoryList = document.getElementById("category-list");


    

    // Fonction pour charger les catégories et produits depuis les fichiers JSON
    async function loadCategoriesAndProducts() {
        
            // Charger les catégories
            const categoryResponse = await fetch("categories.json");
            const categories = await categoryResponse.json();

            // Charger les produits
            const productResponse = await fetch("products.json");
            const products = await productResponse.json();

            // Associer les produits aux catégories
            categories.forEach(category => {
                category.products = products.filter(product => 
                    product.categoryName === category.name);
            });

            // Afficher les catégories avec leurs produits
            displayCategories(categories);
     
    }

    // Fonction pour afficher les catégories et produits
    function displayCategories(categories) {
        categoryList.innerHTML = ""; // Vider l'affichage avant chaque mise à jour

        categories.forEach(category => {
            // Conteneur de la catégorie
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md");

            // Titre de la catégorie
            categoryDiv.innerHTML = `<h2 class="text-2xl font-semibold text-gray-800 mb-4">${category.name}</h2>`;

            // Liste des produits de la catégorie
            const productList = document.createElement("ul");
            productList.classList.add("space-y-2");

            category.products.forEach(product => {
                const productItem = document.createElement("li");
                productItem.classList.add("flex", "justify-between", "bg-gray-50", "p-3", "rounded-lg", "shadow-sm");

                productItem.innerHTML = `
                    <span class="text-gray-700">${product.name}</span>
                    <span class="text-gray-600">${product.price}€</span>
                `;

                productList.appendChild(productItem);
            });

            categoryDiv.appendChild(productList);
            categoryList.appendChild(categoryDiv);
        });
    }

    // Charger les catégories et produits au démarrage
    loadCategoriesAndProducts();