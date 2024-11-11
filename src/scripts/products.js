let cardsContainer = document.querySelector(".cards-container");
let cartbutton = document.querySelector(".cartbutton");

let selectTrie = document.getElementById("selectTrie");
let data;

async function getTodos() {
  let respons = await fetch("../scripts/products.json");

  data = await respons.json();
  function affichage() {
    for (let i = 0; i < data.array.length; i++) {
      cardsContainer.innerHTML += `        <div class="cards w-[25em] min-w-72 ">
            <div>
              <img src="${data.array[i].image}" alt="" class="rounded-lg">
            </div>
            <div class=" h-[7em] flex flex-col justify-between mt-6">
              <h2 class="font-bold text-[1.3em]">${data.array[i].titre}</h2>
              <p class="text-[#0a0a0aa2] font-bold">$${data.array[i].price}.00</p>
              <p class="text-[#0a0a0aa2] font-bold">${data.array[i].type}</p>
            </div>
            <div class=" h-[4em] flex flex-col justify-end items-start">
              <button  onclick= "setlocalstorage(${i})" class=" buttonss px-5 py-4 rounded-lg  font-bold text-[1.1em] hover:bg-[#8a53bd] hover:text-white duration-300 bg-gray-100 boder-0  ">Add to cart</button>
            </div>
          </div>`;
    }
  }

  affichage();
  selectTrie.addEventListener("change", () => {
    if (selectTrie.value == "chose") {
      cardsContainer.innerHTML = "";
      affichage();
    }
  });
}

getTodos();

function Triepar() {
  selectTrie.addEventListener("change", () => {
    if (selectTrie.value == "Trie par prix") {
      cardsContainer.innerHTML = "";
      let sortbyprice = [...data.array];
      console.log(sortbyprice);
      for (let i = 0; i < sortbyprice.length; i++) {
        for (let j = 0; j < sortbyprice.length - 1; j++) {
          if (sortbyprice[j].price > sortbyprice[j + 1].price) {
            let temp;
            temp = sortbyprice[j];
            sortbyprice[j] = sortbyprice[j + 1];
            sortbyprice[j + 1] = temp;
          }
        }
      }

      for (let i = 0; i < sortbyprice.length; i++) {
        cardsContainer.innerHTML += `        <div class="cards w-[25em] min-w-72 ">
  <div>
    <img src="${sortbyprice[i].image}" alt="" class="rounded-lg">
  </div>
  <div class=" h-[7em] flex flex-col justify-between mt-6">
    <h2 class="font-bold text-[1.3em]">${sortbyprice[i].titre}</h2>
    <p class="text-[#0a0a0aa2] font-bold">$${sortbyprice[i].price}.00</p>
    <p class="text-[#0a0a0aa2] font-bold">${sortbyprice[i].type}</p>
  </div>
  <div class=" h-[4em] flex flex-col justify-end items-start">
    <button class="buttonss px-5 py-4 rounded-lg  font-bold text-[1.1em] hover:bg-[#8a53bd] hover:text-white duration-300 bg-gray-100 boder-0  ">Add to cart</button>
  </div>
</div>`;
      }
    } else if (selectTrie.value == "Trie par nome") {
      cardsContainer.innerHTML = "";
      let sortbynome = [...data.array];

      for (let i = 0; i < sortbynome.length; i++) {
        for (let j = 0; j < sortbynome.length - 1; j++) {
          if (sortbynome[j].titre > sortbynome[j + 1].titre) {
            let temp;
            temp = sortbynome[j];
            sortbynome[j] = sortbynome[j + 1];
            sortbynome[j + 1] = temp;
          }
        }
      }

      for (let i = 0; i < sortbynome.length; i++) {
        cardsContainer.innerHTML += `        <div class="cards w-[25em] min-w-72 ">
  <div>
    <img src="${sortbynome[i].image}" alt="" class="rounded-lg">
  </div>
  <div class=" h-[7em] flex flex-col justify-between mt-6">
    <h2 class="font-bold text-[1.3em]">${sortbynome[i].titre}</h2>
    <p class="text-[#0a0a0aa2] font-bold">$${sortbynome[i].price}.00</p>
    <p class="text-[#0a0a0aa2] font-bold">${sortbynome[i].type}</p>
  </div>
  <div class=" h-[4em] flex flex-col justify-end items-start">
    <button class="buttonss px-5 py-4 rounded-lg  font-bold text-[1.1em] hover:bg-[#8a53bd] hover:text-white duration-300 bg-gray-100 boder-0  ">Add to cart</button>
  </div>
</div>`;
      }
    }
  });
}

Triepar();

let arrayofcartsadded = [];
let countlocalstorage;

function setlocalstorage(i) {
  let arrayofcartsadded = JSON.parse(localStorage.getItem("addedCard")) || [];

  arrayofcartsadded.push(data.array[i]);
  localStorage.setItem("addedCard", JSON.stringify(arrayofcartsadded));

  function countCart() {
    countlocalstorage = JSON.parse(localStorage.getItem("addedCard"));
    cartbutton.innerHTML = countlocalstorage ? countlocalstorage.length : 0;
  }
  countCart();
}
countlocalstorage = JSON.parse(localStorage.getItem("addedCard"));
cartbutton.innerHTML = countlocalstorage.length;
