let cardsContainer = document.querySelector('.cards-container');
let allcards = document.querySelectorAll('.buttonss');


async function getTodos() {
    let respons = await fetch('../scripts/products.json')
    let data = await respons.json() 

    // console.log(data.array.length);
    // console.log(data.array[0].image);

    for (let i = 0; i < data.array.length; i++) {
        cardsContainer.innerHTML += `        <div class=" w-[25em] min-w-72 ">
        <div>
          <img src="${data.array[i].image}" alt="" class="rounded-lg">
        </div>
        <div class=" h-[7em] flex flex-col justify-between mt-6">
          <h2 class="font-bold text-[1.3em]">${data.array[i].titre}</h2>
          <p class="text-[#0a0a0aa2] font-bold">${data.array[i].price}</p>
          <p class="text-[#0a0a0aa2] font-bold">${data.array[i].type}</p>
        </div>
        <div class=" h-[4em] flex flex-col justify-end items-start">
          <button class="buttonss px-5 py-4 rounded-lg  font-bold text-[1.1em] hover:bg-[#8a53bd] hover:text-white duration-300 bg-gray-100 boder-0  ">Add to cart</button>
        </div>
      </div>`
    }
}

getTodos()



console.log(allcards);

function addCardLocalstorage()
{
    allcards.forEach(element => {
        console.log(element);
    });
}

addCardLocalstorage()

