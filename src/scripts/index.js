let cardsContainer = document.querySelector('.cards-container');


async function getData() {
    let respons = await fetch('../scripts/products.json')
    let data = await respons.json() 



    for (let i = 0; i <= 5; i++) {
        cardsContainer.innerHTML += `
       
    <div class="container w-[300px]  ">
        <div>
          <img src="${data.array[i].image}" alt="" class="rounded-lg">
        </div>
        <div class="  flex flex-col justify-between mt-6 gap-1 ">
          <h2 class="font-bold text-[1.3em]">${data.array[i].titre}</h2>
          <p class="text-[#0a0a0aa2] font-bold">${data.array[i].price}</p>
          <p class="text-[#0a0a0aa2] font-bold">${data.array[i].type}</p>
        </div>
        <div class="flex  justify-between items-center gap-1">
          <button class="buttonss px-5 py-4 rounded-lg  mt-1 font-bold text-[1.1em] hover:bg-[#4928CF] hover:text-white duration-300 bg-gray-100 boder-0  ">Add to cart</button>
          <a href=""><img src="/src/images/favorite.svg" class="w-[39px] h-[39px]" alt=""></a>
    </div>
      `
    }
}

getData()



