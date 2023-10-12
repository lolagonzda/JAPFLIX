
let arreglo = [];

document.addEventListener("DOMContentLoaded", function () {
    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then(response => response.json())
        .then(data => {

            arreglo = data;
        })
})

let buscador = document.getElementById("btnBuscar");
let Buscador2 = document.getElementById("inputBuscar");
buscador.addEventListener('click', function () {
    let arregloFiltrado = arreglo.filter(producto => producto.title.toLowerCase().includes(Buscador2.value.toLowerCase()) || producto.overview.toLowerCase().includes(Buscador2.value.toLowerCase()) || producto.tagline.toLowerCase().includes(Buscador2.value.toLowerCase()) || generos(producto.genres).toLowerCase().includes(Buscador2.value.toLowerCase()));
    addData(arregloFiltrado);
})

let arrayGen = [];
function generos(item) {

    for (let genero of item) {
        arrayGen += genero.name;

    }
    return arrayGen;
}
function generosDes(item) {
    let htmlContentToAppend = "";
    for (let genero of item) {
        htmlContentToAppend += `<span>${genero.name} - </span>`;
    }
    return htmlContentToAppend;
}


function addData(info) {
    let htmlContentToAppend = "";

    let Star = `<i class="fa fa-star checked" style="color: rgb(218, 165, 32)"></i>`
    let Star2 = `<i class="fa fa-star" style="color: #000000;"></i>`;
    for (const peli of info) {
        let starsHtml = "";
        for (let i = 1; i <= Math.round(peli.vote_average / 2); i++) {
            if (Math.round(peli.vote_average / 2) >= i) {
                starsHtml += Star;
            } else {
                starsHtml += Star2;
            }
        }

        htmlContentToAppend += `
        <li onclick="offCanvas(${peli.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"">
    <div class="list-group-item list-group-item-action cursor-active dark-mode" >
    <div class="row">
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1"> ${peli.title}</h4>
                <small class="text-muted">${starsHtml}</small>
            </div>
            <br>
            <p>${peli.tagline}</p>
            </div>
            </div>
 </div>
 
</div></li>
<div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
 </div>
 
 `
 let contenedor = document.getElementById("lista");
        contenedor.innerHTML = htmlContentToAppend;
    }
}
function offCanvas(id) {
    let htmlContentToAppend = "";
    let offCanvas = document.getElementById("offcanvasTop");
    for (let i of arreglo) {
        if (id == i.id) {
            htmlContentToAppend = `
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasTopLabel">${i.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
            <p>${i.overview}</p>
            <hr>
            <div class="row">
            <p class="col">${generosDes(i.genres)}</p>
            <div class="dropdown col position-absolute">
  <button class="btn btn-secondary dropdown-toggle position-absolute top-0 end-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    More
  </button>
  <ul class="dropdown-menu">
    <li><button class="dropdown-item" type="button">Year: ${i.release_date}</button></li>
    <li><button class="dropdown-item" type="button">Runtime: ${i.runtime} mins.</button></li>
    <li><button class="dropdown-item" type="button">Budget: $${i.budget}</button></li>
    <li><button class="dropdown-item" type="button">Revenue: $${i.revenue}</button></li>
  </ul>
</div>
            
</div>
            </div>

            `
        }
    }

    offCanvas.innerHTML = htmlContentToAppend;

}


