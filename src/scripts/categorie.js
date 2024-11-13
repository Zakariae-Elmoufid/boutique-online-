let categoryListContainer = document.querySelector('.container-categorie');
let btnSubmit = document.getElementById("btn-submit");
let btnAjouter = document.getElementById("btn-ajouter");

let categories = JSON.parse(localStorage.getItem("categories"));
async function AfficherCategories() {
    
    
    if (!categories) { 
        let categoriesResponse = await fetch('../scripts/categories.json');
        categories = await categoriesResponse.json();
        localStorage.setItem("categories", JSON.stringify(categories));
    }

    // let categoriesResponse = await fetch('../scripts/categories.json');
    // let categories = await categoriesResponse.json();

    JSON.parse(localStorage.getItem("categories"));

     
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
                <div class="w-64  p-4 border rounded-lg shadow-sm mx-auto">
                    <img src="${products.array[j].image}" alt="${products.array[j].titre}" class="rounded-lg">
                    <div class="h-[7em] flex flex-col  justify-between mt-6">
                        <h3 class="font-bold text-lg">${products.array[j].titre}</h3>
                        <p class="text-gray-600 font-medium">${products.array[j].price}</p>
                        <p class="text-gray-500">${products.array[j].type}</p>
                    </div>
                    <div class=" h-[4em] flex  justify-between items-center">
                        <button  onclick= "setlocalstorage(${j})" class=" buttonss px-5 py-4 rounded-lg  font-bold text-[1.1em] hover:bg-[#8a53bd] hover:text-white duration-300 bg-gray-100 boder-0  ">Add to cart</button>
                        <button href="" onclick= "localStorageHeartIcon(${j})" class=" heart${j} text-[1.6em] text-[#636363] cursor-pointer"><i class='bx bxs-heart'></i></button>
                     </div>
                </div>
            `;
            }
        }
    }

    selectCategory.addEventListener("change", () => {
        choisirCategorie(selectCategory.value, categories);
    });

     btnAjouter.addEventListener("click", function() {
        document.getElementById("page-ajouter").style.display = "flex";
    });
    
    btnSubmit.addEventListener("click", function() {
        ajouterCategorie();
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
};



function ajouterCategorie() { 
    let categorie = [];
    let categoryName = document.getElementById('category-name').value;
    categorie = JSON.parse(localStorage.getItem("categories")) || [];
    let newCategoryId = categorie[categorie.length-1].id + 1.

    console.log(categorie);
     
   
        let newCategory = {
            id: newCategoryId,
            name: categoryName,
        };
        
    categorie.push(newCategory);
    
    
    localStorage.setItem("categories", JSON.stringify(categorie));
    
    categoryListContainer.innerHTML += `
      <h2 id="${newCategory.name}" class="text-2xl font-semibold text-gray-700"><p class="text-violet-800">new</p>${newCategory.name}</h2>
    `

    document.getElementById("category-name").value = "";
    document.getElementById("page-ajouter").style.display = "none";
}
AfficherCategories();

