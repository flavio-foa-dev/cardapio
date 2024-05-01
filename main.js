// function limparCache() {
//   if ('caches' in window) {
//     // Limpa o cache do serviço do trabalhador, se estiver disponível
//     caches.keys().then(function(names) {
//       for (let name of names) caches.delete(name);
//     });
//   }

//   // Limpa o cache do navegador
//   window.location.reload(true); // Força a recarga da página, ignorando o cache
// }
// limparCache()
const breve = "public/breve1.jpg";

// cardapio.js
async function carregarJSON(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao carregar o JSON:", error);
  }
}

/// main.js
document.addEventListener("DOMContentLoaded", function () {
  //var accordion = document.getElementById('accordion');

  // Carrega o JSON do arquivo e renderiza o cardápio
  carregarJSON("./data.json").then((cardapioData) => {
    let contador = 1;
    for (let secao in cardapioData) {
      renderizarCardapio(contador, secao, cardapioData[secao]);
      contador += 1;
    }
  });
});

// renderizarCardapio.js
let card = document.querySelector(".container");

function renderizarCardapio(contador, sectionId, data) {
  card.innerHTML += `
  <div class="card">
        <div class="card-header" id="section${contador}">
            <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${contador}" aria-expanded="true" aria-controls="collapse${contador}">
                ${sectionId} <i class="fas fa-chevron-down"></i>
                </button>
            </h2>
        </div>

        <div id="collapse${contador}" class="collapse ${
    contador === 1 ? "show" : ""
  }" aria-labelledby="section${contador}" data-parent="#accordion">
            <div class="card-body">
            <div class="card-body">

                <div class="menu-item">
                ${handlePlates(data, sectionId)}
                </div>

            </div>
        </div>
    </div>
  `;
}

function handlePlates(data, sectionId) {
  return data
    .map(
      (plate) => `
    <div class="">
      <h4>${plate.prato}</h4>

      <!-- Início do Carrossel do Bootstrap -->
      <div id="carouselExample${plate.prato.replaceAll(
        " ",
        "_"
      )}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${
              plate.imgs[0] || breve
            }" width="250px" class="d-block w-100 rounded" alt="${plate.prato}">
          </div>
          <div class="carousel-item">
            <img src="${
              plate.imgs[1] || breve
            }" width="250px" class="d-block w-100 rounded" alt="${plate.prato}">
          </div>
          <div class="carousel-item">
            <img src="${
              plate.imgs[2] || breve
            }" width="250px" class="d-block w-100 rounded" alt="${plate.prato}">
          </div>

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample${plate.prato.replaceAll(
          " ",
          "_"
        )}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample${plate.prato.replaceAll(
          " ",
          "_"
        )}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <!-- Fim do Carrossel do Bootstrap -->


      <p class="description">${plate.descricao}</p>
    </div>
    <div class="info">
    ${
      sectionId === "Bebidas" ||
      sectionId === "Vinhos" ||
      sectionId === "Cervejas" ||
      sectionId === "Drinks" ||
      sectionId === "Bebidas Alcoolicas"
        ? `<p> ${
            plate.serve_1 > 0
              ? `Valor: R$ ${Number(plate.serve_1).toFixed(2)}`
              : ""
          }</p>
           <p>${
             plate.serve_2 > 0
               ? `Valor: R$ ${Number(plate.serve_2).toFixed(2)}`
               : ""
           }</p>`
        : sectionId === "Pizzas" || sectionId === "Pizzas doces"
        ? `<p> ${
            plate.serve_1 > 0
              ? `Valor Pequena: R$ ${Number(plate.serve_1).toFixed(2)}`
              : ""
          }</p>
             <p>${
               plate.serve_2 > 0
                 ? `Valor Grande: R$ ${Number(plate.serve_2).toFixed(2)}`
                 : ""
             }</p>`
        : `<p> ${
            plate.serve_1 > 0
              ? `Valor para 1: R$ ${Number(plate.serve_1).toFixed(2)}`
              : ""
          }</p>
             <p>${
               plate.serve_2 > 0
                 ? `Valor para 2: R$ ${Number(plate.serve_2).toFixed(2)}`
                 : ""
             }</p>`
    }
      <hr>
      </div>
  `
    )
    .join("");
}

async function scrollToSection(sectionId, id) {
  // Fecha todos os acordeões
  $(".collapse").collapse("hide");

  // Encontre o acordeão correspondente e o abra
  const acordeonElement = document.getElementById(sectionId);

  console.log({ acordeonElement });
  if (acordeonElement) {
    $(acordeonElement).collapse("show");
  }

  // Verifique se a seção existe
  const sectionElement = document.getElementById(id);
  console.log("id parada", { sectionElement });

  if (sectionElement) {
    // Use o método scrollIntoView para rolar até a seção
    sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });

  }
}
