let menu = document.getElementById('menu-icon');
let alllist = document.querySelector('.listoful')
let ullist = document.querySelector('.ullist')
menu.addEventListener("click" , ()=>
    {
        menu.classList.toggle("bx-x");
        alllist.classList.toggle("alllist");
        ullist.classList.toggle('hidden')
        ullist.classList.toggle('responsiveul')
    }
);


fetch('products.json')
      .then(response => response.json())
      .then(json => console.log(json))